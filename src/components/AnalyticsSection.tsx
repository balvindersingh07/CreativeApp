import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Calendar, MapPin } from "lucide-react";

export function AnalyticsSection() {
  const eventData = [
    { name: "Spring Fair", interest: 450 },
    { name: "Summer Market", interest: 380 },
    { name: "Craft Expo", interest: 520 },
    { name: "Winter Fest", interest: 290 },
    { name: "Local Makers", interest: 410 },
  ];

  const creatorData = [
    { name: "Portland", value: 85 },
    { name: "Austin", value: 72 },
    { name: "Seattle", value: 68 },
    { name: "Denver", value: 55 },
    { name: "Others", value: 120 },
  ];

  const COLORS = [
    "var(--boho-terracotta)",
    "var(--boho-sage)",
    "var(--boho-orange)",
    "var(--boho-taupe)",
    "var(--boho-sand)",
  ];

  const stats = [
    {
      icon: Users,
      label: "Active Creators",
      value: "500+",
      change: "+12% this month",
      color: "var(--boho-terracotta)",
    },
    {
      icon: Calendar,
      label: "Events Hosted",
      value: "200+",
      change: "+8% this month",
      color: "var(--boho-sage)",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "94%",
      change: "+3% this month",
      color: "var(--boho-orange)",
    },
    {
      icon: MapPin,
      label: "Cities Covered",
      value: "50+",
      change: "+5 new cities",
      color: "var(--boho-taupe)",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="dashboard">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-4 py-2 rounded-full bg-[var(--boho-sand)] text-[var(--boho-brown)] inline-block mb-4">
            📊 Platform Insights
          </span>
          <h2 className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-4">
            Analytics Dashboard Preview
          </h2>
          <p className="text-[var(--boho-brown)]/70">
            Track your growth and discover trends in the creative community
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-1">
                {stat.value}
              </div>
              <div className="text-[var(--boho-brown)]/70 mb-2">
                {stat.label}
              </div>
              <div className="text-[var(--boho-sage)]">
                {stat.change}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <Card className="p-6 rounded-3xl border-none shadow-md">
            <h3 className="text-[var(--boho-brown)] mb-6">
              Top Events by Interest
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--boho-sand)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: "var(--boho-brown)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--boho-sand)" }}
                />
                <YAxis 
                  tick={{ fill: "var(--boho-brown)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--boho-sand)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="interest" fill="var(--boho-terracotta)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card className="p-6 rounded-3xl border-none shadow-md">
            <h3 className="text-[var(--boho-brown)] mb-6">
              Creators by City
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={creatorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {creatorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 bg-gradient-to-r from-[var(--boho-cream)] to-[var(--boho-sand)] rounded-3xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-2">
                $2.5M+
              </div>
              <div className="text-[var(--boho-brown)]/70">
                Total Revenue Generated
              </div>
            </div>
            <div>
              <div className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-2">
                15,000+
              </div>
              <div className="text-[var(--boho-brown)]/70">
                Products Sold
              </div>
            </div>
            <div>
              <div className="font-['Playfair_Display'] text-[var(--boho-brown)] mb-2">
                4.8/5
              </div>
              <div className="text-[var(--boho-brown)]/70">
                Average Creator Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



