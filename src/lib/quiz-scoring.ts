import type { Quiz } from "@/quizzes/types";

/**
 * Tally points from the *current* answers only, so changing an answer never double counts.
 * Every result starts at 0; each answered question gives its option's result 1 point.
 */
export function computeScores(quiz: Quiz, answers: (string | null)[]): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const result of quiz.results) scores[result.id] = 0;
  quiz.questions.forEach((question, i) => {
    const option = question.options.find((o) => o.id === answers[i]);
    if (option) scores[option.resultId] = (scores[option.resultId] ?? 0) + 1;
  });
  return scores;
}

/** Result ids sharing the highest score, in the quiz's result order. More than one means a tie. */
export function topResultIds(quiz: Quiz, scores: Record<string, number>): string[] {
  const max = Math.max(...quiz.results.map((r) => scores[r.id] ?? 0));
  return quiz.results.filter((r) => (scores[r.id] ?? 0) === max).map((r) => r.id);
}

/**
 * The final result: the single top scorer, or the user's tie-break pick when it is one of the
 * tied leaders. Returns null while a tie is still waiting for the user's choice.
 */
export function resolveResultId(
  quiz: Quiz,
  answers: (string | null)[],
  tieChoice: string | null,
): string | null {
  const leaders = topResultIds(quiz, computeScores(quiz, answers));
  if (leaders.length === 1) return leaders[0] ?? null;
  return tieChoice && leaders.includes(tieChoice) ? tieChoice : null;
}
