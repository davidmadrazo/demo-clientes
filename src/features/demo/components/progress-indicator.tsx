'use client'

import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i + 1 === currentStep
              ? 'w-8 bg-brand-500'
              : i + 1 < currentStep
                ? 'w-8 bg-brand-200'
                : 'w-8 bg-gray-200'
          )}
        />
      ))}
    </div>
  )
}
