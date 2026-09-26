"""
Unit tests for event clustering and corroboration calculation.
"""

import pytest
from ml.src.correlation.event_matching import EventMatcher
from ml.src.correlation.corroboration import CorroborationEngine


def test_corroboration_independent_counting():
    records = [
        {"evidence_id": "EVD-001", "amount": "50000", "sha256": "hash_aaa"},
        {"evidence_id": "EVD-002", "amount": "50000", "sha256": "hash_bbb"}, # distinct
        {"evidence_id": "EVD-003", "amount": "50000", "sha256": "hash_aaa"}, # duplicate of EVD-001
    ]

    res = CorroborationEngine.calculate_corroboration(records, field="amount")
    corrob = res["corroboration"]
    assert len(corrob) == 1
    # Independent count must be 2, NOT 3 (duplicate copy excluded!)
    assert corrob[0]["independentSourceCount"] == 2
    assert len(corrob[0]["sources"]) == 3


def test_event_matching_grouping():
    evidence_items = [
        {"evidence_id": "EVD-1", "transaction_id": "TXN999", "timestamp": "2026-09-01T10:00:00", "amount": 1000},
        {"evidence_id": "EVD-2", "transaction_id": "TXN999", "timestamp": "2026-09-01T10:02:00", "amount": 1000},
        {"evidence_id": "EVD-3", "transaction_id": "TXN888", "timestamp": "2026-09-01T14:00:00", "amount": 5000},
    ]

    clusters = EventMatcher.match_evidence_to_events(evidence_items)
    assert len(clusters) == 2
    assert len(clusters[0]["evidenceRecords"]) == 2
    assert len(clusters[1]["evidenceRecords"]) == 1
