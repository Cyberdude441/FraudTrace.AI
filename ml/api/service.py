"""
Service layer coordinating ML inference components for FastAPI endpoints.
"""

from typing import Any, Dict, List, Optional
from ..src.resolution.entity_resolution import EntityResolver
from ..src.correlation.event_matching import EventMatcher
from ..src.inference.predictor import EvidencePredictor
from ..src.confidence.scoring import ConfidenceScorer
from ..src.inference.pipeline import ForensicInferencePipeline


class MLInferenceService:
    """Singleton service orchestrating ML logic."""

    def __init__(self):
        self.entity_resolver = EntityResolver()
        self.predictor = EvidencePredictor()
        self.pipeline = ForensicInferencePipeline()

    def resolve_entities(self, mention_a: Dict[str, Any], mention_b: Dict[str, Any]) -> Dict[str, Any]:
        return self.entity_resolver.resolve_pair(mention_a, mention_b)

    def correlate_events(self, evidence_items: List[Dict[str, Any]], window_minutes: float = 30.0) -> List[Dict[str, Any]]:
        return EventMatcher.match_evidence_to_events(evidence_items, window_minutes)

    def predict_contradiction(self, rec_a: Dict[str, Any], rec_b: Dict[str, Any]) -> Dict[str, Any]:
        return self.predictor.predict_pair_conflict(rec_a, rec_b)

    def calculate_confidence(
        self,
        status: str,
        independent_sources: int,
        has_conflict: bool = False,
        has_missing_data: bool = False
    ) -> Dict[str, Any]:
        return ConfidenceScorer.calculate_confidence(
            status=status,
            independent_sources=independent_sources,
            has_conflict=has_conflict,
            has_missing_data=has_missing_data
        )

    def analyze_event(
        self,
        event_id: str,
        evidence_ids: Optional[List[str]] = None,
        evidence_records: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        if evidence_records:
            return self.pipeline.analyze_event_by_records(event_id, evidence_records)
        elif evidence_ids:
            return self.pipeline.analyze_event_by_ids(event_id, evidence_ids)
        return self.pipeline.analyze_event_by_records(event_id, [])
