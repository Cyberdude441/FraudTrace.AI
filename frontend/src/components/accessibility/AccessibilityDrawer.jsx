import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, RotateCcw, Check, Sparkles, Volume2, Eye, 
  Key, Shield, Sliders, Type, Compass, Play, 
  Pause, Square, AlertCircle, CheckCircle2, EyeOff
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';
import { UniversalAccessIcon } from './AccessibilityFab.jsx';
import { SentenceFocusBlock } from './SentenceFocus.jsx';
import { BionicText } from './BionicText.jsx';

export function AccessibilityDrawer() {
  const {
    theme,
    fontFamily,
    fontSize,
    lineHeight,
    letterSpacing,
    readingWidth,
    sentenceFocus,
    readingRuler,
    bionicReading,
    ttsRate,
    ttsStatus,
    isTTSSupported,
    aiProvider,
    aiApiKey,
    updateSetting,
    resetSettings,
    isDrawerOpen,
    closeDrawer,
    isSettingsActive,
    speakText,
    pauseTTS,
    resumeTTS,
    stopTTS,
    readSelection,
    readPage
  } = useAccessibility();

  const headingRef = useRef(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Focus heading when drawer opens for screen reader announcement
  useEffect(() => {
    if (isDrawerOpen) {
      setTimeout(() => {
        headingRef.current?.focus();
      }, 100);
    }
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  // Visual Theme Cards configuration
  const themes = [
    {
      id: 'warm-cream',
      name: 'Warm Cream',
      desc: 'Paper-like low-glare reading',
      bg: '#fbf0d9',
      fg: '#282118',
      accent: '#a35d1e',
      border: '#d9c79f'
    },
    {
      id: 'calm-slate',
      name: 'Calm Slate',
      desc: 'Cool neutral daylight tone',
      bg: '#e2e8f0',
      fg: '#0f172a',
      accent: '#0284c7',
      border: '#94a3b8'
    },
    {
      id: 'soft-lavender',
      name: 'Soft Lavender',
      desc: 'Sensory soothing violet tint',
      bg: '#f3f0f7',
      fg: '#241838',
      accent: '#7c3aed',
      border: '#c4b5fd'
    },
    {
      id: 'slate-dark',
      name: 'Slate Dark',
      desc: 'Default FraudTrace cyber mode',
      bg: '#080d1a',
      fg: '#f1f5f9',
      accent: '#06b6d4',
      border: '#1e293b'
    },
    {
      id: 'oled-dark',
      name: 'High-Contrast OLED',
      desc: 'Pure black with maximum contrast',
      bg: '#000000',
      fg: '#ffffff',
      accent: '#00ffff',
      border: '#ffffff'
    },
    {
      id: 'contrast-light',
      name: 'High-Contrast Light',
      desc: 'Pure white with bold dark ink',
      bg: '#ffffff',
      fg: '#000000',
      accent: '#0033cc',
      border: '#000000'
    }
  ];

  // Dyslexia-Friendly Fonts configuration
  const fonts = [
    {
      id: 'opendyslexic',
      name: 'OpenDyslexic',
      desc: 'Weighted bottom to counter letter flipping',
      styleName: "'OpenDyslexic', 'Comic Sans MS', sans-serif"
    },
    {
      id: 'lexend',
      name: 'Lexend',
      desc: 'Scientifically calibrated for reading speed',
      styleName: "'Lexend', Arial, sans-serif"
    },
    {
      id: 'atkinson',
      name: 'Atkinson Hyperlegible',
      desc: 'High distinction for character ambiguity',
      styleName: "'Atkinson Hyperlegible', Arial, sans-serif"
    },
    {
      id: 'inter',
      name: 'Inter',
      desc: 'Modern geometric clarity',
      styleName: "'Inter', sans-serif"
    },
    {
      id: 'merriweather',
      name: 'Merriweather',
      desc: 'Warm editorial serif',
      styleName: "'Merriweather', Georgia, serif"
    }
  ];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-drawer-title"
      >
        {/* Semi-transparent Backdrop overlay - keeps underlying page visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
          aria-hidden="true"
        />

        {/* Slide-out Panel */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="fixed top-0 right-0 z-50 w-full sm:w-[480px] h-screen bg-dark-surface border-l border-cyan-500/30 shadow-2xl flex flex-col pointer-events-auto glass-panel-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-card/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/15 border border-cyan-400/40 text-cyber-cyan">
                <UniversalAccessIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 
                  id="accessibility-drawer-title"
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-base font-bold text-white font-mono tracking-tight outline-none"
                >
                  Accessibility Controls
                </h2>
                {isSettingsActive ? (
                  <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Accessibility settings active
                  </p>
                ) : (
                  <p className="text-[11px] text-dark-muted font-mono">
                    WCAG 2.2 AA calibrated suite
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetSettings}
                className="px-2.5 py-1.5 rounded-lg bg-dark-surface hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Restore default accessibility settings"
                aria-label="Reset all accessibility settings to default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={closeDrawer}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close panel (Escape)"
                aria-label="Close Accessibility Controls panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Settings Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-7">
            
            {/* ================================================================
                1. VISUAL THEME & CONTRAST
               ================================================================ */}
            <section aria-labelledby="theme-heading" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 id="theme-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Visual Theme & Contrast
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">6 calibrated profiles</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Visual Theme Options">
                {themes.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateSetting('theme', t.id)}
                      className={`relative p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-cyber-cyan ring-2 ring-cyan-500/40 shadow-glow-cyan bg-dark-card'
                          : 'border-white/10 hover:border-white/20 bg-dark-card/60'
                      }`}
                      style={{ minHeight: '84px' }}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        {/* Theme Swatch Preview */}
                        <div 
                          className="w-5 h-5 rounded-full border shadow-sm flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: t.bg, borderColor: t.border }}
                          aria-hidden="true"
                        >
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: t.accent }} 
                          />
                        </div>

                        {isSelected && (
                          <div className="p-0.5 rounded-full bg-cyber-cyan text-black" aria-hidden="true">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white tracking-tight">
                          {t.name}
                        </div>
                        <div className="text-[10px] text-dark-muted leading-tight mt-0.5">
                          {t.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ================================================================
                2. DYSLEXIA-FRIENDLY FONTS
               ================================================================ */}
            <section aria-labelledby="font-heading" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 id="font-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Dyslexia-Friendly Fonts
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">High Distinction Typography</span>
              </div>

              <div className="space-y-2" role="radiogroup" aria-label="Dyslexia-Friendly Font Options">
                {fonts.map((f) => {
                  const isSelected = fontFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateSetting('fontFamily', f.id)}
                      className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-cyber-cyan bg-dark-card ring-2 ring-cyan-500/30 shadow-glow-cyan'
                          : 'border-white/10 hover:border-white/20 bg-dark-card/50'
                      }`}
                    >
                      <div className="pr-2">
                        <div 
                          className="text-sm font-semibold text-white tracking-wide"
                          style={{ fontFamily: f.styleName }}
                        >
                          {f.name}
                        </div>
                        <p className="text-[11px] text-dark-muted mt-0.5">
                          {f.desc}
                        </p>
                      </div>

                      {isSelected ? (
                        <div className="p-1 rounded-full bg-cyber-cyan text-black flex-shrink-0" aria-hidden="true">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ================================================================
                3. SPACING & SIZING (SLIDERS)
               ================================================================ */}
            <section aria-labelledby="spacing-heading" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 id="spacing-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Spacing & Sizing
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">Live Proportional Scaling</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-card/60 border border-white/10 space-y-4 font-mono">
                {/* 1. Font Size */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="slider-font-size" className="text-slate-300 font-sans font-medium">
                      Font Size
                    </label>
                    <span className="text-cyber-cyan font-bold">{fontSize}px</span>
                  </div>
                  <input
                    id="slider-font-size"
                    type="range"
                    min="14"
                    max="24"
                    step="1"
                    value={fontSize}
                    onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                    aria-label="Font Size"
                    aria-valuemin="14"
                    aria-valuemax="24"
                    aria-valuenow={fontSize}
                    aria-valuetext={`${fontSize} pixels`}
                    className="w-full accent-cyber-cyan cursor-pointer h-2 bg-dark-surface rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-dark-muted mt-0.5">
                    <span>14px</span>
                    <span>Default: 16px</span>
                    <span>24px</span>
                  </div>
                </div>

                {/* 2. Line Height */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="slider-line-height" className="text-slate-300 font-sans font-medium">
                      Line Height
                    </label>
                    <span className="text-cyber-cyan font-bold">{lineHeight.toFixed(1)}x</span>
                  </div>
                  <input
                    id="slider-line-height"
                    type="range"
                    min="1.2"
                    max="2.2"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => updateSetting('lineHeight', Number(e.target.value))}
                    aria-label="Line Height"
                    aria-valuemin="1.2"
                    aria-valuemax="2.2"
                    aria-valuenow={lineHeight}
                    aria-valuetext={`${lineHeight.toFixed(1)} multiplier`}
                    className="w-full accent-cyber-cyan cursor-pointer h-2 bg-dark-surface rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-dark-muted mt-0.5">
                    <span>1.2x</span>
                    <span>Default: 1.6x</span>
                    <span>2.2x</span>
                  </div>
                </div>

                {/* 3. Letter Spacing */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="slider-letter-spacing" className="text-slate-300 font-sans font-medium">
                      Letter Spacing
                    </label>
                    <span className="text-cyber-cyan font-bold">{letterSpacing.toFixed(1)}px</span>
                  </div>
                  <input
                    id="slider-letter-spacing"
                    type="range"
                    min="0"
                    max="3"
                    step="0.2"
                    value={letterSpacing}
                    onChange={(e) => updateSetting('letterSpacing', Number(e.target.value))}
                    aria-label="Letter Spacing"
                    aria-valuemin="0"
                    aria-valuemax="3"
                    aria-valuenow={letterSpacing}
                    aria-valuetext={`${letterSpacing.toFixed(1)} pixels`}
                    className="w-full accent-cyber-cyan cursor-pointer h-2 bg-dark-surface rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-dark-muted mt-0.5">
                    <span>0px</span>
                    <span>Default: 0px</span>
                    <span>3px</span>
                  </div>
                </div>

                {/* 4. Reading Column Max Width */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label htmlFor="slider-reading-width" className="text-slate-300 font-sans font-medium">
                      Reading Column Max Width
                    </label>
                    <span className="text-cyber-cyan font-bold">{readingWidth}px</span>
                  </div>
                  <input
                    id="slider-reading-width"
                    type="range"
                    min="500"
                    max="1000"
                    step="20"
                    value={readingWidth}
                    onChange={(e) => updateSetting('readingWidth', Number(e.target.value))}
                    aria-label="Reading Column Max Width"
                    aria-valuemin="500"
                    aria-valuemax="1000"
                    aria-valuenow={readingWidth}
                    aria-valuetext={`${readingWidth} pixels`}
                    className="w-full accent-cyber-cyan cursor-pointer h-2 bg-dark-surface rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-dark-muted mt-0.5">
                    <span>500px</span>
                    <span>Default: 720px</span>
                    <span>1000px</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                4. FOCUS AIDS (TOGGLES)
               ================================================================ */}
            <section aria-labelledby="focus-aids-heading" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 id="focus-aids-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Focus Aids
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">Cognitive & Visual Guides</span>
              </div>

              <div className="space-y-2.5">
                {/* A. Sentence Focus Mode */}
                <div className="p-3.5 rounded-xl bg-dark-card/60 border border-white/10 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Sentence Focus Mode
                    </span>
                    <p className="text-[11px] text-dark-muted mt-0.5">
                      Isolates one sentence, dims other content
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sentenceFocus}
                    aria-label="Sentence Focus Mode"
                    onClick={() => updateSetting('sentenceFocus', !sentenceFocus)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 p-0.5 ${
                      sentenceFocus ? 'bg-cyber-cyan' : 'bg-dark-surface border border-white/20'
                    }`}
                  >
                    <span 
                      className={`block w-5 h-5 rounded-full transition-transform ${
                        sentenceFocus ? 'bg-black translate-x-5' : 'bg-slate-400 translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* B. Reading Ruler Mask */}
                <div className="p-3.5 rounded-xl bg-dark-card/60 border border-white/10 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Reading Ruler Mask
                    </span>
                    <p className="text-[11px] text-dark-muted mt-0.5">
                      Follows mouse with a shaded guide
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={readingRuler}
                    aria-label="Reading Ruler Mask"
                    onClick={() => updateSetting('readingRuler', !readingRuler)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 p-0.5 ${
                      readingRuler ? 'bg-cyber-cyan' : 'bg-dark-surface border border-white/20'
                    }`}
                  >
                    <span 
                      className={`block w-5 h-5 rounded-full transition-transform ${
                        readingRuler ? 'bg-black translate-x-5' : 'bg-slate-400 translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* C. Bionic Reading Fixation */}
                <div className="p-3.5 rounded-xl bg-dark-card/60 border border-white/10 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Bionic Reading Fixation
                    </span>
                    <p className="text-[11px] text-dark-muted mt-0.5">
                      Bold words provide focus and guide eye across
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={bionicReading}
                    aria-label="Bionic Reading Fixation"
                    onClick={() => updateSetting('bionicReading', !bionicReading)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 p-0.5 ${
                      bionicReading ? 'bg-cyber-cyan' : 'bg-dark-surface border border-white/20'
                    }`}
                  >
                    <span 
                      className={`block w-5 h-5 rounded-full transition-transform ${
                        bionicReading ? 'bg-black translate-x-5' : 'bg-slate-400 translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* ================================================================
                LIVE READING PREVIEW (BENCHMARK TEST PARAGRAPH)
               ================================================================ */}
            <section aria-labelledby="preview-heading" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 id="preview-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Live Reading Preview
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">Benchmark Paragraph</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-card/90 border border-cyan-500/30 space-y-3 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono">
                  <span className="text-dark-muted">Case: <strong className="text-white">CASE-2026-001</strong></span>
                  <button
                    type="button"
                    onClick={() => speakText("Four independent evidence sources describe the payment request. However, the payment amount differs between the bank record and the communication records. The system has therefore classified the event as conflicting rather than selecting one source as correct.")}
                    className="px-2 py-0.5 rounded bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyan-300 border border-cyber-cyan/40 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                    title="Speak this benchmark paragraph"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                </div>

                <div className="reading-content text-xs leading-relaxed text-slate-200">
                  <SentenceFocusBlock
                    text="Four independent evidence sources describe the payment request. However, the payment amount differs between the bank record and the communication records. The system has therefore classified the event as conflicting rather than selecting one source as correct."
                  />
                </div>

                {/* Technical Token Integrity Check */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-dark-muted">
                  <span>Protected Technical Tokens:</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 border border-white/10">
                    <BionicText>EVD-003</BionicText>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 border border-white/10">
                    <BionicText>₹15,000</BionicText>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-purple-300 border border-white/10">
                    <BionicText>NPCI-UPI</BionicText>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-emerald-300 border border-white/10">
                    <BionicText>BTS-BHU-09</BionicText>
                  </span>
                </div>
              </div>
            </section>

            {/* ================================================================
                5. TEXT-TO-SPEECH (TTS)
               ================================================================ */}
            <section aria-labelledby="tts-heading" className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 id="tts-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Text-To-Speech (Web Speech API)
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">Native Audio Narrator</span>
              </div>

              {!isTTSSupported ? (
                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  Text-to-speech is not supported by this browser.
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-dark-card/60 border border-white/10 space-y-4">
                  {/* Reading Speed Slider */}
                  <div className="font-mono">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor="slider-tts-rate" className="text-slate-300 font-sans font-medium">
                        Reading Speed
                      </label>
                      <span className="text-cyber-cyan font-bold">{ttsRate.toFixed(1)}x</span>
                    </div>
                    <input
                      id="slider-tts-rate"
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={ttsRate}
                      onChange={(e) => updateSetting('ttsRate', Number(e.target.value))}
                      aria-label="Reading Speed"
                      aria-valuemin="0.5"
                      aria-valuemax="2.0"
                      aria-valuenow={ttsRate}
                      aria-valuetext={`${ttsRate.toFixed(1)}x speech velocity`}
                      className="w-full accent-cyber-cyan cursor-pointer h-2 bg-dark-surface rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-dark-muted mt-0.5">
                      <span>0.5x</span>
                      <span>Default: 1.0x</span>
                      <span>2.0x</span>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={readSelection}
                      className="flex-1 min-w-[130px] px-3 py-2 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      title="Read currently highlighted text"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Read Selection</span>
                    </button>

                    <button
                      type="button"
                      onClick={readPage}
                      className="flex-1 min-w-[110px] px-3 py-2 rounded-lg bg-dark-surface hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Read primary narrative on current page"
                    >
                      <Play className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Read Page</span>
                    </button>

                    {ttsStatus === 'speaking' ? (
                      <button
                        type="button"
                        onClick={pauseTTS}
                        className="px-3 py-2 rounded-lg bg-dark-surface hover:bg-white/10 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Pause narration"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </button>
                    ) : ttsStatus === 'paused' ? (
                      <button
                        type="button"
                        onClick={resumeTTS}
                        className="px-3 py-2 rounded-lg bg-dark-surface hover:bg-white/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Resume narration"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Resume</span>
                      </button>
                    ) : null}

                    {ttsStatus !== 'idle' && (
                      <button
                        type="button"
                        onClick={stopTTS}
                        className="px-2.5 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Stop narration"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop</span>
                      </button>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-dark-muted pt-1 border-t border-white/5">
                    <span>Engine: Native SpeechSynthesis</span>
                    <span className="flex items-center gap-1.5">
                      Status: 
                      {ttsStatus === 'speaking' ? (
                        <strong className="text-emerald-400">● Narrating...</strong>
                      ) : ttsStatus === 'paused' ? (
                        <strong className="text-amber-400">❚❚ Paused</strong>
                      ) : (
                        <span className="text-slate-400">Idle</span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </section>

            {/* ================================================================
                6. AI KEY (OPTIONAL)
               ================================================================ */}
            <section aria-labelledby="ai-key-heading" className="space-y-3 pb-2">
              <div className="flex items-center justify-between">
                <h3 id="ai-key-heading" className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  AI Key (Optional)
                </h3>
                <span className="text-[10px] text-dark-muted font-mono">Custom Cloud LLM</span>
              </div>

              <div className="p-4 rounded-xl bg-dark-card/60 border border-white/10 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  FraudTrace AI includes built-in grounded forensic algorithms that work automatically. If you want Google Gemini 1.5 Flash or OpenAI GPT-4o, configure below:
                </p>

                <div>
                  <label htmlFor="ai-provider-select" className="text-[11px] font-mono text-dark-muted uppercase block mb-1">
                    AI Provider
                  </label>
                  <select
                    id="ai-provider-select"
                    value={aiProvider}
                    onChange={(e) => updateSetting('aiProvider', e.target.value)}
                    className="w-full bg-dark-surface border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyber-cyan focus:outline-none cursor-pointer"
                  >
                    <option value="demo">Demo AI (Built-in Grounded Engine)</option>
                    <option value="gemini">Google Gemini 1.5 Flash</option>
                    <option value="openai">OpenAI GPT-4o</option>
                  </select>
                </div>

                {aiProvider !== 'demo' && (
                  <div>
                    <label htmlFor="ai-api-key-input" className="text-[11px] font-mono text-dark-muted uppercase block mb-1">
                      {aiProvider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="ai-api-key-input"
                        type={showApiKey ? 'text' : 'password'}
                        value={aiApiKey}
                        onChange={(e) => updateSetting('aiApiKey', e.target.value)}
                        placeholder="sk-..."
                        className="w-full pl-3 pr-16 py-2 bg-dark-surface border border-white/10 rounded-lg text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(prev => !prev)}
                        className="absolute right-1.5 px-2 py-1 rounded text-[10px] font-mono text-cyan-300 hover:bg-white/5"
                      >
                        {showApiKey ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-2 rounded bg-black/30 border border-white/5 text-[11px] font-mono text-dark-muted flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Demo AI works without an API key. Zero credentials committed.</span>
                </div>
              </div>
            </section>

          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
