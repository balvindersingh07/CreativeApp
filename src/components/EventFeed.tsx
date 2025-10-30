import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, MapPin, Users, Filter } from "lucide-react";
import { useState } from "react";
import { EventApplicationDialog } from "./EventApplicationDialog";
import { StallRequestDialog } from "./StallRequestDialog";

export function EventFeed() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [stallRequestOpen, setStallRequestOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const events = [
    {
      id: 1,
      title: "Spring Artisan Fair",
      image: "https://images.unsplash.com/photo-1589051079002-b140a970f568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwcG90dGVyeSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MTgyODQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Portland",
      date: "April 15-17, 2025",
      category: "Pottery & Ceramics",
      spots: 12,
      theme: "Spring Renewal",
    },
    {
      id: 2,
      title: "Local Makers Market",
      image: "https://images.unsplash.com/photo-1759719441226-349c747c9bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGZhaXIlMjBib290aHxlbnwxfHx8fDE3NjE4Mjg0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Austin",
      date: "May 2-3, 2025",
      category: "Mixed Arts",
      spots: 8,
      theme: "Community Vibes",
    },
    {
      id: 3,
      title: "Farmers & Crafters Fest",
      image: "https://images.unsplash.com/photo-1626132661848-cc00e454c2c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm1lcnMlMjBtYXJrZXR8ZW58MXx8fHwxNzYxODE4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Seattle",
      date: "May 20-22, 2025",
      category: "Food & Craft",
      spots: 15,
      theme: "Farm to Table",
    },
    {
      id: 4,
      title: "Candle & Home Decor Show",
      image: "https://images.unsplash.com/photo-1603218678692-3967d7523bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXN8ZW58MXx8fHwxNzYxODAxODU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Denver",
      date: "June 5-6, 2025",
      category: "Home Goods",
      spots: 6,
      theme: "Cozy Living",
    },
  ];

  const cities = ["All", "Portland", "Austin", "Seattle", "Denver"];
  const categories = ["All", "Pottery & Ceramics", "Mixed Arts", "Food & Craft", "Home Goods"];

  return (
    <section className="py-16 md:py-24 bg-[var(--boho-cream)]" id="events">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-4 py-2 rounded-full bg-white text-[var(--boho-brown)] inline-block mb-4">
            🎪 Upcoming Opportunities
          </span>
          <h2 className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-4">
            Discover Events
          </h2>
          <p className="text-[var(--boho-brown)]/70">
            Find the perfect market or fair to showcase your creations
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-[var(--boho-brown)]" />
              <span className="text-[var(--boho-brown)]">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  className={`rounded-full ${
                    selectedCity === city
                      ? "bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
                      : "border-[var(--boho-taupe)] text-[var(--boho-brown)] hover:bg-[var(--boho-sand)]"
                  }`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 ml-0 md:ml-20">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer rounded-full px-4 py-2 ${
                  selectedCategory === category
                    ? "bg-[var(--boho-sage)] text-white"
                    : "border-[var(--boho-sage)] text-[var(--boho-brown)] hover:bg-[var(--boho-sage)] hover:text-white"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden rounded-3xl border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-[var(--boho-brown)] backdrop-blur-sm border-none">
                    {event.spots} spots left
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <Badge className="mb-2 rounded-full bg-[var(--boho-sand)] text-[var(--boho-brown)] border-none">
                    {event.category}
                  </Badge>
                  <h3 className="text-[var(--boho-brown)]">{event.title}</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--boho-brown)]/70">
                    <MapPin size={16} />
                    <span>{event.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--boho-brown)]/70">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--boho-brown)]/70">
                    <Users size={16} />
                    <span>Theme: {event.theme}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1 rounded-full bg-[var(--boho-terracotta)] hover:bg-[var(--boho-brown)]"
                    onClick={() => {
                      setSelectedEvent(event.title);
                      setApplicationOpen(true);
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[var(--boho-taupe)] text-[var(--boho-brown)] hover:bg-[var(--boho-sand)]"
                    onClick={() => {
                      setSelectedEvent(event.title);
                      setStallRequestOpen(true);
                    }}
                  >
                    Request Stall
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="rounded-full border-[var(--boho-terracotta)] text-[var(--boho-terracotta)] hover:bg-[var(--boho-terracotta)] hover:text-white px-8"
          >
            View All Events
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <EventApplicationDialog 
        open={applicationOpen}
        onOpenChange={setApplicationOpen}
        eventTitle={selectedEvent}
      />
      <StallRequestDialog 
        open={stallRequestOpen}
        onOpenChange={setStallRequestOpen}
        eventTitle={selectedEvent}
      />
    </section>
  );
}
