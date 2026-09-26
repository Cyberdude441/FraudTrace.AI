import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'fraudtrace-accessibility-settings';

const DEFAULT_SETTINGS = {
  theme: 'slate-dark',
  fontFamily: 'inter',
  fontSize: 16,
  lineHeight: 1.6,
  letterSpacing: 0,
  readingWidth: 720,
  sentenceFocus: false,
  readingRuler: false,
  bionicReading: false,
  ttsRate: 1.0,
  aiProvider: 'demo',
  aiApiKey: ''
};

const FONT_MAP = {
  inter: "'Inter', system-ui, -apple-system, sans-serif",
  opendyslexic: "'OpenDyslexic', 'Comic Sans MS', sans-serif",
  lexend: "'Lexend', Arial, sans-serif",
  atkinson: "'Atkinson Hyperlegible', Arial, sans-serif",
  merriweather: "'Merriweather', Georgia, serif"
};

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  // Load initial settings from localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load accessibility settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('idle'); // 'idle' | 'speaking' | 'paused'
  const [toastMessage, setToastMessage] = useState(null);
  const triggerButtonRef = useRef(null);
  const speechRef = useRef(null);

  // Check TTS browser support
  const isTTSSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Persist to localStorage whenever settings change
  useEffect(() => {
    try {
      // Exclude API key from persistent storage if desired, but user asked to store in localStorage/memory
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save accessibility settings to localStorage', e);
    }
  }, [settings]);

  // Apply settings to document DOM
  useEffect(() => {
    const root = document.documentElement;

    // 1. Theme
    root.setAttribute('data-theme', settings.theme);

    // 2. Font family
    const fontCss = FONT_MAP[settings.fontFamily] || FONT_MAP.inter;
    root.style.setProperty('--font-family-base', fontCss);

    // 3. Spacing & Sizing
    root.style.setProperty('--font-size-base', `${settings.fontSize}px`);
    root.style.setProperty('--line-height-base', `${settings.lineHeight}`);
    root.style.setProperty('--letter-spacing-base', `${settings.letterSpacing}px`);
    root.style.setProperty('--reading-width', `${settings.readingWidth}px`);

    // 4. Focus Aids
    root.setAttribute('data-sentence-focus', settings.sentenceFocus ? 'true' : 'false');
    root.setAttribute('data-bionic', settings.bionicReading ? 'true' : 'false');
  }, [settings]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Global Keyboard shortcuts: Alt + A to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + A (or Option + A on Mac)
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsDrawerOpen(prev => {
          const next = !prev;
          if (!next && triggerButtonRef.current) {
            triggerButtonRef.current.focus();
          }
          return next;
        });
      } else if (e.key === 'Escape' && isDrawerOpen) {
        e.preventDefault();
        setIsDrawerOpen(false);
        if (triggerButtonRef.current) {
          triggerButtonRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Update specific setting
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  // Reset to default
  const resetSettings = useCallback(() => {
    stopTTS();
    setSettings(DEFAULT_SETTINGS);
    setToastMessage('Accessibility settings reset.');
  }, []);

  // Drawer handlers
  const openDrawer = useCallback((triggerEl = null) => {
    if (triggerEl) triggerButtonRef.current = triggerEl;
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    if (triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  }, []);

  const toggleDrawer = useCallback((triggerEl = null) => {
    if (triggerEl) triggerButtonRef.current = triggerEl;
    setIsDrawerOpen(prev => {
      const next = !prev;
      if (!next && triggerButtonRef.current) {
        triggerButtonRef.current.focus();
      }
      return next;
    });
  }, []);

  // Text-To-Speech Implementation using Web Speech API
  const stopTTS = useCallback(() => {
    if (isTTSSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setTtsStatus('idle');
    }
  }, [isTTSSupported]);

  const pauseTTS = useCallback(() => {
    if (isTTSSupported && window.speechSynthesis && ttsStatus === 'speaking') {
      window.speechSynthesis.pause();
      setTtsStatus('paused');
    }
  }, [isTTSSupported, ttsStatus]);

  const resumeTTS = useCallback(() => {
    if (isTTSSupported && window.speechSynthesis && ttsStatus === 'paused') {
      window.speechSynthesis.resume();
      setTtsStatus('speaking');
    }
  }, [isTTSSupported, ttsStatus]);

  const speakText = useCallback((rawText) => {
    if (!isTTSSupported || !rawText) return;

    stopTTS();

    // Clean text: strip technical headers, JSON brackets, extra symbols
    const cleanText = rawText
      .replace(/\[EVD-\d+\]/g, '')
      .replace(/[{}[\]_#*]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = settings.ttsRate || 1.0;
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => setTtsStatus('speaking');
    utterance.onend = () => setTtsStatus('idle');
    utterance.onerror = (e) => {
      console.warn('TTS error', e);
      setTtsStatus('idle');
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isTTSSupported, settings.ttsRate, stopTTS]);

  // Read current user selection
  const readSelection = useCallback(() => {
    const selected = window.getSelection()?.toString();
    if (selected && selected.trim()) {
      speakText(selected);
      setToastMessage('Reading selected text...');
    } else {
      setToastMessage('No text selected. Highlight any sentence to read.');
    }
  }, [speakText]);

  // Read primary page content
  const readPage = useCallback(() => {
    // Select main article / report / evidence container, excluding nav & code
    const mainEl = document.querySelector('main') || document.body;
    const textNodes = [];

    // Collect readable paragraphs and headers
    const elements = mainEl.querySelectorAll('h1, h2, h3, h4, p, .sentence-item, .reading-content');
    elements.forEach(el => {
      // Skip nav, badges, buttons, raw json, footer
      if (
        !el.closest('nav') &&
        !el.closest('button') &&
        !el.closest('aside') &&
        !el.closest('.print\\:hidden') &&
        el.innerText &&
        el.innerText.trim().length > 10
      ) {
        textNodes.push(el.innerText.trim());
      }
    });

    const fullText = textNodes.join('. ');
    if (fullText.trim()) {
      speakText(fullText.slice(0, 4000)); // Read first ~4000 chars for smooth performance
      setToastMessage('Reading primary page content...');
    } else {
      setToastMessage('No readable text found on this page.');
    }
  }, [speakText]);

  // Determine if settings differ from default
  const isSettingsActive = (
    settings.theme !== DEFAULT_SETTINGS.theme ||
    settings.fontFamily !== DEFAULT_SETTINGS.fontFamily ||
    settings.fontSize !== DEFAULT_SETTINGS.fontSize ||
    settings.lineHeight !== DEFAULT_SETTINGS.lineHeight ||
    settings.letterSpacing !== DEFAULT_SETTINGS.letterSpacing ||
    settings.readingWidth !== DEFAULT_SETTINGS.readingWidth ||
    settings.sentenceFocus ||
    settings.readingRuler ||
    settings.bionicReading ||
    settings.ttsRate !== DEFAULT_SETTINGS.ttsRate ||
    settings.aiProvider !== DEFAULT_SETTINGS.aiProvider
  );

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        updateSetting,
        resetSettings,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        triggerButtonRef,
        isSettingsActive,
        ttsStatus,
        isTTSSupported,
        speakText,
        pauseTTS,
        resumeTTS,
        stopTTS,
        readSelection,
        readPage,
        toastMessage,
        setToastMessage
      }}
    >
      {children}

      {/* Accessibility Status Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-dark-surface/95 border border-cyan-500/40 shadow-2xl text-xs font-mono text-cyan-300 flex items-center gap-2 glass-panel-elevated animate-fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return ctx;
}
