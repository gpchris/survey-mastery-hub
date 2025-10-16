import { Navigation } from "@/components/Navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses = () => {
  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

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
                  {courses
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
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default Courses;
