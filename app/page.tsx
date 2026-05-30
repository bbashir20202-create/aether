'use client';

import { useState, useRef, useEffect } from 'react';

export default function Aether() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello Boss. I'm Aether, your personal AI agent.\n\nI have memory. I can research, plan, analyze, and help you build your scrap metal business.\n\nWhat would you like to do?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please try again." 
      }]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-violet-400">Aether</h1>
        
        <div ref={chatRef} className="h-[70vh] overflow-y-auto bg-zinc-900 rounded-2xl p-6 mb-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                m.role === 'user' ? 'bg-violet-600' : 'bg-zinc-800'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-zinc-500">Aether is thinking...</div>}
        </div>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your command here..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-violet-500"
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-violet-600 px-8 rounded-xl hover:bg-violet-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
