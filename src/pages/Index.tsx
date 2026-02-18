import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import MoodSpinner from "@/components/MoodSpinner";
import LiveNow from "@/components/LiveNow";
import WatchSection from "@/components/WatchSection";
import LearnSection from "@/components/LearnSection";
import DiscussSection from "@/components/DiscussSection";
import SupportSection from "@/components/SupportSection";
import PauseSection from "@/components/PauseSection";
import InTheAirSection from "@/components/InTheAirSection";
import CategoriesSection from "@/components/CategoriesSection";
import OnlineSpaceSection from "@/components/OnlineSpaceSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <LiveNow />
      <MoodSpinner />
      <DiscussSection />
      <LearnSection />
      <WatchSection />
      <SupportSection />
      <PauseSection />
      <InTheAirSection />
      <CategoriesSection />
      <OnlineSpaceSection />
      <Footer />
    </div>
  );
};

export default Index;
