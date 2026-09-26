"""
Text normalization utilities for forensic evidence transcripts.
"""

import re
from typing import Optional


class TextNormalizer:
    """Normalizes raw chat logs, SMS alerts, and email bodies."""

    @staticmethod
    def normalize(text: Optional[str]) -> str:
        """Standardizes casing, strips non-printable characters, normalizes whitespace."""
        if not text or not isinstance(text, str):
            return ""
        # Lowercase
        cleaned = text.lower()
        # Remove URLs temporarily for token normalization if desired, or replace with token
        cleaned = re.sub(r"https?://\S+", "<URL>", cleaned)
        # Normalize whitespace
        cleaned = re.sub(r"\s+", " ", cleaned).strip()
        return cleaned

    @staticmethod
    def strip_punctuation(text: str) -> str:
        """Removes punctuation except technical delimiters."""
        return re.sub(r"[^\w\s-]", "", text)
