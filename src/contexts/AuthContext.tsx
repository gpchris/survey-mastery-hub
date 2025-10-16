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
      setUser(JSON.parse(storedUser));
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
    
    // Set up some mock course progress
    const mockProgress = {
      [mockUser.id]: {
        "1": { progress: 100, lastAccessed: new Date().toISOString() }, // Complete
        "2": { progress: 65, lastAccessed: new Date().toISOString() }, // In progress
        "3": { progress: 100, lastAccessed: new Date(Date.now() - 86400000).toISOString() }, // Complete (1 day ago)
        "4": { progress: 30, lastAccessed: new Date(Date.now() - 172800000).toISOString() }, // In progress (2 days ago)
      }
    };
    localStorage.setItem("course_progress", JSON.stringify(mockProgress));
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
      [mockUser.id]: {
        "1": { progress: 100, lastAccessed: new Date().toISOString() },
        "2": { progress: 65, lastAccessed: new Date().toISOString() },
        "3": { progress: 100, lastAccessed: new Date(Date.now() - 86400000).toISOString() },
        "4": { progress: 30, lastAccessed: new Date(Date.now() - 172800000).toISOString() },
      }
    };
    localStorage.setItem("course_progress", JSON.stringify(mockProgress));
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
