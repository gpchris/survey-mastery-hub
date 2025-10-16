import { Home, BookOpen, LayoutDashboard, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Courses", path: "/courses", icon: BookOpen },
    ...(isAuthenticated
      ? [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }]
      : [{ label: "Sign In", path: "/auth", icon: User }]),
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
