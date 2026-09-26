"""
Unit tests for confidence scoring and conflict guardrails.
"""

import pytest
from ml.src.confidence.scoring import ConfidenceScorer


def test_confidence_scale():
    # 1 source -> LOW
    c1 = ConfidenceScorer.calculate_confidence("CORROBORATED", independent_sources=1)
    assert c1["level"] == "LOW"
    assert c1["score"] is not None

    # 2 independent agreeing -> MEDIUM
    c2 = ConfidenceScorer.calculate_confidence("CORROBORATED", independent_sources=2)
    assert c2["level"] == "MEDIUM"

    # 3 independent agreeing -> HIGH
    c3 = ConfidenceScorer.calculate_confidence("CORROBORATED", independent_sources=3)
    assert c3["level"] == "HIGH"

    # 4+ independent agreeing -> VERY HIGH
    c4 = ConfidenceScorer.calculate_confidence("CORROBORATED", independent_sources=4)
    assert c4["level"] == "VERY HIGH"


def test_conflicting_never_produces_high_confidence():
    """
    CRITICAL RULE:
    Conflicting sources must NEVER convert into high confidence,
    regardless of how many sources are present.
    """
    c_conflict = ConfidenceScorer.calculate_confidence(
        status="CONFLICTING",
        independent_sources=10, # even with 10 sources!
        has_conflict=True
    )
    assert c_conflict["level"] == "CONFLICTING"
    assert c_conflict["score"] is None
    assert c_conflict["reviewRequired"] is True
