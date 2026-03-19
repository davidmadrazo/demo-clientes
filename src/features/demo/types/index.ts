import { z } from 'zod'

export const toneOptions = ['profesional', 'casual', 'amigable'] as const
export type Tone = (typeof toneOptions)[number]

export const businessConfigSchema = z.object({
  businessName: z.string().min(1, 'El nombre es obligatorio').max(100),
  sector: z.string().min(1, 'Selecciona un sector'),
  description: z.string().min(10, 'Describe tu negocio (minimo 10 caracteres)').max(500),
  tone: z.enum(toneOptions),
})

export type BusinessConfig = z.infer<typeof businessConfigSchema>

export const stepBusinessInfoSchema = businessConfigSchema.pick({
  businessName: true,
  sector: true,
})

export const stepBusinessDetailsSchema = businessConfigSchema.pick({
  description: true,
  tone: true,
})

export type WizardStep = 'info' | 'details' | 'loading' | 'chat'
