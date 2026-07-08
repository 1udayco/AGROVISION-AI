'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Send, Mic, MicOff, Bot, User, Loader2, Globe2, Leaf, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const LANGUAGES = ['English', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'Telugu', 'Punjabi', 'Bengali'];

const QUICK_PROMPTS = [
  'What crops should I grow in Maharashtra this Kharif season?',
  'My tomato leaves have yellow spots. What disease could it be?',
  'What is the PM-Kisan scheme and how to apply?',
  'How to increase rice yield per acre?',
  'Best organic pesticides for cotton farming?',
];

const SYSTEM_PROMPT = `You are AgroVision AI Assistant, an expert agricultural advisor for Indian farmers. 
You provide:
- Crop disease diagnosis and treatment advice
- Crop and soil recommendations
- Government agricultural schemes (PM-Kisan, PMFBY, etc.)
- Weather-based farming tips
- Organic and integrated pest management
- Fertilizer and irrigation guidance

Be concise, practical, and use simple language. When relevant, mention specific Indian crop varieties, local conditions, and government support available.`;

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌱 Namaste! I am AgroVision AI, your intelligent farming assistant.\n\nI can help you with:\n• Crop disease diagnosis\n• Crop & soil recommendations\n• Government schemes (PM-Kisan, PMFBY)\n• Weather-based farming tips\n• Fertilizer & pest management\n\nAsk me anything about farming — in English, Hindi, Marathi, or any Indian language!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const resp = await fetch('/api/backend/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          language,
          system_prompt: SYSTEM_PROMPT,
        }),
      });

      if (!resp.ok) throw new Error();
      const data = await resp.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply || data.message,
          timestamp: new Date(),
        },
      ]);
    } catch {
      // Fallback intelligent responses
      const fallbackReplies: Record<string, string> = {
        tomato: '🍅 For tomato diseases:\n\n**Late Blight**: Dark water-soaked patches on leaves/fruit. Apply Mancozeb 75% WP @ 2.5g/L. Remove infected parts.\n\n**Early Blight**: Brown spots with yellow ring. Use Chlorothalonil @ 2g/L.\n\n**Prevention**: Plant resistant varieties like Arka Vikas, maintain 45cm spacing, avoid overhead irrigation.',
        crop: '🌾 **Top Kharif crops for Maharashtra (Jun–Oct)**:\n\n1. **Soybean** — Best for Vidarbha & Marathwada black soil\n2. **Cotton** — High value, Bt varieties recommended\n3. **Jowar** — Drought resistant, good for rain shadow areas\n4. **Sugarcane** — High income, needs irrigation\n\nTell me your district for more specific advice!',
        pm: '💰 **PM-Kisan Scheme**:\n\n₹6,000/year in 3 installments of ₹2,000 for all landholding farmers.\n\n**How to apply**: Visit pmkisan.gov.in or nearest CSC center with Aadhaar, land records & bank details.\n\n**Check status**: SMS PMKISAN to 7738299899 or visit official portal.',
        default: '🌱 I can help with crop disease, recommendations, government schemes, and farming tips. Could you provide more details about your specific situation — your location, crop type, or the problem you\'re facing?',
      };

      const key = Object.keys(fallbackReplies).find((k) => content.toLowerCase().includes(k)) || 'default';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallbackReplies[key],
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice not supported in your browser');
      return;
    }
    if (listening) {
      setListening(false);
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-IN';
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => { setListening(false); toast.error('Voice error'); };
    recognition.start();
    setListening(true);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: '🌱 Chat cleared. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-dark-900 flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 pb-4">
        {/* Header */}
        <div className="py-6 flex items-center justify-between">
          <div>
            <span className="badge-green block mb-2">NLP AI ASSISTANT</span>
            <h1 className="font-display text-2xl font-bold text-white">AgroVision AI Chatbot</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div className="flex items-center gap-2">
              <Globe2 size={14} className="text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-dark-700 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
              >
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <button onClick={clearChat} className="p-2 rounded-lg glass border border-white/5 text-gray-500 hover:text-primary-400 transition-colors">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0 max-h-[calc(100vh-280px)]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                msg.role === 'assistant'
                  ? 'bg-primary-500/20 border border-primary-500/30'
                  : 'bg-accent-500/20 border border-accent-500/30'
              }`}>
                {msg.role === 'assistant'
                  ? <Bot size={16} className="text-primary-400" />
                  : <User size={16} className="text-accent-400" />
                }
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'assistant'
                  ? 'card-dark rounded-tl-md text-gray-300'
                  : 'bg-primary-500/15 border border-primary-500/20 rounded-tr-md text-white'
              }`}>
                {msg.content}
                <p className={`text-xs mt-1.5 ${msg.role === 'assistant' ? 'text-gray-600' : 'text-primary-500/60'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-primary-400" />
              </div>
              <div className="card-dark px-4 py-3 rounded-2xl rounded-tl-md">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-mono">AI thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg glass border border-white/5 text-gray-400 hover:text-primary-300 hover:border-primary-500/20 transition-all"
            >
              {p.length > 40 ? p.slice(0, 40) + '...' : p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <button
            onClick={toggleVoice}
            className={`p-3 rounded-xl border transition-all ${
              listening
                ? 'bg-red-500/20 border-red-500/30 text-red-400 animate-pulse'
                : 'glass border-white/5 text-gray-500 hover:text-primary-400 hover:border-primary-500/20'
            }`}
          >
            {listening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <div className="flex-1 relative">
            <Leaf size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about crops, diseases, schemes..."
              className="w-full bg-dark-700 border border-white/5 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700"
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </main>
  );
}
