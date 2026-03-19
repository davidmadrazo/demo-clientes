'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { stepBusinessDetailsSchema, toneOptions, type Tone } from '@/features/demo/types'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepBusinessDetailsProps {
  initialData: { description: string; tone: Tone }
  onNext: (data: { description: string; tone: Tone }) => void
  onBack: () => void
}

const toneLabels: Record<Tone, { label: string; emoji: string; desc: string }> = {
  profesional: { label: 'Profesional', emoji: '👔', desc: 'Formal y serio' },
  casual: { label: 'Casual', emoji: '😎', desc: 'Relajado y directo' },
  amigable: { label: 'Amigable', emoji: '😊', desc: 'Cercano y calido' },
}

export function StepBusinessDetails({ initialData, onNext, onBack }: StepBusinessDetailsProps) {
  const [description, setDescription] = useState(initialData.description)
  const [tone, setTone] = useState<Tone>(initialData.tone)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit() {
    const result = stepBusinessDetailsSchema.safeParse({ description, tone })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    onNext({ description, tone })
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Personaliza tu asistente</h2>
        <p className="mt-1 text-gray-500">Describe tu negocio y elige como quieres que hable</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Describe tu negocio
          </label>
          <Textarea
            id="description"
            placeholder="Ej: Somos un restaurante familiar especializado en cocina mediterranea. Tenemos menu del dia a 12€, carta variada, y hacemos envios a domicilio en un radio de 5km."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="text-[16px] resize-none"
          />
          <p className="mt-1 text-xs text-gray-400">{description.length}/500</p>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tono del asistente
          </label>
          <div className="grid grid-cols-3 gap-3">
            {toneOptions.map((t) => {
              const config = toneLabels[t]
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-all',
                    tone === t
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span className="text-xl">{config.emoji}</span>
                  <span className="text-sm font-medium">{config.label}</span>
                  <span className="text-xs text-gray-400">{config.desc}</span>
                </button>
              )
            })}
          </div>
          {errors.tone && (
            <p className="mt-1 text-sm text-red-500">{errors.tone}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atras
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-brand-500 hover:bg-brand-600 text-white h-12 text-base"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Crear asistente
        </Button>
      </div>
    </div>
  )
}
