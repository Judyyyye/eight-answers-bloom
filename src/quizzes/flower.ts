import type { Quiz } from "./types";

export const flowerQuiz: Quiz = {
  id: "flower",
  title: "你是什么花？",
  tagline: "每个人都有自己的盛开方式",
  description: "8道题，找到与你气质最接近的那一朵花",
  duration: "约 2 分钟",
  results: [
    { id: "sakura", name: "樱花" },
    { id: "sunflower", name: "向日葵" },
    { id: "lavender", name: "薰衣草" },
    { id: "rose", name: "玫瑰" },
    { id: "lily", name: "铃兰" },
    { id: "daisy", name: "雏菊" },
  ],
  questions: [
    {
      id: "q1",
      text: "周末早晨醒来，你最想做的事是？",
      options: [
        { id: "a", text: "拉开窗帘晒晒太阳，出门走走", scores: { sunflower: 2, daisy: 1 } },
        { id: "b", text: "赖在被窝里，读一本喜欢的书", scores: { lavender: 2, lily: 1 } },
        { id: "c", text: "约好朋友去吃一顿精致早午餐", scores: { rose: 2, sakura: 1 } },
        { id: "d", text: "慢慢收拾房间，给植物浇浇水", scores: { lily: 2, daisy: 1 } },
      ],
    },
    {
      id: "q2",
      text: "朋友眼中的你，更像是？",
      options: [
        { id: "a", text: "温柔体贴的倾听者", scores: { sakura: 2, lily: 1 } },
        { id: "b", text: "走到哪儿都带来笑声的开心果", scores: { sunflower: 2, daisy: 1 } },
        { id: "c", text: "有主见、特别靠谱的那个人", scores: { rose: 2 } },
        { id: "d", text: "安静但很有想法的观察者", scores: { lavender: 2, lily: 1 } },
      ],
    },
    {
      id: "q3",
      text: "如果拥有一个小房间，你会把它布置成？",
      options: [
        { id: "a", text: "洒满阳光和绿植的小花园", scores: { daisy: 2, sunflower: 1 } },
        { id: "b", text: "堆满书本和香薰的安静角落", scores: { lavender: 2 } },
        { id: "c", text: "有落地镜和漂亮衣柜的梳妆间", scores: { rose: 2, sakura: 1 } },
        { id: "d", text: "挂着纱帘、放着唱片机的复古小屋", scores: { sakura: 2, lily: 1 } },
      ],
    },
    {
      id: "q4",
      text: "面对一件很想做、但有点难的事，你会？",
      options: [
        { id: "a", text: "先冲了再说，边做边想", scores: { sunflower: 2, rose: 1 } },
        { id: "b", text: "默默做好计划，一步一步来", scores: { lily: 2, lavender: 1 } },
        { id: "c", text: "给自己定个目标，一定要做到最好", scores: { rose: 2 } },
        { id: "d", text: "找个志同道合的伙伴一起做", scores: { daisy: 2, sakura: 1 } },
      ],
    },
    {
      id: "q5",
      text: "你最喜欢哪一种天气？",
      options: [
        { id: "a", text: "万里无云的大晴天", scores: { sunflower: 2 } },
        { id: "b", text: "微风轻拂的春日午后", scores: { sakura: 2, daisy: 1 } },
        { id: "c", text: "淅淅沥沥的小雨天", scores: { lavender: 2, lily: 1 } },
        { id: "d", text: "铺满晚霞的傍晚", scores: { rose: 2, sakura: 1 } },
      ],
    },
    {
      id: "q6",
      text: "收到一份礼物，你最希望它是？",
      options: [
        { id: "a", text: "一封手写的长长的信", scores: { lily: 2, sakura: 1 } },
        { id: "b", text: "一场说走就走的旅行", scores: { daisy: 2, sunflower: 1 } },
        { id: "c", text: "一件精心挑选的漂亮饰品", scores: { rose: 2 } },
        { id: "d", text: "一盏让人安睡的香薰小夜灯", scores: { lavender: 2 } },
      ],
    },
    {
      id: "q7",
      text: "心情低落的时候，你通常会？",
      options: [
        { id: "a", text: "找朋友聊聊天，很快就好啦", scores: { sunflower: 2, daisy: 1 } },
        { id: "b", text: "一个人听歌、写日记，慢慢消化", scores: { lavender: 2, lily: 1 } },
        { id: "c", text: "好好打扮一下，出门犒劳自己", scores: { rose: 2 } },
        { id: "d", text: "抱着玩偶看一部温暖的电影", scores: { sakura: 2, daisy: 1 } },
      ],
    },
    {
      id: "q8",
      text: "你希望别人想起你时，第一印象是？",
      options: [
        { id: "a", text: "像阳光一样温暖", scores: { sunflower: 2 } },
        { id: "b", text: "像春风一样温柔", scores: { sakura: 2 } },
        { id: "c", text: "像星光一样闪耀", scores: { rose: 2 } },
        { id: "d", text: "像清晨一样纯粹", scores: { lily: 2, daisy: 1 } },
      ],
    },
  ],
};
