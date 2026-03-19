import Link from 'next/link'
import Image from 'next/image'
import { Bot, MessageSquare, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { GradientText } from '@/components/ui/gradient-text'
import { ChatPreviewMockup } from '@/features/demo/components/chat-preview-mockup'

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-[#030712]">
      {/* Background */}
      <FallingPattern
        color="rgba(255, 255, 255, 0.5)"
        backgroundColor="#030712"
        className="absolute inset-0 h-full"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-profimaxia-nav.png"
              alt="ProfimaxIA"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-white font-semibold text-sm">ProfimaxIA</span>
          </div>
          <Link
            href="/demo"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Probar demo →
          </Link>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-6 pt-16 sm:pt-24 pb-8 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-1.5 mb-8"
            style={{ animation: 'fade-in 0.6s ease-out' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-gray-400">Demo interactiva</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white max-w-3xl"
            style={{ animation: 'fade-in 0.8s ease-out 0.2s both' }}
          >
            Prueba el chatbot de tu negocio{' '}
            <GradientText className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              en 30 segundos
            </GradientText>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed"
            style={{ animation: 'fade-in 0.6s ease-out 0.6s both' }}
          >
            Dinos a que se dedica tu negocio, y chatea con un asistente IA
            que responde como si fuera de tu equipo.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4" style={{ animation: 'fade-in 0.6s ease-out 1s both' }}>
            <Link
              href="/demo"
              className="group relative inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              Probar ahora
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-sm text-gray-500">Sin registro · 30 segundos</span>
          </div>
        </section>

        {/* Chat Preview */}
        <section
          className="px-6 py-12 max-w-5xl mx-auto"
          style={{ animation: 'fade-in 0.8s ease-out 1.2s both' }}
        >
          <div style={{ animation: 'float 6s ease-in-out infinite' }}>
            <ChatPreviewMockup />
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="Rapido de probar"
              description="Rellena unos datos de tu negocio y el asistente esta listo"
              delay={1.2}
            />
            <FeatureCard
              icon={<MessageSquare className="w-5 h-5" />}
              title="Personalizado"
              description="Responde con el tono y conocimiento de tu negocio"
              delay={1.4}
            />
            <FeatureCard
              icon={<Bot className="w-5 h-5" />}
              title="Conversacion natural"
              description="Habla como lo haria alguien de tu equipo"
              delay={1.6}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5 flex items-center justify-center gap-2">
          <Image
            src="/logo-profimaxia.png"
            alt="ProfimaxIA"
            width={18}
            height={18}
            className="rounded-full"
          />
          <p className="text-xs text-gray-600">
            Creado por{' '}
            <span className="text-gray-400">ProfimaxIA</span>
            {' '}· Chatbots IA a medida para tu negocio
          </p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <div
      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}s both`,
      }}
    >
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500/15 transition-colors">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
    </div>
  )
}
