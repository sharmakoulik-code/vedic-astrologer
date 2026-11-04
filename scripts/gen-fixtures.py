#!/usr/bin/env python3

import json
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

try:
    import swisseph as swe
except ImportError as exc:  # pragma: no cover - user-facing CLI guidance
    raise SystemExit(
        "PySwisseph is not installed. Run: pip install pyswisseph\n"
        "Then generate the fixtures with: python scripts/gen-fixtures.py"
    ) from exc


def normalize_degrees(value: float) -> float:
    normalized = value % 360.0
    return normalized if normalized >= 0 else normalized + 360.0


def longitude_for(planet_id: int, jd: float) -> float:
    result = swe.calc_ut(jd, planet_id, swe.FLGEO)
    return normalize_degrees(float(result[0]))


def sample_for(date_text: str, time_text: str, timezone_name: str, latitude: float, longitude: float) -> dict:
    local_dt = datetime.strptime(f"{date_text} {time_text}", "%Y-%m-%d %H:%M").replace(
        tzinfo=ZoneInfo(timezone_name)
    )
    utc_dt = local_dt.astimezone(timezone.utc)
    jd = swe.julday(
        utc_dt.year,
        utc_dt.month,
        utc_dt.day,
        utc_dt.hour + utc_dt.minute / 60.0 + utc_dt.second / 3600.0,
        gregflag=swe.GREG_CAL,
    )

    return {
        "date": date_text,
        "time": time_text,
        "timezone": timezone_name,
        "latitude": latitude,
        "longitude": longitude,
        "sunLongitude": longitude_for(swe.SUN, jd),
        "moonLongitude": longitude_for(swe.MOON, jd),
        "ayanamsaDegrees": float(swe.get_ayanamsa_ut(jd)),
        "utcIso": utc_dt.isoformat().replace("+00:00", "Z"),
    }


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    output_path = project_root / "src" / "utils" / "__fixtures__" / "reference.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    samples = [
        sample_for("2024-01-01", "12:00", "Asia/Kolkata", 28.6139, 77.2090),
        sample_for("1995-06-15", "18:30", "Asia/Kolkata", 28.6139, 77.2090),
        sample_for("1990-03-05", "05:45", "Asia/Kolkata", 28.6139, 77.2090),
    ]

    payload = {
        "generatedBy": "PySwisseph",
        "source": "scripts/gen-fixtures.py",
        "samples": samples,
    }

    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote reference fixture: {output_path}")


if __name__ == "__main__":
    main()
