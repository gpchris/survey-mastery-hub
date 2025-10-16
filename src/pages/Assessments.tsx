import { Navigation } from "@/components/Navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Clock, Award, TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Assessments = () => {
  const assessments = [
    {
      id: "getting-started-assessment",
      title: "Getting Started with SurveyMonkey",
      description: "Test your knowledge of SurveyMonkey basics and survey creation fundamentals",
      duration: "15 min",
      questions: 20,
      passingScore: 80,
      status: "completed",
      score: 95,
      courseId: "getting-started"
    },
    {
      id: "data-analysis-assessment",
      title: "Data Analysis & Interpretation",
      description: "Evaluate your ability to analyze survey results and draw meaningful insights",
      duration: "20 min",
      questions: 25,
      passingScore: 80,
      status: "available",
      courseId: "data-analysis"
    },
    {
      id: "advanced-analytics-assessment",
      title: "Advanced Analytics Techniques",
      description: "Advanced statistical analysis and data visualization proficiency test",
      duration: "25 min",
      questions: 30,
      passingScore: 85,
      status: "locked",
      courseId: "advanced-analytics"
    },
    {
      id: "employee-engagement-assessment",
      title: "Employee Engagement Surveys",
      description: "Assess your skills in creating and analyzing employee engagement surveys",
      duration: "18 min",
      questions: 22,
      passingScore: 80,
      status: "available",
      courseId: "employee-engagement"
    },
    {
      id: "reporting-assessment",
      title: "Reporting & Dashboards",
      description: "Test your expertise in creating professional reports and dashboards",
      duration: "20 min",
      questions: 25,
      passingScore: 80,
      status: "failed",
      score: 72,
      courseId: "reporting"
    },
  ];

  const completedCount = assessments.filter(a => a.status === "completed").length;
  const averageScore = assessments
    .filter(a => a.score)
    .reduce((sum, a) => sum + (a.score || 0), 0) / assessments.filter(a => a.score).length || 0;

  const getStatusBadge = (status: string, score?: number) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Passed {score}%</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed {score}%</Badge>;
      case "locked":
        return <Badge variant="secondary">Locked</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <ClipboardCheck className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Skill Assessments</h1>
            <p className="text-lg text-muted-foreground">
              Test your knowledge and earn certifications to showcase your expertise
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assessments Passed</p>
                  <p className="text-2xl font-bold text-foreground">{completedCount}/{assessments.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round(averageScore)}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <ClipboardCheck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-foreground">
                    {assessments.filter(a => a.status === "available").length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Assessment List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-foreground">All Assessments</h2>
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-muted rounded-lg">
                      {getStatusIcon(assessment.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{assessment.title}</h3>
                        {getStatusBadge(assessment.status, assessment.score)}
                      </div>
                      <p className="text-muted-foreground mb-3">{assessment.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{assessment.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClipboardCheck className="w-4 h-4" />
                          <span>{assessment.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Passing score: {assessment.passingScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {assessment.status === "completed" && (
                      <Button variant="outline" asChild>
                        <Link to={`/course/${assessment.courseId}`}>Review Course</Link>
                      </Button>
                    )}
                    {assessment.status === "failed" && (
                      <>
                        <Button variant="outline" asChild>
                          <Link to={`/course/${assessment.courseId}`}>Study Again</Link>
                        </Button>
                        <Button>Retake Assessment</Button>
                      </>
                    )}
                    {assessment.status === "available" && (
                      <Button>Start Assessment</Button>
                    )}
                    {assessment.status === "locked" && (
                      <Button variant="secondary" disabled>
                        Complete Prerequisites
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-12 p-8 bg-primary/5 border-primary/20">
            <div className="text-center max-w-2xl mx-auto">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Earn Your Certification</h3>
              <p className="text-muted-foreground mb-6">
                Complete all assessments and showcase your SurveyMonkey expertise to employers and clients. 
                Your certifications are shareable on LinkedIn and other professional networks.
              </p>
              <Button size="lg" variant="default">
                Download Certificate
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default Assessments;
