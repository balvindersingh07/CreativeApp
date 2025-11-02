import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { EventFeed } from "./components/EventFeed";
import { CreatorGallery } from "./components/CreatorGallery";
import { MatchmakingSection } from "./components/MatchmakingSection";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { SignupDialog } from "./components/SignupDialog";
import { LoginDialog } from "./components/LoginDialog";
import { Toaster } from "./components/ui/sonner";
import { useState } from "react";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleGetStarted = () => setSignupOpen(true);

  const CHAT_ENABLED =
    (String(import.meta.env.VITE_CHATBOT_ENABLED ?? "")
      .toLowerCase()
      .trim() === "true") && typeof window !== "undefined";

  if (typeof window !== "undefined") {
    console.log("CHAT_FLAG:", import.meta.env.VITE_CHATBOT_ENABLED, "->", CHAT_ENABLED);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <HowItWorks />
        <EventFeed />
        <CreatorGallery />
        <MatchmakingSection />
        <AnalyticsSection />
        <CallToAction onJoinClick={handleGetStarted} />
      </main>
      <Footer />

      <SignupDialog
        open={signupOpen}
        onOpenChange={setSignupOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignup={() => setSignupOpen(true)}
      />

      <Toaster position="top-right" richColors />

      {/* Chatbot mounts only when flag is ON */}
      {CHAT_ENABLED && <Chatbot />}
    </div>
  );
}




