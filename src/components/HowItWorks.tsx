import { Palette, Calendar, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Palette,
      title: "Sign up & Create Profile",
      description: "Showcase your craft, upload your portfolio, and tell your story to the community.",
      color: "var(--boho-terracotta)",
    },
    {
      icon: Calendar,
      title: "Get Matched to Events",
      description: "Our smart algorithm connects you with markets and fairs that fit your style and location.",
      color: "var(--boho-sage)",
    },
    {
      icon: TrendingUp,
      title: "Showcase & Grow",
      description: "Attend events, sell your creations, and build lasting relationships with customers.",
      color: "var(--boho-orange)",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="join">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-2 rounded-full bg-[var(--boho-sand)] text-[var(--boho-brown)] inline-block mb-4">
            Simple Process
          </span>
          <h2 className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-4">
            How It Works
          </h2>
          <p className="text-[var(--boho-brown)]/70">
            Three easy steps to connect with your perfect audience
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Decorative Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[var(--boho-terracotta)] via-[var(--boho-sage)] to-[var(--boho-orange)] opacity-20"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-[var(--boho-cream)] rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white border-4 border-[var(--boho-cream)] flex items-center justify-center shadow-md">
                <span className="font-['Playfair_Display'] text-[var(--boho-brown)]">
                  {index + 1}
                </span>
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${step.color}20` }}
              >
                <step.icon
                  size={32}
                  style={{ color: step.color }}
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <h3 className="text-[var(--boho-brown)] mb-3">
                {step.title}
              </h3>
              <p className="text-[var(--boho-brown)]/70">
                {step.description}
              </p>

              {/* Decorative Element */}
              <svg
                className="absolute bottom-4 right-4 opacity-5"
                width="80"
                height="80"
                viewBox="0 0 80 80"
              >
                <path
                  d="M10 40 Q 40 10, 70 40 T 130 40"
                  fill="none"
                  stroke={step.color}
                  strokeWidth="2"
                />
                <path
                  d="M10 50 Q 40 20, 70 50 T 130 50"
                  fill="none"
                  stroke={step.color}
                  strokeWidth="2"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
