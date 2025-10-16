import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Get certified in SurveyMonkey</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Master SurveyMonkey,
            <br />
            <span className="text-secondary">Elevate Your Impact</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of professionals learning to create better surveys, analyze results effectively, and make data-driven decisions with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="gap-2 text-base" asChild>
              <Link to="/courses">
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-primary-foreground" asChild>
              <Link to="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: BookOpen, label: "Self-paced Learning", value: "20+ courses" },
              { icon: Users, label: "Active Learners", value: "50,000+" },
              { icon: TrendingUp, label: "Completion Rate", value: "87%" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-8 h-8 mb-2 text-secondary" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
