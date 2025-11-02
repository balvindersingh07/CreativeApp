import { Sparkles, Target, MapPin, Calendar } from "lucide-react";

export function MatchmakingSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--boho-cream)] to-[var(--boho-sand)] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="boho-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="var(--boho-terracotta)" />
              <circle cx="75" cy="75" r="2" fill="var(--boho-sage)" />
              <path d="M50,10 Q60,30 50,50 T50,90" stroke="var(--boho-orange)" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#boho-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--boho-brown)] mb-4">
              <Sparkles size={18} className="text-[var(--boho-orange)]" />
              <span>Smart Matchmaking</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-4">
              AI-Powered Event Matching
            </h2>
            <p className="text-[var(--boho-brown)]/70 max-w-2xl mx-auto">
              Our intelligent algorithm analyzes your craft, location, and preferences 
              to connect you with the perfect events and opportunities.
            </p>
          </div>

          {/* Matching Visual */}
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Creator Categories */}
              <div className="space-y-4">
                <h3 className="text-[var(--boho-brown)] mb-6 text-center md:text-left">
                  Your Profile
                </h3>
                {[
                  { label: "Pottery & Ceramics", color: "var(--boho-terracotta)" },
                  { label: "Candles & Home", color: "var(--boho-sage)" },
                  { label: "Artisan Foods", color: "var(--boho-orange)" },
                  { label: "Textiles & Fiber", color: "var(--boho-taupe)" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </div>
                    <span className="text-[var(--boho-brown)]">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Center: Connection Visual */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--boho-terracotta)] to-[var(--boho-orange)] flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  {/* Connection Lines */}
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none -z-10">
                    <line x1="50" y1="200" x2="300" y2="100" stroke="var(--boho-terracotta)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="50" y1="200" x2="300" y2="150" stroke="var(--boho-sage)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="50" y1="200" x2="300" y2="250" stroke="var(--boho-orange)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="50" y1="200" x2="300" y2="300" stroke="var(--boho-taupe)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="550" y1="200" x2="300" y2="100" stroke="var(--boho-terracotta)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="550" y1="200" x2="300" y2="150" stroke="var(--boho-sage)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="550" y1="200" x2="300" y2="250" stroke="var(--boho-orange)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                    <line x1="550" y1="200" x2="300" y2="300" stroke="var(--boho-taupe)" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
                  </svg>
                </div>
              </div>

              {/* Right: Matched Events */}
              <div className="space-y-4">
                <h3 className="text-[var(--boho-brown)] mb-6 text-center md:text-left">
                  Matched Events
                </h3>
                {[
                  { event: "Spring Artisan Fair", match: "95%", icon: Target },
                  { event: "Portland Market", match: "88%", icon: MapPin },
                  { event: "Craft Expo 2025", match: "82%", icon: Calendar },
                  { event: "Local Makers Fest", match: "79%", icon: Sparkles },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--boho-sage)]/20 flex items-center justify-center">
                        <item.icon size={20} className="text-[var(--boho-sage)]" />
                      </div>
                      <span className="text-[var(--boho-brown)]">{item.event}</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[var(--boho-terracotta)]/10 text-[var(--boho-terracotta)]">
                      {item.match}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: Target,
                title: "Precision Matching",
                description: "Get connected to events that align with your craft and style",
              },
              {
                icon: MapPin,
                title: "Location-Based",
                description: "Find opportunities in your city or explore nearby regions",
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Never miss an opportunity with intelligent calendar sync",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--boho-orange)]/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} className="text-[var(--boho-orange)]" />
                </div>
                <h4 className="text-[var(--boho-brown)] mb-2">{feature.title}</h4>
                <p className="text-[var(--boho-brown)]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



