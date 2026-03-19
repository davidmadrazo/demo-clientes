import { openai } from '@ai-sdk/openai'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { z } from 'zod'
import { businessConfigSchema } from '@/features/demo/types'

const requestSchema = z.object({
  messages: z.array(z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant', 'system']),
    parts: z.array(z.unknown()),
  })).min(1),
  businessConfig: businessConfigSchema,
})

const toneInstructions: Record<string, string> = {
  profesional: 'Usa un tono profesional y formal. Trata al cliente de usted.',
  casual: 'Usa un tono casual y relajado. Tutea al cliente.',
  amigable: 'Usa un tono amigable y cercano. Tutea al cliente y usa expresiones calidas.',
}

function buildSystemPrompt(config: z.infer<typeof businessConfigSchema>): string {
  return `Eres el asistente virtual de "${config.businessName}".

REGLAS ESTRICTAS:
- Actua como un empleado REAL de ${config.businessName}. NUNCA reveles que eres una IA, un chatbot, o una demo.
- Si te preguntan quien eres, di que eres el asistente de atencion al cliente de ${config.businessName}.
- Sector: ${config.sector}
- Sobre el negocio: ${config.description}
- ${toneInstructions[config.tone] ?? toneInstructions.profesional}
- Responde SIEMPRE en espanol.
- Se conciso: 1-3 oraciones por respuesta.
- No inventes datos especificos (precios, horarios, direcciones) que no esten en la descripcion del negocio. Si no sabes algo, di que puedes ponerle en contacto con el equipo.
- Si el cliente saluda, presentate brevemente y pregunta en que puedes ayudar.`
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = requestSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: 'Datos invalidos', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { messages, businessConfig } = parsed.data
  const modelMessages = await convertToModelMessages(messages as UIMessage[])

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: buildSystemPrompt(businessConfig),
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}
