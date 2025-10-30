import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function CreatorGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const creators = [
    {
      id: 1,
      name: "Sarah Martinez",
      craft: "Ceramic Artist",
      city: "Portland, OR",
      bio: "Creating handmade pottery inspired by Pacific Northwest nature",
      image: "https://images.unsplash.com/photo-1710188091078-e1d92210b9fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTc0MzExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 342,
    },
    {
      id: 2,
      name: "Maya Chen",
      craft: "Candle Maker",
      city: "Austin, TX",
      bio: "Eco-friendly soy candles with unique botanical scents",
      image: "https://images.unsplash.com/photo-1663518629510-016989dc4ee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGVudHJlcHJlbmV1ciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTgyODQ4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 289,
    },
    {
      id: 3,
      name: "James Cooper",
      craft: "Artisan Baker",
      city: "Seattle, WA",
      bio: "Sourdough specialist and organic pastry creator",
      image: "https://images.unsplash.com/photo-1649675602947-81a41c1ba4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYmFrZXJ8ZW58MXx8fHwxNzYxODE5MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 412,
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      craft: "Textile Artist",
      city: "Denver, CO",
      bio: "Handwoven macramé and natural fiber wall hangings",
      image: "https://images.unsplash.com/photo-1710188091078-e1d92210b9fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTc0MzExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 356,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % creators.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + creators.length) % creators.length);
  };

  const visibleCreators = [
    creators[currentIndex],
    creators[(currentIndex + 1) % creators.length],
    creators[(currentIndex + 2) % creators.length],
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="creators">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-4 py-2 rounded-full bg-[var(--boho-sand)] text-[var(--boho-brown)] inline-block mb-4">
            🎨 Meet the Makers
          </span>
          <h2 className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-4">
            Featured Creators
          </h2>
          <p className="text-[var(--boho-brown)]/70">
            Talented artisans growing their businesses with CraftConnect
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-[var(--boho-taupe)] text-[var(--boho-brown)] hover:bg-[var(--boho-sand)]"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-[var(--boho-taupe)] text-[var(--boho-brown)] hover:bg-[var(--boho-sand)]"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Creator Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {visibleCreators.map((creator, index) => (
            <Card
              key={`${creator.id}-${index}`}
              className="overflow-hidden rounded-3xl border-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Likes */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                  <Heart size={16} className="text-[var(--boho-terracotta)]" fill="var(--boho-terracotta)" />
                  <span className="text-[var(--boho-brown)]">{creator.likes}</span>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white mb-1">{creator.name}</h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin size={14} />
                    <span>{creator.city}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <Badge className="rounded-full bg-[var(--boho-sage)] text-white border-none">
                  {creator.craft}
                </Badge>
                
                <p className="text-[var(--boho-brown)]/70">
                  {creator.bio}
                </p>

                <Button
                  variant="outline"
                  className="w-full rounded-full border-[var(--boho-terracotta)] text-[var(--boho-terracotta)] hover:bg-[var(--boho-terracotta)] hover:text-white"
                  onClick={() => toast.info(`Opening ${creator.name}'s profile...`)}
                >
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {creators.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[var(--boho-terracotta)] w-8"
                  : "bg-[var(--boho-taupe)]"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            className="rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)] px-8"
            onClick={() => toast.info("Loading all creators...")}
          >
            Explore All Creators
          </Button>
        </div>
      </div>
    </section>
  );
}
