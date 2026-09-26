"""
Pydantic API request and response schemas for FraudTrace ML inference service.
"""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = "ONLINE"
    service: str = "FraudTrace AI ML Inference Engine"
    version: str = "1.0.0"


class EntityResolutionRequest(BaseModel):
    mention_a: Dict[str, Any] = Field(..., description="First entity mention")
    mention_b: Dict[str, Any] = Field(..., description="Second entity mention")


class EntityResolutionResponse(BaseModel):
    same_entity: bool
    confidence: float
    matching_features: Dict[str, Any]
    source_ids: List[str]


class EventCorrelationRequest(BaseModel):
    evidence_items: List[Dict[str, Any]]
    window_minutes: float = 30.0


class EventCorrelationResponse(BaseModel):
    event_clusters: List[Dict[str, Any]]


class ContradictionRequest(BaseModel):
    record_a: Dict[str, Any]
    record_b: Dict[str, Any]


class ContradictionResponse(BaseModel):
    is_conflict: bool
    conflict_probability: float
    features: Dict[str, float]


class ConfidenceRequest(BaseModel):
    status: str
    independent_sources: int
    has_conflict: bool = False
    has_missing_data: bool = False


class ConfidenceResponse(BaseModel):
    score: Optional[float]
    level: str
    explanation: str
    reviewRequired: bool


class AnalyzeEventRequest(BaseModel):
    eventId: Optional[str] = "EVENT-001"
    event_id: Optional[str] = None
    evidenceIds: Optional[List[str]] = None
    evidence_ids: Optional[List[str]] = None
    evidenceRecords: Optional[List[Dict[str, Any]]] = None
    evidence_records: Optional[List[Dict[str, Any]]] = None
    evidence_items: Optional[List[Dict[str, Any]]] = None


class AnalyzeEventResponse(BaseModel):
    eventId: str
    status: str
    confidence: Optional[float] = None
    confidenceLevel: Optional[str] = None
    independentSourceCount: int
    corroboration: List[Dict[str, Any]]
    contradictions: List[Dict[str, Any]]
    explanation: str
    sourceReferences: List[str]
    reviewRequired: bool = False
