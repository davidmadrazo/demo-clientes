'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sectors } from '@/shared/constants/sectors'
import { stepBusinessInfoSchema } from '@/features/demo/types'
import { ArrowRight } from 'lucide-react'

interface StepBusinessInfoProps {
  initialData: { businessName: string; sector: string }
  onNext: (data: { businessName: string; sector: string }) => void
}

export function StepBusinessInfo({ initialData, onNext }: StepBusinessInfoProps) {
  const [businessName, setBusinessName] = useState(initialData.businessName)
  const [sector, setSector] = useState(initialData.sector)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit() {
    const result = stepBusinessInfoSchema.safeParse({ businessName, sector })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    onNext({ businessName, sector })
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sobre tu negocio</h2>
        <p className="mt-1 text-gray-500">Cuentanos lo basico para personalizar tu asistente</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio
          </label>
          <Input
            id="businessName"
            placeholder="Ej: Restaurante La Esquina"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="text-[16px]"
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[16px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          >
            <option value="">Selecciona un sector...</option>
            {sectors.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {errors.sector && (
            <p className="mt-1 text-sm text-red-500">{errors.sector}</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white h-12 text-base"
      >
        Siguiente
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
