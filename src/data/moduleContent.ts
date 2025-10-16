export interface ModuleContent {
  id: string;
  title: string;
  content: string;
  keyTakeaways: string[];
  practiceSteps?: string[];
}

export const moduleContentMap: Record<string, ModuleContent> = {
  // Getting Started Course
  "getting-started-1": {
    id: "1",
    title: "Welcome to SurveyMonkey Platform",
    content: `Welcome to SurveyMonkey, the world's leading survey platform trusted by millions of users worldwide. In this module, you'll learn how SurveyMonkey helps you create, send, and analyze surveys to make better decisions.

## What is SurveyMonkey?

SurveyMonkey is an intuitive, powerful platform that makes it easy to collect feedback from customers, employees, or any audience. Whether you're conducting market research, measuring customer satisfaction, or gathering employee feedback, SurveyMonkey provides the tools you need.

## Key Platform Features

- **Survey Creation**: Build surveys from scratch, use templates, or leverage AI-powered survey creation
- **Distribution**: Share surveys via email, web links, social media, or embed them in your website
- **Analysis**: View results in real-time with powerful charts, filters, and AI-powered insights
- **Collaboration**: Work with your team to create and analyze surveys together

## Your Survey Journey

Creating a great survey involves four main steps:
1. **Design**: Choose a creation method and add your questions
2. **Customize**: Apply logic, branding, and customize the look
3. **Distribute**: Send your survey to your audience
4. **Analyze**: Collect responses and gain insights from your data`,
    keyTakeaways: [
      "SurveyMonkey is trusted by millions for collecting feedback and making data-driven decisions",
      "The platform offers multiple ways to create, distribute, and analyze surveys",
      "You can start from scratch, use templates, or build with AI",
      "Real-time results and powerful analytics help you understand your data"
    ]
  },

  "getting-started-2": {
    id: "2",
    title: "Creating Your First Survey - Four Ways",
    content: `SurveyMonkey offers multiple creation methods to match your needs and experience level. Let's explore each approach:

## Method 1: Start from Scratch

Perfect when you have a clear vision for your survey. Start with a blank page and build exactly what you need.

**When to use**: Custom surveys with unique requirements
**Best for**: Experienced survey creators who know exactly what they want

## Method 2: Copy an Existing Survey

Save time by duplicating surveys you've already created. All questions, logic, and design carry over to the copy.

**When to use**: Similar surveys or recurring projects
**Best for**: Regular surveys with minor variations

## Method 3: Build with AI

The fastest way to create a survey! Just describe your survey goals in a simple prompt, and AI generates a complete survey for you. You can then edit, regenerate, or start over.

**When to use**: Quick survey creation or when you need inspiration
**Best for**: Anyone who wants to save time and get professional suggestions

**Example prompts**:
- "Create an employee satisfaction survey for a tech company"
- "Build a customer feedback survey for a new restaurant"
- "Generate an event planning questionnaire"

## Method 4: Pick a Popular Template

Choose from hundreds of expert-designed templates covering topics like customer satisfaction, employee engagement, market research, and more.

**When to use**: Standard survey topics or when you need proven questions
**Best for**: Quick starts with methodologically sound questions

All templates are created by survey methodologists and are benchmarkable against industry standards.`,
    keyTakeaways: [
      "Four creation methods: Scratch, Copy, AI, and Templates",
      "Build with AI is the fastest way to create professional surveys",
      "Templates are designed by experts and benchmarkable",
      "Choose the method that matches your experience and timeline"
    ]
  },

  "getting-started-3": {
    id: "3",
    title: "Using Templates vs. Starting from Scratch",
    content: `Choosing between templates and starting from scratch depends on your specific needs. Let's compare both approaches:

## Using Templates

### Advantages
- **Save Time**: Get started in minutes with pre-written questions
- **Expert Design**: Created by survey methodologists to minimize bias
- **Benchmarkable**: Compare your results against industry standards
- **Proven Questions**: Tested questions that get accurate responses

### Best Use Cases
- Customer Satisfaction (CSAT) surveys
- Net Promoter Score (NPS) surveys
- Employee engagement surveys
- Market research studies
- Event feedback

### How to Use Templates
1. Click "Create survey" and select "Pick a popular template"
2. Browse categories or use search to find relevant templates
3. Preview the template to see all questions
4. Click "Use this template" to start customizing
5. Edit questions, add your branding, and customize as needed

## Starting from Scratch

### Advantages
- **Complete Control**: Build exactly what you need
- **Unique Questions**: Ask questions specific to your situation
- **Custom Logic**: Create complex survey flows
- **No Constraints**: No need to adapt existing structures

### Best Use Cases
- Highly specialized research
- Unique business requirements
- When you need specific question wording
- Complex survey logic and branching

### Tips for Starting from Scratch
- Plan your question flow before building
- Keep questions clear and unbiased
- Use simple language and avoid jargon
- Test your survey before sending`,
    keyTakeaways: [
      "Templates save time and provide expert-designed, benchmarkable questions",
      "Starting from scratch gives complete control for unique requirements",
      "Templates are ideal for standard survey topics like CSAT and NPS",
      "Scratch surveys work best for specialized or highly customized needs"
    ]
  },

  "getting-started-4": {
    id: "4",
    title: "Overview of Question Types",
    content: `SurveyMonkey offers 25+ question types to collect exactly the data you need. Understanding which type to use is crucial for getting quality responses.

## Most Common Question Types

### Multiple Choice
Let respondents select a **single answer** from a list of options.

**Best for**: Demographics, preferences, yes/no questions
**Example**: "What is your age group?" with options 18-24, 25-34, 35-44, etc.

### Checkboxes
Allow respondents to select **multiple answers** from your list.

**Best for**: "Select all that apply" questions
**Example**: "Which features are most important to you? (Select all that apply)"

### Comment Box
Collect longer, open-ended text responses.

**Best for**: Detailed feedback, suggestions, explanations
**Example**: "What can we improve about our service?"

### Single Textbox
Short text or numerical answers.

**Best for**: Names, numbers, short responses
**Validation options**: Email format, date format, number ranges

## Rating & Ranking Types

### Star Rating
Visual rating scale using stars, hearts, thumbs, or smileys.

**Best for**: Quick satisfaction ratings
**Options**: 1-5 stars, 1-10 scale, thumbs up/down

### Net Promoter Score (NPS)
The gold standard for measuring customer loyalty on a 0-10 scale.

**Automatic calculation**: SurveyMonkey calculates your NPS score automatically
**Categories**: Promoters (9-10), Passives (7-8), Detractors (0-6)

### Matrix/Rating Scale
Evaluate multiple items using the same scale.

**Best for**: Rating multiple products, services, or statements
**Can collect**: Single answer per row or multiple answers

### Ranking
Let respondents rank options in order of preference.

**Best for**: Prioritization, preference ordering
**Options**: Drag-and-drop or dropdown menus

## Specialized Question Types

### File Upload
Let respondents attach files with their response.

### Image Choice
Display image options for respondents to select.

### Slider
Interactive slider for numerical ratings.

### Date/Time
Collect specific dates or times.

### Contact Information
Dedicated question types for Name, Email, Phone, and Address.

## Choosing the Right Question Type

**For quantitative data**: Use Multiple Choice, Checkboxes, Rating Scales, NPS
**For qualitative insights**: Use Comment Box, Single Textbox
**For visual engagement**: Use Star Rating, Image Choice, Slider
**For complex comparisons**: Use Matrix, Ranking

**Pro Tip**: The Question Bank contains hundreds of pre-written, certified questions that use the optimal question type for each topic.`,
    keyTakeaways: [
      "SurveyMonkey offers 25+ question types for every data collection need",
      "Multiple Choice and Checkboxes are most common for straightforward data",
      "NPS automatically calculates your customer loyalty score",
      "Choose question types based on the kind of data you need to collect"
    ]
  },

  "getting-started-5": {
    id: "5",
    title: "Hands-On: Build Your First Survey",
    content: `Now it's time to put your knowledge into practice! In this interactive sandbox, you'll create your first survey from start to finish.

## Your Practice Task

Create a simple customer feedback survey with the following elements:

1. **Welcome message** - Introduce your survey
2. **Multiple choice question** - "How satisfied are you with our service?"
3. **Star rating** - Rate your overall experience
4. **Comment box** - "What can we improve?"
5. **Thank you message** - Close your survey

## Step-by-Step Instructions

### Step 1: Add a Welcome Message
- Click "+ Add Question" and select "Text"
- Write a brief, friendly introduction
- Example: "Thank you for choosing our service! Your feedback helps us improve."

### Step 2: Add a Satisfaction Question
- Select "Multiple Choice" question type
- Enter your question: "How satisfied are you with our service?"
- Add answer options:
  - Very Satisfied
  - Satisfied
  - Neutral
  - Dissatisfied
  - Very Dissatisfied

### Step 3: Add a Star Rating
- Select "Star Rating" question type
- Enter: "Rate your overall experience"
- Choose 5 stars as your scale

### Step 4: Add an Open-Ended Question
- Select "Comment Box" question type
- Enter: "What can we improve?"
- This is optional for respondents

### Step 5: Add a Thank You Page
- Click "Add page" and select "Thank you page"
- Write a closing message
- Example: "Thank you for your valuable feedback!"

## What You'll Learn

- How to add different question types
- How to structure a survey flow
- How to make questions required vs. optional
- How to preview your survey

Click "Launch Sandbox" below to start building!`,
    keyTakeaways: [
      "Practice builds confidence in creating surveys",
      "Start simple with a welcome, questions, and thank you",
      "Mix question types for different kinds of feedback",
      "Always preview before sending"
    ],
    practiceSteps: [
      "Add a text introduction",
      "Create a multiple choice satisfaction question",
      "Add a star rating for overall experience",
      "Include a comment box for detailed feedback",
      "Finish with a thank you page"
    ]
  },

  "getting-started-6": {
    id: "6",
    title: "Quiz: Platform Basics",
    content: `Test your understanding of SurveyMonkey platform basics with this quick quiz.

## Quiz Questions

### Question 1: Survey Creation Methods
Which of the following is NOT a survey creation method in SurveyMonkey?

A) Start from scratch
B) Build with AI
C) Import from Google Forms
D) Pick a popular template

**Correct Answer**: C - SurveyMonkey offers four creation methods: scratch, copy existing, AI, and templates, but not import from Google Forms.

---

### Question 2: Question Types
When should you use a Checkboxes question instead of Multiple Choice?

A) When you want only one answer
B) When respondents can select multiple answers
C) For numerical data only
D) For star ratings

**Correct Answer**: B - Checkboxes allow multiple selections; Multiple Choice allows only one.

---

### Question 3: NPS Score
What does NPS stand for and what scale does it use?

A) New Product Score, 1-5 scale
B) Net Promoter Score, 0-10 scale
C) Negative/Positive Scale, yes/no options
D) Numeric Performance Score, 1-100 scale

**Correct Answer**: B - Net Promoter Score uses a 0-10 scale to measure customer loyalty.

---

### Question 4: Templates
What is a key advantage of using SurveyMonkey templates?

A) They're the only free option
B) They're created by survey experts and are benchmarkable
C) They can't be edited
D) They automatically send to respondents

**Correct Answer**: B - Templates are designed by methodologists with benchmarkable, proven questions.

---

### Question 5: Best Practices
Which question type is best for collecting detailed, qualitative feedback?

A) Multiple Choice
B) Star Rating
C) Comment Box
D) Dropdown

**Correct Answer**: C - Comment Box allows open-ended text responses for detailed feedback.

## Passing Score

Answer 4 out of 5 questions correctly to pass and complete this module!`,
    keyTakeaways: [
      "Four creation methods: Scratch, Copy, AI, and Templates",
      "Checkboxes allow multiple answers; Multiple Choice allows one",
      "NPS uses a 0-10 scale and is calculated automatically",
      "Comment Box is best for detailed qualitative feedback"
    ]
  }
};

export const getModuleContent = (courseId: string, moduleId: string): ModuleContent | null => {
  const key = `${courseId}-${moduleId}`;
  return moduleContentMap[key] || null;
};