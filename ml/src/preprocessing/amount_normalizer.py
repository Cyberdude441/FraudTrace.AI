"""
Currency and monetary amount parsing and normalization for FraudTrace AI.
"""

import re
from typing import Optional, Tuple, Any


class AmountNormalizer:
    """Normalizes and compares financial amount figures."""

    AMOUNT_REGEX = re.compile(r"(?:₹|rs\.?|inr)?\s*(-?\d{1,3}(?:,\d{2,3})*(?:\.\d{1,2})?|-?\d+(?:\.\d{1,2})?)", re.IGNORECASE)

    @classmethod
    def parse_amount(cls, amount_val: Any) -> Optional[float]:
        """Parses any string, number, or messy currency label into a float."""
        if amount_val is None:
            return None
        if isinstance(amount_val, (int, float)):
            return float(abs(amount_val))

        s = str(amount_val).strip().replace("/-", "")
        # Remove commas
        clean_s = s.replace(",", "")
        match = cls.AMOUNT_REGEX.search(clean_s)
        if match:
            try:
                val = float(match.group(1))
                return abs(val)
            except ValueError:
                return None
        return None

    @classmethod
    def compare_amounts(cls, amt1: Optional[float], amt2: Optional[float], tolerance_ratio: float = 0.01) -> Tuple[bool, float]:
        """
        Compares two amounts.
        Returns: (is_consistent, relative_diff)
        """
        if amt1 is None or amt2 is None:
            return False, 1.0

        diff = abs(amt1 - amt2)
        base = max(amt1, amt2, 1.0)
        rel_diff = diff / base
        is_consistent = rel_diff <= tolerance_ratio
        return is_consistent, rel_diff
