"""
Unit tests for entity normalization and entity resolution.
"""

import pytest
from ml.src.preprocessing.entity_normalizer import EntityNormalizer
from ml.src.resolution.entity_resolution import EntityResolver
from ml.src.resolution.similarity import EntitySimilarity


def test_phone_normalization():
    assert EntityNormalizer.normalize_phone("+91 90000 11111") == "+919000011111"
    assert EntityNormalizer.normalize_phone("9000011111") == "+919000011111"
    assert EntityNormalizer.normalize_phone("09000011111") == "+919000011111"
    assert EntityNormalizer.normalize_phone("+91-98765-43210") == "+919876543210"


def test_upi_and_email_normalization():
    assert EntityNormalizer.normalize_upi("Merchant.Support@OkHdfcBank") == "merchant.support@okhdfcbank"
    assert EntityNormalizer.normalize_email("Contact001@EXAMPLE.COM") == "contact001@example.com"
    assert EntityNormalizer.normalize_url("https://www.example.org/verify-account/") == "example.org/verify-account"


def test_entity_resolver_exact_and_normalized():
    resolver = EntityResolver()

    # Two different phone formats referring to same phone
    mention_a = {"type": "phone", "value": "+91 90000 11111", "evidence_id": "EVD-001"}
    mention_b = {"type": "phone", "value": "9000011111", "evidence_id": "EVD-002"}

    res = resolver.resolve_pair(mention_a, mention_b)
    assert res["same_entity"] is True
    assert res["confidence"] >= 0.95
    assert "EVD-001" in res["source_ids"]
    assert "EVD-002" in res["source_ids"]


def test_entity_resolver_distinct_entities():
    resolver = EntityResolver()
    mention_a = {"type": "phone", "value": "+91 90000 11111"}
    mention_b = {"type": "phone", "value": "+91 98888 22222"}

    res = resolver.resolve_pair(mention_a, mention_b)
    assert res["same_entity"] is False
    assert res["confidence"] < 0.50
