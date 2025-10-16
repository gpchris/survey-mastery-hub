import { Navigation } from "@/components/Navigation";
import { CourseCard } from "@/components/CourseCard";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ResumeCard } from "@/components/ResumeCard";
import { AchievementBadges } from "@/components/AchievementBadges";
import { courses } from "@/data/courses";
import { Card } from "@/components/ui/card";
import { Award, BookOpen, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCourseProgress } from "@/hooks/useCourseProgress";

const Dashboard = () => {
  const { user } = useAuth();
  const { getProgress } = useCourseProgress();

  const inProgressCourses = courses.filter((course) => {
    const progress = getProgress(course.id);
    return progress > 0 && progress < 100;
  });

  const completedCourses = courses.filter((course) => getProgress(course.id) === 100);
  const notStartedCourses = courses.filter((course) => getProgress(course.id) === 0);

  const totalProgress = courses.reduce((sum, course) => sum + getProgress(course.id), 0) / courses.length;

  // Find the most recently worked on course with highest progress
  const mostRecentCourse = inProgressCourses.length > 0
    ? inProgressCourses.reduce((prev, current) =>
        getProgress(current.id) > getProgress(prev.id) ? current : prev
      )
    : null;

  // Calculate estimated time remaining for most recent course
  const getEstimatedTime = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const progress = getProgress(courseId);
    const totalMinutes = parseInt(course.duration);
    return Math.round((totalMinutes * (100 - progress)) / 100);
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get recommended action
  const getRecommendedAction = () => {
    if (mostRecentCourse) {
      const timeLeft = getEstimatedTime(mostRecentCourse.id);
      return `You're just ${timeLeft} minutes away from completing "${mostRecentCourse.title}"`;
    }
    if (completedCourses.length > 0) {
      return "Explore new courses to expand your skills";
    }
    return "Start your first course today and begin your learning journey";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="text-lg text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {getRecommendedAction()}
            </p>
          </div>

          {/* Resume Card */}
          {mostRecentCourse && (
            <div className="mb-8">
              <ResumeCard
                courseId={mostRecentCourse.id}
                courseTitle={mostRecentCourse.title}
                progress={getProgress(mostRecentCourse.id)}
                estimatedTimeLeft={getEstimatedTime(mostRecentCourse.id)}
              />
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round(totalProgress)}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Courses In Progress</p>
                  <p className="text-2xl font-bold text-foreground">{inProgressCourses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Award className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">{completedCourses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/30 rounded-lg">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Learned</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round((totalProgress / 100) * courses.length * 0.75)}h
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Achievements Section */}
          <section className="mb-12">
            <AchievementBadges
              completedCourses={completedCourses.length}
              totalProgress={totalProgress}
            />
          </section>

          {/* Continue Learning Section */}
          {inProgressCourses.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Continue Learning</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  duration={course.duration}
                  industryStats={course.industryStats}
                    skills={course.skills}
                    participants={course.participants}
                    progress={getProgress(course.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Completed Courses</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    duration={course.duration}
                    skills={course.skills}
                    participants={course.participants}
                    industryStats={course.industryStats}
                    progress={100}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Explore More Courses */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Explore More Courses</h2>
              <Button variant="outline" asChild>
                <Link to="/courses">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notStartedCourses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  duration={course.duration}
                  skills={course.skills}
                  participants={course.participants}
                  industryStats={course.industryStats}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default Dashboard;
