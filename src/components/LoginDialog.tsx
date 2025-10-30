import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: () => void;
}

export function LoginDialog({ open, onOpenChange, onSwitchToSignup }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate login
    toast.success("Welcome back! Login successful.");
    onOpenChange(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display'] text-[var(--boho-brown)]">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-[var(--boho-brown)]/70">
            Login to access your creator dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[var(--boho-brown)]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-[var(--boho-taupe)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[var(--boho-brown)]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-[var(--boho-taupe)]"
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-[var(--boho-terracotta)] hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
          >
            Login
          </Button>

          <div className="text-center">
            <span className="text-[var(--boho-brown)]/70">Don't have an account? </span>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSwitchToSignup();
              }}
              className="text-[var(--boho-terracotta)] hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

