# FraudTrace AI
## AI-Powered Evidence Reconstruction & Incident Reporting Platform

> *"From scattered evidence to a traceable incident story."*

---

## 1. Project Overview & Problem Statement

In modern digital and cyber investigations, evidence is fragmented across disconnected, high-volume artifacts:
- Ephemeral chat logs (WhatsApp, Telegram, SMS)
- Device screenshots and notification previews
- Core banking CSV statements and NEFT/RTGS transaction ledgers
- Cellular call detail records (CDR) and cell tower BTS coordinates
- Phishing DOM dumps, web access logs, and recursive DNS query histories
- Email headers, dispute tickets, and corporate registry dossiers

Manual examination of these disparate sources requires hours of laborious cross-referencing. Investigators struggle with clock drift across devices, fee escalation between preliminary prompts and actual debits, uncorroborated claims, and ungrounded AI summaries that risk hallucinating critical case facts.

**FraudTrace AI** solves this problem by automating the end-to-end evidence ingestion, extraction, canonical normalization, entity resolution, and relational graph reconstruction into an auditable, verifiable intelligence workspace.

---

## 2. Core Architectural Principles & Safeguards

### Strict Non-Adjudicative Epistemic Posture
> **IMPORTANT NOTICE**: FraudTrace AI is an analytical prototype platform utilizing synthetic benchmark data. It **never makes legal guilt determinations** and does not classify any individual as "guilty", "criminal", or "fraudster".
>
> All analyses employ neutral terminology: `entity`, `subject`, `reported contact`, `associated record`, `evidence connection`.

Every extracted claim and AI synthesis is explicitly categorized by its epistemic confidence:
- **FACT**: Corroborated directly by authoritative digital ledgers (NPCI switch, bank core system).
- **EXTRACTED DATA**: Extracted via OCR, regex, or deterministic parsers from submitted files.
- **INFERENCE**: Synthesized relationships based on temporal proximity or telephone co-occurrence.
- **UNCERTAINTY**: Uncorroborated single-source claims or stripped metadata.

### Universal "Trace to Source" UX Differentiator
Every entity, transaction, timeline event, discrepancy alert, and AI answer in the user interface features a clickable **`[ TRACE TO SOURCE ]`** button. Clicking opens the underlying evidence artifact with highlighted text snippets, row positions, file metadata, and verified cryptographic SHA-256 hashes.

### Real-Time Privacy & PII Masking Layer
Built-in compliance with DPDP and GDPR data minimization requirements allows instant one-click masking of phone numbers, bank accounts, emails, and names across all views, graphs, timelines, and report exports.

---

## 3. Technology Stack

- **Frontend**:
  - React (v19)
  - Vite (v6)
  - JavaScript / JSX ONLY *(Zero TypeScript/TSX)*
  - Tailwind CSS with Dark Command-Center Theme & Glassmorphism
  - Framer Motion for smooth enterprise micro-interactions
  - Lucide React for consistent forensic iconography
  - React Router (v7)
  - Recharts for event velocity and modality distributions
  - `@xyflow/react` (v12 React Flow) for the interactive evidence graph

- **Backend**:
  - Node.js (v22)
  - Express.js (v4)
  - MongoDB & Mongoose (v8) with resilient in-memory fallback persistence store
  - Multer for secure multipart evidence upload
  - Cryptographic SHA-256 hash sealing

- **AI & Extraction Engine**:
  - Grounded Evidence Copilot with strict non-hallucinatory grounding
  - OCR extraction abstraction
  - CSV, JSON, PDF, and text parsing services
  - Normalization engine for E.164 phones, ISO currencies, and entity handles

---

## 4. Key Features

1. **Executive Evidence Analysis Dashboard**:
   - 6 Top KPI metric cards: Evidence Items (42), Extracted Entities (27), Correlations (63), Timeline Events (31), Inconsistencies (5), Missing Info (7)
   - Event velocity area chart, evidence modality breakdown, entity typology, correlation statistics, and AI incident synthesis banner.

