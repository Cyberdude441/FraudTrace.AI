import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, FileSearch } from 'lucide-react';
import { SourceReference } from '../common/SourceReference.jsx';
import { ConfidenceBadge } from '../common/ConfidenceBadge.jsx';
import { BionicText } from '../accessibility/BionicText.jsx';
import { SentenceFocusBlock } from '../accessibility/SentenceFocus.jsx';

export function AiSummaryBanner({ caseData }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-dark-card via-dark-cardHover to-dark-card border border-cyan-500/30 p-5 shadow-lg">
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide font-mono uppercase">
              AI Incident Reconstruction Synthesis
            </h2>
            <p className="text-[11px] text-dark-muted font-mono">
              Autonomous cross-evidence correlation grounded across 42 artifacts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ConfidenceBadge confidence={0.96} epistemicType="FACT" showScore={true} />
        </div>
      </div>

      <div className="space-y-3 text-xs text-slate-200 leading-relaxed font-sans reading-content">
        <p className="sentence-item">
          <BionicText>
            Digital records confirm that on 25 September 2026 at 10:40:12 AM IST, an unauthorized debit of ₹15,000.00 was executed from account ACC-88392104-MOCK targeting beneficiary handle subject.demo@upi via NPCI RRN 6288192019.
          </BionicText>
          <span className="inline-block ml-2">
            <SourceReference evidenceId="EVD-003" label="bank_statement.csv (Row 27)" />
          </span>
          <span className="inline-block ml-1">
            <SourceReference evidenceId="EVD-021" label="NPCI RRN Log" />
          </span>
        </p>

        <p className="sentence-item">
          <BionicText>
            The transaction directly succeeded a sequence of SMS notifications and a 342-second cellular voice call originating from reported contact +91 9876543210 via Bhubaneswar cell tower BTS-BHU-09, falsely advertising urgent KYC re-verification.
          </BionicText>
          <span className="inline-block ml-2">
            <SourceReference evidenceId="EVD-001" label="sms_alert_kyc_expiry.png" />
          </span>
          <span className="inline-block ml-1">
            <SourceReference evidenceId="EVD-006" label="CDR Call Log" />
          </span>
        </p>

        <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20 flex items-start gap-2.5 text-[11px]">
          <span className="text-amber-400 font-bold uppercase font-mono tracking-wider flex-shrink-0">
            Detected Variance:
          </span>
          <span className="text-slate-300">
            <BionicText>
              Initial SMS prompt cited a nominal deposit of Rs 4,999, whereas gateway executed ₹15,000. Core banking timestamp (10:40 AM) differs by 4m 48s from phone screenshot (10:45 AM).
            </BionicText>
          </span>
          <div className="ml-auto flex-shrink-0">
            <SourceReference evidenceId="EVD-025" label="MEMO-2026-09-021" />
          </div>
        </div>
      </div>
    </div>
  );
}
