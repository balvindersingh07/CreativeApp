import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { SignupDialog } from "./SignupDialog";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--boho-terracotta)] to-[var(--boho-orange)] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2Z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M8 10C6.34315 10 5 11.3431 5 13C5 14.6569 6.34315 16 8 16C9.65685 16 11 14.6569 11 13C11 11.3431 9.65685 10 8 10Z"
                  fill="white"
                  opacity="0.7"
                />
                <path
                  d="M13 13C13 11.3431 14.3431 10 16 10C17.6569 10 19 11.3431 19 13C19 14.6569 17.6569 16 16 16C14.3431 16 13 14.6569 13 13Z"
                  fill="white"
                  opacity="0.7"
                />
                <path
                  d="M9 18C9 16.3431 10.3431 15 12 15C13.6569 15 15 16.3431 15 18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18Z"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>
            <span className="font-['Playfair_Display'] text-[var(--boho-brown)]">
              CraftConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Home
            </a>
            <a href="#creators" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Creators
            </a>
            <a href="#events" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Events
            </a>
            <a href="#join" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Join
            </a>
            <a href="#dashboard" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Dashboard
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-full border-[var(--boho-terracotta)] text-[var(--boho-terracotta)] hover:bg-[var(--boho-terracotta)] hover:text-white"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
            <Button 
              className="rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
              onClick={() => setSignupOpen(true)}
            >
              Join as Creator
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--boho-brown)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#home" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Home
            </a>
            <a href="#creators" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Creators
            </a>
            <a href="#events" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Events
            </a>
            <a href="#join" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Join
            </a>
            <a href="#dashboard" className="text-[var(--boho-brown)] hover:text-[var(--boho-terracotta)] transition-colors">
              Dashboard
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                variant="outline" 
                className="rounded-full border-[var(--boho-terracotta)] text-[var(--boho-terracotta)]"
                onClick={() => {
                  setLoginOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                className="rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
                onClick={() => {
                  setSignupOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Join as Creator
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <LoginDialog 
        open={loginOpen} 
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => setSignupOpen(true)}
      />
      <SignupDialog 
        open={signupOpen} 
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </header>
  );
}
