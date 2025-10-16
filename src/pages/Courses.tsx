import { Navigation } from "@/components/Navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { useAuth } from "@/contexts/AuthContext";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses = () => {
  const { isAuthenticated } = useAuth();
  const { getProgress } = useCourseProgress();
  
  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  // Categorize courses by progress status
  const inProgressCourses = isAuthenticated 
    ? courses.filter(course => {
        const progress = getProgress(course.id);
        return progress > 0 && progress < 100;
      })
    : [];

  const completedCourses = isAuthenticated
    ? courses.filter(course => {
        const progress = getProgress(course.id);
        return progress === 100;
      })
    : [];

  const availableCourses = isAuthenticated
    ? courses.filter(course => {
        const progress = getProgress(course.id);
        return progress === 0;
      })
    : courses;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Explore Courses</h1>
            <p className="text-lg text-muted-foreground">
              Browse our comprehensive library of courses designed to help you master SurveyMonkey.
            </p>
          </div>

          {isAuthenticated && inProgressCourses.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Continue Learning</h2>
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
                    industryStats={course.industryStats}
                  />
                ))}
              </div>
            </section>
          )}

          {isAuthenticated && completedCourses.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Completed Courses</h2>
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
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              {isAuthenticated ? "Available Courses" : "All Courses"}
            </h2>
            <Tabs defaultValue="All" className="mb-8">
              <TabsList className="mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses
                      .filter((course) => category === "All" || course.category === category)
                      .map((course) => (
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
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default Courses;
