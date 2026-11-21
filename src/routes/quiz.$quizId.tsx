import { createFileRoute, notFound } from "@tanstack/react-router";

import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getQuiz } from "@/quizzes";

export const Route = createFileRoute("/quiz/$quizId")({
  loader: ({ params }) => {
    const quiz = getQuiz(params.quizId);
    if (!quiz) throw notFound();
    return { quizId: quiz.id, title: quiz.title, description: quiz.description };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} · 答题中 · 今天测点啥` : "测试不存在 · 今天测点啥";
    const description = loaderData?.description ?? "这个测试暂时找不到啦，去首页看看其他测试吧。";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: QuizPage,
});

function QuizPage() {
  const { quizId } = Route.useLoaderData();
  const quiz = getQuiz(quizId);
  if (!quiz) return null;
  return <QuizRunner key={quiz.id} quiz={quiz} />;
}
