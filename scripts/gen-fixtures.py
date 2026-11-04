#!/usr/bin/env python3
"""
Generates src/utils/__fixtures__/reference.json using the Swiss Ephemeris
(Lahiri ayanamsa, sidereal, whole-sign ascendant, Vimshottari dasha).

Run from the project folder:
    pip install pyswisseph tzdata
    python scripts/gen-fixtures.py
"""
import datetime as dt
import json
from pathlib import Path

try:
    import swisseph as swe
    from zoneinfo import ZoneInfo
except ImportError as exc:
    raise SystemExit("Missing package. Run:  pip install pyswisseph tzdata") from exc

swe.set_sid_mode(swe.SIDM_LAHIRI)
# Moshier ephemeris is built in (no data files needed), accurate to ~1 arcsecond.
FLAGS = swe.FLG_MOSEPH | swe.FLG_SIDEREAL

CASES = [
    ("Delhi 1995",            "1995-06-15", "18:30", "Asia/Kolkata",      28.6139,   77.2090),
    ("Kolkata 1990",          "1990-03-05", "05:45", "Asia/Kolkata",      22.5726,   88.3639),
    ("Kolkata 1945 wartime",  "1945-08-15", "06:00", "Asia/Kolkata",      22.5726,   88.3639),
    ("New York 1985 winter",  "1985-12-25", "08:30", "America/New_York",  40.7128,  -74.0060),
    ("London 1975 summer",    "1975-07-10", "14:00", "Europe/London",     51.5074,   -0.1278),
    ("Sydney 2003 summer",    "2003-01-20", "22:15", "Australia/Sydney", -33.8688,  151.2093),
    ("Mumbai 2024 midnight",  "2024-01-01", "00:30", "Asia/Kolkata",      19.0760,   72.8777),
    ("Chicago 1960",          "1960-09-09", "23:50", "America/Chicago",   41.8781,  -87.6298),
]

LORDS = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]
YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17]
SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
]
TARA_NAMES = ["Janma", "Sampat", "Vipat", "Kshema", "Pratyak", "Sadhaka", "Vadha", "Mitra", "Ati-Mitra"]
BODIES = {
    "Sun": swe.SUN, "Moon": swe.MOON, "Mercury": swe.MERCURY, "Venus": swe.VENUS,
    "Mars": swe.MARS, "Jupiter": swe.JUPITER, "Saturn": swe.SATURN, "Rahu": swe.MEAN_NODE,
}
TRANSIT_INSTANTS = [
    "1990-01-15T12:00:00Z", "1993-07-22T00:00:00Z", "1998-11-03T18:30:00Z",
    "2001-04-09T06:15:00Z", "2005-09-17T21:45:00Z", "2010-02-11T09:30:00Z",
    "2014-12-28T15:00:00Z", "2019-05-06T03:45:00Z", "2024-01-15T12:00:00Z",
    "2028-08-19T20:15:00Z", "2031-03-02T07:30:00Z", "2035-10-24T16:00:00Z",
]
NATAL_REFERENCES = [
    {"moonSign": "Aries", "nakshatraIndex": 0},
    {"moonSign": "Libra", "nakshatraIndex": 12},
    {"moonSign": "Pisces", "nakshatraIndex": 26},
]


def jd_from_utc(instant):
    return swe.julday(
        instant.year, instant.month, instant.day,
        instant.hour + instant.minute / 60 + instant.second / 3600 + instant.microsecond / 3_600_000_000,
    )


def transit_longitudes(jd):
    values = {name: swe.calc_ut(jd, body, FLAGS)[0][0] % 360 for name, body in BODIES.items()}
    values["Ketu"] = (values["Rahu"] + 180) % 360
    return values


