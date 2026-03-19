'use client'

import { useState, type FormEvent } from 'react'
import { SendHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || disabled) return
    setInput('')
    onSend(text)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-100 bg-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        disabled={disabled}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0',
          input.trim() && !disabled
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'bg-gray-100 text-gray-400'
        )}
      >
        <SendHorizontal className="w-5 h-5" />
      </button>
    </form>
  )
}
