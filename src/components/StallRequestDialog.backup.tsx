import { useEffect } from "react";
import "../styles/modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function StallRequestDialog({ open, onClose }: Props) {
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
            Request Stall
          </div>
          <button className="cc-close" aria-label="Close" onClick={onClose}></button>
        </div>

        {/* Body */}
        <div className="cc-body">
          <div className="cc-grid">
            <div className="cc-field">
              <label className="cc-label">Your Name *</label>
              <input className="cc-input" placeholder="Your name" />
            </div>

            <div className="cc-field">
              <label className="cc-label">Email *</label>
              <input className="cc-input" placeholder="your@email.com" type="email" />
            </div>
          </div>

          <div className="cc-grid">
            <div className="cc-field">
              <label className="cc-label">Stall Size</label>
              <select className="cc-select" defaultValue="">
                <option value="" disabled>Select stall size</option>
                <option>Small (6x6)</option>
                <option>Medium (8x8)</option>
                <option>Large (10x10)</option>
              </select>
            </div>

            <div className="cc-field">
              <label className="cc-label">Power / Amenities</label>
              <select className="cc-select" defaultValue="">
                <option value="" disabled>Choose option</option>
                <option>No power needed</option>
                <option>Standard outlet</option>
                <option>High-load (appliances)</option>
              </select>
            </div>
          </div>

          <div className="cc-field">
            <label className="cc-label">Special Requirements</label>
            <textarea className="cc-textarea" placeholder="Power outlet, extra tables, etc." />
          </div>
        </div>

        {/* Footer */}
        <div className="cc-footer">
          <span className="cc-note">Organizer will confirm availability & pricing on email.</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="cc-btn secondary" onClick={onClose}>Cancel</button>
            <button className="cc-btn primary">Request Stall</button>
          </div>
        </div>
      </div>
    </div>
  );
}
