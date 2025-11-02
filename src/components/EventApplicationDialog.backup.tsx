import { useEffect } from "react";
import "../styles/modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EventApplicationDialog({ open, onClose }: Props) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cc-backdrop" onClick={onClose}>
      <div className="cc-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cc-header">
          <div className="cc-title">
            <span className="cc-dot">T</span>
            Apply to Event
          </div>
          <button className="cc-close" aria-label="Close" onClick={onClose}></button>
        </div>

        {/* Body */}
        <div className="cc-body">
          <div className="cc-grid">
            <div className="cc-field">
              <label className="cc-label">Your Name *</label>
              <input className="cc-input" placeholder="Sarah Martinez" />
            </div>

            <div className="cc-field">
              <label className="cc-label">Email *</label>
              <input className="cc-input" placeholder="your@email.com" type="email" />
            </div>

            <div className="cc-field">
              <label className="cc-label">Phone Number</label>
              <input className="cc-input" placeholder="(555) 123-4567" />
            </div>

            <div className="cc-field">
              <label className="cc-label">Business Name *</label>
              <input className="cc-input" placeholder="Your Creative Business" />
            </div>

            <div className="cc-field">
              <label className="cc-label">Preferred Stall Size</label>
              <select className="cc-select" defaultValue="">
                <option value="" disabled>Select stall size</option>
                <option value="S">Small (6x6)</option>
                <option value="M">Medium (8x8)</option>
                <option value="L">Large (10x10)</option>
              </select>
            </div>

            <div className="cc-field">
              <label className="cc-label">Category</label>
              <select className="cc-select" defaultValue="">
                <option value="" disabled>Select category</option>
                <option>Pottery & Ceramics</option>
                <option>Home Goods</option>
                <option>Fashion & Textiles</option>
                <option>Food & Craft</option>
              </select>
            </div>
          </div>

          <div className="cc-field">
            <label className="cc-label">Tell us about your products</label>
            <textarea className="cc-textarea" placeholder="Describe what youll be selling at this event..." />
          </div>
        </div>

        {/* Footer */}
        <div className="cc-footer">
          <span className="cc-note">Well review your application and reach out via email.</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="cc-btn secondary" onClick={onClose}>Cancel</button>
            <button className="cc-btn primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