def sign_index(longitude):
    return int((longitude % 360) // 30)


def is_retrograde(longitude, next_longitude):
    difference = (next_longitude - longitude + 180) % 360 - 180
    return difference < 0


def nakshatra_index(longitude):
    return int((longitude % 360) // (360 / 27)) % 27


def expected_from_natal(longitudes, moon_sign, birth_nakshatra):
    natal_sign = SIGNS.index(moon_sign)
    houses = {
        planet: ((sign_index(longitude) - natal_sign + 12) % 12) + 1
        for planet, longitude in longitudes.items()
    }
    moon_nakshatra = nakshatra_index(longitudes["Moon"])
    count = ((moon_nakshatra - birth_nakshatra + 27) % 27) + 1
    tara = ((count - 1) % 9) + 1
    saturn_offset = (sign_index(longitudes["Saturn"]) - natal_sign + 12) % 12
    phase = "rising" if saturn_offset == 11 else "peak" if saturn_offset == 0 else "setting" if saturn_offset == 1 else None
    return {
        "houses": houses,
        "taraBala": {
            "count": count, "tara": tara, "name": TARA_NAMES[tara - 1],
            "nakshatraIndex": moon_nakshatra,
        },
        "sadeSati": {"active": phase is not None, "phase": phase},
    }


def utc_iso(instant):
    return instant.astimezone(dt.timezone.utc).isoformat().replace("+00:00", "Z")


def find_reference_crossings(start, end):
    crossings = []
    step = dt.timedelta(days=1)
    for planet in BODIES.keys() | {"Ketu"}:
        left = start
        left_sign = sign_index(transit_longitudes(jd_from_utc(left))[planet])
        while left < end:
            right = min(left + step, end)
            right_sign = sign_index(transit_longitudes(jd_from_utc(right))[planet])
            if left_sign != right_sign:
                low, high = left, right
                while (high - low).total_seconds() > 1:
                    mid = low + (high - low) / 2
                    if sign_index(transit_longitudes(jd_from_utc(mid))[planet]) == left_sign:
                        low = mid
                    else:
                        high = mid
                crossings.append({
                    "planet": planet,
                    "fromSign": SIGNS[left_sign],
                    "toSign": SIGNS[right_sign],
                    "at": utc_iso(high),
                })
            left, left_sign = right, right_sign
    return sorted(crossings, key=lambda item: item["at"])


def build_transit_fixtures():
    cases = []
    for value in TRANSIT_INSTANTS:
        instant = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
        positions = transit_longitudes(jd_from_utc(instant))
        next_positions = transit_longitudes(jd_from_utc(instant + dt.timedelta(hours=24)))
        planets = {}
        for planet, longitude in positions.items():
            index = nakshatra_index(longitude)
            sector = 360 / 27
            planets[planet] = {
                "longitude": longitude,
                "sign": SIGNS[sign_index(longitude)],
                "nakshatraIndex": index,
                "pada": int(((longitude % sector) / (sector / 4))) + 1,
                "retrograde": planet in ("Rahu", "Ketu") or is_retrograde(longitude, next_positions[planet]),
            }
        cases.append({
            "at": value,
            "planets": planets,
            "natalReferences": {
                f"{item['moonSign']}-{item['nakshatraIndex']}": expected_from_natal(
                    positions, item["moonSign"], item["nakshatraIndex"],
                )
                for item in NATAL_REFERENCES
            },
        })

    crossing_start = dt.datetime(2024, 1, 1, tzinfo=dt.timezone.utc)
    crossing_end = dt.datetime(2024, 2, 1, tzinfo=dt.timezone.utc)
    return {
        "generatedBy": "pyswisseph (Lahiri, sidereal, Moshier, mean node)",
        "source": "scripts/gen-fixtures.py",
        "cases": cases,
        "crossingMonth": {"year": 2024, "month": 1},
        "signChanges": find_reference_crossings(crossing_start, crossing_end),
    }


def build_case(name, date, time, tz, lat, lon):
    local = dt.datetime.fromisoformat(f"{date}T{time}:00").replace(tzinfo=ZoneInfo(tz))
    utc = local.astimezone(dt.timezone.utc)
    jd = swe.julday(utc.year, utc.month, utc.day,
                    utc.hour + utc.minute / 60 + utc.second / 3600)

    planets = {k: swe.calc_ut(jd, b, FLAGS)[0][0] % 360 for k, b in BODIES.items()}
    planets["Ketu"] = (planets["Rahu"] + 180) % 360

    _, ascmc = swe.houses_ex(jd, lat, lon, b"W", swe.FLG_SIDEREAL)

    sector = 360 / 27
    moon = planets["Moon"]
    nak_index = int(moon // sector) % 27
    elapsed = (moon % sector) / sector
    first = nak_index % 9
    start = utc - dt.timedelta(days=(1 - elapsed) * YEARS[first] * 365.25)

    periods, cursor = [], start
    for i in range(9):
        k = (first + i) % 9
        end = cursor + dt.timedelta(days=YEARS[k] * 365.25)
        periods.append({"lord": LORDS[k], "start": cursor.date().isoformat(),
                        "end": end.date().isoformat()})
        cursor = end

    return {
        "name": name, "date": date, "time": time, "timezone": tz,
        "latitude": lat, "longitude": lon,
        "utcIso": utc.isoformat().replace("+00:00", "Z"),
        "ayanamsa": swe.get_ayanamsa_ut(jd),
        "planets": planets,
        "ascendant": ascmc[0] % 360,
        "dashaLord": LORDS[first],
        "periods": periods,
    }


def main():
    fixture_dir = Path(__file__).resolve().parents[1] / "src" / "utils" / "__fixtures__"
    fixture_dir.mkdir(parents=True, exist_ok=True)
    out = fixture_dir / "reference.json"
    payload = {"generatedBy": "pyswisseph (Lahiri, sidereal, Moshier)",
               "source": "scripts/gen-fixtures.py",
               "cases": [build_case(*c) for c in CASES]}
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {len(payload['cases'])} reference charts to {out}")
    transit_out = fixture_dir / "transits.json"
    transit_payload = build_transit_fixtures()
    transit_out.write_text(json.dumps(transit_payload, indent=2), encoding="utf-8")
    print(f"Wrote {len(transit_payload['cases'])} transit instants and "
          f"{len(transit_payload['signChanges'])} sign changes to {transit_out}")


if __name__ == "__main__":
    main()
