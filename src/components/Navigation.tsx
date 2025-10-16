import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Menu, X, LogOut, User, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    ...(!isAuthenticated ? [{ label: "Home", path: "/" }] : []),
    ...(isAuthenticated ? [{ label: "Dashboard", path: "/dashboard" }] : []),
    { label: "Courses", path: "/courses" },
    ...(isAuthenticated ? [{ label: "Assessments", path: "/assessments" }] : []),
    ...(isAuthenticated ? [{ label: "My Surveys", path: "/my-surveys" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span>SurveyMonkey <span className="text-primary">Training</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 mx-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium py-2 ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-3">
                      <p className="font-semibold text-foreground">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/auth">Log In</Link>
                    </Button>
                    <Button variant="default" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/auth">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
