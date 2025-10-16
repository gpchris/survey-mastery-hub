import { Navigation } from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { courses, getUserProgress } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, CheckCircle2, Circle, PlayCircle, FileQuestion, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const progress = course ? getUserProgress(course.id) : 0;

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
      default:
        return Circle;
    }
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
                    className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                      isCompleted ? "bg-accent/20" : "bg-muted/30"
                    }`}
                  >
                    <div className={`flex-shrink-0 ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </div>
                    <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{module.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
