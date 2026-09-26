"""
Critical unit tests for contradiction detection and anomaly classification.
Directly verifies test scenarios required by FraudTrace AI specification.
"""

import pytest
from ml.src.correlation.contradiction import ContradictionEngine


def test_scenario_amount_mismatch_conflicting():
    """
    Critical Test:
    Chat: ₹50,000
    Bank: ₹48,000
    SMS: ₹48,000
    Expected: status = CONFLICTING
    """
    engine = ContradictionEngine()
    records = [
        {"evidence_id": "EVD-CHAT", "source_type": "chat", "amount": 50000, "timestamp": "2026-09-01T10:40:00"},
        {"evidence_id": "EVD-BANK", "source_type": "bank", "amount": 48000, "timestamp": "2026-09-01T10:41:00"},
        {"evidence_id": "EVD-SMS", "source_type": "sms", "amount": 48000, "timestamp": "2026-09-01T10:41:00"},
    ]

    result = engine.analyze_event_records("EVENT-004", records)
    assert result["status"] == "CONFLICTING"
    assert result["confidence"] is None
    assert len(result["contradictions"]) > 0
    assert "amount" in result["contradictions"][0]["field"]


def test_scenario_unanimous_corroborated():
    """
    Critical Test:
    Chat: ₹50,000
    Receipt: ₹50,000
    Bank: ₹50,000
    Expected: status = CORROBORATED
    """
    engine = ContradictionEngine()
    records = [
        {"evidence_id": "EVD-CHAT", "source_type": "chat", "amount": 50000, "timestamp": "2026-09-01T10:40:00"},
        {"evidence_id": "EVD-RECEIPT", "source_type": "screenshot", "amount": 50000, "timestamp": "2026-09-01T10:40:30"},
        {"evidence_id": "EVD-BANK", "source_type": "bank", "amount": 50000, "timestamp": "2026-09-01T10:41:00"},
    ]

    result = engine.analyze_event_records("EVENT-001", records)
    assert result["status"] == "CORROBORATED"
    assert result["confidence"] is not None
    assert result["confidence"] >= 0.85
    assert len(result["contradictions"]) == 0


def test_scenario_missing_timestamp():
    """
    Critical Test:
    Screenshot: timestamp missing
    Expected: status includes MISSING_DATA
    """
    engine = ContradictionEngine()
    records = [
        {"evidence_id": "EVD-CHAT", "source_type": "chat", "amount": 15000, "timestamp": "2026-09-01T10:40:00"},
        {"evidence_id": "EVD-SHOT", "source_type": "screenshot", "amount": 15000, "timestamp": None},
    ]

    result = engine.analyze_event_records("EVENT-002", records)
    assert result["status"] == "MISSING_DATA"


def test_scenario_duplicate_records():
    """
    Golden Test TEST-5:
    Two copies of same chat -> POSSIBLE_DUPLICATE
    """
    engine = ContradictionEngine()
    records = [
        {"evidence_id": "EVIDENCE-001", "source_type": "chat", "sha256": "dup_hash_123"},
        {"evidence_id": "EVIDENCE-008", "source_type": "chat", "sha256": "dup_hash_123"},
    ]

    result = engine.analyze_event_records("EVENT-005", records)
    assert result["status"] == "POSSIBLE_DUPLICATE"


def test_scenario_timestamp_drift():
    """
    Golden Test TEST-7:
    Call log 10:45 vs chat 10:41 (4m drift) -> TIMESTAMP_INCONSISTENCY
    """
    engine = ContradictionEngine(time_drift_minutes=3.0)
    records = [
        {"evidence_id": "EVD-CHAT", "source_type": "chat", "timestamp": "2026-09-01T10:41:00"},
        {"evidence_id": "EVD-CALL", "source_type": "call_log", "timestamp": "2026-09-01T10:45:00"},
    ]

    result = engine.analyze_event_records("EVENT-007", records)
    assert result["status"] == "TIMESTAMP_INCONSISTENCY"
