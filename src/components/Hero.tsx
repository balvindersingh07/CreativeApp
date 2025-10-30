import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    eventsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="home">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[var(--boho-sage)] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[var(--boho-orange)] blur-3xl"></div>
      </div>

      {/* Decorative Wave Pattern */}
      <svg
        className="absolute top-0 right-0 w-1/3 h-auto opacity-5"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="var(--boho-terracotta)"
          d="M43.3,-66.3C56.2,-58.4,67.1,-46.3,72.8,-32.1C78.5,-17.9,79,-1.6,75.1,13.5C71.2,28.6,62.9,42.5,51.4,52.8C39.9,63.1,25.2,69.8,9.8,72.9C-5.6,76,-21.7,75.5,-35.4,69.4C-49.1,63.3,-60.4,51.6,-68.1,37.8C-75.8,24,-79.9,8.1,-78.3,-7.3C-76.7,-22.7,-69.4,-37.6,-58.7,-46.7C-48,-55.8,-33.9,-59.1,-20.3,-66.5C-6.7,-73.9,6.4,-85.4,19.8,-87.5C33.2,-89.6,30.4,-74.2,43.3,-66.3Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-[var(--boho-sand)] text-[var(--boho-brown)]">
                ✨ Connecting Creative Souls
              </span>
            </div>
            
            <h1 className="font-['Playfair_Display'] text-[var(--boho-brown)]">
              Helping Local Creators Reach Markets
            </h1>
            
            <p className="text-[var(--boho-brown)]/80">
              Discover fairs, list your art, and grow your creative business. 
              Connect with exhibition opportunities that match your unique craft.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)] px-8"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-[var(--boho-sage)] text-[var(--boho-brown)] hover:bg-[var(--boho-sage)] hover:text-white px-8"
                onClick={scrollToEvents}
              >
                View Events
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="font-['Playfair_Display'] text-[var(--boho-terracotta)]">500+</div>
                <div className="text-[var(--boho-brown)]/70">Creators</div>
              </div>
              <div>
                <div className="font-['Playfair_Display'] text-[var(--boho-terracotta)]">200+</div>
                <div className="text-[var(--boho-brown)]/70">Events</div>
              </div>
              <div>
                <div className="font-['Playfair_Display'] text-[var(--boho-terracotta)]">50+</div>
                <div className="text-[var(--boho-brown)]/70">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1736143157411-0a70fe999ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0JTIwbWFya2V0fGVufDF8fHx8MTc2MTgyODQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Creative artisans at market"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--boho-brown)]/20 to-transparent"></div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[var(--boho-orange)] opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
