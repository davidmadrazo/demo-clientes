'use client'

import { useState, useCallback } from 'react'
import type { BusinessConfig, WizardStep, Tone } from '@/features/demo/types'
import { ProgressIndicator } from './progress-indicator'
import { StepBusinessInfo } from './step-business-info'
import { StepBusinessDetails } from './step-business-details'
import { BotLoadingAnimation } from './bot-loading-animation'
import { StepChat } from './step-chat'
import { BrandFooter } from './brand-footer'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'

const defaultConfig: BusinessConfig = {
  businessName: '',
  sector: '',
  description: '',
  tone: 'amigable',
}

const stepNumber: Record<WizardStep, number> = {
  info: 1,
  details: 2,
  loading: 2,
  chat: 3,
}

export function WizardContainer() {
  const [step, setStep] = useState<WizardStep>('info')
  const [config, setConfig] = useState<BusinessConfig>(defaultConfig)

  function handleInfoNext(data: { businessName: string; sector: string }) {
    setConfig((prev) => ({ ...prev, ...data }))
    setStep('details')
  }

  function handleDetailsNext(data: { description: string; tone: Tone }) {
    setConfig((prev) => ({ ...prev, ...data }))
    setStep('loading')
  }

  const handleLoadingComplete = useCallback(() => {
    setStep('chat')
  }, [])

  function handleReset() {
    setConfig(defaultConfig)
    setStep('info')
  }

  // Chat ocupa pantalla completa
  if (step === 'chat') {
    return (
      <div className="min-h-dvh flex flex-col bg-white">
        <StepChat config={config} onReset={handleReset} />
      </div>
    )
  }

  return (
    <div className="relative min-h-dvh flex flex-col bg-[#f8fafc] overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
      />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Progress indicator */}
          {step !== 'loading' && (
            <div className="flex justify-center mb-8">
              <ProgressIndicator currentStep={stepNumber[step]} totalSteps={3} />
            </div>
          )}

          {/* Step content */}
          <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            {step === 'info' && (
              <StepBusinessInfo
                initialData={{ businessName: config.businessName, sector: config.sector }}
                onNext={handleInfoNext}
              />
            )}
            {step === 'details' && (
              <StepBusinessDetails
                initialData={{ description: config.description, tone: config.tone }}
                onNext={handleDetailsNext}
                onBack={() => setStep('info')}
              />
            )}
            {step === 'loading' && (
              <BotLoadingAnimation
                businessName={config.businessName}
                onComplete={handleLoadingComplete}
              />
            )}
          </div>

          <div className="mt-6">
            <BrandFooter />
          </div>
        </div>
      </div>
    </div>
  )
}
