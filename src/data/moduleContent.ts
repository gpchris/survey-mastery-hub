import type { QuizQuestion } from "@/components/Quiz";

export interface ModuleContent {
  title: string;
  description: string;
  content: string;
  keyTakeaways?: string[];
  quizQuestions?: QuizQuestion[];
}

const moduleContentMap: Record<string, ModuleContent> = {
  "getting-started-quiz-1": {
    title: "Quiz: Planning Your Survey",
    description: "Test your knowledge on survey planning and best practices",
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
  "getting-started-quiz-2": {
    title: "Quiz: Collecting Responses",
    description: "Test your understanding of response collection strategies",
    content: "",
    quizQuestions: [
      {
        id: "q1",
        question: "What is the best way to improve survey response rates?",
        options: [
          "Send the survey multiple times per day",
          "Offer incentives and keep it short",
          "Make it mandatory",
          "Use only yes/no questions"
        ],
        correctAnswer: 1,
        explanation: "Incentives motivate participation, and shorter surveys respect respondents' time, leading to higher completion rates."
      },
      {
        id: "q2",
        question: "When is the best time to send a survey?",
        options: [
          "Late at night",
          "During typical work hours on weekdays",
          "Only on weekends",
          "3 AM"
        ],
        correctAnswer: 1,
        explanation: "Response rates are typically higher when surveys are sent during business hours when people are actively checking email."
      },
      {
        id: "q3",
        question: "What should you include in your survey invitation email?",
        options: [
          "Only the survey link",
          "A detailed 5-page explanation",
          "The purpose, estimated time, and deadline",
          "Unrelated marketing content"
        ],
        correctAnswer: 2,
        explanation: "Clear, concise communication about what to expect increases trust and response rates."
      },
      {
        id: "q4",
        question: "How can you track who has responded to your survey?",
        options: [
          "You can't track responses",
          "Use SurveyMonkey's collector tracking features",
          "Send individual surveys to each person",
          "Call each respondent"
        ],
        correctAnswer: 1,
        explanation: "SurveyMonkey provides built-in tracking features that help you monitor response rates and send reminders to non-respondents."
      }
    ]
  },
};

export const getModuleContent = (moduleId: string): ModuleContent | undefined => {
  return moduleContentMap[moduleId];
};
