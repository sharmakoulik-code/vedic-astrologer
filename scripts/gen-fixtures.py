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
BODIES = {
    "Sun": swe.SUN, "Moon": swe.MOON, "Mercury": swe.MERCURY, "Venus": swe.VENUS,
    "Mars": swe.MARS, "Jupiter": swe.JUPITER, "Saturn": swe.SATURN, "Rahu": swe.MEAN_NODE,
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
    out = Path(__file__).resolve().parents[1] / "src" / "utils" / "__fixtures__" / "reference.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    payload = {"generatedBy": "pyswisseph (Lahiri, sidereal, Moshier)",
               "source": "scripts/gen-fixtures.py",
               "cases": [build_case(*c) for c in CASES]}
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {len(payload['cases'])} reference charts to {out}")


if __name__ == "__main__":
    main()
