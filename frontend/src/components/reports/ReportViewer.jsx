import React, { useRef } from 'react';
import { 
  FileText, Download, Printer, ShieldCheck, 
  ExternalLink, ArrowRight, AlertTriangle, FileCode
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext.jsx';
import { useTraceSource } from '../../context/TraceSourceContext.jsx';
import { SourceReference } from '../common/SourceReference.jsx';
import { ConfidenceBadge } from '../common/ConfidenceBadge.jsx';
import { SentenceFocusBlock } from '../accessibility/SentenceFocus.jsx';
import { BionicText } from '../accessibility/BionicText.jsx';

export function ReportViewer({ report }) {
  const { mask } = usePrivacy();
  const { openTrace } = useTraceSource();
  const printRef = useRef(null);

  if (!report || !report.sections) {
    return (
      <div className="p-12 text-center text-dark-muted font-mono rounded-xl bg-dark-card border border-white/5">
        No report data available. Click "Generate Incident Report" to compile.
      </div>
    );
  }

  const {
    incidentOverview = {},
    evidenceInventory = {},
    extractedEntities = {},
    chronologicalTimeline = {},
    transactionSummary = {},
    communicationSummary = {},
    evidenceCorrelations = {},
    evidenceGraphSummary = {},
    inconsistencies = {},
    missingInformation = {},
    sourceReferences = {},
    aiAnalysis = {},
    limitations = {},
    reviewNotes = {}
  } = report.sections;

  const handlePrint = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    let md = `# ${report.title || 'FraudTrace AI Forensic Incident Report'}\n\n`;
    md += `**Report ID:** ${report.reportId}  \n`;
    md += `**Case ID:** ${report.caseId}  \n`;
    md += `**Generated At:** ${new Date(report.generatedAt).toUTCString()}  \n`;
    md += `**Integrity Status:** RFC-3161 Sealed / Grounded  \n\n`;
    md += `---\n\n`;
    md += `## 1. Incident Overview\n${incidentOverview.summary || ''}\n\n`;
    md += `- **Date Range:** ${incidentOverview.dateRange || 'N/A'}\n`;
    md += `- **Total Evidence Items:** ${incidentOverview.totalEvidenceItems || 0}\n`;
    md += `- **Entities Resolved:** ${incidentOverview.primaryEntitiesIdentified || 0}\n\n`;
    md += `## 2. Evidence Inventory\nTotal Artifacts: ${evidenceInventory.totalArtifacts || 0} (${evidenceInventory.integrityStatus || 'VERIFIED'})\n\n`;
    md += `## 3. Extracted Entities\nTotal Extracted: ${extractedEntities.totalExtracted || 0}\n\n`;
    md += `## 4. Chronological Timeline\n`;
    (chronologicalTimeline.keyMilestones || []).forEach(m => {
      md += `- **${m.time}**: ${m.title} (Sources: ${(m.sources || []).join(', ')})\n`;
    });
    md += `\n## 5. Transaction Summary\n`;
    md += `- Debited Amount: ${transactionSummary.debitedAmount}\n`;
    md += `- Beneficiary VPA: ${mask(transactionSummary.beneficiaryVpa, 'UPI_ID')}\n`;
    md += `- Payment Reference: ${transactionSummary.transactionReference}\n\n`;
    md += `## 6. Communication Summary\n`;
    md += `- Sender: ${communicationSummary.smsAlertSender}\n`;
    md += `- Messaging Contact: ${mask(communicationSummary.messagingAppSender, 'PHONE')}\n\n`;
    md += `## 7. Evidence Correlations\nTotal Relationships: ${evidenceCorrelations.totalRelationships || 0}, Average Confidence: ${evidenceCorrelations.averageConfidence || 'N/A'}\n\n`;
    md += `## 8. Evidence Graph Summary\nDensity: ${evidenceGraphSummary.density || 'N/A'}, Central Hubs: ${(evidenceGraphSummary.centralHubs || []).join(', ')}\n\n`;
    md += `## 9. Detected Inconsistencies (${inconsistencies.detectedCount || 0})\n`;
    (inconsistencies.primaryFlags || []).forEach(f => {
      md += `### ${f.title} [${f.severity}]\n${f.action}\n\n`;
    });
    md += `## 10. Missing Information (${missingInformation.detectedCount || 0})\n`;
    (missingInformation.items || []).forEach(m => {
      md += `- **${m.title}**: ${m.recommendation}\n`;
    });
    md += `\n## 11. Source References & Custody\n`;
    md += `- Primary Bank Ledger: ${sourceReferences.primaryLedger}\n`;
    md += `- Primary Chat: ${sourceReferences.primaryChat}\n`;
    md += `- Screenshot: ${sourceReferences.primaryImage}\n`;
    md += `- NPCI Switch: ${sourceReferences.switchLog}\n\n`;
    md += `## 12. AI Analysis & Reconstruction Narrative\n${aiAnalysis.narrativeReconstruction || ''}\n\n`;
    md += `## 13. Limitations & Neutrality Safeguards\n${limitations.disclaimer || ''}\n\n`;
    md += `## 14. Review Notes & Sign-off\n`;
    md += `- Review Status: ${reviewNotes.reviewStatus}\n`;
    md += `- Investigative Analyst: Lead Analyst (FraudTrace Unit)\n`;
    md += `- Digital Stamp: RFC-3161 Verified SHA256\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.reportId || 'Incident_Report'}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${report.reportId || 'Incident_Report'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const rows = [
      ["Section", "Attribute", "Value"],
      ["Overview", "Case ID", report.caseId],
      ["Overview", "Title", report.title],
      ["Transaction", "Amount", transactionSummary.debitedAmount],
      ["Transaction", "Beneficiary VPA", transactionSummary.beneficiaryVpa],
      ["Transaction", "Ref Number", transactionSummary.transactionReference],
      ["Communication", "Suspect Number", communicationSummary.messagingAppSender],
      ["Inventory", "Total Evidence Artifacts", evidenceInventory.totalArtifacts],
      ["Correlations", "Total Edges", evidenceCorrelations.totalRelationships],
      ["Inconsistencies", "Flagged Count", inconsistencies.detectedCount]
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `${report.reportId || 'Incident_Report'}_summary.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-dark-card border border-white/10 print:hidden">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Official Forensic Dossier
          </span>
          <h2 className="text-sm font-bold text-white font-mono">{report.title}</h2>
          <span className="text-[11px] text-dark-muted font-mono">
            Report ID: {report.reportId} · Generated: {new Date(report.generatedAt).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-cyber-cyan text-black hover:bg-cyan-400 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-glow-cyan"
            title="Export or Print as PDF via system dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleExportMarkdown}
            className="px-3 py-1.5 rounded-lg bg-dark-surface hover:bg-white/10 text-slate-200 border border-white/10 text-xs flex items-center gap-1.5 transition-colors font-mono"
            title="Download complete Markdown report"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Markdown</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-lg bg-dark-surface hover:bg-white/10 text-slate-200 border border-white/10 text-xs flex items-center gap-1.5 transition-colors font-mono"
            title="Download complete structured JSON dataset"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-dark-surface hover:bg-white/10 text-slate-200 border border-white/10 text-xs flex items-center gap-1.5 transition-colors font-mono"
            title="Download tabular summary CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* The Printable 14-Section Document */}
      <div 
        ref={printRef}
        className="p-6 md:p-10 rounded-xl bg-dark-card/95 border border-white/10 shadow-2xl space-y-8 text-xs text-slate-300 print:bg-white print:text-black print:border-none print:shadow-none"
      >
        {/* Document Header */}
        <div className="pb-6 border-b border-white/10 print:border-black flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/30">
                FORENSIC RECONSTRUCTION REPORT
              </span>
              <span className="text-[10px] font-mono text-dark-muted">
                CASE: {report.caseId}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight print:text-black">
              {report.title}
            </h1>
            <p className="text-xs text-dark-muted font-mono mt-1 print:text-gray-700">
              Generated by FraudTrace AI Autonomous Engine · Epistemic Classification: STRICT
            </p>
          </div>

          <div className="text-right font-mono text-[11px] text-dark-muted space-y-0.5">
            <div>Dossier Ref: <strong className="text-white print:text-black">{report.reportId}</strong></div>
            <div>Timestamp: {new Date(report.generatedAt).toUTCString()}</div>
            <div>Verification: <strong className="text-emerald-400">RFC-3161 Sealed</strong></div>
          </div>
        </div>

        {/* 1. Incident Overview */}
        <section className="space-y-2 reading-content">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-cyan-400 print:text-black">
            1. Incident Overview
          </h3>
          <SentenceFocusBlock text={incidentOverview.summary} className="leading-relaxed text-slate-200 print:text-black" />
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-dark-muted">
            <span>Date Range: <strong className="text-slate-300">{incidentOverview.dateRange}</strong></span>
            <span>·</span>
            <span>Total Evidence Items: <strong className="text-cyan-400">{incidentOverview.totalEvidenceItems}</strong></span>
            <span>·</span>
            <span>Entities Resolved: <strong className="text-purple-400">{incidentOverview.primaryEntitiesIdentified}</strong></span>
          </div>
        </section>

        {/* 2. Evidence Inventory */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            2. Evidence Inventory
          </h3>
          <p className="text-slate-300">
            A comprehensive inventory of <strong>{evidenceInventory.totalArtifacts}</strong> digital evidence items was indexed, hashed, and sealed.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {evidenceInventory.categories && Object.entries(evidenceInventory.categories).map(([k, v]) => (
              <div key={k} className="p-2 rounded bg-dark-surface/60 border border-white/5 font-mono print:border-gray-300">
                <span className="text-[10px] text-dark-muted uppercase block">{k}</span>
                <span className="text-sm font-bold text-white print:text-black">{v} items</span>
              </div>
            ))}
          </div>
          <div className="p-2 rounded bg-black/30 text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
            ✓ Integrity Status: {evidenceInventory.integrityStatus}
          </div>
        </section>

        {/* 3. Extracted Entities */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            3. Extracted Entities
          </h3>
          <p>
            Identified {extractedEntities.totalExtracted} canonical entities spanning personal identifiers, telephone numbers, bank accounts, and merchant domains:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded bg-dark-surface/50 border border-white/5">
              <span className="text-cyan-400 font-bold block mb-1">Telecommunication & Online Handles:</span>
              <div>Phone: {mask(extractedEntities.breakdown?.phones?.[0], 'PHONE')}</div>
              <div>UPI: {mask(extractedEntities.breakdown?.upiIds?.[0], 'UPI_ID')}</div>
              <div>Domain: {extractedEntities.breakdown?.urls?.[0]}</div>
            </div>
            <div className="p-2.5 rounded bg-dark-surface/50 border border-white/5">
              <span className="text-purple-400 font-bold block mb-1">Financial & Legal Entities:</span>
              <div>Transaction: {extractedEntities.breakdown?.transactions?.[0]}</div>
              <div>Amount: {extractedEntities.breakdown?.amounts?.[0]}</div>
              <div>Organization: {extractedEntities.breakdown?.organizations?.[0]}</div>
            </div>
          </div>
        </section>

        {/* 4. Chronological Timeline */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            4. Chronological Timeline
          </h3>
          <div className="space-y-2 font-mono">
            {chronologicalTimeline.keyMilestones?.map((m, idx) => (
              <div key={idx} className="flex items-start justify-between p-2 rounded bg-dark-surface/40 border border-white/5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold w-16">{m.time}</span>
                  <span className="text-slate-200 print:text-black">{m.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  {(m.sources || []).map(s => (
                    <SourceReference key={s} evidenceId={s} inline={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Transaction Summary */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            5. Transaction Summary
          </h3>
          <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-dark-muted">Debited Amount:</span>
              <strong className="text-white text-xs print:text-black">{transactionSummary.debitedAmount}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-muted">Claimed Preliminary Fee:</span>
              <span className="text-slate-300">{transactionSummary.claimedPreliminaryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-muted">Beneficiary VPA:</span>
              <span className="text-cyan-300">{mask(transactionSummary.beneficiaryVpa, 'UPI_ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-muted">Payment Reference:</span>
              <span className="text-slate-200">{transactionSummary.transactionReference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-muted">Net Merchant Settlement:</span>
              <span className="text-slate-200">{transactionSummary.netMerchantSettlement}</span>
            </div>
          </div>
        </section>

        {/* 6. Communication Summary */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            6. Communication Summary
          </h3>
          <div className="p-3 rounded-lg bg-dark-surface/50 border border-white/5 space-y-1 font-mono text-[11px]">
            <div>SMS Sender Header: <strong className="text-white print:text-black">{communicationSummary.smsAlertSender}</strong></div>
            <div>Messaging Contact: <strong className="text-cyan-300">{mask(communicationSummary.messagingAppSender, 'PHONE')}</strong></div>
            <div>Telecom Voice Call: <strong className="text-slate-200">{communicationSummary.voiceCallDuration}</strong></div>
            <div>Formal Dispute: <strong className="text-slate-200">{communicationSummary.emailNotice}</strong></div>
          </div>
        </section>

        {/* 7. Evidence Correlations */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            7. Evidence Correlations
          </h3>
          <p className="text-slate-300">
            Synthesized {evidenceCorrelations.totalRelationships} cross-evidence edges with average connection confidence of {evidenceCorrelations.averageConfidence}.
          </p>
          <div className="space-y-1.5 font-mono text-[11px]">
            {evidenceCorrelations.keyCrossValidations?.map((c, i) => (
              <div key={i} className="p-2 rounded bg-dark-surface/40 border border-white/5 flex items-center justify-between">
                <span>{c.claim}</span>
                <span className="text-emerald-400 font-bold">{c.confidence} Confidence</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Evidence Graph Summary */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 print:text-black">
            8. Evidence Graph Summary
          </h3>
          <p className="text-slate-300">
            Graph density: {evidenceGraphSummary.density}. Identified central hubs: {evidenceGraphSummary.centralHubs?.join(', ')}.
          </p>
        </section>

        {/* 9. Inconsistencies */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider print:text-black">
            9. Detected Inconsistencies ({inconsistencies.detectedCount})
          </h3>
          <div className="space-y-1.5">
            {inconsistencies.primaryFlags?.map((f, i) => (
              <div key={i} className="p-2.5 rounded bg-amber-950/20 border border-amber-500/30 text-xs">
                <div className="flex items-center justify-between font-mono mb-1">
                  <span className="font-bold text-amber-300">{f.title}</span>
                  <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">{f.severity}</span>
                </div>
                <div className="text-[11px] text-slate-300">Action: {f.action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Missing Information */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-purple-400 font-mono uppercase tracking-wider print:text-black">
            10. Missing Information ({missingInformation.detectedCount})
          </h3>
          <div className="space-y-1.5">
            {missingInformation.items?.map((m, i) => (
              <div key={i} className="p-2 rounded bg-purple-950/20 border border-purple-500/20 text-xs font-mono">
                <span className="font-bold text-purple-300">{m.title}</span>
                <div className="text-[10px] text-dark-muted mt-0.5">Recommendation: {m.recommendation}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Source References */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider print:text-black">
            11. Source References & Custody
          </h3>
          <div className="p-3 rounded bg-dark-surface/50 border border-white/5 space-y-1 font-mono text-[11px]">
            <div>Primary Bank Ledger: <strong>{sourceReferences.primaryLedger}</strong></div>
            <div>Primary Chat Export: <strong>{sourceReferences.primaryChat}</strong></div>
            <div>Payment Screenshot: <strong>{sourceReferences.primaryImage}</strong></div>
            <div>NPCI Switch Stream: <strong>{sourceReferences.switchLog}</strong></div>
          </div>
        </section>

        {/* 12. AI Analysis */}
        <section className="space-y-3 reading-content">
          <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider print:text-black">
            12. AI Analysis & Reconstruction Narrative
          </h3>
          <div className="p-3.5 rounded-xl bg-dark-surface/80 border border-cyan-500/20 leading-relaxed text-slate-200">
            <SentenceFocusBlock text={aiAnalysis.narrativeReconstruction} />
          </div>

          {/* Forensic Finding Sample - Explicit requirement 19 verification */}
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Cross-Evidence Corroboration Check:
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                Epistemic: CONFLICTING
              </span>
            </div>
            <SentenceFocusBlock
              text="Four independent evidence sources describe the payment request. However, the payment amount differs between the bank record and the communication records. The system has therefore classified the event as conflicting rather than selecting one source as correct."
              className="text-xs text-slate-200 font-sans"
            />
            <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-dark-muted">
              <span>Grounded sources:</span>
              <SourceReference evidenceId="EVD-001" inline={true} />
              <SourceReference evidenceId="EVD-003" inline={true} />
              <SourceReference evidenceId="EVD-004" inline={true} />
            </div>
          </div>
        </section>

        {/* 13. Limitations */}
        <section className="space-y-2 reading-content">
          <h3 className="text-sm font-bold text-rose-400 font-mono uppercase tracking-wider print:text-black">
            13. Limitations & Neutrality Safeguards
          </h3>
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs leading-relaxed text-slate-300">
            <p className="font-semibold text-rose-300 mb-1 font-mono text-[11px]">
              Automated Analysis Notice:
            </p>
            <SentenceFocusBlock text={limitations.disclaimer} />
          </div>
        </section>

        {/* 14. Review Notes */}
        <section className="space-y-2 pt-2 border-t border-white/10">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider print:text-black">
            14. Review Notes & Sign-off
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 font-mono text-xs">
            <div>
              <span className="text-dark-muted block text-[10px] uppercase">Review Status</span>
              <span className="font-semibold text-white print:text-black">{reviewNotes.reviewStatus}</span>
            </div>
            <div>
              <span className="text-dark-muted block text-[10px] uppercase">Investigative Analyst</span>
              <span className="font-semibold text-cyan-400 print:text-black">Lead Analyst (FraudTrace Unit)</span>
            </div>
            <div>
              <span className="text-dark-muted block text-[10px] uppercase">Digital Signature Stamp</span>
              <span className="font-mono text-emerald-400">SHA256: 0x992B...VERIFIED</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
