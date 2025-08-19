import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  Brain, 
  UserCircle, 
  Settings, 
  LogOut,
  User,
  FileText,
  Bell,
  ChevronDown
} from "lucide-react";

export const Header = () => {
  const { user, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(2); // Example notification count
  const location = useLocation();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Enhanced navigation items with icons
  const navigationItems = [
    
    { href: "#ats", label: "ATS", icon: null },
    { href: "#features", label: "Features", icon: null },
    { href: "#templates", label: "Templates", icon: null }, 
    { href: "#how-it-works", label: "How It Works", icon: null },
    // { href: "#testimonials", label: "Reviews", icon: null },
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-soft border-b border-border/50' 
          : 'bg-white/90 backdrop-blur-md border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-ai-purple to-ai-blue rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-accent transition-all">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-foreground group-hover:text-ai-purple transition-colors">
              AI Resume Builder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-3 py-2 text-muted-foreground hover:text-ai-purple hover:bg-ai-purple/10 rounded-md transition-all duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {/* Dashboard Button */}
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    className="text-ai-purple hover:text-ai-purple hover:bg-ai-purple/10 font-medium"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-4 h-4" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-auto">
                      <div className="flex items-center gap-2">
                        {user.picture ? (
                          <img 
                            src={user.picture} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full border-2 border-ai-purple/20" 
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-ai-purple to-ai-blue rounded-full flex items-center justify-center">
                            <UserCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth/sign-in">
                  <Button 
                    variant="ghost" 
                    className="text-ai-purple hover:text-ai-purple hover:bg-ai-purple/10 font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/sign-in">
                  <Button className="bg-gradient-to-r from-ai-purple to-ai-blue hover:from-ai-purple-600 hover:to-ai-blue-600 font-medium shadow-medium hover:shadow-strong transition-all">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-3 py-2 text-muted-foreground hover:text-ai-purple hover:bg-ai-purple/10 rounded-md transition-all duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 border-t border-border mt-4">
                {user ? (
                  <>
                    {/* Mobile User Info */}
                    <div className="flex items-center gap-3 px-3 py-2 mb-3">
                      {user.picture ? (
                        <img 
                          src={user.picture} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full border-2 border-ai-purple/20" 
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-ai-purple to-ai-blue rounded-full flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="justify-start w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="justify-start w-full">
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="justify-start w-full">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="justify-start w-full text-destructive hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => { 
                          handleLogout(); 
                          setIsMenuOpen(false); 
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/auth/sign-in" onClick={() => setIsMenuOpen(false)}>
                      <Button className="bg-gradient-to-r from-ai-purple to-ai-blue hover:from-ai-purple-600 hover:to-ai-blue-600 w-full font-medium">
                        Get Started Free
                      </Button>
                    </Link>
                    <Link to="/auth/sign-in" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};