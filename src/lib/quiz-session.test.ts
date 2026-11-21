import { describe, expect, it } from "vitest";

import { flowerQuiz } from "@/quizzes/flower";
import { canGoNext, createSession, quizSessionReducer as reduce } from "./quiz-session";

describe("「你是什么花？」题目", () => {
  it("一共 8 道题", () => {
    expect(flowerQuiz.questions).toHaveLength(8);
  });

  it("每道题都是有多个选项的单选题", () => {
    for (const q of flowerQuiz.questions) {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("答题流程", () => {
  it("没选答案时不能进入下一题", () => {
    const s = reduce(createSession(8), { type: "next" });
    expect(s.current).toBe(0);
    expect(canGoNext(s)).toBe(false);
  });

  it("选了答案后可以进入下一题", () => {
    let s = reduce(createSession(8), { type: "select", optionId: "a" });
    s = reduce(s, { type: "next" });
    expect(s.current).toBe(1);
  });

  it("每题只保留一个答案，重新选择会替换", () => {
    let s = reduce(createSession(8), { type: "select", optionId: "a" });
    s = reduce(s, { type: "select", optionId: "c" });
    expect(s.answers[0]).toBe("c");
  });

  it("返回上一题时保留之前的选择", () => {
    let s = reduce(createSession(8), { type: "select", optionId: "b" });
    s = reduce(s, { type: "next" });
    s = reduce(s, { type: "prev" });
    expect(s.current).toBe(0);
    expect(s.answers[0]).toBe("b");
  });

  it("第一题不能再往前", () => {
    const s = reduce(createSession(8), { type: "prev" });
    expect(s.current).toBe(0);
  });

  it("答完第 8 题后点下一题即完成测试", () => {
    let s = createSession(8);
    for (let i = 0; i < 8; i++) {
      s = reduce(s, { type: "select", optionId: "a" });
      s = reduce(s, { type: "next" });
    }
    expect(s.finished).toBe(true);
    expect(s.current).toBe(7);
  });

  it("重新测试会清空所有答案", () => {
    let s = reduce(createSession(8), { type: "select", optionId: "a" });
    s = reduce(s, { type: "restart" });
    expect(s.answers.every((a) => a === null)).toBe(true);
    expect(s.current).toBe(0);
  });
});
