import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are Aldwin's AI assistant embedded in his personal portfolio website. Be concise, friendly, and professional.

About Aldwin Mazan:
- Senior IT student at Batangas State University
- Specializes in: React, TypeScript, Flutter, IoT, Python, Node.js, Firebase, MySQL
- Certifications: AWS Academy Cloud Security, Cisco Intro to Cybersecurity (x2), Cisco Network Defense

Projects:
1. KLIMA - Campus Risk Dashboard: Real-time campus risk assessment and live weather monitoring for BatStateU. Built with React, TypeScript, Node.js, and Leaflet Maps. Features live weather forecasts via Open-Meteo API, interactive risk maps, tropical cyclone analysis from GDACS/PAGASA.
2. RDANA - Rapid Damage Assessment: Digital rapid damage assessment form for disaster impact evaluation. Built with React, TypeScript, and Tailwind CSS.
3. OJTracker - Internship Time Tracker: Comprehensive internship time tracking app with Chart.js data visualization. Built with React and TypeScript.
4. TiluX Kitchen Monitoring: Solar-powered IoT smart ventilation and fire safety system using ESP32 sensors, Flutter mobile app, and Firebase. Monitors temperature, smoke, and humidity in real time.
5. CashFlow Tracker: Dark-themed desktop financial tracking tool built with Python, CustomTkinter UI, MySQL database, and Matplotlib charts.

If someone asks about hiring or contacting Aldwin, direct them to the Contact section of the portfolio.
Keep responses short and to the point (2–4 sentences). Do not use excessive markdown.`;

const SUGGESTIONS = [
  '🚀 Tell me about your projects',
  '🛠️ What technologies do you use?',
  '📜 What certifications do you have?',
  '📬 How can I hire you?',
];

interface Message {
  role: 'user' | 'model';
  text: string;
}

const PortfolioChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hi! I'm Aldwin's AI assistant. Ask me anything about his projects, skills, or experience — or pick a suggestion below! 👇",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const messageText = text ?? input;
      if (!messageText.trim() || isLoading) return;

      const userMessage: Message = { role: 'user', text: messageText };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.0-flash',
          systemInstruction: SYSTEM_PROMPT,
        });

        // Gemini requires history to start with a 'user' turn and alternate.
        // We drop any leading 'model' messages (e.g. the initial greeting) before building history.
        // Also ensure we don't pass the *current* user input into history.
        const historyMessages = [...messages];
        while (historyMessages.length > 0 && historyMessages[0].role === 'model') {
          historyMessages.shift();
        }

        const firstUserIndex = messages.findIndex((msg) => msg.role === 'user');
        const history =
          firstUserIndex === -1
            ? []
            : messages.slice(firstUserIndex).map((msg) => ({
              role: msg.role,
              parts: [{ text: msg.text }],
            }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(messageText);
        const responseText = result.response.text();

        setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
        if (!isOpen) setHasUnread(true);
      } catch (error) {
        console.error('Gemini Error:', error);
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: "I'm having trouble connecting right now. Please try again in a moment!",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, isOpen]
  );

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "Chat cleared! What would you like to know about Aldwin? 😊",
      },
    ]);
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </div>
              <div>
                <p className="chat-header-name">Aldwin's AI</p>
                <p className="chat-header-status">
                  <span className="chat-status-dot" />
                  Online
                </p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-icon-btn"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
              <button
                className="chat-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message-row ${msg.role === 'user' ? 'chat-message-row--user' : 'chat-message-row--bot'}`}>
                {msg.role === 'model' && (
                  <div className="chat-bot-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M5 14a7 7 0 0 0 7 7 7 7 0 0 0 7-7H5M9 9h2v2H9V9m4 0h2v2h-2V9z" />
                    </svg>
                  </div>
                )}
                <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="chat-message-row chat-message-row--bot">
                <div className="chat-bot-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M5 14a7 7 0 0 0 7 7 7 7 0 0 0 7-7H5M9 9h2v2H9V9m4 0h2v2h-2V9z" />
                  </svg>
                </div>
                <div className="chat-bubble chat-bubble--bot chat-typing">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            )}

            {/* Suggestion chips */}
            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="chat-chip"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="chat-input-area">
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about Aldwin…"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'chat-toggle-btn--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {hasUnread && !isOpen && <span className="chat-unread-dot" />}
        <span className={`chat-toggle-icon ${isOpen ? 'chat-toggle-icon--rotated' : ''}`}>
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="26" height="26">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default PortfolioChat;