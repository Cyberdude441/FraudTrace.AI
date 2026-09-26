"""
Regex and heuristic entity extraction for forensic transcripts.
"""

import re
from typing import Any, Dict, List
from ..preprocessing.entity_normalizer import EntityNormalizer


class EntityExtractor:
    """Extracts typed entities from unstructured text."""

    PHONE_REGEX = re.compile(r"(?:\+91[\-\s]?)?[6-9]\d{9}\b")
    EMAIL_REGEX = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
    UPI_REGEX = re.compile(r"\b[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}\b")
    URL_REGEX = re.compile(r"https?://(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)")
    TXN_REGEX = re.compile(r"\b(?:TXN|RRN|UTR)[A-Z0-9_-]{4,24}\b", re.IGNORECASE)

    @classmethod
    def extract_entities(cls, text: str) -> List[Dict[str, Any]]:
        """Extracts all entities with raw and normalized values."""
        if not text or not isinstance(text, str):
            return []

        results = []

        # Phones
        for match in cls.PHONE_REGEX.finditer(text):
            val = match.group()
            norm = EntityNormalizer.normalize_phone(val)
            if norm:
                results.append({"type": "phone", "original": val, "normalized": norm, "span": match.span()})

        # Emails (exclude potential UPIs if no domain suffix)
        for match in cls.EMAIL_REGEX.finditer(text):
            val = match.group()
            norm = EntityNormalizer.normalize_email(val)
            if norm:
                results.append({"type": "email", "original": val, "normalized": norm, "span": match.span()})

        # UPI Handles
        for match in cls.UPI_REGEX.finditer(text):
            val = match.group()
            # If not already an email
            if not any(r["type"] == "email" and r["original"] == val for r in results):
                norm = EntityNormalizer.normalize_upi(val)
                if norm:
                    results.append({"type": "upi", "original": val, "normalized": norm, "span": match.span()})

        # URLs
        for match in cls.URL_REGEX.finditer(text):
            val = match.group()
            norm = EntityNormalizer.normalize_url(val)
            if norm:
                results.append({"type": "url", "original": val, "normalized": norm, "span": match.span()})

        # Transactions
        for match in cls.TXN_REGEX.finditer(text):
            val = match.group()
            norm = EntityNormalizer.normalize_transaction_id(val)
            if norm:
                results.append({"type": "transaction_id", "original": val, "normalized": norm, "span": match.span()})

        return results
