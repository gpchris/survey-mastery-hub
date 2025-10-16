import gettingStartedImg from "../assets/course-getting-started.jpg";
import dataAnalysisImg from "../assets/course-data-analysis.jpg";
import employeeEngagementImg from "../assets/course-employee-engagement.jpg";
import reportingImg from "../assets/course-reporting.jpg";
import advancedAnalyticsImg from "../assets/course-advanced-analytics.jpg";
import aiSurveysImg from "../assets/course-ai-surveys.jpg";
import specialCasesImg from "../assets/course-special-cases.jpg";

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
  type: "video" | "quiz" | "activity" | "sandbox";
  completed?: boolean;
  sandboxType?: "survey-builder" | "data-analysis";
}

export const courses: Course[] = [
  {
    id: "getting-started",
    title: "Getting Started with SurveyMonkey",
    description: "Master the fundamentals of creating professional surveys. Learn to navigate the platform, choose from templates or build from scratch, and understand the essential survey creation workflow.",
    duration: "9 min",
    skills: ["Survey Creation", "Question Types", "Platform Navigation", "Templates"],
    participants: 15234,
    category: "Beginner",
    imageUrl: gettingStartedImg,
    modules: [
      { id: "1", title: "Welcome to SurveyMonkey Platform", duration: "2 min", type: "video" },
      { id: "2", title: "Creating Your First Survey - Four Ways", duration: "2 min", type: "video" },
      { id: "3", title: "Using Templates vs. Starting from Scratch", duration: "1 min", type: "video" },
      { id: "4", title: "Overview of Question Types", duration: "2 min", type: "video" },
      { id: "5", title: "Hands-On: Build Your First Survey", duration: "1 min", type: "sandbox", sandboxType: "survey-builder" },
      { id: "6", title: "Quiz: Platform Basics", duration: "1 min", type: "quiz" },
    ],
  },
  {
    id: "survey-design",
    title: "Advanced Survey Design & Question Types",
    description: "Deep dive into professional survey design with all question types - from open-ended to multiple choice, ranking, rating scales, and specialty questions. Learn to write effective questions and avoid common biases.",
    duration: "8 min",
    skills: ["Question Design", "Survey Methodology", "Bias Reduction", "Accessibility"],
    participants: 8421,
    category: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
    modules: [
      { id: "1", title: "Open-Ended Questions: Comment Box, Textbox, File Upload", duration: "10 min", type: "video" },
      { id: "2", title: "Multiple Choice Questions: MC, Checkboxes, Dropdowns, Image Choice", duration: "12 min", type: "video" },
      { id: "3", title: "Ranking & Rating: Matrix, Star Rating, Slider, NPS", duration: "12 min", type: "video" },
      { id: "4", title: "Practice: Design a Multi-Question Survey", duration: "20 min", type: "sandbox", sandboxType: "survey-builder" },
      { id: "5", title: "5 Tips for Writing Great Surveys", duration: "8 min", type: "video" },
      { id: "6", title: "Accessibility & Inclusive Language Design", duration: "8 min", type: "video" },
      { id: "7", title: "Using Question Bank for Certified Questions", duration: "6 min", type: "video" },
      { id: "8", title: "Quiz: Question Type Selection", duration: "4 min", type: "quiz" },
    ],
    industryStats: {
      industry: "Market Research",
      completions: 3200,
    },
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Results Interpretation",
    description: "Master the complete analysis workflow - from viewing individual responses to creating custom charts, filters, sentiment analysis, and exporting professional reports. Learn to uncover insights with AI-powered tools.",
    duration: "7 min",
    skills: ["Data Visualization", "Sentiment Analysis", "Filtering", "Statistical Significance", "Export Reports"],
    participants: 6789,
    category: "Intermediate",
    imageUrl: dataAnalysisImg,
    modules: [
      { id: "1", title: "Viewing Results: Summary vs Individual Responses", duration: "8 min", type: "video" },
      { id: "2", title: "Understanding Response Statuses & Quality", duration: "6 min", type: "video" },
      { id: "3", title: "Analyzing Text Responses: Sentiment, Word Cloud, Tagging", duration: "10 min", type: "video" },
      { id: "4", title: "Chart Types & Custom Data Tables", duration: "10 min", type: "video" },
      { id: "5", title: "Interactive Lab: Explore Live Survey Results", duration: "25 min", type: "sandbox", sandboxType: "data-analysis" },
      { id: "6", title: "Filters, Compare Rules & Creating Views", duration: "10 min", type: "video" },
      { id: "7", title: "Basic Statistics & Statistical Significance", duration: "7 min", type: "video" },
      { id: "8", title: "Quiz: Analysis Fundamentals", duration: "4 min", type: "quiz" },
    ],
  },
  {
    id: "response-collection",
    title: "Sharing Results & Professional Reporting",
    description: "Learn how to share your survey insights effectively using shared data pages, dashboards, and multiple export formats. Create presentations that drive decisions and collaborate with stakeholders.",
    duration: "6 min",
    skills: ["Data Sharing", "Dashboard Creation", "Export Formats", "Presentation Skills"],
    participants: 5432,
    category: "Intermediate",
    imageUrl: reportingImg,
    modules: [
      { id: "1", title: "Sharing Survey Results: Access Control & Options", duration: "8 min", type: "video" },
      { id: "2", title: "Creating Shared Data Pages & Dashboards", duration: "10 min", type: "video" },
      { id: "3", title: "Export Formats: PDF, PPT, XLS, CSV, SPSS", duration: "12 min", type: "video" },
      { id: "4", title: "Practice: Create Reports & Export Data", duration: "20 min", type: "sandbox", sandboxType: "data-analysis" },
      { id: "5", title: "Exporting Individual Questions & Custom Charts", duration: "6 min", type: "video" },
      { id: "6", title: "Quiz: Sharing & Reporting Best Practices", duration: "4 min", type: "quiz" },
    ],
  },
  {
    id: "customer-feedback",
    title: "Customer Feedback Programs: NPS & CSAT",
    description: "Build world-class customer feedback systems using Net Promoter Score (NPS) and Customer Satisfaction (CSAT) methodologies. Learn to automatically calculate scores, segment promoters vs detractors, and create benchmarkable surveys.",
    duration: "5 min",
    skills: ["NPS Methodology", "CSAT Measurement", "Benchmarking", "Customer Insights"],
    participants: 7856,
    category: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&auto=format&fit=crop",
    modules: [
      { id: "1", title: "Net Promoter Score (NPS): Methodology & Templates", duration: "10 min", type: "video" },
      { id: "2", title: "Customer Satisfaction (CSAT) Surveys", duration: "8 min", type: "video" },
      { id: "3", title: "Benchmarkable Questions & Industry Comparison", duration: "10 min", type: "video" },
      { id: "4", title: "Analyzing NPS: Promoters, Passives, Detractors", duration: "9 min", type: "video" },
      { id: "5", title: "Quiz: Customer Feedback Metrics", duration: "5 min", type: "quiz" },
      { id: "6", title: "Design Your NPS Program", duration: "3 min", type: "activity" },
    ],
  },
  {
    id: "employee-engagement",
    title: "Employee Engagement & Workplace Surveys",
    description: "Create impactful employee engagement surveys using benchmarkable templates. Learn to measure satisfaction, culture, remote work sentiment, and return-to-work readiness with actionable insights.",
    duration: "9 min",
    skills: ["Employee Engagement", "Workplace Culture", "Remote Work", "HR Analytics"],
    participants: 9123,
    category: "Advanced",
    imageUrl: employeeEngagementImg,
    modules: [
      { id: "1", title: "Employee Engagement Survey Templates & Benchmarks", duration: "10 min", type: "video" },
      { id: "2", title: "Return to Work Solutions & Remote Work Surveys", duration: "10 min", type: "video" },
      { id: "3", title: "COVID-19 Symptom Tracking & Risk Assessment", duration: "8 min", type: "video" },
      { id: "4", title: "Analyzing Employee Feedback & Sentiment", duration: "12 min", type: "video" },
      { id: "5", title: "Creating Action Plans from Survey Data", duration: "7 min", type: "video" },
      { id: "6", title: "Quiz: HR Survey Best Practices", duration: "3 min", type: "quiz" },
    ],
    industryStats: {
      industry: "Human Resources",
      completions: 4500,
    },
  },
  {
    id: "enterprise-features",
    title: "Advanced Analytics & Multi-Survey Analysis",
    description: "Master advanced analytical techniques including thematic analysis, crosstab reports, longitudinal studies, and multi-survey analysis. Learn to track data trends over time and extract deep insights.",
    duration: "4 min",
    skills: ["Thematic Analysis", "Crosstabs", "Longitudinal Analysis", "Data Trends"],
    participants: 3421,
    category: "Advanced",
    imageUrl: advancedAnalyticsImg,
    modules: [
      { id: "1", title: "Thematic Analysis with AI", duration: "10 min", type: "video" },
      { id: "2", title: "Crosstab Reports for Deep Comparisons", duration: "10 min", type: "video" },
      { id: "3", title: "Multi-Survey Analysis & Longitudinal Studies", duration: "12 min", type: "video" },
      { id: "4", title: "Data Trends & Response Quality Detection", duration: "10 min", type: "video" },
      { id: "5", title: "Analyzing Multiple Surveys Together", duration: "5 min", type: "video" },
      { id: "6", title: "Quiz: Advanced Analytics Techniques", duration: "3 min", type: "quiz" },
    ],
  },
  {
    id: "ai-surveys",
    title: "AI-Powered Survey Features",
    description: "Harness the power of OpenAI integration with Build with AI and Analyze with AI. Learn to create surveys instantly, detect sentiment automatically, and uncover insights with artificial intelligence.",
    duration: "3 min",
    skills: ["AI Survey Creation", "AI Analysis", "Sentiment Detection", "Automated Insights"],
    participants: 5400,
    category: "Advanced",
    imageUrl: aiSurveysImg,
    modules: [
      { id: "1", title: "Build Surveys with AI (OpenAI Integration)", duration: "10 min", type: "video" },
      { id: "2", title: "Analyze with AI: Quick Insights Discovery", duration: "10 min", type: "video" },
      { id: "3", title: "Sentiment Analysis for Text Responses", duration: "10 min", type: "video" },
      { id: "4", title: "Thematic Analysis with AI Automation", duration: "7 min", type: "video" },
      { id: "5", title: "Quiz: AI Features Mastery", duration: "3 min", type: "quiz" },
    ],
    industryStats: {
      industry: "Technology",
      completions: 2800,
    },
  },
  {
    id: "special-use-cases",
    title: "Special Survey Use Cases & Templates",
    description: "Explore specialized survey types including quizzes, forms, payments, elections/polls, and consent statements. Learn to use SurveyMonkey beyond traditional surveys.",
    duration: "6 min",
    skills: ["Quiz Creation", "Forms", "Payment Integration", "Elections", "Consent Management"],
    participants: 4200,
    category: "Intermediate",
    imageUrl: specialCasesImg,
    modules: [
      { id: "1", title: "Creating Quizzes with Scoring", duration: "10 min", type: "video" },
      { id: "2", title: "Getting Started with Forms", duration: "8 min", type: "video" },
      { id: "3", title: "Accepting Payments with Stripe Integration", duration: "8 min", type: "video" },
      { id: "4", title: "Using Surveys for Elections & Polls", duration: "7 min", type: "video" },
      { id: "5", title: "Adding Consent Statements & Privacy Notices", duration: "7 min", type: "video" },
      { id: "6", title: "Quiz: Special Use Cases", duration: "5 min", type: "quiz" },
    ],
  },
];

export const getUserProgress = (courseId: string): number => {
  const progressMap: { [key: string]: number } = {
    "getting-started": 0,
    "survey-design": 45,
    "data-analysis": 30,
    "response-collection": 60,
    "employee-engagement": 100,
    "customer-feedback": 15,
    "enterprise-features": 0,
    "ai-surveys": 0,
    "special-use-cases": 20,
  };
  return progressMap[courseId] || 0;
};
