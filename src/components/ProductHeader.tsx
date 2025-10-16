import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, HelpCircle, ChevronDown, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ProductHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1a1a] text-white border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/my-surveys" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1a1a1a]" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-8 flex-1">
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-gray-300 transition-colors">
                My Team
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-gray-900 z-50">
                <DropdownMenuItem>Team Settings</DropdownMenuItem>
                <DropdownMenuItem>Members</DropdownMenuItem>
                <DropdownMenuItem>Permissions</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/courses" className="text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap">
              Training Center
            </Link>

            <Link to="#" className="text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap">
              Plans & Pricing
            </Link>

            <Link to="#" className="text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap">
              Multi-survey Analysis
            </Link>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search surveys..."
                className="pl-10 w-full bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 focus:bg-[#333333]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 font-semibold hidden md:inline-flex"
            >
              Add users
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white hover:bg-gray-100 text-gray-900 border-0 font-semibold"
            >
              Create survey
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 hidden md:inline-flex"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 hidden md:inline-flex"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#FFD700] text-gray-900 font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white text-gray-900">
                <div className="px-2 py-2 border-b">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/courses")}>
                  Training Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
