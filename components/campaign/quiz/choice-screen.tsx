import { ChevronLeft } from "lucide-react";

export interface QuizOption {
  label: string;
  points: number;
}

export interface ChoiceScreenProps {
  question: string;
  options: QuizOption[];
  onAnswer: (points: number) => void;
  onBack?: () => void;
}

export function ChoiceScreen({ question, options, onAnswer, onBack }: ChoiceScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1 self-start text-sm text-brand-text/60"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </button>
      ) : null}
      <h2 className="mb-6 text-xl font-bold text-brand-primary sm:text-2xl">{question}</h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onAnswer(option.points)}
            className="w-full rounded-xl border border-brand-primary/20 bg-white px-5 py-4 text-left transition-colors hover:border-brand-accent hover:bg-brand-accent/5"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
