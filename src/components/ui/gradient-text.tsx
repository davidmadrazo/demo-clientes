'use client'

import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent',
        className,
      )}
      style={{
        backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 4s ease-in-out infinite',
      }}
    >
      {children}
    </span>
  )
}
