# FraudTrace AI — Confidence Scoring Methodology & Guardrails

> **CRITICAL FORENSIC DISCLAIMER: SYNTHETIC DATA ONLY**  
> Confidence scores represent evidentiary corroboration certainty, **never** guilt or innocence. High confidence means multiple independent sources agree on factual observations; low confidence denotes uncorroborated or conflicting records.

---

## 1. Confidence Philosophy

In legal and investigative contexts, certainty must reflect:
1. **Source Plurality**: How many distinct records support the claim?
2. **Source Independence**: Do records come from separate, uncoordinated systems (e.g. Bank core switch vs personal phone screenshot)?
3. **Internal Consistency**: Do the records tell an identical factual story?

---

## 2. Four-Tier Confidence Scale

| Tier | Score Range | Default Value | Criterion | Typical Source Setup |
| :---: | :---: | :---: | :--- | :--- |
| **LOW** | 0.00 – 0.40 | 0.25 | Single unverified source OR conflicting evidence | Victim statement alone |
| **MEDIUM** | 0.41 – 0.65 | 0.55 | Two corroborating sources | Victim statement + Bank SMS |
| **HIGH** | 0.66 – 0.85 | 0.78 | Three independent corroborating sources | FIR + Bank Statement + SMS |
| **VERY HIGH**| 0.86 – 1.00 | 0.92 | Four or more independent corroborating sources | FIR + Bank + SMS + Merchant Gateway log |

---

## 3. Mathematical Formula

For an evidence cluster with $N$ independent corroborating sources:

$$\text{Base Score} = \min\left(0.95, 0.25 + (N - 1) \times 0.23 + B_{\text{indep}}\right)$$

Where:
- $N$ is the count of **independent** agreeing evidence sources (duplicate records do not increment $N$).
- $B_{\text{indep}} = 0.05$ if sources cross organizational boundaries (e.g. Telecom + Bank).
- $\text{Penalty}_{\text{drift}} = -0.15$ if timestamp drift exceeds 15 minutes.
- $\text{Penalty}_{\text{missing}} = -0.10$ if optional metadata fields are missing.

---

## 4. The Immutable Contradiction Guardrail

### The Rule
$$\text{IF } \text{contradiction\_status} == \text{"CONFLICTING"} \implies \text{Confidence Score} \le 0.40 \text{ (LOW)}$$

### Forensic Rationale
- Even if ten witnesses claim a transfer occurred at 10:00 AM for ₹50,000, if official core banking records show ₹48,000, there is a fundamental factual disagreement.
- Presenting this event as "HIGH CONFIDENCE" would mislead investigators into treating an unverified or disputed number as undisputed fact.
- Therefore, the system automatically overrides any mathematical score and forces the confidence down to **`LOW` (capped at 0.25 – 0.40)**, with explicit callouts highlighting the discrepancy.

---

## 5. Source Independence Matrix

Not all evidence sources are independent:

| Source A | Source B | Independent? | Rationale |
| :--- | :--- | :---: | :--- |
| Core Banking Ledger | Telecom SMS Gateway | **Yes** | Separate corporate infrastructure |
| Phone Screenshot | Phone Chat Export | **No** | Both originate from the same user device |
| Duplicate File Export | Original File | **No** | Identical SHA-256 hash |
| Complainant FIR | Core Banking Ledger | **Yes** | Subjective report vs automated system |

Duplicate files are flagged with `POSSIBLE_DUPLICATE` and discarded from the source count $N$.
