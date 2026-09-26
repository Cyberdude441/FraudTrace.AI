"""
Timestamp parsing and temporal difference calculation for FraudTrace AI.
"""

from datetime import datetime
from typing import Optional, Tuple, Any


class TimestampNormalizer:
    """Normalizes and compares temporal evidence timestamps."""

    FORMATS = [
        "%Y-%m-%dT%H:%M",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M:%S.%fZ",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %H:%M",
        "%d/%m/%Y %H:%M",
        "%d/%m/%Y %H:%M:%S",
        "%d-%m-%Y %H:%M:%S",
        "%H:%M:%S",
        "%H:%M"
    ]

    @classmethod
    def parse_datetime(cls, ts_val: Any) -> Optional[datetime]:
        """Parses various timestamp string formats into a datetime object."""
        if ts_val is None:
            return None
        if isinstance(ts_val, datetime):
            return ts_val

        s = str(ts_val).strip()
        if not s or s.lower() in ("none", "nan", "missing", "null"):
            return None

        # Try standard formats
        for fmt in cls.FORMATS:
            try:
                return datetime.strptime(s, fmt)
            except ValueError:
                pass

        # Try fromisoformat as fallback
        try:
            return datetime.fromisoformat(s.replace("Z", "+00:00"))
        except (ValueError, AttributeError):
            pass

        return None

    @classmethod
    def time_diff_minutes(cls, ts1: Any, ts2: Any) -> Optional[float]:
        """Computes absolute difference in minutes between two timestamps."""
        dt1 = cls.parse_datetime(ts1)
        dt2 = cls.parse_datetime(ts2)
        if dt1 is None or dt2 is None:
            return None
        diff_seconds = abs((dt1 - dt2).total_seconds())
        return diff_seconds / 60.0

    @classmethod
    def compare_timestamps(cls, ts1: Any, ts2: Any, max_drift_minutes: float = 4.0) -> Tuple[bool, Optional[float]]:
        """
        Determines whether two timestamps are temporally consistent within drift threshold.
        Returns: (is_consistent, drift_minutes)
        """
        diff = cls.time_diff_minutes(ts1, ts2)
        if diff is None:
            # Missing timestamp constitutes an anomaly/missing data
            return False, None
        return diff <= max_drift_minutes, diff
