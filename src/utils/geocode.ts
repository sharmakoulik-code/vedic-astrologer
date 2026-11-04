export interface Place {
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

export type GeocodeErrorCode = 'EMPTY_QUERY' | 'NETWORK' | 'NO_RESULTS' | 'INVALID_RESPONSE';

export interface GeocodeError {
  code: GeocodeErrorCode;
  message: string;
}

export let lastGeocodeError: GeocodeError | null = null;

const normalize = (value: string | undefined): string => (typeof value === 'string' ? value.trim() : '');

export const searchPlaces = async (query: string): Promise<Place[]> => {
  const cleanQuery = normalize(query);

  if (!cleanQuery) {
    lastGeocodeError = {
      code: 'EMPTY_QUERY',
      message: 'Enter a city, town, or region to search for a matching birth place.',
    };
    return [];
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=8&language=en&format=json`,
      { headers: { Accept: 'application/json' } },
    );

    if (!response.ok) {
      lastGeocodeError = {
        code: 'NETWORK',
        message: 'Place lookup failed. Please choose the manual coordinate fallback.',
      };
      return [];
    }

    const payload = (await response.json()) as { results?: Array<Record<string, unknown>> };
    const results = Array.isArray(payload?.results) ? payload.results : [];

    if (!results.length) {
      lastGeocodeError = {
        code: 'NO_RESULTS',
        message: 'No matching birth places were found. Please enter coordinates manually.',
      };
      return [];
    }

    const places: Array<Place | null> = results.map((entry) => {
      const latitude = Number(entry.latitude);
      const longitude = Number(entry.longitude);
      const name = normalize(String(entry.name ?? ''));

      if (!name || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
      }

      const admin1 = normalize(String(entry.admin1 ?? '')) || undefined;
      const country = normalize(String(entry.country ?? '')) || undefined;
      const timezone = typeof entry.timezone === 'string' ? entry.timezone : undefined;

      const place: Place = {
        name,
        latitude,
        longitude,
        ...(admin1 ? { admin1 } : {}),
        ...(country ? { country } : {}),
        ...(timezone ? { timezone } : {}),
      };

      return place;
    });

    const validPlaces = places.filter((entry): entry is Place => entry !== null);

    lastGeocodeError = validPlaces.length ? null : {
      code: 'INVALID_RESPONSE',
      message: 'The place lookup returned an invalid response. Please enter coordinates manually.',
    };

    return validPlaces;
  } catch (error) {
    lastGeocodeError = {
      code: 'NETWORK',
      message: `Place lookup is unavailable right now. Please use the manual coordinate fallback.`,
    };
    return [];
  }
};
