import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      console.log("Loaded user from localStorage:", user);
      
      // Ensure mock progress data exists for this user
      const progressKey = `course_progress_${user.id}`;
      const existingProgress = localStorage.getItem(progressKey);
      console.log("Existing progress for user:", existingProgress);
      
      if (!existingProgress) {
        const mockProgress = {
          "1": 100,
          "2": 65,
          "3": 100,
          "4": 30,
        };
        localStorage.setItem(progressKey, JSON.stringify(mockProgress));
        console.log("Set mock progress for existing user:", mockProgress);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
    };
    
    setUser(mockUser);
    localStorage.setItem("auth_user", JSON.stringify(mockUser));
    
    // Set up some mock course progress with the correct key format
    const mockProgress = {
      "1": 100, // Complete
      "2": 65,  // In progress
      "3": 100, // Complete
      "4": 30,  // In progress
    };
    localStorage.setItem(`course_progress_${mockUser.id}`, JSON.stringify(mockProgress));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };
    
    setUser(mockUser);
    localStorage.setItem("auth_user", JSON.stringify(mockUser));
    
    // Set up some mock course progress for new users
    const mockProgress = {
      "1": 100,
      "2": 65,
      "3": 100,
      "4": 30,
    };
    localStorage.setItem(`course_progress_${mockUser.id}`, JSON.stringify(mockProgress));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