2. **Evidence Ingestion Center (`/evidence`)**:
   - Multi-format file ingestion (PNG, JPG, PDF, TXT, CSV, JSON)
   - Real-time SHA-256 hashing
   - Automated entity and token extraction with OCR and parsing abstractions
   - Full evidence inspection modal.

3. **Interactive Evidence Graph (`/graph`)**:
   - Full-canvas React Flow graph visualization with radial layout organizing 27 nodes and 63 edges
   - Dynamic search, entity taxonomy filter, relationship filter, zoom, and fit-view
   - Slide-out node detail drawer showing connected neighbors and direct source citations.

4. **Chronological Timeline Reconstruction (`/timeline`)**:
   - Chronological event stream tracking multi-step impersonation and debit sequences
   - Filter by time window (e.g. Critical Transfer Window 10:20 - 10:55 AM)
   - Reverse chronological toggle and keyword search.

5. **Entity Resolution & Typology (`/entities`)**:
   - Canonical normalization (e.g. `+91 9876543210` and `9876543210` resolve to identical canonical entity)
   - Connection confidence percentages (e.g. 98%) with explicit reasons.

6. **Inconsistency & Missing Evidence Engine (`/inconsistencies`)**:
   - Detects amount mismatches (SMS Rs 4,999 vs Bank ₹15,000)
   - Detects timestamp discrepancies (Core bank 10:40 AM vs Screenshot 10:45 AM)
   - Identifies missing metadata, missing transaction IDs, and unqueried URLs
   - Multiple alternative hypotheses and required investigative actions.

7. **Evidence Copilot Assistant**:
   - Slide-out interactive AI copilot
   - Answers queries strictly using indexed evidence with clickable source citations
   - Discloses reasoning and limitation context; refuses to hallucinate if unindexed.

8. **14-Section Incident Report Generator (`/reports`)**:
   - Compiles formal standards-compliant forensic dossiers with 14 structured sections
   - One-click export to PDF, JSON, CSV, and formatted print view.

9. **Chain-of-Custody Immutable Audit Trail (`/settings`)**:
   - Records all user actions (login, evidence upload, processing, viewing, report generation).

---

## 5. Machine Learning Pipeline (Google Colab First)

FraudTrace AI includes a standalone, production-grade **Machine Learning Pipeline** located in `ml/`, engineered specifically for rapid experimentation in **Google Colab** while integrating cleanly with the Node.js backend.

### Core Forensic ML Capabilities
- **Forensic Normalization**: Canonical E.164 phone formats, Indian Rupee decimal parsing, ISO-8601 temporal conversion, and cryptographic SHA-256 deduplication.
- **Cross-Source Entity Resolution**: Combines exact normalization with fuzzy Levenshtein distance to link disparate handles across banking logs and complainant reports.
- **Event Correlation & Clustering**: Clusters evidence items into unified events across time and amount windows while preserving distinct source observations.
- **Contradiction Detection Engine**: Classifies evidence pairs into 6 forensic states (`CORROBORATED`, `CONFLICTING`, `PARTIALLY_CORROBORATED`, `MISSING_DATA`, `TIMESTAMP_INCONSISTENCY`, `POSSIBLE_DUPLICATE`).
- **Calibrated Confidence Scoring & Guardrails**: Enforces the immutable forensic rule that **contradictory evidence is strictly capped at LOW confidence (<= 0.40)**.

### Google Colab Notebook Suite (`ml/notebooks/`)

