import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CallToActionProps {
  onJoinClick: () => void;
}

export function CallToAction({ onJoinClick }: CallToActionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--boho-terracotta)] to-[var(--boho-orange)] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="white" />
              <circle cx="60" cy="60" r="3" fill="white" />
              <path d="M10,40 Q40,20 70,40" stroke="white" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-5 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Section */}
          <div className="mb-12">
            <Sparkles size={48} className="text-white/80 mx-auto mb-6" />
            <blockquote className="font-['Playfair_Display'] text-white mb-6 italic">
              "Empowering handmade dreams — one market at a time."
            </blockquote>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>

          {/* CTA Content */}
          <div className="space-y-6">
            <h2 className="font-['Playfair_Display'] text-white">
              Ready to Grow Your Creative Business?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Join hundreds of successful artisans who are connecting with their ideal 
              customers and building sustainable creative businesses.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                className="rounded-full bg-white text-[var(--boho-terracotta)] hover:bg-[var(--boho-cream)] px-8 shadow-lg group"
                onClick={onJoinClick}
              >
                Join the Movement
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-2 border-white text-white hover:bg-white hover:text-[var(--boho-terracotta)] px-8"
                onClick={scrollToTop}
              >
                Learn More
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center backdrop-blur-sm"
                      >
                        <span className="text-white">👤</span>
                      </div>
                    ))}
                  </div>
                  <span>500+ Creators</span>
                </div>
                <div className="h-8 w-px bg-white/30 hidden md:block"></div>
                <div>⭐⭐⭐⭐⭐ 4.8/5 Rating</div>
                <div className="h-8 w-px bg-white/30 hidden md:block"></div>
                <div>Free to Join</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
      >
        <path
          d="M0,50 Q300,20 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="white"
        />
      </svg>
    </section>
  );
}



