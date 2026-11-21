/** Shared shapes for every fun quiz on 「今天测点啥」. Add a new quiz by creating a data file. */

export interface QuizOption {
  id: string;
  text: string;
  /** The result this option gives 1 point to. */
  resultId: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface QuizResultType {
  id: string;
  /** e.g. 牡丹 */
  name: string;
  /** e.g. 热烈的自我 */
  persona: string;
  /** One-line signature sentence. */
  slogan: string;
  keywords: string[];
  description: string;
  /** Strengths and a gentle reminder. */
  advice: string;
  blessing: string;
}

export interface Quiz {
  /** URL slug: /quiz/<id> */
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Rough time to finish, shown on the intro card. */
  duration: string;
  /** Lead-in line on the result page. */
  resultIntro: string;
  questions: QuizQuestion[];
  /** Listed in option order; also the display order for scores and ties. */
  results: QuizResultType[];
}
