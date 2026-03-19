'use client'

import { useEffect, useState } from 'react'
import { Bot, Sparkles, CheckCircle } from 'lucide-react'

interface BotLoadingAnimationProps {
  businessName: string
  onComplete: () => void
}

const loadingSteps = [
  'Analizando tu negocio...',
  'Configurando personalidad...',
  'Preparando respuestas...',
  'Listo!',
]

export function BotLoadingAnimation({ businessName, onComplete }: BotLoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timers = loadingSteps.map((_, i) =>
      setTimeout(() => {
        setCurrentStep(i)
        if (i === loadingSteps.length - 1) {
          setTimeout(onComplete, 600)
        }
      }, i * 700)
    )
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center">
          <Bot className="w-10 h-10 text-brand-500" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-6 h-6 text-brand-500 animate-spin-slow" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
        Creando asistente de {businessName}
      </h2>

      <div className="mt-6 space-y-3 w-full max-w-xs">
        {loadingSteps.map((step, i) => (
          <div
            key={step}
            className={`flex items-center gap-3 transition-all duration-300 ${
              i <= currentStep ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {i < currentStep ? (
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
            ) : i === currentStep ? (
              <div className="w-5 h-5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin shrink-0" />
            ) : (
              <div className="w-5 h-5 shrink-0" />
            )}
            <span className={`text-sm ${i <= currentStep ? 'text-gray-700' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
