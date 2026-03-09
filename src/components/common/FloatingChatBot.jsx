import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Minus, X, Bot, AlertCircle } from 'lucide-react';
import { ref, push } from 'firebase/database';
import { database } from '../../firebase';

const FloatingChatBot = () => {
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

    const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, error]); // Scroll on error too

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

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[9000] flex flex-col items-start font-sans pointer-events-none">
        
        <div className="pointer-events-auto">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: "bottom left" }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-[350px] sm:w-[380px] max-w-[90vw] bg-white rounded-t-xl rounded-br-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col mb-4 ml-0 md:ml-2"
              style={{ maxHeight: '80vh', height: '520px' }}
            >
              {/* Header - PNB Red */}
              <div className="bg-[#A20A3C] p-3 flex items-center justify-between shrink-0 shadow-md relative overflow-hidden">
                {/* Decorative Pattern in Header */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-white p-1 rounded-full border-2 border-[#FABE2C]">
                        <img 
                            src="https://pnbcdn.talkk.ai/media/pihuGif.svg" 
                            alt="Bot" 
                            className="w-10 h-10 object-contain"
                            onError={(e) => {e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png"}} 
                        />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg leading-tight">Sterling Assistant</h3>
                        <p className="text-[#FABE2C] text-xs font-medium">Virtual Help Desk</p>
                    </div>
                </div>
                <div className="flex gap-2 text-white">
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded transition-colors">
                        <Minus size={20} />
                    </button>
                    {/* <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded transition-colors">
                        <X size={20} />
                    </button> */}
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#f4f4f4] space-y-4" 
                   style={{ 
                       backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)', 
                       backgroundSize: '20px 20px' 
                   }}>
                 
                 {/* Timestamp / Date separator */}
                 <div className="flex justify-center">
                     <span className="text-[10px] text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">Secure & SEBI Compliant</span>
                 </div>

                 {messages.map((msg) => (
                    <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        {msg.sender === 'bot' && (
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="text-[10px] text-[#A20A3C] font-bold">Assistant</span>
                             </div>
                        )}

                        {/* Special Language Selector Message Type */}
                        {msg.type === 'language-selector' ? (
                            <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm border border-gray-200 max-w-[85%]">
                                <p className="text-gray-800 text-sm mb-3 font-medium">{msg.text}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => handleLanguageSelect('en')} 
                                        className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-[#A20A3C] border border-[#A20A3C]/30 rounded text-sm font-semibold transition-colors"
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => handleLanguageSelect('hi')} 
                                        className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-[#A20A3C] border border-[#A20A3C]/30 rounded text-sm font-semibold transition-colors font-hindi"
                                    >
                                        हिंदी
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`max-w-[85%] p-3 text-sm shadow-sm whitespace-pre-wrap leading-relaxed ${
                                msg.sender === 'user' 
                                ? 'bg-[#A20A3C] text-white rounded-2xl rounded-tr-none' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        )}

                    </motion.div>
                 ))}

                 {/* Options Chips */}
                 {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && (
                     <div className="flex flex-wrap gap-2 pl-2">
                        {messages[messages.length - 1].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(opt)}
                                className="text-xs bg-white text-[#A20A3C] border border-[#A20A3C] hover:bg-[#A20A3C] hover:text-white px-3 py-1.5 rounded-full transition-all shadow-sm font-medium"
                            >
                                {opt}
                            </button>
                        ))}
                     </div>
                 )}

                 {isTyping && (
                     <div className="flex justify-start items-end gap-2">
                         <img 
                            src="https://pnbcdn.talkk.ai/media/pihuGif.svg" 
                            className="w-6 h-6 rounded-full border border-gray-200 bg-white p-0.5" 
                            onError={(e) => {e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png"}}
                            alt="Typing..."
                         />
                         <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex gap-1 items-center">
                             <div className="w-1.5 h-1.5 bg-[#A20A3C] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                             <div className="w-1.5 h-1.5 bg-[#A20A3C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                             <div className="w-1.5 h-1.5 bg-[#A20A3C] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} />
              </div>

              {/* Error Toast in Chat */}
              <AnimatePresence>
                  {error && (
                        <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-100 text-red-600 text-xs px-4 py-2 flex items-center gap-2 border-t border-red-200"
                        >
                            <AlertCircle size={14} />
                            {error}
                        </motion.div>
                  )}
              </AnimatePresence>

              {/* Input Area */}
              {step !== 'language' && !messages[messages.length-1].options && step !== 'end' && (
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 shrink-0 flex gap-2 items-center">
                  <div className="flex-1 relative">
                       <input
                        type={step === 'mobile' ? "tel" : "text"}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                            step === 'mobile' 
                            ? (language === 'en' ? "Enter 10-digit mobile..." : "10-अंकीय मोबाइल नंबर...")
                            : (language === 'en' ? "Typing..." : "टाइप करें...")
                        }
                        maxLength={step === 'mobile' ? 10 : 50}
                        className="w-full bg-gray-100 text-gray-800 text-sm rounded-lg pl-4 pr-10 py-3 outline-none focus:ring-1 focus:ring-[#A20A3C] border border-transparent focus:border-[#A20A3C] transition-all"
                      />
                  </div>
                  <button 
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-[#A20A3C] hover:bg-[#800830] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg shadow-md transition-all flex items-center justify-center"
                  >
                      <Send size={18} />
                  </button>
              </form>
              )}

              {/* Branding */}
              <div className="bg-[#fcfcfc] text-[9px] text-center text-gray-400 py-1 border-t border-gray-100 flex justify-center items-center gap-1">
                  Powered by <span className="font-bold text-[#A20A3C]">Sterling AI</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
                key="mascot-button"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ 
                    y: -600, 
                    opacity: 0, 
                    scale: 0.5,
                    transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] } // Bezier for rocket-like acceleration
                }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                className="relative cursor-pointer group"
                onClick={() => setIsOpen(true)}
            >
                {/* Mascot Image - No Background/Circle */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-end justify-center relative z-50">
                    <img 
                        src="https://pnbcdn.talkk.ai/media/pihuGif.svg" 
                        alt="Chat Bot" 
                        className="w-full h-full object-contain filter drop-shadow-xl cursor-pointer"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png"
                        }}
                    />
                </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default FloatingChatBot;
