/**
 * Pure state machine for answering a quiz one question at a time.
 * Kept free of React so every quiz shares the same rules and they stay testable.
 */

export interface QuizSessionState {
  total: number;
  current: number;
  /** Selected option id per question, null when unanswered. One answer per question. */
  answers: (string | null)[];
  finished: boolean;
  /** Which tied result the user picked as 「更像现在的我」; does not change scores. */
  tieChoice: string | null;
}

export type QuizSessionAction =
  | { type: "select"; optionId: string }
  | { type: "next" }
  | { type: "prev" }
  | { type: "chooseTie"; resultId: string }
  | { type: "restart" };

export function createSession(total: number): QuizSessionState {
  return {
    total,
    current: 0,
    answers: Array.from({ length: total }, () => null),
    finished: false,
    tieChoice: null,
  };
}

export function canGoNext(state: QuizSessionState): boolean {
  return !state.finished && state.answers[state.current] != null;
}

export function canGoPrev(state: QuizSessionState): boolean {
  return state.finished || state.current > 0;
}

export function isLastQuestion(state: QuizSessionState): boolean {
  return state.current === state.total - 1;
}

export function quizSessionReducer(
  state: QuizSessionState,
  action: QuizSessionAction,
): QuizSessionState {
  switch (action.type) {
    case "select": {
      if (state.finished) return state;
      const answers = [...state.answers];
      answers[state.current] = action.optionId;
      return { ...state, answers };
    }
    case "next": {
      if (!canGoNext(state)) return state;
      if (isLastQuestion(state)) return { ...state, finished: true, tieChoice: null };
      return { ...state, current: state.current + 1 };
    }
    case "prev": {
      if (state.finished) return { ...state, finished: false, tieChoice: null };
      if (state.current === 0) return state;
      return { ...state, current: state.current - 1 };
    }
    case "chooseTie":
      if (!state.finished) return state;
      return { ...state, tieChoice: action.resultId };
    case "restart":
      return createSession(state.total);
  }
}
