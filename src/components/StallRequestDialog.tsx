import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface StallRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
}

export function StallRequestDialog({ open, onOpenChange, eventTitle }: StallRequestDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stallSize: "",
    specialRequirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.stallSize) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Stall request submitted for ${eventTitle}! We'll confirm availability soon.`);
    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      stallSize: "",
      specialRequirements: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-['Playfair_Display'] text-[var(--boho-brown)]">
            Request a Stall
          </DialogTitle>
          <DialogDescription className="text-[var(--boho-brown)]/70">
            {eventTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="stall-name" className="text-[var(--boho-brown)]">
              Your Name *
            </Label>
            <Input
              id="stall-name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stall-email" className="text-[var(--boho-brown)]">
              Email *
            </Label>
            <Input
              id="stall-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stall-size" className="text-[var(--boho-brown)]">
              Stall Size *
            </Label>
            <Select value={formData.stallSize} onValueChange={(value) => setFormData({ ...formData, stallSize: value })}>
              <SelectTrigger className="rounded-xl border-[var(--boho-taupe)]">
                <SelectValue placeholder="Select stall size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (10x10 ft) - $150</SelectItem>
                <SelectItem value="medium">Medium (10x15 ft) - $225</SelectItem>
                <SelectItem value="large">Large (10x20 ft) - $300</SelectItem>
                <SelectItem value="premium">Premium Corner (15x15 ft) - $375</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stall-requirements" className="text-[var(--boho-brown)]">
              Special Requirements
            </Label>
            <Textarea
              id="stall-requirements"
              placeholder="Power outlet, extra tables, etc."
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              className="rounded-xl border-[var(--boho-taupe)] min-h-20"
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
              className="flex-1 rounded-full bg-[var(--boho-sage)] hover:bg-[var(--boho-brown)] text-white"
            >
              Request Stall
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

