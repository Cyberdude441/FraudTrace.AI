"""
End-to-End Forensic ML & Rule Inference Pipeline for FraudTrace AI.
"""

from typing import Any, Dict, List, Optional
from ..correlation.contradiction import ContradictionEngine
from ..correlation.corroboration import CorroborationEngine
from ..confidence.scoring import ConfidenceScorer
from ..data.loader import DataLoader
from .predictor import EvidencePredictor


class ForensicInferencePipeline:
    """Executes full pipeline: Ingestion -> Extraction -> Correlation -> Contradiction -> Confidence."""

    def __init__(self, model_version: str = "v1"):
        self.contradiction_engine = ContradictionEngine()
        self.predictor = EvidencePredictor(model_version=model_version)
        self.loader = DataLoader()

    def analyze_event_by_records(
        self,
        event_id: str,
        evidence_records: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Processes a group of raw or preprocessed evidence records for an event.
        Produces the standardized FraudTrace ML forensic JSON output.
        """
        # Run hybrid contradiction & corroboration analysis
        result = self.contradiction_engine.analyze_event_records(event_id, evidence_records)

        # Enhance with confidence policy rules
        status = result.get("status")
        indep_count = result.get("independentSourceCount", len(evidence_records))
        has_conflict = status in ("CONFLICTING", "TIMESTAMP_INCONSISTENCY")
        has_missing = status == "MISSING_DATA"

        conf_res = ConfidenceScorer.calculate_confidence(
            status=status,
            independent_sources=indep_count,
            has_conflict=has_conflict,
            has_missing_data=has_missing
        )

        result["confidence"] = conf_res["score"]
        result["confidenceLevel"] = conf_res["level"]
        result["reviewRequired"] = conf_res["reviewRequired"]
        result["sourceReferences"] = [r.get("evidence_id") or r.get("id") for r in evidence_records]

        return result

    def analyze_event_by_ids(
        self,
        event_id: str,
        evidence_ids: List[str]
    ) -> Dict[str, Any]:
        """
        Resolves evidence IDs from the catalog and executes the analysis.
        """
        try:
            demo_case = self.loader.load_demo_case()
            all_evidence = demo_case.get("evidence", [])
            evidence_map = {e.get("evidence_id") or e.get("id"): e for e in all_evidence}
        except Exception:
            evidence_map = {}

        # Resolve records or synthesize lightweight placeholders
        records = []
        for eid in evidence_ids:
            if eid in evidence_map:
                records.append(evidence_map[eid])
            else:
                records.append({"evidence_id": eid, "source_type": "unknown"})

        return self.analyze_event_by_records(event_id, records)
