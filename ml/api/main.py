"""
FastAPI Server exposing FraudTrace AI Machine Learning and Contradiction Detection APIs.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .schemas import (
    HealthResponse,
    EntityResolutionRequest,
    EntityResolutionResponse,
    EventCorrelationRequest,
    EventCorrelationResponse,
    ContradictionRequest,
    ContradictionResponse,
    ConfidenceRequest,
    ConfidenceResponse,
    AnalyzeEventRequest,
    AnalyzeEventResponse
)
from .service import MLInferenceService

app = FastAPI(
    title="FraudTrace AI — ML Inference API",
    description="Hybrid ML + Rule Engine for Evidence Reconstruction & Contradiction Detection",
    version="1.0.0"
)

# Enable CORS for local backend or frontend dev servers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service = MLInferenceService()


@app.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint."""
    return HealthResponse()


@app.post("/predict/entity-resolution", response_model=EntityResolutionResponse)
def entity_resolution(req: EntityResolutionRequest):
    """Resolves whether two entity mentions refer to the same underlying entity."""
    res = service.resolve_entities(req.mention_a, req.mention_b)
    return EntityResolutionResponse(**res)


@app.post("/predict/event-correlation", response_model=EventCorrelationResponse)
def event_correlation(req: EventCorrelationRequest):
    """Clusters evidence items into common event groups."""
    clusters = service.correlate_events(req.evidence_items, req.window_minutes)
    return EventCorrelationResponse(event_clusters=clusters)


@app.post("/predict/contradiction", response_model=ContradictionResponse)
def predict_contradiction(req: ContradictionRequest):
    """Predicts contradiction probability between two evidence records."""
    res = service.predict_contradiction(req.record_a, req.record_b)
    return ContradictionResponse(**res)


@app.post("/predict/confidence", response_model=ConfidenceResponse)
def calculate_confidence(req: ConfidenceRequest):
    """Computes transparent forensic confidence score."""
    res = service.calculate_confidence(
        status=req.status,
        independent_sources=req.independent_sources,
        has_conflict=req.has_conflict,
        has_missing_data=req.has_missing_data
    )
    return ConfidenceResponse(**res)


@app.post("/predict/analyze", response_model=AnalyzeEventResponse)
def analyze_event(req: AnalyzeEventRequest):
    """
    Main endpoint called by FraudTrace backend:
    Analyzes an event given evidence IDs or raw evidence records.
    """
    records = req.evidenceRecords or req.evidence_records or req.evidence_items
    ev_ids = req.evidenceIds or req.evidence_ids
    eid = req.eventId or req.event_id or "EVENT-001"
    res = service.analyze_event(
        event_id=eid,
        evidence_ids=ev_ids,
        evidence_records=records
    )
    return AnalyzeEventResponse(**res)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
