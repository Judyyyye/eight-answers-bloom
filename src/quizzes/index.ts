import { flowerQuiz } from "./flower";
import type { Quiz } from "./types";

/** Register every quiz here; the first one is featured on the home page. */
export const quizzes: Quiz[] = [flowerQuiz];

export const featuredQuiz: Quiz = flowerQuiz;

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

export type { Quiz, QuizOption, QuizQuestion, QuizResultType } from "./types";
