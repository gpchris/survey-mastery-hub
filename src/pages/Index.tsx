import { Navigation } from "@/components/Navigation";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Card } from "@/components/ui/card";
import { Award, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with our most popular courses, designed to get you up and running quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Training?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Get Certified</h3>
                <p className="text-muted-foreground">
                  Earn recognized certifications you can share on LinkedIn and showcase your expertise to employers.
                </p>
              </Card>

              <Card className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Proven Results</h3>
                <p className="text-muted-foreground">
                  78% of learners create their first survey within a week of completing a course.
                </p>
              </Card>

              <Card className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/30 mb-4">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Join Thousands</h3>
                <p className="text-muted-foreground">
                  Learn alongside 50,000+ professionals who are mastering survey design and data analysis.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <MobileBottomNav />
    </div>
  );
};

export default Index;
