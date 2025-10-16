import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { courses, getUserProgress } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, CheckCircle2, Circle, PlayCircle, FileQuestion, Activity, Boxes } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SurveyBuilder } from "@/components/SurveyBuilder";
import { DataAnalysisSandbox } from "@/components/DataAnalysisSandbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const progress = course ? getUserProgress(course.id) : 0;
  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [currentSandbox, setCurrentSandbox] = useState<"survey-builder" | "data-analysis" | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const completedModules = Math.floor((progress / 100) * course.modules.length);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video":
        return PlayCircle;
      case "quiz":
        return FileQuestion;
      case "activity":
        return Activity;
      case "sandbox":
        return Boxes;
      default:
        return Circle;
    }
  };

  const openSandbox = (sandboxType: "survey-builder" | "data-analysis") => {
    setCurrentSandbox(sandboxType);
    setSandboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>

          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>{course.participants.toLocaleString()}+ learners</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {course.category}
              </Badge>
            </div>

            {progress > 0 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium text-primary">{progress}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                {progress > 0 && progress < 100 ? "Continue Course" : progress === 100 ? "Review Course" : "Start Course"}
                <PlayCircle className="w-5 h-5" />
              </Button>
              {progress === 100 && (
                <Button size="lg" variant="secondary" className="gap-2">
                  Download Certificate
                </Button>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">What You'll Learn</h2>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Social Proof */}
          {course.industryStats && (
            <Card className="p-6 mb-8 bg-accent/10 border-accent">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Popular in {course.industryStats.industry}</h3>
                  <p className="text-muted-foreground">
                    {course.industryStats.completions.toLocaleString()} professionals in {course.industryStats.industry} have completed this course.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Course Modules */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Course Content</h2>
            <div className="space-y-3">
              {course.modules.map((module, index) => {
                const Icon = getModuleIcon(module.type);
                const isCompleted = index < completedModules;
                
                return (
                  <div
                    key={module.id}
                    className={`group flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isCompleted ? "bg-accent/20" : "bg-muted/30"
                    } ${module.type === "sandbox" ? "hover:shadow-md hover:bg-primary/5 cursor-pointer" : ""}`}
                    onClick={() => {
                      if (module.type === "sandbox" && module.sandboxType) {
                        openSandbox(module.sandboxType);
                      }
                    }}
                  >
                    <div className={`flex-shrink-0 ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </div>
                    <Icon className={`w-5 h-5 flex-shrink-0 ${module.type === "sandbox" ? "text-primary group-hover:scale-110 transition-transform" : "text-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{module.title}</h3>
                      {module.type === "sandbox" && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Interactive Sandbox
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    {module.type === "sandbox" && (
                      <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Launch
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </main>

      {/* Sandbox Dialog */}
      <Dialog open={sandboxOpen} onOpenChange={setSandboxOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Boxes className="w-6 h-6 text-primary" />
              {currentSandbox === "survey-builder" ? "Survey Builder Sandbox" : "Data Analysis Sandbox"}
            </DialogTitle>
            <DialogDescription>
              Practice building and analyzing surveys in a safe, interactive environment
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            {currentSandbox === "survey-builder" && (
              <SurveyBuilder onComplete={() => setSandboxOpen(false)} />
            )}
            {currentSandbox === "data-analysis" && (
              <DataAnalysisSandbox onComplete={() => setSandboxOpen(false)} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
