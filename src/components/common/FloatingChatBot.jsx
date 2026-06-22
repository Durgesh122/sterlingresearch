import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Send, Minus, AlertCircle, Lightbulb, LightbulbOff } from 'lucide-react';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase';
import { useTheme } from '../../context/ThemeContext';
import botImg from '../../assets/AIChat.png';

const FloatingChatBot = ({ isMobileNav = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'
    const [step, setStep] = useState('language'); // flow control: language -> name -> mobile -> city -> experience -> goal -> risk -> end
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        city: '',
        experience: '',
        goal: '',
        risk: ''
        // additional fields like email could be added here
    });

    // Initial State
    const [messages, setMessages] = useState([
        { 
            id: 'init-1', 
            text: "Namaste! Welcome to Sterling Research. Please select your preferred language.", 
            sender: 'bot',
            type: 'language-selector'
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState("");
    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);

    const { theme, toggleTheme } = useTheme();
    const complianceNote = language === 'en'
        ? 'SEBI RA guidance only. No guaranteed returns.'
        : 'केवल SEBI RA मार्गदर्शन। रिटर्न की कोई गारंटी नहीं।';

    const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, error]); // Scroll on error too

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleOutsideInteraction = (event) => {
            if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideInteraction);
        document.addEventListener('touchstart', handleOutsideInteraction);

        return () => {
            document.removeEventListener('mousedown', handleOutsideInteraction);
            document.removeEventListener('touchstart', handleOutsideInteraction);
        };
    }, [isOpen]);

    // --- Helper for adding bot messages with delay ---
    const addBotMessage = (text, options = null, delay = 800) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: generateId(),
                text: text,
                sender: 'bot',
                options: options
            }]);
            setIsTyping(false);
        }, delay);
    };

    // --- Flow Logic ---

    const handleLanguageSelect = (lang) => {
        setLanguage(lang);
        const langText = lang === 'en' ? "English" : "हिंदी";
        
        // Add user selection
        setMessages(prev => [...prev, { id: generateId(), text: langText, sender: 'user' }]);
        
        // Move to next step
        setStep('name');
        
        const question = lang === 'en' 
            ? "To assist you better and comply with SEBI norms, we need a few details. May I know your full name?"
            : "आपको बेहतर सहायता देने और सेबी (SEBI) नियमों का पालन करने के लिए, हमें कुछ विवरणों की आवश्यकता है। क्या मैं आपका पूरा नाम जान सकता हूँ?";
            
        addBotMessage(question);
    };

    const processStep = (input) => {
        setError(""); // Clear errors
        let nextStep = step;
        let botResponseText = "";
        let botOptions = null;
        let isValid = true;

        switch (step) {
            case 'name':
                if (input.trim().length < 3) {
                    setError(language === 'en' ? "Please enter a valid name (min 3 chars)." : "कृपया मान्य नाम दर्ज करें (न्यूनतम 3 अक्षर)।");
                    isValid = false;
                } else {
                    setUserData({ ...userData, name: input });
                    nextStep = 'mobile';
                    botResponseText = language === 'en' 
                        ? `Thanks ${input}. Please share your 10-digit mobile number so our team can connect.`
                        : `धन्यवाद ${input}। कृपया अपना 10-अंकीय मोबाइल नंबर साझा करें ताकि हमारी टीम कनेक्ट कर सके।`;
                }
                break;

            case 'mobile':
                 // Basic Indian mobile validation (starting with 6-9, 10 digits)
                const mobileRegex = /^[6-9]\d{9}$/;
                if (!mobileRegex.test(input)) {
                     setError(language === 'en' ? "Please enter a valid 10-digit mobile number." : "कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।");
                     isValid = false;
                } else {
                    setUserData({ ...userData, mobile: input });
                    nextStep = 'city';
                    botResponseText = language === 'en'
                        ? "Great! Which city are you currently located in?"
                        : "बहुत बढ़िया! आप वर्तमान में किस शहर में स्थित हैं?";
                }
                break;

            case 'city':
                if (input.trim().length < 2) {
                     setError(language === 'en' ? "Please enter a valid city name." : "कृपया मान्य शहर का नाम दर्ज करें।");
                     isValid = false;
                } else {
                    setUserData({ ...userData, city: input });
                    nextStep = 'experience'; // Start Risk Profiling
                    botResponseText = language === 'en'
                        ? "Now, a few quick questions for SEBI Risk Profiling. What is your investment experience?"
                        : "अब, सेबी (SEBI) रिस्क प्रोफाइलिंग के लिए कुछ त्वरित प्रश्न। आपका निवेश अनुभव क्या है?";
                    botOptions = language === 'en' 
                        ? ["Beginner (<1 Yr)", "Intermediate (1-3 Yrs)", "Expert (3+ Yrs)"]
                        : ["शुरुआती (<1 वर्ष)", "मध्यम (1-3 वर्ष)", "विशेषज्ञ (3+ वर्ष)"];
                }
                break;
            
            // For option-based steps (experience, goal, risk), we handle clicks in handleOptionSelect.
            // However, if user TYPES an answer, we can try to catch it or just prompt them to select.
            case 'experience':
            case 'goal':
            case 'risk':
                 // Optional: Fuzzy match input to options or assume button click is preferred.
                 setError(language === 'en' ? "Please select an option from below." : "कृपया नीचे दिए गए विकल्पों में से चुनें।");
                 isValid = false;
                 break;

            case 'end':
                botResponseText = language === 'en' 
                    ? "We have already received your details. Someone will call you shortly."
                    : "हमें आपका विवरण पहले ही मिल चुका है। कोई आपको जल्द ही कॉल करेगा।";
                break;

            default:
                break;
        }

        if (isValid && nextStep !== step) {
             setStep(nextStep);
             addBotMessage(botResponseText, botOptions);
        }
    };

    const handleOptionSelect = (optionText) => {
        setError("");
        // Record the option chosen
        let nextStep = step;
        let botResponseText = "";
        let botOptions = null;
        let updatedData = { ...userData };

        // Visual feedback for user choice
        setMessages(prev => [...prev, { id: generateId(), text: optionText, sender: 'user' }]);

        switch (step) {
            case 'experience':
                updatedData.experience = optionText;
                setUserData(updatedData);
                nextStep = 'goal';
                botResponseText = language === 'en'
                    ? "What is your primary investment goal?"
                    : "आपका प्राथमिक निवेश लक्ष्य क्या है?";
                botOptions = language === 'en'
                    ? ["Capital Appreciation", "Regular Income", "Long-term Wealth"]
                    : ["पूंजी वृद्धि", "नियमित आय", "दीर्घकालिक धन"];
                break;

            case 'goal':
                updatedData.goal = optionText;
                setUserData(updatedData);
                nextStep = 'risk';
                botResponseText = language === 'en'
                    ? "How would you describe your risk appetite?"
                    : "आप अपनी जोखिम लेने की क्षमता का वर्णन कैसे करेंगे?";
                botOptions = language === 'en'
                    ? ["Low (Conservative)", "Medium (Balanced)", "High (Aggressive)"]
                    : ["कम (रूढ़िवादी)", "मध्यम (संतुलित)", "उच्च (आक्रामक)"];
                break;
            
            case 'risk':
                updatedData.risk = optionText;
                setUserData(updatedData);
                nextStep = 'end';
                botResponseText = language === 'en'
                    ? "Thank you! We have recorded your profile. Our SEBI registered research analyst will analyze your needs and connect with you shortly."
                    : "धन्यवाद! हमने आपकी प्रोफ़ाइल रिकॉर्ड कर ली है। हमारे सेबी पंजीकृत अनुसंधान विश्लेषक आपकी आवश्यकताओं का विश्लेषण करेंगे और जल्द ही आपसे संपर्क करेंगे।";

                 // Save to Firebase
                const leadsRef = ref(database, 'chat_leads');
                push(leadsRef, {
                    ...updatedData,
                    submittedAt: new Date().toISOString(),
                    segment: "Chat Lead" 
                }).catch((error) => console.error("Error saving lead:", error));

                break;
            
            case 'end': // Main Menu Loop if needed after completion
                 if (optionText.includes('Menu') || optionText.includes('मेनू')) {
                    // Reset or show menu?
                 }
                 break;
        }

        if (nextStep !== step) {
            setStep(nextStep);
            addBotMessage(botResponseText, botOptions);
        }
    };


    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { id: generateId(), text: inputText, sender: 'user' }]);
        const currentInput = inputText;
        setInputText("");
        
        // Process
        processStep(currentInput);
    };

        const chatWindowMarkup = (
                                <div
            ref={chatWindowRef}
            className={`floating-chatbot-root bg-white shadow-2xl overflow-hidden border-2 border-[#1a7f55] flex flex-col pointer-events-auto
        ${isMobileNav 
            ? 'fixed bottom-[15%] left-0 right-0 mx-auto z-[10000] w-[90vw] sm:w-[420px] rounded-lg shadow-[0_0_9999px_rgba(0,0,0,0.5)]' 
                        : 'fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-24 sm:left-6 sm:translate-x-0 z-[10000] w-[92vw] sm:w-[450px] max-w-[450px] mb-4 rounded-lg'}`}
      style={{ 
                    height: isMobileNav ? 'min(550px, 78vh)' : 'min(620px, 80vh)', 
          maxHeight: '75vh', 
          transformOrigin: 'bottom'
      }}
    >
      {/* Header - PNB Red */}
    <div className="bg-gradient-to-r from-[#8f1038] via-[#A20A3C] to-[#8f1038] p-2 sm:p-2.5 flex items-center justify-between shrink-0 shadow-md relative overflow-hidden border-b border-[#d8a136]/40">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-5 -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-2 sm:gap-2.5 relative z-10 min-w-0">
            <div className="shrink-0">
                <img 
                    src={botImg} 
                    alt="Bot" 
                    className="w-9 h-9 sm:w-11 sm:h-11 object-contain animate-bounce [animation-duration:2.8s] [animation-timing-function:ease-in-out]"
                    onError={(e) => {e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png"}} 
                />
            </div>
            <div className="min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight truncate tracking-wide">Sterling Assistant</h3>
                <p className="text-[#f4cf77] text-[11px] sm:text-xs font-medium truncate">Research Help Desk</p>
            </div>
        </div>
        <div className="flex gap-2 text-white">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="hover:bg-white/20 p-1.5 rounded-md transition-colors shrink-0">
                {theme === 'dark' ? <LightbulbOff size={18} /> : <Lightbulb size={18} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-md transition-colors shrink-0">
                <Minus size={20} />
            </button>
        </div>
      </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#f8f5ee] dark:bg-gray-800 space-y-4" 
                   style={{ 
                       backgroundImage: 'radial-gradient(rgba(143,16,56,0.1) 1px, transparent 1px)', 
                       backgroundSize: '18px 18px' 
                   }}>
                 
                 {/* Timestamp / Date separator */}
                 <div className="flex justify-center">
                     <span className="text-[10px] text-[#7a122f] dark:text-[#f4cf77] bg-[#f7e8c2] dark:bg-gray-700 px-2 py-0.5 rounded-full border border-[#d8a136]/50">{complianceNote}</span>
                 </div>

                 {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        {msg.sender === 'bot' && (
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="text-[10px] text-[#8f1038] dark:text-[#f4cf77] font-bold tracking-wide">Assistant</span>
                             </div>
                        )}

                        {/* Special Language Selector Message Type */}
                        {msg.type === 'language-selector' ? (
                            <div className="bg-white p-4 shadow-sm border border-[#e6d8b6] max-w-[88%] rounded-md">
                                <p className="text-gray-800 text-sm mb-3 font-medium leading-relaxed">{msg.text}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => handleLanguageSelect('en')} 
                                        className="py-1.5 px-3 bg-[#fff7e7] hover:bg-[#fceac3] text-[#8f1038] border border-[#d8a136]/60 text-sm font-semibold transition-colors rounded-md"
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => handleLanguageSelect('hi')} 
                                        className="py-1.5 px-3 bg-[#fff7e7] hover:bg-[#fceac3] text-[#8f1038] border border-[#d8a136]/60 text-sm font-semibold transition-colors font-hindi rounded-md"
                                    >
                                        हिंदी
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`max-w-[88%] p-3 text-sm shadow-sm whitespace-pre-wrap leading-relaxed rounded-md ${
                                msg.sender === 'user' 
                                ? 'bg-gradient-to-r from-[#8f1038] to-[#A20A3C] text-white border border-[#7a122f]'
                                : 'bg-white text-gray-800 border border-[#e6d8b6] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
                            }`}>
                                {msg.text}
                            </div>
                        )}

                          </div>
                 ))}

                 {/* Options Chips */}
                 {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && (
                     <div className="flex flex-wrap gap-2 pl-2">
                        {messages[messages.length - 1].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(opt)}
                                className="text-xs bg-white text-[#8f1038] border border-[#d8a136] hover:bg-[#8f1038] hover:text-white px-3 py-1.5 transition-all shadow-sm font-medium rounded-md"
                            >
                                {opt}
                            </button>
                        ))}
                     </div>
                 )}

                 {isTyping && (
                     <div className="flex justify-start items-end gap-2">
                         <img 
                            src={botImg} 
                            className="w-7 h-7 sm:w-8 sm:h-8 object-contain border border-[#e6d8b6] bg-white p-0.5 rounded-sm" 
                            onError={(e) => {e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png"}}
                            alt="Typing..."
                         />
                         <div className="bg-white border border-[#e6d8b6] p-3 shadow-sm flex gap-1 items-center dark:bg-gray-700 dark:border-gray-600 rounded-md">
                             <div className="w-1.5 h-1.5 bg-[#8f1038] rounded-full"></div>
                             <div className="w-1.5 h-1.5 bg-[#8f1038] rounded-full"></div>
                             <div className="w-1.5 h-1.5 bg-[#8f1038] rounded-full"></div>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} />
              </div>

              {/* Error Toast in Chat */}
              {error && (
                    <div className="bg-red-100 text-red-600 text-xs px-4 py-2 flex items-center gap-2 border-t border-red-200">
                        <AlertCircle size={14} />
                        {error}
                    </div>
              )}

              {/* Input Area */}
              {step !== 'language' && !messages[messages.length-1].options && step !== 'end' && (
              <form onSubmit={handleSend} className="p-2.5 sm:p-3 bg-white border-t border-[#eadfc8] shrink-0 flex gap-2 items-center">
                  <div className="flex-1 relative">
                       <input
                        type={step === 'mobile' ? "tel" : "text"}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                            step === 'mobile' 
                            ? (language === 'en' ? "Enter 10-digit mobile..." : "10-अंकीय मोबाइल नंबर...")
                            : (language === 'en' ? "Type your message..." : "टाइप करें...")
                        }
                                             maxLength={step === 'mobile' ? 10 : 50}
                                                className="w-full bg-[#fbf8f2] dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm pl-4 pr-10 py-3 outline-none focus:ring-1 focus:ring-[#8f1038] border border-[#eadfc8] focus:border-[#8f1038] transition-all rounded-md"
                      />
                  </div>
                  <button 
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-[#8f1038] to-[#A20A3C] hover:from-[#7a122f] hover:to-[#8f1038] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 shadow-md transition-all flex items-center justify-center rounded-md"
                  >
                      <Send size={18} />
                  </button>
              </form>
              )}

              {/* Branding */}
              <div className="bg-[#fffaf0] dark:bg-gray-900 text-[9px] text-center text-[#6b5d47] dark:text-gray-300 py-1 border-t border-[#eadfc8] dark:border-gray-700 flex justify-center items-center gap-1 px-2">
                  <span>SEBI Reg. RA Support Desk</span>
                  <span className="text-[#8f1038]">|</span>
                  <span className="font-semibold text-[#8f1038]">No Guaranteed Returns</span>
              </div>
                        </div>
    );

  return (
    <>
      {/* Portal for Chat Window - Always mounted and visible */}
      {createPortal(
        <>
            {/* Backdrop Overlay for Mobile - Adds focus and dimming effect */}
            {isOpen && isMobileNav && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9995]"
                    style={{ touchAction: 'none' }}
                />
            )}

            {isOpen ? (
                chatWindowMarkup
            ) : (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chat"
                    className={`floating-chatbot-root fixed z-[10000] bg-transparent p-0 border-0 shadow-none
                        ${isMobileNav
                            ? 'bottom-4 right-3 sm:bottom-6 sm:right-4'
                            : 'bottom-4 left-3 sm:bottom-6 sm:left-6'}`}
                >
                    <img
                        src={botImg}
                        alt="Open Sterling Assistant"
                        className="w-[clamp(56px,18vw,120px)] h-[clamp(56px,18vw,120px)] object-contain animate-bounce [animation-duration:2.4s] [animation-timing-function:ease-in-out]"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png";
                        }}
                    />
                </button>
            )}
        </>, 
        document.body
       )}
    </>
  );
};

export default FloatingChatBot;
