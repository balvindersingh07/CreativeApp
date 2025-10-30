import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface EventApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
}

export function EventApplicationDialog({ open, onOpenChange, eventTitle }: EventApplicationDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.businessName) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Application submitted for ${eventTitle}! We'll be in touch soon.`);
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessName: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display'] text-[var(--boho-brown)]">
            Apply to Event
          </DialogTitle>
          <DialogDescription className="text-[var(--boho-brown)]/70">
            {eventTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="app-name" className="text-[var(--boho-brown)]">
              Your Name *
            </Label>
            <Input
              id="app-name"
              type="text"
              placeholder="Sarah Martinez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-email" className="text-[var(--boho-brown)]">
              Email *
            </Label>
            <Input
              id="app-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-phone" className="text-[var(--boho-brown)]">
              Phone Number
            </Label>
            <Input
              id="app-phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-business" className="text-[var(--boho-brown)]">
              Business Name *
            </Label>
            <Input
              id="app-business"
              type="text"
              placeholder="Your Creative Business"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-description" className="text-[var(--boho-brown)]">
              Tell us about your products
            </Label>
            <Textarea
              id="app-description"
              placeholder="Describe what you'll be selling at this event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)] min-h-24"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full border-[var(--boho-taupe)] text-[var(--boho-brown)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

