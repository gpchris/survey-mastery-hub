import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, Download, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  courseName?: string;
  moduleName?: string;
}

export const Quiz = ({ questions, onComplete, courseName = "Course", moduleName = "Module" }: QuizProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      onComplete(Math.round((score / questions.length) * 100));
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Download",
      description: "Your certificate is being prepared for download.",
    });
    // In a real app, this would generate a PDF certificate
    console.log("Downloading certificate for:", { courseName, moduleName, score });
  };

  const handleShare = (platform: string) => {
    const percentage = Math.round((score / questions.length) * 100);
    const shareText = `I just completed the ${moduleName} quiz in ${courseName} with a score of ${percentage}%! 🎉`;
    const shareUrl = window.location.href;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast({
          title: "Link Copied!",
          description: "Share link copied to clipboard.",
        });
        break;
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-muted-foreground">
              You scored {score} out of {questions.length} questions
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Your Score</span>
              <span className="font-semibold">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          {passed ? (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Congratulations! You passed the quiz.</p>
              </div>

              <div className="border rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-center">Get Your Certificate</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Download your completion certificate and share your achievement with your network!
                </p>
                
                <Button 
                  onClick={handleDownloadCertificate} 
                  className="w-full gap-2"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </Button>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-center">Share Your Success</p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("linkedin")}
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("twitter")}
                      title="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("facebook")}
                      title="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare("copy")}
                      title="Copy link"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
              <p className="text-sm font-medium">You need 70% or higher to pass. Keep learning!</p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button onClick={handleRetry} variant="outline">
              Retry Quiz
            </Button>
            <Button onClick={() => onComplete(percentage)}>
              Continue Course
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium">
              Score: {score}/{currentQuestion}
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

          {!showResult ? (
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAnswer === index ? "border-primary bg-primary/5" : "hover:bg-accent"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 border rounded-lg p-4 ${
                    index === question.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : index === selectedAnswer
                      ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                      : "opacity-50"
                  }`}
                >
                  {index === question.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : index === selectedAnswer ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {showResult && question.explanation && (
          <div className={`border rounded-lg p-4 ${isCorrect ? "bg-green-50 dark:bg-green-950/20 border-green-200" : "bg-blue-50 dark:bg-blue-950/20 border-blue-200"}`}>
            <p className="text-sm font-medium mb-1">
              {isCorrect ? "Correct! ✓" : "Explanation:"}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!showResult ? (
            <Button onClick={handleNext} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleContinue}>
              {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
