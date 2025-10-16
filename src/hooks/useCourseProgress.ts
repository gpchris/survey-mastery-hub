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
      if (stored) {
        setProgress(JSON.parse(stored));
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
    return progress[courseId] || 0;
  };

  return { progress, updateProgress, getProgress };
};
