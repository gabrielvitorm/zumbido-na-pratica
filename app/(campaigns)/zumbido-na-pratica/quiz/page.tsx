import { QuizFlow } from "./quiz-flow";
import { campaignConfig } from "../config";

export const dynamic = "force-dynamic";

export default function QuizPage() {
  return <QuizFlow quizResultCtaLink={campaignConfig.quizResultCtaLink} />;
}
