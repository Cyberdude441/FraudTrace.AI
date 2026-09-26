"""
Entity normalization for Indian forensic cyber evidence (Phone, UPI, Email, Bank, URL).
"""

import re
from typing import Optional


class EntityNormalizer:
    """Normalizes domain entities into canonical matching representations."""

    @staticmethod
    def normalize_phone(phone_str: Optional[str]) -> Optional[str]:
        """Normalizes phone numbers to standard E.164 (+91XXXXXXXXXX)."""
        if not phone_str or not isinstance(phone_str, str):
            return None
        # Extract digits
        digits = re.sub(r"\D", "", phone_str)
        if len(digits) == 10:
            return f"+91{digits}"
        elif len(digits) == 11 and digits.startswith("0"):
            return f"+91{digits[1:]}"
        elif len(digits) == 12 and digits.startswith("91"):
            return f"+{digits}"
        elif len(digits) > 10 and digits.startswith("91"):
            return f"+{digits[:12]}"
        elif digits:
            return f"+{digits}"
        return None

    @staticmethod
    def normalize_email(email_str: Optional[str]) -> Optional[str]:
        """Normalizes email address to lowercase stripped."""
        if not email_str or not isinstance(email_str, str):
            return None
        cleaned = email_str.strip().lower()
        if "@" in cleaned and "." in cleaned:
            return cleaned
        return None

    @staticmethod
    def normalize_upi(upi_str: Optional[str]) -> Optional[str]:
        """Normalizes UPI Virtual Payment Address (e.g. handle@bank)."""
        if not upi_str or not isinstance(upi_str, str):
            return None
        cleaned = upi_str.strip().lower()
        # Remove prefixes like 'upi://' if present
        cleaned = re.sub(r"^upi://pay\?pa=", "", cleaned)
        cleaned = cleaned.split("&")[0]  # strip query params
        return cleaned

    @staticmethod
    def normalize_url(url_str: Optional[str]) -> Optional[str]:
        """Normalizes URL by stripping protocol, trailing slashes, and tracking query params."""
        if not url_str or not isinstance(url_str, str):
            return None
        cleaned = url_str.strip().lower()
        cleaned = re.sub(r"^https?://", "", cleaned)
        cleaned = re.sub(r"^www\.", "", cleaned)
        cleaned = cleaned.rstrip("/")
        return cleaned

    @staticmethod
    def normalize_transaction_id(txn_str: Optional[str]) -> Optional[str]:
        """Normalizes transaction reference numbers and RRNs."""
        if not txn_str or not isinstance(txn_str, str):
            return None
        # Alphanumeric uppercase
        cleaned = re.sub(r"[^\w]", "", txn_str).upper()
        return cleaned if cleaned else None

    @classmethod
    def normalize_entity(cls, entity_type: str, value: str) -> Optional[str]:
        """Dispatches normalization based on entity type."""
        t = entity_type.lower()
        if "phone" in t or "mobile" in t:
            return cls.normalize_phone(value)
        elif "email" in t:
            return cls.normalize_email(value)
        elif "upi" in t or "vpa" in t:
            return cls.normalize_upi(value)
        elif "url" in t or "domain" in t:
            return cls.normalize_url(value)
        elif "transaction" in t or "rrn" in t or "utr" in t:
            return cls.normalize_transaction_id(value)
        return value.strip() if isinstance(value, str) else None
