"""
Corroboration engine: calculates agreement sets and counts independent agreeing sources.
"""

from typing import Any, Dict, List
from collections import defaultdict
from ..preprocessing.amount_normalizer import AmountNormalizer
from ..resolution.deduplication import Deduplicator


class CorroborationEngine:
    """Groups agreeing observations while strictly respecting source independence."""

    @classmethod
    def calculate_corroboration(
        cls,
        evidence_records: List[Dict[str, Any]],
        field: str = "amount"
    ) -> Dict[str, Any]:
        """
        Groups evidence sources by observed field value.
        Deduplicates non-independent copies before returning source counts.
        """
        value_groups = defaultdict(list)

        for rec in evidence_records:
            source_id = rec.get("evidence_id") or rec.get("id") or "UNKNOWN"
            if field == "amount":
                val = AmountNormalizer.parse_amount(rec.get("amount"))
                formatted_val = f"{int(val)}" if val is not None and val.is_integer() else (f"{val:.2f}" if val is not None else None)
            else:
                formatted_val = str(rec.get(field)).strip() if rec.get(field) is not None else None

            if formatted_val is not None:
                value_groups[formatted_val].append(rec)

        # Build corroboration array
        corroboration = []
        for val_str, recs in value_groups.items():
            # Check independence among records in this group
            independent_sources = []
            seen_hashes = set()
            for r in recs:
                src_id = r.get("evidence_id") or r.get("id")
                fhash = r.get("sha256") or r.get("file_hash")
                if fhash:
                    if fhash not in seen_hashes:
                        seen_hashes.add(fhash)
                        independent_sources.append(src_id)
                else:
                    independent_sources.append(src_id)

            corroboration.append({
                "field": field,
                "value": val_str,
                "sources": [r.get("evidence_id") or r.get("id") for r in recs],
                "independentSourceCount": len(independent_sources)
            })

        return {
            "corroboration": corroboration,
            "distinctValueCount": len(value_groups)
        }
