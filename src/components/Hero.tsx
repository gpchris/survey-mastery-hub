import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(165,25%,22%)] py-20 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Master SurveyMonkey
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Learn how to create powerful surveys, analyze data, and make better decisions. Join thousands of professionals building their survey expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold" asChild>
              <Link to="/courses">
                <GraduationCap className="w-5 h-5" />
                Start Free Course
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 text-base font-semibold bg-transparent border-2 border-white/30 hover:bg-white/10 text-white hover:text-white" 
              asChild
            >
              <Link to="/courses">
                View Learning Paths
              </Link>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">38,000+</div>
                <div className="text-sm text-white/80">Active Learners</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">6</div>
                <div className="text-sm text-white/80">Expert-Led Courses</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-sm text-white/80">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
