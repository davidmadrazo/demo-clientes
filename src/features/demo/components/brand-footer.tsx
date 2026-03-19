import Image from 'next/image'

export function BrandFooter() {
  return (
    <div className="py-3 flex items-center justify-center gap-2">
      <Image
        src="/logo-profimaxia.png"
        alt="ProfimaxIA"
        width={20}
        height={20}
        className="rounded-full"
      />
      <p className="text-xs text-gray-400">
        Creado por{' '}
        <span className="font-medium text-gray-500">ProfimaxIA</span>
      </p>
    </div>
  )
}
