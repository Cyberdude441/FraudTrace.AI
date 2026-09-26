# FraudTrace AI — AI Grounding & Extraction Pipeline

## Overview

FraudTrace AI employs a strict evidence-grounded AI pipeline designed to eliminate hallucinations, enforce epistemic humility, and guarantee source auditability.

```
Evidence Ingestion → OCR & Parser Service → Regex & Gazetteers → Canonical Normalizer
        ↓
Entity Resolution Matrix → Graph Topology Engine → Timeline Sequencing
        ↓
Inconsistency & Gap Engine → Evidence Grounded Copilot (Source-Cited Q&A)
        ↓
Structured 14-Section Incident Dossier Generation
```

---

## 1. Extraction Layer

The extraction engine decomposes digital artifacts into structured semantic tokens:
- **Phone Numbers**: Extracted via E.164 patterns, normalized to canonical format (e.g. `+919876543210`).
- **Amounts & Currencies**: Extracted with currency symbol normalization (e.g. `15000 INR`).
- **URLs & Domains**: Parsed via RFC URL schemes, resolving protocol, domain, and endpoints.
- **Transactions & RRNs**: Recognized through financial routing prefixes (`TXN-`, `RRN`, `ORD-`).
- **Named Entities**: Identified through domain lexicons and heuristic gazetteers.

Every extracted token retains:
- `sourceEvidenceId`
- `sourceLocation` (e.g., character index, row number, or header block)
- `confidence` (0.0 to 1.0)
- `extractionMethod` (`REGEX_PATTERN_MATCH`, `URL_SCHEME_PARSER`, `OCR_TEXT_RECOGNITION`, etc.)
- `epistemicType` (`FACT`, `EXTRACTED DATA`, `INFERENCE`, `UNCERTAINTY`)

---

## 2. Inconsistency & Missing Evidence Engine

The discrepancy engine systematically cross-verifies digital claims across independent sources:
1. **Amount Mismatch**: Identifies variances between preliminary prompts (e.g. Rs 4,999 in SMS) vs final ledger debits (₹15,000 in bank statements).
2. **Timestamp Discrepancy**: Evaluates offsets between immutable network timestamps (e.g. core bank at 10:40:12 AM) vs client device clocks (e.g. screenshot showing 10:45 AM).
3. **Missing Metadata**: Flags uploaded artifacts where EXIF headers, timestamps, or cellular identifiers have been stripped.
4. **Duplicate Record Detection**: Flags overlapping batch exports to prevent artificial event inflation.

> **Ethical Principle**: FraudTrace AI never automatically decides which source is "correct" or infers deceit. It highlights the factual divergence, presents plausible alternative hypotheses, and recommends manual forensic verification.

---

## 3. Evidence Copilot Grounding

The AI Copilot operates strictly on indexed case documents:
- **Answer**: Direct synthesis answering the user inquiry.
- **Evidence Basis**: Explicit citations with evidence ID and matching quote/row reference.
- **Confidence Context**: High / Medium / Low reliability rating.
- **Reasoning**: Factual rationale explaining which artifacts corroborate the finding.
- **Limitations**: Transparent disclosure of any missing or conflicting evidence.
- **Safeguard**: If the indexed evidence does not support an answer, the model responds:
  *"I could not find sufficient evidence in the ingested case files to answer this specific query."*
