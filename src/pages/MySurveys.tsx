import { useState, useEffect } from "react";
import { ProductHeader } from "@/components/ProductHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Sparkles, GraduationCap, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const MySurveys = () => {
  const navigate = useNavigate();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showTrainingBanner, setShowTrainingBanner] = useState(true);

  // Show welcome modal for new users (you can enhance this with localStorage or user preferences)
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleWelcomeClose = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
  };

  const handleStartTraining = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
    navigate("/course/getting-started");
  };

  const options = [
    {
      icon: FileText,
      title: "Start from scratch",
      description: "Begin with a blank page, or copy and paste a survey you've written.",
      action: () => {
        // Navigate to survey builder or create new survey
        console.log("Start from scratch");
      },
    },
    {
      icon: Sparkles,
      title: "Use a popular template",
      description: "Use a template we've picked for you to create and send surveys faster.",
      action: () => {
        // Navigate to templates
        console.log("Use template");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ProductHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Training Center Banner */}
        {showTrainingBanner && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setShowTrainingBanner(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    New to SurveyMonkey? Start with our Training Center
                  </h3>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                    Free
                  </Badge>
                </div>
                <p className="text-gray-700 mb-4">
                  Learn the fundamentals of creating surveys, analyzing data, and getting the most out of SurveyMonkey. 
                  Our Getting Started course takes just 9 minutes!
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => navigate("/course/getting-started")}
                    className="gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Start Getting Started Course
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/courses")}
                  >
                    Browse All Courses
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What do you want to do?
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {options.map((option) => (
              <Card
                key={option.title}
                className="p-8 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
                onClick={option.action}
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Or browse your existing surveys
            </p>
            <Button variant="outline" size="lg">
              <Copy className="w-4 h-4 mr-2" />
              View All Surveys
            </Button>
          </div>
        </div>
      </main>

      {/* Welcome Modal */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              Welcome to SurveyMonkey!
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Get the most out of your experience by starting with our training resources
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <Card className="p-6 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Getting Started Course</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Master the fundamentals of creating professional surveys in just 9 minutes. 
                    Learn to navigate the platform, choose from templates, and understand essential question types.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">9 min</Badge>
                    <Badge variant="outline">Beginner Friendly</Badge>
                    <Badge variant="outline">6 Modules</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ✓ Platform Navigation • ✓ Question Types • ✓ Templates • ✓ Interactive Sandbox
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary mb-1">9+</p>
                <p className="text-xs text-muted-foreground">Courses Available</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary mb-1">15K+</p>
                <p className="text-xs text-muted-foreground">Learners</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary mb-1">100%</p>
                <p className="text-xs text-muted-foreground">Free Training</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleStartTraining}
              className="flex-1 gap-2"
              size="lg"
            >
              <GraduationCap className="w-5 h-5" />
              Start Getting Started Course
            </Button>
            <Button 
              variant="outline"
              onClick={handleWelcomeClose}
              size="lg"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySurveys;
