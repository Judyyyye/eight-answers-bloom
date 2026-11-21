/**
 * Pure state machine for answering a quiz one question at a time.
 * Kept free of React so every quiz shares the same rules and they stay testable.
 */

export interface QuizSessionState {
  total: number;
  current: number;
  /** Selected option id per question, null when unanswered. */
  answers: (string | null)[];
  finished: boolean;
}

export type QuizSessionAction =
  | { type: "select"; optionId: string }
  | { type: "next" }
  | { type: "prev" }
  | { type: "restart" };

export function createSession(total: number): QuizSessionState {
  return { total, current: 0, answers: Array.from({ length: total }, () => null), finished: false };
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
      if (isLastQuestion(state)) return { ...state, finished: true };
      return { ...state, current: state.current + 1 };
    }
    case "prev": {
      if (state.finished) return { ...state, finished: false };
      if (state.current === 0) return state;
      return { ...state, current: state.current - 1 };
    }
    case "restart":
      return createSession(state.total);
  }
}
