/** Shared shapes for every fun quiz on 「今天测点啥」. Add a new quiz by creating a data file. */

export interface QuizOption {
  id: string;
  text: string;
  /** Points this option gives to each result id, used later to pick the result. */
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface QuizResultType {
  id: string;
  name: string;
}

export interface Quiz {
  /** URL slug: /quiz/<id> */
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Rough time to finish, shown on the intro card. */
  duration: string;
  questions: QuizQuestion[];
  results: QuizResultType[];
}
