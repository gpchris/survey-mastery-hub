import { ProductHeader } from "@/components/ProductHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Sparkles } from "lucide-react";

const MySurveys = () => {
  const options = [
    {
      icon: FileText,
      title: "Start from scratch",
      description: "Begin with a blank page, or copy and paste a survey you've written.",
      action: () => {
        // Navigate to survey builder or create new survey
        console.log("Start from scratch");
      },
    },
    {
      icon: Sparkles,
      title: "Use a popular template",
      description: "Use a template we've picked for you to create and send surveys faster.",
      action: () => {
        // Navigate to templates
        console.log("Use template");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ProductHeader />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What do you want to do?
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {options.map((option) => (
              <Card
                key={option.title}
                className="p-8 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
                onClick={option.action}
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Or browse your existing surveys
            </p>
            <Button variant="outline" size="lg">
              <Copy className="w-4 h-4 mr-2" />
              View All Surveys
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MySurveys;