| # | Notebook | Topic | Description |
| :-: | :--- | :--- | :--- |
| **00** | [`00_setup_colab.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/00_setup_colab.ipynb) | Environment Setup | Diagnostic checks, repo clone, dependencies, smoke test |
| **01** | [`01_data_exploration.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/01_data_exploration.ipynb) | Data Exploration | Evidence modality distribution, source breakdown, anomaly rates |
| **02** | [`02_data_cleaning.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/02_data_cleaning.ipynb) | Data Cleaning | Normalization of phone, amount, timestamp, and saving clean sets |
| **03** | [`03_feature_engineering.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/03_feature_engineering.ipynb) | Feature Engineering | 14-dimensional pairwise forensic feature vector extraction |
| **04** | [`04_entity_resolution.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/04_entity_resolution.ipynb) | Entity Resolution | Exact & fuzzy matching across phones, UPIs, accounts, names |
| **05** | [`05_event_correlation.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/05_event_correlation.ipynb) | Event Correlation | Timeline reconstruction while preserving independent sources |
| **06** | [`06_contradiction_detection.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/06_contradiction_detection.ipynb) | Contradictions | Detecting amount mismatches (50k vs 48k) & time drifts |
| **07** | [`07_confidence_scoring.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/07_confidence_scoring.ipynb) | Confidence Scoring | Calibration curve & proof that conflicts never yield high confidence |
| **08** | [`08_model_training.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/08_model_training.ipynb) | Model Training | Logistic Regression vs Random Forest with incident-level splitting |
| **09** | [`09_model_evaluation.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/09_model_evaluation.ipynb) | Model Evaluation | Confusion matrix, metrics report, and 8/8 Golden Tests verification |
| **10** | [`10_inference_demo.ipynb`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/10_inference_demo.ipynb) | Interactive Demo | End-to-end interactive inference with Section 7 JSON output |

For full documentation, see:
- [ML System Overview](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/README.md)
- [Dataset Specification](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/dataset.md)
- [Pipeline Architecture](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/pipeline.md)
- [Contradiction Engine Guide](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/contradiction-engine.md)
- [Confidence Scoring Guide](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/confidence-scoring.md)
- [Google Colab Running Guide](file:///c:/Users/KIIT/Desktop/K-1000/docs/ml/colab-guide.md)

---

## 6. Quickstart & Installation

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install ML dependencies (optional for local ML server)
cd ..
pip install -r ml/requirements.txt
```

### Step 2: Start the Application

You can run services concurrently:

**Terminal 1 (Backend Server):**
```bash
cd backend
npm start
# Server listens on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Vite client runs on http://localhost:5173
```

**Terminal 3 (Optional ML Inference Microservice):**
```bash
python -m uvicorn ml.api.main:app --host 0.0.0.0 --port 8000
# FastAPI inference server on http://localhost:8000
```

### Step 3: Access the Platform

1. Open your browser and navigate to: `http://localhost:5173/login`
2. Click **"Launch Demo Mode (Instant Evaluation)"**
3. Explore the pre-loaded synthetic case `CASE-2026-001`!

---

## 7. Synthetic Seed Case: Operation Digital Mirage

The application is pre-seeded with a comprehensive synthetic dataset:
- **Case ID**: `CASE-2026-001`
- **42 Evidence Items**: Spanning chat transcripts, SMS alerts, bank statement CSVs, CDR telecom logs, DNS telemetries, and corporate KYC filings.
- **27 Normalized Entities**: Person, Phone, Email, URL, Amount, Transaction, UPI ID, Bank Account, Organization, Location, Device.
- **31 Timeline Events**: Sequenced between 10:15 AM and 05:30 PM.
- **63 Graph Relationships**: Fully connected multi-hop graph with 93.4% average connection confidence.
- **5 Inconsistencies & 7 Missing Information Gaps**: Highlighted with side-by-side evidence comparisons.

---

## 8. Security & Privacy Considerations

- **No Secrets in Source Code**: Credentials and API keys are abstracted via environment variables.
- **Data Minimization**: One-click Privacy Masking prevents accidental PII exposure during presentations or reports.
- **Cryptographic Evidence Sealing**: Every ingested file computes a SHA-256 hash immediately upon arrival to preserve legal chain of custody.
- **No External Real Data**: Exclusively synthetic mock artifacts are used throughout.

---

## 9. License

FraudTrace AI is provided as an open-source evaluation and educational prototype.

