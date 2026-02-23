import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } 
  },
};

const Homepage = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <LiveNow userRole={userProfile?.role} />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <MoodSpinner />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <DiscussSection userRole={userProfile?.role} />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <LearnSection />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <WatchSection />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <SupportSection userRole={userProfile?.role} />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <PauseSection userRole={userProfile?.role} />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <InTheAirSection />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <CategoriesSection />
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <OnlineSpaceSection />
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Homepage;
