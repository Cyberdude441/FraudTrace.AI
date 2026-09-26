# FraudTrace AI — Machine Learning System

> **CRITICAL FORENSIC DISCLAIMER: SYNTHETIC DATA ONLY**  
> All records, phone numbers, bank accounts, names, dates, amounts, and message transcripts are synthetic benchmark artifacts created strictly for cyber forensic algorithmic validation and product demonstration. Zero authentic personal or financial data is included.  
> **FraudTrace AI does not make legal guilt determinations.** The machine learning pipeline reconstructs, organizes, correlates, and explains evidentiary relationships. It distinguishes FACT, EXTRACTED DATA, INFERENCE, and UNCERTAINTY.

---

## Architecture Overview

The FraudTrace AI Machine Learning system is a Google Colab-first, production-integrated forensic correlation and contradiction detection engine.

```
                           +-------------------------------------+
                           |      Heterogeneous Raw Evidence     |
                           |   (Bank, SMS, FIR, Chat, CDR, POS)   |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |      1. Forensic Normalization      |
                           |  (E.164 Phone, ISO-8601, INR Floats) |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |    2. Entity Resolution & Dedup     |
                           |   (Deterministic + Fuzzy String)    |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |     3. Event Clustering Engine      |
                           | (Windowed Temporal & Amount Matrix) |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |   4. 14-D Feature Vector Builder    |
                           | (Amount Delta, Time Drift, Jaccard) |
                           +------------------+------------------+
                                              |
                        +---------------------+---------------------+
                        |                                           |
                        v                                           v
       +---------------------------------+         +---------------------------------+
       |     Deterministic Rule Engine   |         |    Random Forest ML Classifier  |
       |  (Strict Golden Rulebook Logic) |         | (Pairwise Relationship Scoring) |
       +----------------+----------------+         +----------------+----------------+
                        |                                           |
                        +---------------------+---------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |   5. Hybrid Contradiction Arbiter   |
                           |  (CORROBORATED / CONFLICTING / etc) |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |   6. Calibrated Confidence Scorer   |
                           |  (Guardrail: Conflict Capped <= 0.40) |
                           +------------------+------------------+
                                              |
                                              v
                           +-------------------------------------+
                           |   7. Section 7 JSON Output Schema   |
                           +-------------------------------------+
```

---

## Directory Layout

```
ml/
├── notebooks/                   # 11 Google Colab / Jupyter notebooks
│   ├── 00_setup_colab.ipynb
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_feature_engineering.ipynb
│   ├── 04_entity_resolution.ipynb
│   ├── 05_event_correlation.ipynb
│   ├── 06_contradiction_detection.ipynb
│   ├── 07_confidence_scoring.ipynb
│   ├── 08_model_training.ipynb
│   ├── 09_model_evaluation.ipynb
│   └── 10_inference_demo.ipynb
├── src/                         # Reusable Python ML package
│   ├── config.py                # Repository root resolution & YAML config
│   ├── data/                    # Loader, Validator, Cleaner, Splitter
│   ├── preprocessing/           # Entity, Amount, Timestamp normalizers & Feature builder
│   ├── extraction/              # Entity, Event, and Metadata extractors
│   ├── resolution/              # Entity resolver, Deduplication, String similarity
│   ├── correlation/             # Event matching, Corroboration, Contradiction engine
│   ├── confidence/              # Calibrated scoring & Brier reliability guardrails
│   ├── models/                  # Contradiction, Entity, and Event classifiers
│   ├── evaluation/              # Precision/Recall, Error analysis, Golden test scorecard
│   └── inference/               # Pipeline coordinator & Predictor
├── api/                         # FastAPI inference microservice
│   ├── main.py                  # API endpoints on port 8000
│   ├── schemas.py               # Pydantic request/response schemas
│   ├── service.py               # Service orchestrator
│   └── Dockerfile               # Production container definition
├── data/                        # Datasets
│   ├── sample/                  # Lightweight committed sample suite (~200 KB)
│   ├── raw/                     # Gitignored full unpacked archive data
│   ├── interim/                 # Cleaned intermediate tables
│   └── processed/               # Extracted feature vectors
├── artifacts/                   # Serialized model weights & metric reports
│   └── models/contradiction_model_v1.pkl
├── configs/                     # YAML environment configuration
├── tests/                       # Pytest test suite (17 unit & integration tests)
├── requirements.txt             # Full local dependencies
├── requirements-colab.txt       # Minimal Google Colab dependencies
└── README.md                    # ML root overview
```

---

## Quick Start: Google Colab

To run any notebook in Google Colab:
1. Open [Google Colab](https://colab.research.google.com).
2. Go to **File -> Open notebook -> GitHub**.
3. Enter repository: `https://github.com/Cyberdude441/FraudTrace.AI`.
4. Select `ml/notebooks/00_setup_colab.ipynb` to verify your environment.
5. Every notebook contains self-cloning bootstrapping:
   ```python
   if 'google.colab' in str(get_ipython()):
       !git clone https://github.com/Cyberdude441/FraudTrace.AI.git
       %cd FraudTrace.AI
       !pip install -r ml/requirements-colab.txt
   ```
6. Run cells sequentially. No GPU is required (CPU standard runtime runs in seconds).

---

## Quick Start: Local Environment

```bash
# 1. Install dependencies
pip install -r ml/requirements.txt

# 2. Run unit tests
python -m pytest ml/tests -v

# 3. Train and export model
python scripts/export_model.py

# 4. Launch FastAPI inference server
uvicorn ml.api.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## Documentation Index

- [Dataset Specifications & Analysis](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/dataset.md)
- [Pipeline Architecture & Data Flow](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/pipeline.md)
- [Contradiction Detection Engine](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/contradiction-engine.md)
- [Confidence Scoring & Safety Guardrails](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/confidence-scoring.md)
- [Google Colab Running Guide](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/colab-guide.md)
