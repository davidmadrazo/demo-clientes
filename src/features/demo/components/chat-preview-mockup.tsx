'use client'

import { useEffect, useState } from 'react'
import { Bot } from 'lucide-react'

const mockConversation = [
  { role: 'user', text: '¿Tienen mesa para 2 esta noche?' },
  { role: 'assistant', text: '¡Hola! Si, tenemos disponibilidad para las 21:00 y 21:30. ¿Cual prefieres?' },
  { role: 'user', text: 'Las 21:00 perfecto' },
  { role: 'assistant', text: 'Reservado para 2 personas a las 21:00. ¿A nombre de quien?' },
]

export function ChatPreviewMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0)

  useEffect(() => {
    const timers = mockConversation.map((_, i) =>
      setTimeout(() => setVisibleMessages(i + 1), 800 + i * 1200)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-1 shadow-2xl shadow-blue-500/5"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Restaurante La Esquina</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              En linea
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="p-3 space-y-2.5 min-h-[200px]">
          {mockConversation.slice(0, visibleMessages).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: 'fade-in 0.4s ease-out',
              }}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-500/20 text-blue-100 rounded-br-sm'
                    : 'bg-white/5 text-gray-300 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {visibleMessages > 0 && visibleMessages < mockConversation.length && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse-dot" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input mockup */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
            <span className="text-[13px] text-gray-500">Escribe un mensaje...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
