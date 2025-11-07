import React from "react";

const points = [
  { icon: "🧭", title: "Empowerment", subtitle: "Helping You Grow Beyond Boundaries", text: "LocalPush empowers you with verified events, real customers, and meaningful exposure to turn creativity into business." },
  { icon: "💡", title: "Visibility", subtitle: "Where Your Work Gets Noticed", text: "Reach curated exhibitions, fairs, and showcases — your products seen by the right people." },
  { icon: "", title: "Collaboration", subtitle: "Connecting Creators & Organizers Seamlessly", text: "We bridge entrepreneurs and event planners with transparent, verified listings." },
  { icon: "", title: "Trust & Transparency", subtitle: "Verified Connections, Real Opportunities", text: "Every profile and deal goes through authenticity checks — focus on your craft safely." },
  { icon: "", title: "Growth Made Simple", subtitle: "From Local to National — Your Journey Starts Here", text: "Insights & analytics help plan where your business can grow next." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-brand">Why Choose Us</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {points.map((p) => (
          <div key={p.title} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <div className="text-4xl mb-2">{p.icon}</div>
            <h3 className="font-semibold text-lg text-brand">{p.title}</h3>
            <p className="italic text-gray-600 mb-2">{p.subtitle}</p>
            <p className="text-sm text-gray-700">{p.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <p className="font-semibold text-lg text-brand">Dream  Create  Sell  Grow</p>
        <button className="mt-4 bg-brand text-white px-6 py-3 rounded-xl">Schedule a Call Back</button>
      </div>
    </section>
  );
}
