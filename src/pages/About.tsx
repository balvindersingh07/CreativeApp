import React from "react";

export default function About() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto text-gray-700">
      <h1 className="text-3xl font-bold text-brand mb-6">
        LocalPush — Where Talent Meets Visibility
      </h1>

      <h2 className="text-xl font-semibold mb-3">Mission Statement</h2>
      <p className="mb-4">
        To empower small business owners, home-based creators, and skilled artisans by connecting them to the right market platforms, exhibitions, and event opportunities where their talent can shine, sell, and sustain profitably.
      </p>
      <p className="mb-4">
        We aim to help Indias Micro Entrepreneur Ecosystem and make every passionate creator visible, valued, and financially independent through meaningful market connections.
      </p>

      <h2 className="text-xl font-semibold mb-3 mt-8">Vision Statement</h2>
      <p className="mb-4">
        To build Indias most trusted digital ecosystem where creativity meets commerce — a one-stop destination for talented individuals to grow their businesses beyond boundaries and for event organizers to discover authentic, high-quality exhibitors.
      </p>
      <p>
        We envision a world where every local creator has a stage, every skill finds recognition, and every event finds the perfect seller match.
      </p>

      <h2 className="text-xl font-semibold mb-3 mt-8">Core Goals</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Empower Creators — access to verified selling opportunities.</li>
        <li>Enable Growth — scale from local to city-wide exhibitions.</li>
        <li>Build Trust — safe collaboration between sellers & organizers.</li>
        <li>Boost Local Economy — amplify Made in India.</li>
        <li>Simplify Discovery — effortless matching for all.</li>
      </ul>
    </section>
  );
}
