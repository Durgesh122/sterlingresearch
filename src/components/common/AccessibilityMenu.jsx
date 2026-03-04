import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaFont, FaTextHeight, FaBold, FaAdjust, FaPalette, 
  FaMousePointer, FaLink, FaVolumeUp, FaRedo, FaCheck, 
  FaAlignLeft, FaAlignRight, FaEye, FaWalking, FaUniversalAccess, FaSave
} from 'react-icons/fa';
import { MdSpaceBar, MdFormatLineSpacing } from 'react-icons/md';

const AccessibilityMenu = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('accessibility-settings');
      return saved ? JSON.parse(saved) : {
        textSize: 100,
        letterSpacing: 0,
        lineHeight: 1.5,
        fontWeight: 400,
        contrast: 'default', // default, dark, light
        saturation: 'normal', // normal, high, low
        display: 'default', // default, monochrome
        textAlign: 'default', // default, left, right
        dyslexicFont: false,
        stopAnimations: false,

        bigCursor: false,
        highlightLinks: false,
        textToSpeech: false,
        readingGuide: false
      };
    } catch {
      return {
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
        readingGuide: false
      };
    }
  });

  // Apply settings to document
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('accessibility-settings-changed'));

    const root = document.documentElement;
    const body = document.body;

    // Text Size (Using percentages for better scaling)
    root.style.fontSize = `${settings.textSize}%`;

    // Letter Spacing
    body.style.letterSpacing = `${settings.letterSpacing}px`;

    // Line Height
    body.style.lineHeight = settings.lineHeight;

    // Font Weight & Text Align via CSS injection
    const styleId = 'accessibility-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    let css = `
      body * {
        font-weight: ${settings.fontWeight} !important;
        ${settings.textAlign !== 'default' ? `text-align: ${settings.textAlign} !important;` : ''}
      }
      ${settings.dyslexicFont ? `
        body, body * {
          font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif !important;
        }
      ` : ''}
      ${settings.highlightLinks ? `
        a, button, [role="button"] {
          text-decoration: underline !important;
          background-color: #ffeb3b !important; /* Yellow */
          color: #000000 !important;
          border: 2px solid #000000 !important;
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
    `;
    
    styleTag.innerHTML = css;

    // Filters (Contrast, Saturation, Monochrome)
    let filterString = '';
    
    // Saturation
    if (settings.saturation === 'high') {
      filterString += ' saturate(200%)';
    } else if (settings.saturation === 'low') {
      filterString += ' saturate(50%)';
    }

    // Monochrome
    if (settings.display === 'monochrome') {
      filterString += ' grayscale(100%)';
    }

    // Contrast Logic
    let filterValue = filterString;
    if (settings.contrast === 'dark') {
         filterValue = `invert(1) hue-rotate(180deg) ${filterString}`;
         root.classList.add('dark-contrast-mode');
    } else if (settings.contrast === 'light') {
         filterValue = `brightness(1.3) ${filterString}`;
         root.classList.remove('dark-contrast-mode');
    } else {
         filterValue = filterString || 'none';
         root.classList.remove('dark-contrast-mode');
    }
    
    root.style.filter = filterValue;

  }, [settings]);

  // Reading Guide Effect (Mouse Following)
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
            display: none; /* Hidden until mouse moves */
        `;
        document.body.appendChild(guide);
    }

    const handleMouseMove = (e) => {
        if(guide) {
            guide.style.display = 'block';
            guide.style.top = `${e.clientY}px`;
        }
    };

    // Also support touch move for mobile (though less common for a "cursor" guide)
    const handleTouchMove = (e) => {
        if(guide && e.touches[0]) {
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

  // Text to Speech Effect
  useEffect(() => {
    if (!settings.textToSpeech) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleMouseOver = (e) => {
      // Normalize target: if text node, use parent element. Guard against null.
      let target = e && e.target ? e.target : null;
      if (target && target.nodeType === 3) target = target.parentElement;
      if (!target || !target.innerText) return;

      const text = (target.innerText || target.textContent || '').trim();
      if (!text) return;

      // Cancel any previous utterance and speak the new one
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

    // Use touch events for mobile TTS support if needed, but tap might conflict with click.
    // Generally TTS on hover is desktop-first. For mobile, screen readers are built-in.
    // We'll keep mouseover/out for desktop.

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
    setSettings({
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
      readingGuide: false
    });
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Determine active theme color (using site blue/sky)
  const activeClass = 'border-blue-600 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-100';
  const inactiveClass = 'border-gray-200 hover:border-blue-400 bg-white text-gray-700 hover:bg-gray-50';

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
          className="fixed top-0 right-0 h-full w-[85vw] sm:w-[400px] max-w-[360px] sm:max-w-none bg-white shadow-2xl z-[10000] overflow-y-auto text-gray-900 flex flex-col border-l border-gray-200"
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility Options"
        >
          {/* Header */}
          <div className="p-3 sm:p-5 border-b border-gray-100 flex justify-between items-center bg-white/95 backdrop-blur sticky top-0 z-20 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-800">
              <span className="p-1.5 sm:p-2 bg-blue-100 rounded-lg text-blue-600">
                <FaUniversalAccess size={18} /> 
              </span>
              Accessibility
            </h2>
            <div className="flex gap-2">
                <button 
                    onClick={resetSettings}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-full border border-gray-200 hover:border-red-200 bg-gray-50 hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-200"
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

          <div className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-8 pb-32 overflow-x-hidden text-sm sm:text-base">
            
            {/* Text Properties Group */}
            <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Text Adjustments</h3>
                
                {/* Text Size */}
                <section>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                        <FaFont className="text-blue-500" /> Font Size
                    </h4>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{settings.textSize}%</span>
                </div>
                <div className="bg-gray-100 p-1.5 rounded-xl flex items-center justify-between shadow-inner">
                    <button 
                        onClick={() => updateSetting('textSize', Math.max(70, settings.textSize - 10))}
                        className="w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow hover:bg-gray-50 text-lg font-bold text-gray-700 active:scale-95 transition-all flex items-center justify-center focus:ring-2 focus:ring-blue-200"
                        aria-label="Decrease text size"
                    >A-</button>
                    
                    {/* Visual Indicator Bar */}
                    <div className="flex-1 px-4 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${((settings.textSize - 70) / 130) * 100}%` }}></div>
                    </div>

                    <button 
                        onClick={() => updateSetting('textSize', Math.min(200, settings.textSize + 10))}
                        className="w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow hover:bg-gray-50 text-xl font-bold text-gray-700 active:scale-95 transition-all flex items-center justify-center focus:ring-2 focus:ring-blue-200"
                        aria-label="Increase text size"
                    >A+</button>
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
                            <span className="font-bold text-blue-600">{settings.letterSpacing}px</span>
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
                            <span className="font-bold text-blue-600">{settings.lineHeight.toFixed(1)}</span>
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
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Content Visuals</h3>
                 
                {/* Contrast */}
                <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-700"><FaAdjust className="text-blue-500" /> Contrast</h3>
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

                {/* Toggles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { key: 'highlightLinks', label: 'Highlight Links', icon: <FaLink /> },
                        { key: 'bigCursor', label: 'Big Cursor', icon: <FaMousePointer /> },
                        { key: 'dyslexicFont', label: 'Dyslexic Font', icon: <FaFont /> },
                        { key: 'readingGuide', label: 'Reading Guide', icon: <FaTextHeight /> },
                        { key: 'textToSpeech', label: 'Text to Speech', icon: <FaVolumeUp /> },
                        { key: 'stopAnimations', label: 'Pause Animations', icon: <FaWalking /> },
                    ].map(item => (
                        <button
                            key={item.key}
                            onClick={() => updateSetting(item.key, !settings[item.key])}
                            className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all shadow-sm group ${
                                settings[item.key] ? activeClass : inactiveClass
                            }`}
                        >
                            <span className="flex items-center gap-3 font-medium">
                                <span className={`p-2 rounded-lg transition-colors ${
                                    settings[item.key] ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'
                                }`}>{item.icon}</span> 
                                <span className="text-sm sm:text-base">{item.label}</span>
                            </span>
                            {settings[item.key] && <FaCheck className="text-blue-600" />}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full py-4 mt-8 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all text-lg active:scale-[0.98] flex items-center justify-center gap-2"
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
