'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import type { BusinessConfig } from '@/features/demo/types'
import { getSectorByValue } from '@/shared/constants/sectors'
import { ChatMessageBubble, TypingIndicator } from './chat-message-bubble'
import { SuggestedQuestions } from './suggested-questions'
import { BrandFooter } from './brand-footer'
import { CanvasRevealEffect } from '@/components/ui/canvas-effect'
import { Bot, RotateCcw, SendHorizontal, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepChatProps {
  config: BusinessConfig
  onReset: () => void
}

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts) return ''
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map(part => part.text)
    .join('')
}

export function StepChat({ config, onReset }: StepChatProps) {
  const transport = useMemo(
    () => new DefaultChatTransport({ body: { businessConfig: config } }),
    [config]
  )
  const { messages, status, error, sendMessage } = useChat({ transport })
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [input, setInput] = useState('')
  const [hovered, setHovered] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'
  const sectorConfig = getSectorByValue(config.sector)
  const suggestedQuestions = sectorConfig?.suggestedQuestions ?? []

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  function handleSend(text: string) {
    if (!text.trim()) return
    setShowSuggestions(false)
    setInput('')
    sendMessage({ text })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleSend(input)
  }

  return (
    <div className="min-h-dvh bg-white flex items-center justify-center p-4">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 shadow-xl"
      >
        {/* Canvas reveal on hover */}
        <div className="relative flex w-full flex-col">
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 h-full w-full"
              >
                <CanvasRevealEffect
                  animationSpeed={5}
                  containerClassName="bg-transparent opacity-20"
                  colors={[
                    [37, 99, 235],
                    [124, 58, 237],
                  ]}
                  opacities={[1, 0.8, 1, 0.8, 0.5, 0.8, 1, 0.5, 1, 3]}
                  dotSize={2}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="relative z-20 flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{config.businessName}</p>
                <p className="text-[11px] text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En linea
                </p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              title="Empezar de nuevo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat area */}
          <div className="relative z-20">
            <div
              ref={scrollRef}
              className="h-[420px] overflow-y-auto p-4 space-y-4"
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* Empty state */}
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Asistente de {config.businessName}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    ¿En que puedo ayudarte hoy?
                  </p>
                </div>
              )}

              {/* Messages */}
              {messages.map((m) => (
                <ChatMessageBubble
                  key={m.id}
                  role={m.role as 'user' | 'assistant'}
                  text={getMessageText(m)}
                />
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <TypingIndicator />
              )}

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  Error al conectar con el asistente. Intenta de nuevo.
                </div>
              )}
            </div>

            {/* Suggested questions */}
            {showSuggestions && messages.length === 0 && suggestedQuestions.length > 0 && (
              <SuggestedQuestions questions={suggestedQuestions} onSelect={handleSend} />
            )}
          </div>

          {/* Input */}
          <div className="relative z-20 border-t border-gray-100 bg-white/90 backdrop-blur-sm p-3">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <button
                  type="button"
                  onClick={onReset}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    'absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center transition-colors',
                    input.trim() && !isLoading
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="relative z-20">
            <BrandFooter />
          </div>
        </div>
      </div>
    </div>
  )
}
