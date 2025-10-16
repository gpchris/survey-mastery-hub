import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface CourseProgress {
  [courseId: string]: {
    completedModules: string[];
    percentage: number;
  };
}

export const useCourseProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CourseProgress>({});

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`course_progress_${user.id}`);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    }
  }, [user]);

  const updateProgress = (courseId: string, completedModules: string[], totalModules: number) => {
    if (!user) return;
    
    const percentage = Math.round((completedModules.length / totalModules) * 100);
    const updated = { 
      ...progress, 
      [courseId]: { 
        completedModules, 
        percentage 
      } 
    };
    setProgress(updated);
    localStorage.setItem(`course_progress_${user.id}`, JSON.stringify(updated));
  };

  const getProgress = (courseId: string): number => {
    return progress[courseId]?.percentage || 0;
  };

  const getCompletedModules = (courseId: string): string[] => {
    return progress[courseId]?.completedModules || [];
  };

  const completeModule = (courseId: string, moduleId: string, totalModules: number) => {
    if (!user) return;
    
    const currentCompleted = progress[courseId]?.completedModules || [];
    if (!currentCompleted.includes(moduleId)) {
      const newCompleted = [...currentCompleted, moduleId];
      updateProgress(courseId, newCompleted, totalModules);
    }
  };

  return { progress, updateProgress, getProgress, getCompletedModules, completeModule };
};
