"""
Event matching: groups evidence records describing the same underlying event
while keeping their specific observations separate.
"""

from typing import Any, Dict, List
from ..preprocessing.timestamp_normalizer import TimestampNormalizer
from ..preprocessing.amount_normalizer import AmountNormalizer


class EventMatcher:
    """Matches evidence records to canonical events based on temporal proximity and shared entities."""

    @classmethod
    def match_evidence_to_events(
        cls,
        evidence_items: List[Dict[str, Any]],
        window_minutes: float = 30.0
    ) -> List[Dict[str, Any]]:
        """
        Groups evidence items into event clusters.
        Each cluster retains the distinct observation details from each source.
        """
        events = []
        # Group by shared transaction ID or temporal cluster
        unassigned = list(evidence_items)

        event_counter = 1
        while unassigned:
            pivot = unassigned.pop(0)
            cluster = [pivot]

            pivot_ts = pivot.get("timestamp")
            pivot_txn = pivot.get("transaction_id") or pivot.get("rrn")
            pivot_amt = AmountNormalizer.parse_amount(pivot.get("amount"))

            remaining = []
            for item in unassigned:
                matched = False
                item_txn = item.get("transaction_id") or item.get("rrn")
                if pivot_txn and item_txn and pivot_txn == item_txn:
                    matched = True
                elif pivot_ts and item.get("timestamp"):
                    diff = TimestampNormalizer.time_diff_minutes(pivot_ts, item.get("timestamp"))
                    if diff is not None and diff <= window_minutes:
                        matched = True

                if matched:
                    cluster.append(item)
                else:
                    remaining.append(item)

            unassigned = remaining

            # Create event candidate
            event_type = "Payment Completed" if any(AmountNormalizer.parse_amount(i.get("amount")) for i in cluster) else "Communication Event"
            events.append({
                "eventId": f"EVENT-{event_counter:03d}",
                "eventType": event_type,
                "evidenceRecords": cluster
            })
            event_counter += 1

        return events
