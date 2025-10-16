export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  participants: number;
  category: string;
  modules: Module[];
  imageUrl?: string;
  industryStats?: {
    industry: string;
    completions: number;
  };
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "activity";
  completed?: boolean;
}

export const courses: Course[] = [
  {
    id: "getting-started",
    title: "Getting Started with SurveyMonkey",
    description: "Learn the fundamentals of creating your first survey, from question design to distribution strategies.",
    duration: "45 min",
    skills: ["Survey Basics", "Question Design", "Distribution"],
    participants: 12400,
    category: "Fundamentals",
    modules: [
      { id: "1", title: "Introduction to SurveyMonkey", duration: "5 min", type: "video" },
      { id: "2", title: "Creating Your First Survey", duration: "8 min", type: "video" },
      { id: "3", title: "Question Types & Best Practices", duration: "12 min", type: "video" },
      { id: "4", title: "Quiz: Survey Basics", duration: "5 min", type: "quiz" },
      { id: "5", title: "Distribution Methods", duration: "10 min", type: "video" },
      { id: "6", title: "Hands-on: Create a Survey", duration: "5 min", type: "activity" },
    ],
  },
  {
    id: "survey-design",
    title: "Advanced Survey Design",
    description: "Master the art of crafting surveys that get higher response rates and more accurate data.",
    duration: "60 min",
    skills: ["Survey Logic", "Question Flow", "Response Optimization"],
    participants: 8900,
    category: "Advanced",
    modules: [
      { id: "1", title: "Survey Logic & Skip Patterns", duration: "15 min", type: "video" },
      { id: "2", title: "Reducing Survey Bias", duration: "12 min", type: "video" },
      { id: "3", title: "Mobile-Optimized Surveys", duration: "10 min", type: "video" },
      { id: "4", title: "Quiz: Design Principles", duration: "8 min", type: "quiz" },
      { id: "5", title: "A/B Testing Your Surveys", duration: "10 min", type: "video" },
      { id: "6", title: "Design Challenge", duration: "5 min", type: "activity" },
    ],
    industryStats: {
      industry: "Education",
      completions: 4200,
    },
  },
  {
    id: "data-analysis",
    title: "Analyzing Survey Results",
    description: "Turn raw survey data into actionable insights with powerful analysis tools and visualization techniques.",
    duration: "55 min",
    skills: ["Data Analysis", "Visualization", "Reporting"],
    participants: 10200,
    category: "Analysis",
    modules: [
      { id: "1", title: "Understanding Your Data Dashboard", duration: "10 min", type: "video" },
      { id: "2", title: "Filters & Cross-Tabulation", duration: "12 min", type: "video" },
      { id: "3", title: "Creating Charts & Graphs", duration: "10 min", type: "video" },
      { id: "4", title: "Quiz: Analysis Fundamentals", duration: "8 min", type: "quiz" },
      { id: "5", title: "Exporting & Sharing Reports", duration: "10 min", type: "video" },
      { id: "6", title: "Analysis Exercise", duration: "5 min", type: "activity" },
    ],
  },
  {
    id: "employee-engagement",
    title: "Employee Engagement Surveys",
    description: "Design and deploy effective employee engagement surveys that drive meaningful organizational change.",
    duration: "50 min",
    skills: ["HR Analytics", "Employee Feedback", "Action Planning"],
    participants: 6750,
    category: "Industry Specific",
    modules: [
      { id: "1", title: "Introduction to Employee Engagement", duration: "8 min", type: "video" },
      { id: "2", title: "Key Metrics to Track", duration: "12 min", type: "video" },
      { id: "3", title: "Confidentiality & Trust", duration: "10 min", type: "video" },
      { id: "4", title: "Quiz: Engagement Best Practices", duration: "5 min", type: "quiz" },
      { id: "5", title: "Analyzing Engagement Data", duration: "10 min", type: "video" },
      { id: "6", title: "Create an Engagement Survey", duration: "5 min", type: "activity" },
    ],
  },
  {
    id: "customer-feedback",
    title: "Customer Feedback & NPS",
    description: "Learn to measure customer satisfaction and Net Promoter Score to improve your products and services.",
    duration: "40 min",
    skills: ["NPS", "Customer Experience", "Feedback Loops"],
    participants: 9300,
    category: "Customer Success",
    modules: [
      { id: "1", title: "Understanding NPS", duration: "8 min", type: "video" },
      { id: "2", title: "Designing Customer Surveys", duration: "10 min", type: "video" },
      { id: "3", title: "Timing & Frequency", duration: "8 min", type: "video" },
      { id: "4", title: "Quiz: Customer Feedback", duration: "4 min", type: "quiz" },
      { id: "5", title: "Acting on Feedback", duration: "8 min", type: "video" },
      { id: "6", title: "NPS Survey Exercise", duration: "2 min", type: "activity" },
    ],
  },
  {
    id: "enterprise-features",
    title: "Enterprise Features & Collaboration",
    description: "Discover advanced team features, permissions, and enterprise-level collaboration tools.",
    duration: "35 min",
    skills: ["Team Collaboration", "Admin Controls", "Enterprise Tools"],
    participants: 3200,
    category: "Enterprise",
    modules: [
      { id: "1", title: "Team Management", duration: "8 min", type: "video" },
      { id: "2", title: "Permissions & Roles", duration: "7 min", type: "video" },
      { id: "3", title: "Shared Assets & Templates", duration: "8 min", type: "video" },
      { id: "4", title: "Quiz: Enterprise Features", duration: "4 min", type: "quiz" },
      { id: "5", title: "Security & Compliance", duration: "6 min", type: "video" },
      { id: "6", title: "Setup Your Team", duration: "2 min", type: "activity" },
    ],
  },
];

export const getUserProgress = (courseId: string): number => {
  const progressMap: Record<string, number> = {
    "getting-started": 75,
    "survey-design": 40,
    "data-analysis": 0,
    "employee-engagement": 100,
    "customer-feedback": 15,
    "enterprise-features": 0,
  };
  return progressMap[courseId] || 0;
};
