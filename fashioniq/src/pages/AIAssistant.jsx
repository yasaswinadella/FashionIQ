import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const initialMessages = [
  {
    role: 'assistant',
    text: "👋 Hi! I'm your FashionIQ AI Assistant.\n\nI can help you with:\n• Brand scores — try \"Tell me about Nike\"\n• Trends — try \"What's trending this season?\"\n• Colors — try \"What colors are popular?\"\n• Top brands — try \"What are the top brands?\"\n\nWhat would you like to know?",
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || typing) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Sorry, I couldn't connect. Please try again."
      }]);
    } finally {
      setTyping(false);
    }
  }

  const suggestions = [
    "What's trending this season?",
    "Tell me about Nike",
    "What colors are popular?",
    "What are the top brands?",
  ];

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
        <p className="text-ink-400 text-sm mt-1">
          Ask about fashion trends, brand scores, colors, and more.
        </p>
      </div>

      <div className="bg-ink-900 rounded-2xl border border-ink-800 flex flex-col" style={{ height: '520px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="bg-primary-600/10 text-primary-400 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-sm'
                  : 'bg-ink-800 text-ink-100 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="bg-ink-800 text-ink-100 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-1">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex gap-2 justify-start">
              <div className="bg-primary-600/10 text-primary-400 p-1.5 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-ink-800 text-ink-400 px-4 py-2.5 rounded-2xl text-sm rounded-bl-sm">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef}></div>
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {suggestions.map(s => (
              <button key={s} onClick={() => setInput(s)}
                className="text-xs bg-ink-800 text-ink-100 border border-ink-700 px-3 py-1.5 rounded-full hover:bg-primary-600 hover:text-white hover:border-primary-600 transition">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSend} className="border-t border-ink-800 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about trends, brands, colors..."
            className="flex-1 px-4 py-2 bg-ink-800 border border-ink-700 rounded-full text-sm text-white placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button type="submit" disabled={typing}
            className="bg-primary-600 text-white p-2.5 rounded-full hover:bg-primary-700 transition disabled:opacity-50">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}