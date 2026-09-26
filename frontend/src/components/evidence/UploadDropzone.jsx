import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Plus } from 'lucide-react';
import { api } from '../../services/api.js';
import { useCase } from '../../context/CaseContext.jsx';
import { formatBytes } from '../../utils/formatter.js';

export function UploadDropzone({ onUploadSuccess }) {
  const { currentCaseId } = useCase();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('Screenshot');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    'Screenshot', 'Chat', 'Bank Record', 'Call Log', 
    'Transaction', 'URL', 'Email', 'Document', 'Other'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setUploadResult(null);
    setErrorMessage('');

    // Auto-detect category from file extension / name
    const name = file.name.toLowerCase();
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
      setCategory('Screenshot');
    } else if (name.endsWith('.csv')) {
      setCategory('Bank Record');
    } else if (name.endsWith('.eml')) {
      setCategory('Email');
    } else if (name.includes('chat') || name.includes('sms')) {
      setCategory('Chat');
    } else if (name.endsWith('.pdf')) {
      setCategory('Document');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caseId', currentCaseId);
      formData.append('category', category);

      const res = await api.uploadEvidence(formData);
      if (res && res.success) {
        setUploadResult(res.evidence);
        setSelectedFile(null);
        if (onUploadSuccess) onUploadSuccess(res.evidence);
      } else {
        setErrorMessage(res.message || 'Evidence upload failed.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Evidence upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  // Demo helper: Load synthetic test artifact directly
  const loadSyntheticSample = (sampleType) => {
    let mockFile;
    if (sampleType === 'SCREENSHOT') {
      mockFile = new File(
        ['SIMULATED_SCREENSHOT_DATA_TIMESTAMP_10_45_AM_AMOUNT_15000_UPI_REF_6288192019'],
        'payment_gateway_confirm_screen.png',
        { type: 'image/png' }
      );
      setCategory('Screenshot');
    } else if (sampleType === 'BANK_STATEMENT') {
      mockFile = new File(
        ['Date,Description,Amount,Status,Ref\n2026-09-25 10:40:12,UPI/DR/6288192019/subject.demo@upi,15000.00,DR,TXN-99482109'],
        'october_ledger_reconciliation.csv',
        { type: 'text/csv' }
      );
      setCategory('Bank Record');
    } else {
      mockFile = new File(
        ['URGENT: Click https://payment-demo.test/verify-kyc to reactivate your banking services immediately.'],
        'phishing_sms_intercept.txt',
        { type: 'text/plain' }
      );
      setCategory('Chat');
    }
    handleFileSelected(mockFile);
  };

  return (
    <div className="p-5 rounded-xl bg-dark-card/90 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-cyber-cyan" />
            Ingest Forensic Digital Evidence
          </h3>
          <p className="text-xs text-dark-muted font-mono">
            Supported Formats: PNG, JPG, PDF, TXT, CSV, JSON (Auto-SHA256 Sealed)
          </p>
        </div>

        {/* Demo Quick Samples */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-dark-muted font-mono uppercase">Quick Demo:</span>
          <button
            onClick={() => loadSyntheticSample('SCREENSHOT')}
            className="px-2 py-1 rounded text-[11px] bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20"
          >
            + Screenshot
          </button>
          <button
            onClick={() => loadSyntheticSample('BANK_STATEMENT')}
            className="px-2 py-1 rounded text-[11px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
          >
            + Bank CSV
          </button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-cyber-cyan bg-cyan-950/20 shadow-glow-cyan'
            : selectedFile
            ? 'border-emerald-500/40 bg-emerald-950/10'
            : 'border-white/10 hover:border-cyan-500/30 hover:bg-white/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf,.txt,.csv,.json"
          onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex flex-col items-center justify-center">
            <FileText className="w-10 h-10 text-emerald-400 mb-2" />
            <span className="text-sm font-bold text-white">{selectedFile.name}</span>
            <span className="text-xs font-mono text-dark-muted mt-0.5">
              {formatBytes(selectedFile.size)} · Type: {selectedFile.type || 'text/plain'}
            </span>
            <span className="text-[11px] text-emerald-400 mt-2 font-mono">
              Ready for extraction pipeline. Click 'Upload & Ingest' below.
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
            <p className="text-sm font-medium text-white mb-1">
              Drag & Drop evidence files here, or <span className="text-cyber-cyan font-semibold">browse computer</span>
            </p>
            <p className="text-xs text-dark-muted font-mono">
              Integrity guaranteed: Cryptographic SHA-256 hash computed immediately
            </p>
          </div>
        )}
      </div>

      {/* Upload Controls & Category Selection */}
      {selectedFile && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-dark-surface border border-white/10">
          <div className="flex items-center gap-2">
            <label className="text-xs text-dark-muted font-mono uppercase">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:border-cyber-cyan focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFile(null)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-1.5 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Sealing & Ingesting...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload & Ingest Evidence</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {uploadResult && (
        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200">
              Successfully ingested <strong className="text-white">{uploadResult.filename}</strong> as <span className="font-mono text-cyan-300">[{uploadResult.evidenceId}]</span>.
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400">STATUS: UPLOADED</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
