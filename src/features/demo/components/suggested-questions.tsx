'use client'

interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {questions.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onSelect(q)}
          className="px-3 py-1.5 text-sm rounded-full border border-brand-200 text-brand-600 hover:bg-brand-50 transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
