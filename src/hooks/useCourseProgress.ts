import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface CourseProgress {
  [courseId: string]: number;
}

export const useCourseProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CourseProgress>({});

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`course_progress_${user.id}`);
      console.log(`Loading progress for user ${user.id}:`, stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Force reset Getting Started course to 0%
        parsed["getting-started"] = 0;
        console.log("Parsed progress:", parsed);
        setProgress(parsed);
        // Save the updated progress back to localStorage
        localStorage.setItem(`course_progress_${user.id}`, JSON.stringify(parsed));
      }
    }
  }, [user]);

  const updateProgress = (courseId: string, newProgress: number) => {
    if (!user) return;
    
    const updated = { ...progress, [courseId]: newProgress };
    setProgress(updated);
    localStorage.setItem(`course_progress_${user.id}`, JSON.stringify(updated));
  };

  const getProgress = (courseId: string): number => {
    const prog = progress[courseId] || 0;
    console.log(`Getting progress for course ${courseId}:`, prog);
    return prog;
  };

  return { progress, updateProgress, getProgress };
};
