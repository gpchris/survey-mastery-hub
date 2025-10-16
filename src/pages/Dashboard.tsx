import { Navigation } from "@/components/Navigation";
import { CourseCard } from "@/components/CourseCard";
import { courses, getUserProgress } from "@/data/courses";
import { Card } from "@/components/ui/card";
import { Award, BookOpen, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const inProgressCourses = courses.filter((course) => {
    const progress = getUserProgress(course.id);
    return progress > 0 && progress < 100;
  });

  const completedCourses = courses.filter((course) => getUserProgress(course.id) === 100);
  const notStartedCourses = courses.filter((course) => getUserProgress(course.id) === 0);

  const totalProgress = courses.reduce((sum, course) => sum + getUserProgress(course.id), 0) / courses.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Welcome back, learner!</h1>
            <p className="text-lg text-muted-foreground">
              Continue your learning journey and track your progress.
            </p>
          </div>

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
                    skills={course.skills}
                    participants={course.participants}
                    progress={getUserProgress(course.id)}
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
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
