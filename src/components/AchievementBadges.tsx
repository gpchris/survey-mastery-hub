import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Target, Zap, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  earned: boolean;
  progress?: number;
}

interface AchievementBadgesProps {
  completedCourses: number;
  totalProgress: number;
}

export const AchievementBadges = ({
  completedCourses,
  totalProgress,
}: AchievementBadgesProps) => {
  const achievements: Achievement[] = [
    {
      id: "first-course",
      title: "First Steps",
      description: "Complete your first course",
      icon: Award,
      earned: completedCourses >= 1,
    },
    {
      id: "three-courses",
      title: "Rising Star",
      description: "Complete 3 courses",
      icon: Star,
      earned: completedCourses >= 3,
      progress: Math.min((completedCourses / 3) * 100, 100),
    },
    {
      id: "expert",
      title: "Expert",
      description: "Complete all courses",
      icon: Trophy,
      earned: completedCourses >= 6,
      progress: Math.min((completedCourses / 6) * 100, 100),
    },
    {
      id: "on-track",
      title: "On Track",
      description: "50% overall progress",
      icon: Target,
      earned: totalProgress >= 50,
      progress: Math.min(totalProgress, 100),
    },
    {
      id: "speed-learner",
      title: "Quick Learner",
      description: "Complete a course in one day",
      icon: Zap,
      earned: false, // This would be tracked via backend
    },
  ];

  const earnedAchievements = achievements.filter((a) => a.earned);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Your Achievements</h2>
        <Badge variant="secondary" className="text-sm">
          {earnedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`flex flex-col items-center text-center p-3 rounded-lg transition-all ${
                achievement.earned
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/30 opacity-60"
              }`}
            >
              <div
                className={`p-3 rounded-full mb-2 ${
                  achievement.earned
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-medium text-sm text-foreground mb-1">
                {achievement.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
              {!achievement.earned && achievement.progress !== undefined && (
                <div className="w-full mt-2">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/50 transition-all"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(achievement.progress)}%
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
