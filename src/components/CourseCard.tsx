import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  participants: number;
  progress?: number;
  imageUrl?: string;
  industryStats?: {
    industry: string;
    completions: number;
  };
}

export const CourseCard = ({
  id,
  title,
  description,
  duration,
  skills,
  participants,
  progress,
  imageUrl,
  industryStats,
}: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-border bg-card">
      <Link to={`/course/${id}`} className="block">
        <div className="aspect-video bg-accent/20 relative overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20">
              <TrendingUp className="w-16 h-16 text-primary/40" />
            </div>
          )}
          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{participants.toLocaleString()}+ learners</span>
            </div>
          </div>

          {/* Industry-specific social proof */}
          {industryStats && (
            <div className="mb-4 p-2 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-primary">
                  {industryStats.completions.toLocaleString()}
                </span>{" "}
                learners in <span className="font-medium">{industryStats.industry}</span> completed this
              </p>
            </div>
          )}

          {progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-primary">{progress}%</span>
              </div>
            </div>
          )}

          <Button
            variant={progress !== undefined && progress > 0 ? "default" : "outline"}
            className="w-full"
          >
            {progress !== undefined && progress > 0 ? "Continue Learning" : "Start Course"}
          </Button>
        </div>
      </Link>
    </Card>
  );
};
