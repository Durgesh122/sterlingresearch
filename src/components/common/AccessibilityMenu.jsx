import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaFont,
  FaTextHeight,
  FaAdjust,
  FaMousePointer,
  FaLink,
  FaVolumeUp,
  FaRedo,
  FaCheck,
  FaAlignLeft,
  FaAlignRight,
  FaEye,
  FaWalking,
  FaUniversalAccess,
  FaPalette,
} from 'react-icons/fa';
import { MdSpaceBar, MdFormatLineSpacing } from 'react-icons/md';

const AccessibilityMenu = ({ isOpen, onClose }) => {
  const defaultSettings = {
    textSize: 100,
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 400,
    contrast: 'default',
    saturation: 'normal',
    display: 'default',
    textAlign: 'default',
    dyslexicFont: false,
    stopAnimations: false,
    bigCursor: false,
    highlightLinks: false,
    textToSpeech: false,
    readingGuide: false,
    focusHighlight: true,
    hideImages: false,
  };

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('accessibility-settings-changed'));

    const root = document.documentElement;
    const body = document.body;

    root.style.fontSize = `${settings.textSize}%`;

    const styleId = 'accessibility-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const safeTextAlign = settings.textAlign === 'left' || settings.textAlign === 'right' ? settings.textAlign : 'initial';

    const css = `
      [data-accessibility-menu] {
        font-size: 14px !important;
        line-height: 1.4 !important;
        letter-spacing: normal !important;
      }

      [data-accessibility-menu] h2 {
        font-size: 20px !important;
        line-height: 1.25 !important;
      }

      [data-accessibility-menu] h3,
      [data-accessibility-menu] h4,
      [data-accessibility-menu] p,
      [data-accessibility-menu] span,
      [data-accessibility-menu] label,
      [data-accessibility-menu] button,
      [data-accessibility-menu] a {
        letter-spacing: normal !important;
      }

      body {
        letter-spacing: ${settings.letterSpacing}px !important;
        line-height: ${settings.lineHeight} !important;
        font-weight: ${settings.fontWeight} !important;
      }

      body p,
      body li,
      body h1,
      body h2,
      body h3,
      body h4,
      body h5,
      body h6,
      body label,
      body input,
      body textarea,
      body button,
      body a,
      body span,
      body div {
        ${settings.textAlign !== 'default' ? `text-align: ${safeTextAlign} !important;` : ''}
      }

      ${settings.dyslexicFont ? `
        body, body * {
          font-family: 'OpenDyslexic', 'Comic Sans MS', 'Segoe UI', sans-serif !important;
        }
      ` : ''}

      ${settings.highlightLinks ? `
        a, [role="button"] {
          text-decoration: underline !important;
          text-underline-offset: 3px !important;
          outline: 2px solid #d8a136 !important;
          outline-offset: 2px !important;
          border-radius: 6px !important;
        }
      ` : ''}

      ${settings.focusHighlight ? `
        *:focus-visible {
          outline: 3px solid #8f1038 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 4px rgba(143, 16, 56, 0.18) !important;
          border-radius: 8px !important;
        }
      ` : ''}

      ${settings.stopAnimations ? `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      ` : ''}
      ${settings.bigCursor ? `
        body, a, button, input, select, textarea, [role="button"] {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewport="0 0 48 48" style="fill:black;stroke:white;stroke-width:2px;"><path d="M10 10 L30 30 L20 30 L25 40 L20 42 L15 32 L10 36 Z" /></svg>'), auto !important;
        }
      ` : ''}

      ${settings.hideImages ? `
        img, video, svg, canvas, iframe {
          visibility: hidden !important;
        }
      ` : ''}
    `;

    styleTag.innerHTML = css;

    let filterString = '';

    if (settings.saturation === 'high') {
      filterString += ' saturate(200%)';
    } else if (settings.saturation === 'low') {
      filterString += ' saturate(50%)';
    }

    if (settings.display === 'monochrome') {
      filterString += ' grayscale(100%)';
    }

    let filterValue = filterString;
    if (settings.contrast === 'dark') {
      filterValue = `invert(1) hue-rotate(180deg) ${filterString}`;
      root.classList.add('dark-contrast-mode');
    } else if (settings.contrast === 'light') {
      filterValue = `brightness(1.18) ${filterString}`;
      root.classList.remove('dark-contrast-mode');
    } else {
      filterValue = filterString || 'none';
      root.classList.remove('dark-contrast-mode');
    }

    root.style.filter = filterValue;
  }, [settings]);

  useEffect(() => {
    if (!settings.readingGuide) {
      const existingGuide = document.getElementById('accessibility-reading-guide');
      if (existingGuide) existingGuide.remove();
      return;
    }

    let guide = document.getElementById('accessibility-reading-guide');
    if (!guide) {
      guide = document.createElement('div');
      guide.id = 'accessibility-reading-guide';
      guide.style.cssText = `
            position: fixed;
            left: 0;
            width: 100vw;
            height: 40px;
            background-color: rgba(255, 235, 59, 0.15);
            border-top: 4px solid #ef4444;
            border-bottom: 4px solid #ef4444;
            z-index: 2147483647;
            pointer-events: none;
            box-shadow: 0 0 0 100vh rgba(0, 0, 0, 0.3);
            transform: translateY(-50%);
            display: none;
        `;
      document.body.appendChild(guide);
    }

    const handleMouseMove = (e) => {
      if (guide) {
        guide.style.display = 'block';
        guide.style.top = `${e.clientY}px`;
      }
    };

    const handleTouchMove = (e) => {
      if (guide && e.touches[0]) {
        guide.style.display = 'block';
        guide.style.top = `${e.touches[0].clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        const existingGuide = document.getElementById('accessibility-reading-guide');
        if (existingGuide) existingGuide.remove();
    };
  }, [settings.readingGuide]);

  useEffect(() => {
    if (!settings.textToSpeech) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleMouseOver = (e) => {
      let target = e && e.target ? e.target : null;
      if (target && target.nodeType === 3) target = target.parentElement;
      if (!target || !target.innerText) return;

      const text = (target.innerText || target.textContent || '').trim();
      if (!text) return;

      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const hasHindi = /[\u0900-\u097F]/.test(text);
        utterance.lang = hasHindi ? 'hi-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
        if (target && target.classList) target.classList.add('tts-highlight');
      } catch (err) {
        // ignore TTS errors
      }
    };

    const handleMouseOut = (e) => {
      let target = e && e.target ? e.target : null;
      if (target && target.nodeType === 3) target = target.parentElement;
      if (target && target.classList) target.classList.remove('tts-highlight');
      try { window.speechSynthesis.cancel(); } catch (err) { /* ignore */ }
    };

    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    const styleId = 'tts-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        .tts-highlight {
          outline: 2px solid #2563eb !important;
          background-color: rgba(37, 99, 235, 0.1) !important;
          cursor: help !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

    return () => {
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      window.speechSynthesis.cancel();
      const tag = document.getElementById(styleId);
      if(tag) tag.remove();
    };
  }, [settings.textToSpeech]);

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset) => {
    if (preset === 'default') {
      setSettings(defaultSettings);
      return;
    }

    if (preset === 'lowVision') {
      setSettings((prev) => ({
        ...prev,
        textSize: 130,
        lineHeight: 1.8,
        letterSpacing: 1,
        contrast: 'dark',
        saturation: 'normal',
        display: 'default',
        focusHighlight: true,
        highlightLinks: true,
        bigCursor: true,
      }));
      return;
    }

    if (preset === 'dyslexia') {
      setSettings((prev) => ({
        ...prev,
        textSize: 120,
        lineHeight: 1.9,
        letterSpacing: 1,
        textAlign: 'left',
        fontWeight: 500,
        dyslexicFont: true,
        highlightLinks: true,
        focusHighlight: true,
      }));
    }
  };

  const activeClass = 'border-[#8f1038] bg-[#fff3d8] text-[#8f1038] shadow-md ring-2 ring-[#f5dca2]';
  const inactiveClass = 'border-gray-200 hover:border-[#d8a136] bg-white text-gray-700 hover:bg-[#fffaf0]';

  const actionToggles = [
    { key: 'highlightLinks', label: 'Highlight Links', icon: <FaLink /> },
    { key: 'focusHighlight', label: 'Focus Outline', icon: <FaEye /> },
    { key: 'bigCursor', label: 'Big Cursor', icon: <FaMousePointer /> },
    { key: 'dyslexicFont', label: 'Dyslexic Font', icon: <FaFont /> },
    { key: 'readingGuide', label: 'Reading Guide', icon: <FaTextHeight /> },
    { key: 'textToSpeech', label: 'Text to Speech', icon: <FaVolumeUp /> },
    { key: 'stopAnimations', label: 'Pause Animations', icon: <FaWalking /> },
    { key: 'hideImages', label: 'Hide Images', icon: <FaEye /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
        {/* Backdrop - Transparent so user can see changes */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent z-[9999]"
            aria-hidden="true"
        />
        
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          data-accessibility-menu="true"
          className="fixed top-0 right-0 h-full w-[92vw] sm:w-[360px] lg:w-[380px] max-w-[380px] bg-white shadow-2xl z-[10000] overflow-y-auto text-gray-900 flex flex-col border-l border-[#eadfc8]"
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility Options"
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-[#eadfc8] flex justify-between items-center bg-white/95 backdrop-blur sticky top-0 z-20 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-800">
              <span className="p-1.5 sm:p-2 bg-[#fff3d8] rounded-lg text-[#8f1038]">
                <FaUniversalAccess size={18} /> 
              </span>
              Accessibility
            </h2>
            <div className="flex gap-2">
                <button 
                    onClick={resetSettings}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#8f1038] px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#d8a136] bg-white hover:bg-[#fffaf0] transition-all focus:outline-none focus:ring-2 focus:ring-[#f2d9a2]"
                    title="Reset all settings"
                >
                    <FaRedo size={12} /> Reset
                </button>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-label="Close accessibility menu"
                >
                    <FaTimes size={20} />
                </button>
            </div>
          </div>

          <div className="flex-1 p-3 sm:p-4 space-y-5 sm:space-y-6 pb-24 overflow-x-hidden text-sm">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Quick Presets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => applyPreset('default')}
                  className="px-3 py-2 rounded-xl border border-gray-200 hover:border-[#d8a136] bg-white text-gray-700 font-semibold text-sm transition-colors"
                >
                  Default
                </button>
                <button
                  onClick={() => applyPreset('lowVision')}
                  className="px-3 py-2 rounded-xl border border-gray-200 hover:border-[#d8a136] bg-white text-gray-700 font-semibold text-sm transition-colors"
                >
                  Low Vision
                </button>
                <button
                  onClick={() => applyPreset('dyslexia')}
                  className="px-3 py-2 rounded-xl border border-gray-200 hover:border-[#d8a136] bg-white text-gray-700 font-semibold text-sm transition-colors"
                >
                  Dyslexia Assist
                </button>
              </div>
            </div>
            
            {/* Text Properties Group */}
            <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Text Adjustments</h3>
                
                {/* Text Size */}
                <section>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                        <FaFont className="text-[#8f1038]" /> Font Size
                    </h4>
                    <span className="text-sm font-bold text-[#8f1038] bg-[#fff3d8] px-2 py-0.5 rounded">{settings.textSize}%</span>
                </div>
                <div className="bg-gray-100 p-1.5 rounded-xl flex items-center justify-between shadow-inner">
                    <button 
                        onClick={() => updateSetting('textSize', Math.max(70, settings.textSize - 10))}
                        className="w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow hover:bg-white text-lg font-bold text-gray-700 active:scale-95 transition-all flex items-center justify-center focus:ring-2 focus:ring-[#f2d9a2]"
                        aria-label="Decrease text size"
                    >A-</button>
                    
                    {/* Visual Indicator Bar */}
                    <div className="flex-1 px-4 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                        <div className="h-full bg-[#8f1038] rounded-full transition-all duration-300" style={{ width: `${((settings.textSize - 70) / 130) * 100}%` }}></div>
                    </div>

                    <button 
                        onClick={() => updateSetting('textSize', Math.min(200, settings.textSize + 10))}
                        className="w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow hover:bg-white text-xl font-bold text-gray-700 active:scale-95 transition-all flex items-center justify-center focus:ring-2 focus:ring-[#f2d9a2]"
                        aria-label="Increase text size"
                    >A+</button>
                </div>
                </section>

                {/* Font Weight */}
                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                      <FaTextHeight className="text-[#8f1038]" /> Font Weight
                    </h4>
                    <span className="text-sm font-bold text-[#8f1038] bg-[#fff3d8] px-2 py-0.5 rounded">{settings.fontWeight}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[300, 400, 500, 700].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => updateSetting('fontWeight', weight)}
                        className={`py-2 rounded-lg border font-semibold ${settings.fontWeight === weight ? activeClass : inactiveClass}`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Spacing & Height Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Letter Spacing */}
                    <section>
                        <h4 className="font-semibold mb-2 text-sm text-gray-600 flex items-center gap-2"><MdSpaceBar /> Letter Spacing</h4>
                        <div className="bg-gray-100 p-1.5 rounded-xl flex items-center justify-between shadow-inner">
                            <button 
                                onClick={() => updateSetting('letterSpacing', Math.max(-2, settings.letterSpacing - 1))}
                                className="w-10 h-10 bg-white rounded-lg shadow-sm font-bold text-gray-600 hover:text-blue-600 active:scale-95 transition-all text-lg"
                            >-</button>
                          <span className="font-bold text-[#8f1038]">{settings.letterSpacing}px</span>
                            <button 
                                onClick={() => updateSetting('letterSpacing', Math.min(10, settings.letterSpacing + 1))}
                                className="w-10 h-10 bg-white rounded-lg shadow-sm font-bold text-gray-600 hover:text-blue-600 active:scale-95 transition-all text-lg"
                            >+</button>
                        </div>
                    </section>
                    
                    {/* Line Height */}
                    <section>
                        <h4 className="font-semibold mb-2 text-sm text-gray-600 flex items-center gap-2"><MdFormatLineSpacing /> Line Height</h4>
                        <div className="bg-gray-100 p-1.5 rounded-xl flex items-center justify-between shadow-inner">
                            <button 
                                onClick={() => updateSetting('lineHeight', Math.max(1, settings.lineHeight - 0.1))}
                                className="w-10 h-10 bg-white rounded-lg shadow-sm font-bold text-gray-600 hover:text-blue-600 active:scale-95 transition-all text-lg"
                            >-</button>
                          <span className="font-bold text-[#8f1038]">{settings.lineHeight.toFixed(1)}</span>
                            <button 
                                onClick={() => updateSetting('lineHeight', Math.min(3, settings.lineHeight + 0.1))}
                                className="w-10 h-10 bg-white rounded-lg shadow-sm font-bold text-gray-600 hover:text-blue-600 active:scale-95 transition-all text-lg"
                            >+</button>
                        </div>
                    </section>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Visuals Group */}
            <div className="space-y-6">
                 <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Content Visuals</h3>
                 
                {/* Contrast */}
                <section>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-700"><FaAdjust className="text-[#8f1038]" /> Contrast</h3>
                <div className="grid grid-cols-3 gap-3">
                    {['default', 'dark', 'light'].map(mode => (
                    <button
                        key={mode}
                        onClick={() => updateSetting('contrast', mode)}
                        className={`p-3 rounded-xl border-2 transition-all capitalize font-medium text-sm sm:text-base flex flex-col items-center gap-1 ${
                        settings.contrast === mode ? activeClass : inactiveClass
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-full border mb-1 ${
                            mode === 'default' ? 'bg-gray-100 border-gray-300' : 
                            mode === 'dark' ? 'bg-black border-gray-600' : 'bg-white border-gray-200'
                        }`} />
                        {mode}
                    </button>
                    ))}
                </div>
                </section>

                <section>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-700"><FaPalette className="text-[#8f1038]" /> Saturation</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['normal', 'high', 'low'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => updateSetting('saturation', mode)}
                        className={`p-3 rounded-xl border-2 transition-all capitalize font-medium text-sm sm:text-base ${settings.saturation === mode ? activeClass : inactiveClass}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-700"><FaEye className="text-[#8f1038]" /> Display Mode</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['default', 'monochrome'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => updateSetting('display', mode)}
                        className={`p-3 rounded-xl border-2 transition-all capitalize font-medium text-sm sm:text-base ${settings.display === mode ? activeClass : inactiveClass}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-700"><FaAlignLeft className="text-[#8f1038]" /> Text Alignment</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'default', label: 'Default', icon: <FaAlignLeft /> },
                      { key: 'left', label: 'Left', icon: <FaAlignLeft /> },
                      { key: 'right', label: 'Right', icon: <FaAlignRight /> },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => updateSetting('textAlign', item.key)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium text-sm flex items-center justify-center gap-2 ${settings.textAlign === item.key ? activeClass : inactiveClass}`}
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Toggles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {actionToggles.map(item => (
                        <button
                            key={item.key}
                            onClick={() => updateSetting(item.key, !settings[item.key])}
                            className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all shadow-sm group ${
                                settings[item.key] ? activeClass : inactiveClass
                            }`}
                        >
                            <span className="flex items-center gap-3 font-medium">
                                <span className={`p-2 rounded-lg transition-colors ${
                                    settings[item.key] ? 'bg-[#f5dca2] text-[#8f1038]' : 'bg-gray-100 text-gray-500 group-hover:bg-[#fff3d8] group-hover:text-[#8f1038]'
                                }`}>{item.icon}</span> 
                                <span className="text-sm sm:text-base">{item.label}</span>
                            </span>
                            {settings[item.key] && <FaCheck className="text-[#8f1038]" />}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full py-4 mt-8 bg-gradient-to-r from-[#8f1038] to-[#d8a136] text-white rounded-xl font-bold shadow-lg shadow-[#8f1038]/30 hover:shadow-[#8f1038]/50 hover:from-[#7a122f] hover:to-[#c9922e] transition-all text-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <FaCheck /> Close & Save
            </button>

          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


export default AccessibilityMenu;
