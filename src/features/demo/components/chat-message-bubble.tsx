'use client'

import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface ChatMessageBubbleProps {
  role: 'user' | 'assistant'
  text: string
}

export function ChatMessageBubble({ role, text }: ChatMessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-2.5 animate-fade-in', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed',
          isUser
            ? 'bg-blue-500 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        )}
      >
        {text}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 shrink-0 mt-0.5">
          <AvatarImage src="https://bundui-images.netlify.app/avatars/01.png" />
          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">TU</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 justify-start animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse-dot" style={{ animationDelay: '0s' }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  )
}
