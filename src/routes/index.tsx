import { createFileRoute } from "@tanstack/react-router";

import { QuizIntro } from "@/components/quiz/QuizIntro";
import { featuredQuiz } from "@/quizzes";

const title = "今天测点啥 · 你是什么花？";
const description = "每个人都有自己的盛开方式。8道题，找到与你气质最接近的那一朵花。";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <QuizIntro quiz={featuredQuiz} />;
}
