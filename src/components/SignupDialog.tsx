import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export function SignupDialog({ open, onOpenChange, onSwitchToLogin }: SignupDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    craftType: "",
    city: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.craftType || !formData.city) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate signup
    toast.success(`Welcome to CraftConnect, ${formData.name}! Your account has been created.`);
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      craftType: "",
      city: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display'] text-[var(--boho-brown)]">
            Join as Creator
          </DialogTitle>
          <DialogDescription className="text-[var(--boho-brown)]/70">
            Create your profile and start connecting with events
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[var(--boho-brown)]">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Sarah Martinez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-[var(--boho-brown)]">
              Email
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-[var(--boho-brown)]">
              Password
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="craftType" className="text-[var(--boho-brown)]">
              Type of Craft
            </Label>
            <Select value={formData.craftType} onValueChange={(value) => setFormData({ ...formData, craftType: value })}>
              <SelectTrigger className="rounded-xl border-[var(--boho-taupe)]">
                <SelectValue placeholder="Select your craft" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pottery">Pottery & Ceramics</SelectItem>
                <SelectItem value="candles">Candle Making</SelectItem>
                <SelectItem value="baking">Artisan Baking</SelectItem>
                <SelectItem value="textiles">Textiles & Fiber Arts</SelectItem>
                <SelectItem value="painting">Painting & Visual Arts</SelectItem>
                <SelectItem value="jewelry">Jewelry Making</SelectItem>
                <SelectItem value="woodwork">Woodworking</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-[var(--boho-brown)]">
              City
            </Label>
            <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
              <SelectTrigger className="rounded-xl border-[var(--boho-taupe)]">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portland">Portland, OR</SelectItem>
                <SelectItem value="austin">Austin, TX</SelectItem>
                <SelectItem value="seattle">Seattle, WA</SelectItem>
                <SelectItem value="denver">Denver, CO</SelectItem>
                <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                <SelectItem value="nashville">Nashville, TN</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
          >
            Create Account
          </Button>

          <div className="text-center">
            <span className="text-[var(--boho-brown)]/70">Already have an account? </span>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSwitchToLogin();
              }}
              className="text-[var(--boho-terracotta)] hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

