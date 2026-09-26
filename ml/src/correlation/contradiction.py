"""
Contradiction and anomaly detection engine.
Distinguishes CORROBORATED, CONFLICTING, PARTIALLY_CORROBORATED, MISSING_DATA,
TIMESTAMP_INCONSISTENCY, and POSSIBLE_DUPLICATE without asserting guilt.
"""

from typing import Any, Dict, List, Optional
from ..preprocessing.amount_normalizer import AmountNormalizer
from ..preprocessing.timestamp_normalizer import TimestampNormalizer
from ..resolution.deduplication import Deduplicator
from .corroboration import CorroborationEngine


class ContradictionEngine:
    """Core analytical engine identifying corroborations and contradictions."""

    def __init__(self, amount_tolerance_ratio: float = 0.01, time_drift_minutes: float = 4.0):
        self.amount_tolerance_ratio = amount_tolerance_ratio
        self.time_drift_minutes = time_drift_minutes

    def analyze_event_records(
        self,
        event_id: str,
        records: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Analyzes a set of evidence records for an event and returns a forensic report.
        """
        if not records:
            return {
                "eventId": event_id,
                "status": "UNSUPPORTED",
                "confidence": 0.0,
                "independentSourceCount": 0,
                "corroboration": [],
                "contradictions": [],
                "explanation": "No evidence records supplied for event."
            }

        # 1. Check for Duplicate Copies
        if len(records) >= 2:
            for i in range(len(records)):
                for j in range(i + 1, len(records)):
                    is_dup, reason = Deduplicator.are_duplicates(records[i], records[j])
                    if is_dup:
                        id_i = records[i].get("evidence_id") or records[i].get("id")
                        id_j = records[j].get("evidence_id") or records[j].get("id")
                        return {
                            "eventId": event_id,
                            "status": "POSSIBLE_DUPLICATE",
                            "confidence": None,
                            "independentSourceCount": len(records) - 1,
                            "corroboration": [],
                            "contradictions": [
                                {
                                    "field": "file_integrity",
                                    "values": [id_i, id_j],
                                    "sources": [id_i, id_j],
                                    "reason": reason
                                }
                            ],
                            "explanation": f"Multiple records ({id_i}, {id_j}) represent identical duplicate copies. Duplicate copies do not count as independent corroboration."
                        }

        # 2. Check for Missing Critical Timestamps
        for r in records:
            if "screenshot" in str(r.get("source_type", "")).lower() or "image" in str(r.get("source_type", "")).lower():
                if not r.get("timestamp"):
                    return {
                        "eventId": event_id,
                        "status": "MISSING_DATA",
                        "confidence": None,
                        "independentSourceCount": len(records),
                        "corroboration": [],
                        "contradictions": [
                            {
                                "field": "timestamp",
                                "missingIn": [r.get("evidence_id") or r.get("id")],
                                "issue": "Screenshot lacks timestamp metadata"
                            }
                        ],
                        "explanation": f"Evidence {r.get('evidence_id') or r.get('id')} lacks valid timestamp metadata. Additional verification required."
                    }

        # 3. Check for Timestamp Drift / Discrepancy
        valid_ts = [r for r in records if r.get("timestamp")]
        if len(valid_ts) >= 2:
            for i in range(len(valid_ts)):
                for j in range(i + 1, len(valid_ts)):
                    is_cons, drift = TimestampNormalizer.compare_timestamps(
                        valid_ts[i].get("timestamp"),
                        valid_ts[j].get("timestamp"),
                        max_drift_minutes=self.time_drift_minutes
                    )
                    if not is_cons and drift is not None and drift > self.time_drift_minutes:
                        id_i = valid_ts[i].get("evidence_id") or valid_ts[i].get("id")
                        id_j = valid_ts[j].get("evidence_id") or valid_ts[j].get("id")
                        return {
                            "eventId": event_id,
                            "status": "TIMESTAMP_INCONSISTENCY",
                            "confidence": None,
                            "independentSourceCount": len(records),
                            "corroboration": [],
                            "contradictions": [
                                {
                                    "field": "timestamp",
                                    "values": [str(valid_ts[i].get("timestamp")), str(valid_ts[j].get("timestamp"))],
                                    "sources": [id_i, id_j],
                                    "driftMinutes": round(drift, 1)
                                }
                            ],
                            "explanation": f"Timestamp discrepancy of {drift:.1f} minutes between {id_i} and {id_j} exceeds allowable drift threshold ({self.time_drift_minutes}m)."
                        }

        # 4. Check for Amount Corroboration & Contradiction
        corrob_res = CorroborationEngine.calculate_corroboration(records, field="amount")
        corroboration = corrob_res["corroboration"]
        distinct_amounts = len(corroboration)

        all_sources = [r.get("evidence_id") or r.get("id") for r in records]
        # Count independent sources
        seen_hashes = set()
        independent_sources = []
        for r in records:
            src_id = r.get("evidence_id") or r.get("id")
            fhash = r.get("sha256") or r.get("file_hash")
            if fhash:
                if fhash not in seen_hashes:
                    seen_hashes.add(fhash)
                    independent_sources.append(src_id)
            else:
                independent_sources.append(src_id)

        indep_count = len(independent_sources)

        # Multiple conflicting amounts
        if distinct_amounts > 1:
            contradictions = [
                {
                    "field": "amount",
                    "values": [c["value"] for c in corroboration],
                    "sources": all_sources
                }
            ]
            return {
                "eventId": event_id,
                "status": "CONFLICTING",
                "confidence": None,
                "independentSourceCount": indep_count,
                "corroboration": corroboration,
                "contradictions": contradictions,
                "explanation": f"Sources describe the same payment event but disagree on transaction amount ({', '.join('₹' + c['value'] for c in corroboration)}). Manual review is required."
            }

        # Single amount agreed across sources
        if distinct_amounts == 1:
            if indep_count >= 3:
                status = "CORROBORATED"
                confidence = 0.95 if indep_count >= 4 else 0.91
                confidence_label = "VERY HIGH" if indep_count >= 4 else "HIGH"
            elif indep_count == 2:
                status = "CORROBORATED"
                confidence = 0.82
                confidence_label = "MEDIUM"
            else:
                status = "PARTIALLY_CORROBORATED"
                confidence = 0.50
                confidence_label = "LOW"

            return {
                "eventId": event_id,
                "status": status,
                "confidence": confidence,
                "confidenceLabel": confidence_label,
                "independentSourceCount": indep_count,
                "corroboration": corroboration,
                "contradictions": [],
                "explanation": f"{indep_count} independent sources agree on event details without contradiction."
            }

        # Non-monetary event (e.g. URL access, message notification)
        if indep_count >= 4:
            return {
                "eventId": event_id,
                "status": "CORROBORATED",
                "confidence": 0.96,
                "confidenceLabel": "VERY HIGH",
                "independentSourceCount": indep_count,
                "corroboration": [{"field": "event", "value": "confirmed", "sources": all_sources}],
                "contradictions": [],
                "explanation": f"{indep_count} independent sources reference the event."
            }
        elif indep_count >= 2:
            return {
                "eventId": event_id,
                "status": "CORROBORATED",
                "confidence": 0.80,
                "confidenceLabel": "MEDIUM",
                "independentSourceCount": indep_count,
                "corroboration": [{"field": "event", "value": "confirmed", "sources": all_sources}],
                "contradictions": [],
                "explanation": f"{indep_count} sources reference the event."
            }
        elif indep_count == 1:
            return {
                "eventId": event_id,
                "status": "UNSUPPORTED",
                "confidence": 0.35,
                "confidenceLabel": "LOW/MEDIUM",
                "independentSourceCount": 1,
                "corroboration": [{"field": "event", "value": "single_source", "sources": all_sources}],
                "contradictions": [],
                "explanation": "Event is supported by only a single source record."
            }

        return {
            "eventId": event_id,
            "status": "UNSUPPORTED",
            "confidence": 0.20,
            "independentSourceCount": indep_count,
            "corroboration": [],
            "contradictions": [],
            "explanation": "Insufficient evidence."
        }
