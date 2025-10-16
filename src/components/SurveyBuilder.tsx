import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  CheckSquare, 
  Circle,
  Star,
  Image as ImageIcon,
  ChevronDown,
  Eye,
  Save
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: string;
  type: "text" | "multiple-choice" | "checkboxes" | "rating" | "dropdown";
  title: string;
  options?: string[];
  required: boolean;
}

interface SurveyBuilderProps {
  onComplete?: () => void;
}

export const SurveyBuilder = ({ onComplete }: SurveyBuilderProps) => {
  const [surveyTitle, setSurveyTitle] = useState("My New Survey");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple-choice",
      title: "How satisfied are you with our service?",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
      required: true,
    },
  ]);
  const [previewMode, setPreviewMode] = useState(false);

  const questionTypes = [
    { value: "text", label: "Text Box", icon: Type },
    { value: "multiple-choice", label: "Multiple Choice", icon: Circle },
    { value: "checkboxes", label: "Checkboxes", icon: CheckSquare },
    { value: "rating", label: "Star Rating", icon: Star },
    { value: "dropdown", label: "Dropdown", icon: ChevronDown },
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "multiple-choice",
      title: "New Question",
      options: ["Option 1", "Option 2"],
      required: false,
    };
    setQuestions([...questions, newQuestion]);
    toast.success("Question added!");
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success("Question deleted");
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`];
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const saveSurvey = () => {
    toast.success("Survey saved successfully!", {
      description: `"${surveyTitle}" with ${questions.length} questions`,
    });
    if (onComplete) onComplete();
  };

  if (previewMode) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{surveyTitle}</h2>
          <Button onClick={() => setPreviewMode(false)} variant="outline">
            Back to Editor
          </Button>
        </div>
        <Card className="p-8 space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-lg">{index + 1}.</span>
                <div className="flex-1 space-y-3">
                  <p className="font-medium text-lg">
                    {question.title}
                    {question.required && <span className="text-destructive ml-1">*</span>}
                  </p>
                  {question.type === "text" && (
                    <Textarea placeholder="Your answer here..." className="w-full" />
                  )}
                  {question.type === "multiple-choice" && (
                    <div className="space-y-2">
                      {question.options?.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded transition-colors">
                          <input type="radio" name={question.id} className="cursor-pointer" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === "checkboxes" && (
                    <div className="space-y-2">
                      {question.options?.map((option, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded transition-colors">
                          <input type="checkbox" className="cursor-pointer" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === "rating" && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-8 h-8 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400 transition-colors" />
                      ))}
                    </div>
                  )}
                  {question.type === "dropdown" && (
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {question.options?.map((option, idx) => (
                          <SelectItem key={idx} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button className="w-full" size="lg">Submit Survey</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Input
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            className="text-2xl font-bold border-none focus-visible:ring-0 px-0"
          />
          <p className="text-sm text-muted-foreground mt-1">
            {questions.length} questions • Click to edit
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setPreviewMode(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={saveSurvey}>
            <Save className="w-4 h-4 mr-2" />
            Save Survey
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-move" />
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-semibold text-lg mt-2">{index + 1}.</span>
                  <div className="flex-1">
                    <Input
                      value={question.title}
                      onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                      className="font-medium text-lg"
                      placeholder="Question title"
                    />
                  </div>
                  <Select
                    value={question.type}
                    onValueChange={(value) => updateQuestion(question.id, { type: value as Question["type"] })}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(question.type === "multiple-choice" || question.type === "checkboxes" || question.type === "dropdown") && (
                  <div className="space-y-2 ml-8">
                    {question.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, idx, e.target.value)}
                          className="flex-1"
                          placeholder={`Option ${idx + 1}`}
                        />
                        {question.options && question.options.length > 2 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteOption(question.id, idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addOption(question.id)}
                      className="ml-6"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                )}

                {question.type === "rating" && (
                  <div className="flex gap-1 ml-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <div className="ml-8">
                    <Textarea placeholder="Respondents will type their answer here..." disabled />
                  </div>
                )}

                <div className="flex items-center justify-between ml-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={question.required}
                      onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                      className="cursor-pointer"
                    />
                    <span className="text-sm">Required</span>
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQuestion(question.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Question
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed border-2 h-20 hover:border-primary transition-colors"
          onClick={addQuestion}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Question
        </Button>
      </div>

      <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
        <div className="flex gap-2">
          <Badge variant="outline">Interactive Sandbox</Badge>
          <Badge variant="secondary">{questions.length} Questions</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Try building a survey! Your changes are saved automatically in this practice environment.
        </p>
      </div>
    </div>
  );
};
