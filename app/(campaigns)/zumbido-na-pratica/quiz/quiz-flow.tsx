"use client";

import { useState } from "react";
import { sumScore, getScoreBand } from "@/lib/quiz-scoring";
import { trackEvent } from "@/lib/tracking";
import { ProgressBar } from "@/components/campaign/quiz/progress-bar";
import { ChoiceScreen } from "@/components/campaign/quiz/choice-screen";
import { ContactFormScreen, type ContactFormValues } from "@/components/campaign/quiz/contact-form-screen";
import { ResultScreen } from "@/components/campaign/quiz/result-screen";
import { campaignConfig } from "../config";
import { quizContent } from "../content";

type Step =
  | { kind: "cover" }
  | { kind: "question"; index: number }
  | { kind: "contact" }
  | { kind: "result" };

export function QuizFlow() {
  const [step, setStep] = useState<Step>({ kind: "cover" });
  const [answers, setAnswers] = useState<number[]>([]);
  const [contact, setContact] = useState<ContactFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const totalSteps = quizContent.questions.length + 2; // + cover + contact

  if (step.kind === "cover") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-brand-primary sm:text-3xl">{quizContent.cover.headline}</h1>
        <p className="mt-4 whitespace-pre-line text-brand-text/80">{quizContent.cover.body}</p>
        <button
          type="button"
          onClick={() => setStep({ kind: "question", index: 0 })}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-accent/90"
        >
          {quizContent.cover.ctaLabel}
        </button>
      </div>
    );
  }

  if (step.kind === "question") {
    const question = quizContent.questions[step.index];
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <ProgressBar current={step.index + 1} total={totalSteps} />
        <div className="mt-8">
          <ChoiceScreen
            question={question.question}
            options={question.options}
            onAnswer={(points) => {
              const nextAnswers = [...answers.slice(0, step.index), points];
              setAnswers(nextAnswers);
              if (step.index + 1 < quizContent.questions.length) {
                setStep({ kind: "question", index: step.index + 1 });
              } else {
                setStep({ kind: "contact" });
              }
            }}
            onBack={
              step.index > 0
                ? () => setStep({ kind: "question", index: step.index - 1 })
                : () => setStep({ kind: "cover" })
            }
          />
        </div>
      </div>
    );
  }

  if (step.kind === "contact") {
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <ProgressBar current={totalSteps - 1} total={totalSteps} />
        <div className="mt-8">
          <ContactFormScreen
            isSubmitting={isSubmitting}
            errorMessage={submitError}
            onBack={() => setStep({ kind: "question", index: quizContent.questions.length - 1 })}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              setSubmitError(undefined);
              const score = sumScore(answers);
              const scoreBand = getScoreBand(score);

              try {
                await fetch("/api/lead", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...values, score, scoreBand }),
                });
                trackEvent("Lead");
                setContact(values);
                setStep({ kind: "result" });
              } catch {
                setSubmitError("Não deu pra enviar agora. Tenta de novo em alguns segundos.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          />
        </div>
      </div>
    );
  }

  const score = sumScore(answers);
  const band = getScoreBand(score);
  const result = quizContent.results[band];
  const firstName = contact?.name.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <ProgressBar current={totalSteps} total={totalSteps} />
      <div className="mt-8">
        <ResultScreen
          title={result.title.replace("{nome}", firstName)}
          body={result.body}
          ctaLabel={quizContent.resultCtaLabel}
          ctaHref={campaignConfig.quizResultCtaLink}
        />
      </div>
    </div>
  );
}
