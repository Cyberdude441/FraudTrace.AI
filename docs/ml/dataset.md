# FraudTrace AI — Dataset Analysis & Canonical Specification

> **IMPORTANT NOTICE**: **SYNTHETIC DATA ONLY**. All records, phone numbers, bank accounts, names, dates, amounts, and message transcripts are synthetic benchmark artifacts created strictly for cyber forensic algorithmic validation and product demonstration. Zero authentic personal or financial data is included.

---

## 1. Dataset Inspection & Comparison

Two synthetic datasets were evaluated for the FraudTrace AI Machine Learning pipeline:

### Archive 1: `fraudtrace_demo_dataset.zip` (7.2 KB)
- **Format**: Structured JSON documents (`cases.json`, `evidence.json`, `entities.json`, `events.json`, `relationships.json`, `inconsistencies.json`, `golden_tests.json`, `confidence_model.json`, `source_types.json`).
- **Scope**: Single comprehensive forensic case (`CASE-001`) with 12 multi-modal evidence items, 7 canonical events, 9 cross-evidence relationships, and 4 flagged inconsistencies.
- **Key Asset**: Contains **8 Golden Verification Tests (`golden_tests.json`)** defining the strict expected behavior for contradiction detection, timestamp drift, duplicate detection, and missing metadata.

### Archive 2: `fraudtrace_synthetic_dataset.zip` (1.2 MB)
- **Format**: Multi-incident multi-modal directory structure + relational master CSV tables.
- **Scope**: 50 complete simulated incidents (`INC001` through `INC050`).
- **File Types**:
  - `INCxxx_EV01_chat.txt` (WhatsApp / messaging transcripts)
  - `INCxxx_EV02_screenshot.png` (Simulated mobile payment receipts)
  - `INCxxx_EV03_bank.csv` (Core banking ledger statements)
  - `INCxxx_EV04_email.txt` (Phishing notices / confirmation emails)
  - `INCxxx_EV05_call_log.csv` (Telecom CDR call logs)
  - `INCxxx_EV06_duplicate_bank.csv` (Deliberate duplicate exports for deduplication evaluation)
- **Relational Tables (`master/`)**:
  - `master/incidents.csv` (50 incidents with labels & timestamps)
  - `master/evidence.csv` (250+ evidence artifacts with MIME types)
  - `master/entities.csv` (200+ entities: phone, email, UPI, bank, URLs)
  - `master/events.csv` (150+ timeline events)
  - `master/matches.csv` (Pairwise evidence matches with confidence scores and reasoning)
  - `master/evidence_entities.csv` (Bipartite association matrix)
  - `master/inconsistencies.csv` (Ground-truth contradictions & drift)
  - `master/ground_truth.csv` (Per-incident boolean indicators: `has_duplicate`, `has_amount_conflict`, `has_time_conflict`, `has_missing_time`)

---

## 2. Dataset Relationship Assessment

### Determination: **Option B — Complementary Data**
The archives are neither duplicates nor competing versions. They serve two complementary roles in the machine learning lifecycle:

1. **`fraudtrace_synthetic_dataset` is the Training & Cross-Validation Corpus**:
   - Provides statistical scale across 50 simulated incidents to train binary and multi-class classifiers for entity resolution, semantic event matching, and contradiction detection.
2. **`fraudtrace_demo_dataset` is the Golden Test & Policy Specification Suite**:
   - Provides exact unit-test assertions (`TEST-1` to `TEST-8`) that ML predictions and rule engines must satisfy.
   - Encodes the official **Confidence Scoring Rules** (`confidence_model.json`).

---

## 3. Canonical Dataset Directory Structure

```
ml/data/
├── README.md               # Data dictionary & synthetic data disclaimer
├── sample/                 # Committed to Git (lightweight, ~200 KB)
│   ├── cases.json          # Case definitions
│   ├── evidence.json       # Evidence catalog
│   ├── entities.json       # Entity registry
│   ├── events.json         # Canonical events
│   ├── relationships.json  # Graph edges
│   ├── inconsistencies.json# Labeled anomalies
│   ├── golden_tests.json   # 8 golden test cases
│   ├── confidence_model.json# Confidence calculation rules
│   ├── source_types.json   # Source taxonomy
│   └── master/             # 50-incident master CSV relational tables
│       ├── incidents.csv
│       ├── evidence.csv
│       ├── entities.csv
│       ├── events.csv
│       ├── matches.csv
│       ├── ground_truth.csv
│       ├── inconsistencies.csv
│       └── indicators.csv
├── raw/                    # Gitignored full archive storage
│   ├── demo_dataset/       # Unpacked demo archive
│   └── synthetic_dataset/  # Full 50-incident multi-modal files
├── interim/                # Cleaned & joined intermediate representations
└── processed/              # Normalized feature matrices (X_train, y_train, etc.)
```

---

## 4. Key Entities & Fields Catalog

| Entity Type | Original Format Example | Normalized Format | Matching Strategy |
| :--- | :--- | :--- | :--- |
| **Phone** | `+91 90000 01001`, `9000001001` | `+919000001001` (E.164) | Deterministic regex / exact |
| **UPI VPA** | `merchant.support@okhdfcbank` | `merchant.support@okhdfcbank` | Casefold string / Levenshtein |
| **Amount** | `₹50,000.00`, `Rs 48,000`, `50000` | `50000.00` (float) | Absolute difference & delta ratio |
| **Timestamp** | `2026-09-01T08:17`, `01/09/2026 10:45`| ISO-8601 UTC / IST | Temporal delta in minutes |
| **Transaction ID** | `TXN0001ABC`, `RRN 6288192019` | Alphanumeric uppercase | Exact token match |
| **URL / Domain** | `https://example.org/verify-account` | FQDN + path stripped query | Domain hierarchy matching |

---

## 5. Ground-Truth Anomaly Types

1. **Amount Contradiction (`amount_mismatch`)**:
   - Multiple sources claim to describe the same transfer, but numerical debits differ (e.g. chat claims ₹50,000; bank statement debited ₹48,000).
2. **Timestamp Drift (`timestamp_mismatch`)**:
   - Device screenshot clock is desynchronized by more than 4 minutes from core banking NTP server time.
3. **Missing Metadata (`missing_timestamp` / `missing_field`)**:
   - Stripped EXIF tags or transaction records lacking exact seconds.
4. **Duplicate Record (`duplicate_record`)**:
   - Multiple file exports contain identical byte sequences or transaction ledger rows; must NOT count as independent corroboration.
