# FraudTrace AI — Architecture Documentation

## 1. System Overview

FraudTrace AI is an enterprise evidence reconstruction, correlation, and incident reporting platform designed for cyber-investigators, forensic analysts, and compliance officers. It transforms scattered, unstructured digital evidence into a coherent, verifiable, and neutral incident chronology with cryptographic source grounding.

```
SCATTERED EVIDENCE
  (Chat, Screenshots, Bank CSVs, CDR Logs, Emails, URLs, Transcripts)
          ↓
  EVIDENCE INGESTION & RFC-3161 SHA-256 INTEGRITY SEALING
          ↓
  TEXT / OCR EXTRACTION ENGINE
          ↓
  ENTITY EXTRACTION & CANONICAL NORMALIZATION
          ↓
  CROSS-EVIDENCE RESOLUTION & HEURISTIC REASONING
          ↓
  RELATIONAL GRAPH TOPOLOGY & EVIDENCE GRAPH
          ↓
  CHRONOLOGICAL TIMELINE RECONSTRUCTION
          ↓
  FACTUAL INCONSISTENCY & GAP DETECTION
          ↓
  UNIVERSAL SOURCE GROUNDING (TRACE TO SOURCE)
          ↓
  EVIDENCE COPILOT & 14-SECTION INCIDENT REPORT
```

---

## 2. Core Pillars & Safeguards

### A. Non-Adjudicative Epistemic Posture
FraudTrace AI is **strictly not a guilt detection tool**. Automated systems cannot make legal guilt determinations or attribute criminal liability. The system uses neutral terminology throughout:
- `entity`, `subject`, `reported contact`, `associated record`, `evidence connection`
- All facts, extractions, and inferences are labeled with their epistemic confidence:
  - **FACT**: Directly corroborated by authoritative, immutable records (bank core switch, signed receipts).
  - **EXTRACTED DATA**: Extracted via OCR, regex, or deterministic parsers from digital artifacts.
  - **INFERENCE**: Synthesized relationship based on co-occurrence, timestamps, or phone linkages.
  - **UNCERTAINTY**: Uncorroborated single-source claims or missing metadata.

### B. Universal Source Traceability
Every entity, timeline event, transaction, relationship, inconsistency, and AI Copilot response provides direct **[ TRACE TO SOURCE ]** grounding. Clicking this opens the underlying evidence artifact with highlighted text snippets, row positions, file metadata, and cryptographic SHA-256 hashes.

### C. Privacy & Anonymization Layer
Compliant with DPDP and GDPR data minimization requirements, the privacy engine masks sensitive identifiers in real time across dashboards, graphs, timelines, and report exports:
- Telephone numbers: `+91 XXXXXXX210`
- Email handles: `s***o@example.test`
- Bank accounts: `ACC-XXXXX-9104`
- UPI VPAs: `su***@upi`
- Personal names: `S*** A***`

---

## 3. Technology Stack

- **Frontend**: React (v19), Vite (v6), Tailwind CSS, Framer Motion, Lucide React, React Router (v7), Recharts (v2), @xyflow/react (v12 React Flow). JavaScript / JSX ONLY.
- **Backend**: Node.js (v22), Express.js (v4), Mongoose (v8) / MongoDB with zero-dependency high-performance in-memory fallback store.
- **Data Integrity**: Cryptographic SHA-256 hashing for all uploaded and synthetic evidence.
- **AI Engine**: Grounded Evidence Copilot with strict non-hallucinatory evidence basis and limitation disclosures.
