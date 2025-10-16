import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  FileQuestion, 
  Activity, 
  Boxes,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SurveyBuilder } from "@/components/SurveyBuilder";
import { DataAnalysisSandbox } from "@/components/DataAnalysisSandbox";
import { Quiz } from "@/components/Quiz";
import { getModuleContent } from "@/data/moduleContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import type { Module } from "@/data/courses";

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const { getProgress, getCompletedModules, completeModule } = useCourseProgress();
  const progress = course ? getProgress(course.id) : 0;
  const completedModuleIds = course ? getCompletedModules(course.id) : [];
  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [currentSandbox, setCurrentSandbox] = useState<"survey-builder" | "data-analysis" | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

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

  const handleNextLesson = () => {
    if (!course || !selectedModule) return;
    
    // Mark current module as completed
    completeModule(course.id, selectedModule.id, course.modules.length);
    
    // Navigate to next module
    const currentIndex = course.modules.findIndex(m => m.id === selectedModule.id);
    if (currentIndex < course.modules.length - 1) {
      setSelectedModule(course.modules[currentIndex + 1]);
    }
  };

  const handlePreviousLesson = () => {
    if (!course || !selectedModule) return;
    
    const currentIndex = course.modules.findIndex(m => m.id === selectedModule.id);
    if (currentIndex > 0) {
      setSelectedModule(course.modules[currentIndex - 1]);
    }
  };

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

  const handleModuleClick = (module: Module) => {
    if (module.type === "sandbox" && module.sandboxType) {
      openSandbox(module.sandboxType);
    } else {
      setSelectedModule(module);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <SidebarProvider>
        <div className="flex flex-1 w-full overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-12">
              <Button variant="ghost" className="mb-6" asChild>
                <Link to="/courses">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Link>
              </Button>

              {/* Course Overview - Shows when no module is selected */}
              {!selectedModule && (
                <div className="max-w-4xl animate-fade-in">
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
                      <Button 
                        size="lg" 
                        className="gap-2"
                        onClick={() => setSelectedModule(course.modules[0])}
                      >
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

                  {course.industryStats && (
                    <Card className="p-6 bg-accent/10 border-accent">
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
                </div>
              )}

              {/* Module Content - Shows when a module is selected */}
              {selectedModule && (
                <div className="max-w-4xl animate-fade-in">
                  <div className="mb-6">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedModule(null)}
                      className="mb-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Overview
                    </Button>
                    <h1 className="text-3xl font-bold mb-2">{selectedModule.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedModule.duration}</span>
                      </div>
                      <Badge variant="outline">
                        {selectedModule.type === "sandbox" ? "Interactive" : selectedModule.type}
                      </Badge>
                    </div>
                  </div>

                  <Card className="p-8">
                    {selectedModule.type === "video" && (
                      <div className="space-y-6">
                        <div className="aspect-video bg-accent/20 rounded-lg flex items-center justify-center">
                          <PlayCircle className="w-20 h-20 text-muted-foreground" />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Video Content</h3>
                          <p className="text-muted-foreground">
                            This lesson covers key concepts and practical demonstrations. 
                            Watch the video above to learn more about {selectedModule.title.toLowerCase()}.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedModule.type === "quiz" && (
                      <div className="space-y-6">
                        {(() => {
                          const moduleContent = getModuleContent(selectedModule.id);
                          if (moduleContent?.quizQuestions) {
                            return (
                              <Quiz 
                                questions={moduleContent.quizQuestions} 
                                onComplete={handleNextLesson}
                              />
                            );
                          }
                          return (
                            <div className="text-center py-12">
                              <FileQuestion className="w-20 h-20 text-primary mx-auto mb-4" />
                              <h3 className="text-xl font-semibold mb-2">Quiz: Test Your Knowledge</h3>
                              <p className="text-muted-foreground mb-6">
                                Complete this quiz to assess your understanding of the previous lessons.
                              </p>
                              <Button size="lg" onClick={handleNextLesson}>Start Quiz</Button>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {selectedModule.type === "activity" && (
                      <div className="space-y-6">
                        <div className="text-center py-12">
                          <Activity className="w-20 h-20 text-primary mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Practical Activity</h3>
                          <p className="text-muted-foreground mb-6">
                            Apply what you've learned in this hands-on exercise.
                          </p>
                          <Button size="lg">Start Activity</Button>
                        </div>
                      </div>
                    )}

                    {selectedModule.type === "sandbox" && (
                      <div className="text-center py-12">
                        <Boxes className="w-20 h-20 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Interactive Sandbox</h3>
                        <p className="text-muted-foreground mb-6">
                          Practice in a safe, interactive environment with real-time feedback.
                        </p>
                        <Button 
                          size="lg"
                          onClick={() => selectedModule.sandboxType && openSandbox(selectedModule.sandboxType)}
                        >
                          Launch Sandbox
                        </Button>
                      </div>
                    )}
                  </Card>

                  <div className="flex items-center justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousLesson}
                      disabled={!course || course.modules.findIndex(m => m.id === selectedModule.id) === 0}
                    >
                      Previous Lesson
                    </Button>
                    <Button 
                      onClick={handleNextLesson}
                      disabled={!course || course.modules.findIndex(m => m.id === selectedModule.id) === course.modules.length - 1}
                    >
                      Next Lesson <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar - Course Modules */}
          <CourseSidebar 
            course={course}
            modules={course.modules}
            completedModules={completedModuleIds}
            selectedModule={selectedModule}
            onModuleClick={handleModuleClick}
            getModuleIcon={getModuleIcon}
          />
        </div>
      </SidebarProvider>

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

interface CourseSidebarProps {
  course: typeof courses[0];
  modules: Module[];
  completedModules: string[];
  selectedModule: Module | null;
  onModuleClick: (module: Module) => void;
  getModuleIcon: (type: string) => any;
}

function CourseSidebar({ 
  course, 
  modules, 
  completedModules, 
  selectedModule, 
  onModuleClick, 
  getModuleIcon 
}: CourseSidebarProps) {
  return (
    <Sidebar side="right" className="w-80 border-l bg-background">
      <SidebarContent className="bg-background pt-6">
        <div className="p-4 border-b sticky top-0 bg-background z-10">
          <h2 className="font-semibold text-lg mb-2">Course Content</h2>
          <p className="text-sm text-muted-foreground">
            {completedModules.length} of {modules.length} completed
          </p>
          <Progress 
            value={(completedModules.length / modules.length) * 100} 
            className="h-1 mt-2" 
          />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module, index) => {
                const Icon = getModuleIcon(module.type);
                const isCompleted = completedModules.includes(module.id);
                const isActive = selectedModule?.id === module.id;
                
                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton
                      onClick={() => onModuleClick(module)}
                      className={`w-full justify-start gap-3 h-auto py-3 ${
                        isActive ? "bg-accent font-medium" : ""
                      }`}
                    >
                      <div className={`flex-shrink-0 ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`w-4 h-4 flex-shrink-0 ${
                            module.type === "sandbox" ? "text-primary" : "text-muted-foreground"
                          }`} />
                          <span className="text-xs text-muted-foreground">
                            {module.duration}
                          </span>
                        </div>
                        <p className="text-sm leading-tight">{module.title}</p>
                        {module.type === "sandbox" && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Interactive
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default CourseDetail;
