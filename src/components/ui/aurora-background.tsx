'use client'

import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden bg-[#030712]', className)}>
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-[40%] left-[20%] h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)',
            animation: 'aurora-1 8s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute -bottom-[20%] right-[10%] h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            animation: 'aurora-2 10s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute top-[30%] -right-[10%] h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            animation: 'aurora-3 12s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
