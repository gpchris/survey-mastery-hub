import type { QuizQuestion } from "@/components/Quiz";

export interface ModuleContent {
  title: string;
  description: string;
  content: string;
  keyTakeaways?: string[];
  quizQuestions?: QuizQuestion[];
}

const moduleContentMap: Record<string, ModuleContent> = {
  // Getting Started Course - Module 6 Quiz
  "6": {
    title: "Quiz: Platform Basics",
    description: "Test your knowledge on survey planning and platform basics",
    content: "",
    quizQuestions: [
      {
        id: "q1",
        question: "What is the first step when planning a survey?",
        options: [
          "Choose question types",
          "Define your survey goals and objectives",
          "Design the layout",
          "Send invitations"
        ],
        correctAnswer: 1,
        explanation: "Before you start creating questions, you need to clearly define what you want to learn from your survey. Clear goals guide everything else."
      },
      {
        id: "q2",
        question: "What is a best practice for survey length?",
        options: [
          "Make surveys as long as possible to get more data",
          "Keep surveys short and focused (5-10 minutes)",
          "Always use 50+ questions",
          "Length doesn't matter"
        ],
        correctAnswer: 1,
        explanation: "Research shows that response rates drop significantly for surveys longer than 10 minutes. Keep it concise and focused."
      },
      {
        id: "q3",
        question: "Why should you avoid leading questions?",
        options: [
          "They make surveys too short",
          "They're hard to write",
          "They can bias respondents toward a particular answer",
          "They're not visually appealing"
        ],
        correctAnswer: 2,
        explanation: "Leading questions suggest a desired answer and can invalidate your survey results by introducing bias."
      },
      {
        id: "q4",
        question: "When should you use skip logic in a survey?",
        options: [
          "Never, it confuses respondents",
          "In every survey",
          "When you want to show relevant questions based on previous answers",
          "Only for demographic questions"
        ],
        correctAnswer: 2,
        explanation: "Skip logic personalizes the survey experience by only showing questions relevant to each respondent, improving completion rates."
      }
    ]
  },
};

export const getModuleContent = (moduleId: string): ModuleContent | undefined => {
  return moduleContentMap[moduleId];
};
