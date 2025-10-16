import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface ResumeCardProps {
  courseId: string;
  courseTitle: string;
  progress: number;
  estimatedTimeLeft: number;
}

export const ResumeCard = ({
  courseId,
  courseTitle,
  progress,
  estimatedTimeLeft,
}: ResumeCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Play className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">Resume where you left off</h3>
            <p className="text-sm text-muted-foreground">Continue your learning journey</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{estimatedTimeLeft} min left</span>
        </div>
      </div>

      <div className="mb-4">
        <Link to={`/course/${courseId}`} className="text-foreground hover:text-primary transition-colors">
          <h4 className="font-medium mb-2">{courseTitle}</h4>
        </Link>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progress}% complete</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              You're {estimatedTimeLeft} minutes away from completing this course
            </span>
          </div>
        </div>
      </div>

      <Button asChild className="w-full">
        <Link to={`/course/${courseId}`}>
          <Play className="w-4 h-4 mr-2" />
          Continue Learning
        </Link>
      </Button>
    </Card>
  );
};
