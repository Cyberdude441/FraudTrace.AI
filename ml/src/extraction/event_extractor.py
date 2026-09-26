"""
Event candidate extraction from structured and semi-structured evidence.
"""

from typing import Any, Dict, List, Optional
from ..preprocessing.amount_normalizer import AmountNormalizer
from ..preprocessing.timestamp_normalizer import TimestampNormalizer


class EventExtractor:
    """Extracts discrete event proposals from evidence records."""

    @classmethod
    def extract_event_candidate(cls, evidence_record: Dict[str, Any]) -> Dict[str, Any]:
        """Maps an evidence record to an event candidate structure."""
        text = evidence_record.get("text", "") or evidence_record.get("description", "")
        amount = AmountNormalizer.parse_amount(evidence_record.get("amount") or text)
        ts = evidence_record.get("timestamp")

        source_type = evidence_record.get("source_type", "unknown")
        event_type = "payment_event" if amount else ("communication_event" if "chat" in source_type or "call" in source_type else "general_event")

        return {
            "evidence_id": evidence_record.get("evidence_id"),
            "event_type": event_type,
            "amount": amount,
            "timestamp": ts,
            "source_type": source_type,
            "raw_text": text
        }
