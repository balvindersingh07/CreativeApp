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

export default function App() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleGetStarted = () => {
    setSignupOpen(true);
  };

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
      
      {/* Global Dialogs */}
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
      
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
