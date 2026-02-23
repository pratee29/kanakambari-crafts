import { useState } from "react";
import { ArrowLeft, Play, Lock, Clock, Users, Star, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

const bannerImages = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&auto=format",
];

const courses = [
  { title: "Motion Graphics Mastery", subtitle: "Create stunning animations from scratch", instructor: "Rahul Mehta", avatar: "RM", category: "Design", episode: "12 Episodes", duration: "8h 30m", students: 4200, rating: 4.9, isFree: true, tags: ["Figma", "After Effects", "Animation"], image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format" },
  { title: "Full-Stack Web Development", subtitle: "React, Node.js & MongoDB from Zero", instructor: "Sneha Kapoor", avatar: "SK", category: "Coding", episode: "24 Episodes", duration: "18h 00m", students: 8900, rating: 4.8, isFree: false, tags: ["React", "Node.js", "MongoDB"], image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format" },
  { title: "Machine Learning Fundamentals", subtitle: "Neural networks, NLP & Computer Vision", instructor: "Dr. Aisha Patel", avatar: "AP", category: "AI/ML", episode: "18 Episodes", duration: "14h 15m", students: 6100, rating: 4.9, isFree: false, tags: ["Python", "TensorFlow", "ML"], image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format" },
  { title: "UI/UX Design Bootcamp", subtitle: "Design products people love to use", instructor: "Alex Rivera", avatar: "AR", category: "Design", episode: "16 Episodes", duration: "11h 45m", students: 5400, rating: 4.7, isFree: true, tags: ["Figma", "UX Research", "Prototyping"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format" },
  { title: "Public Speaking & Confidence", subtitle: "Master the art of communication", instructor: "James Liu", avatar: "JL", category: "Soft Skills", episode: "10 Episodes", duration: "6h 20m", students: 3200, rating: 4.8, isFree: true, tags: ["Speaking", "Leadership", "Mindset"], image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format" },
  { title: "Startup & Entrepreneurship", subtitle: "Build a business from idea to launch", instructor: "Priya Sharma", avatar: "PS", category: "Business", episode: "20 Episodes", duration: "15h 00m", students: 7300, rating: 4.9, isFree: false, tags: ["Strategy", "Pitch", "Growth"], image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format" },
];

export default function LearnPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState<typeof courses[0] | null>(null);

  const handleJoin = (course: typeof courses[0]) => {
    if (!course.isFree && userProfile?.role === "VIEW") { navigate("/subscription"); return; }
    setActiveCourse(course);
  };

  // DEMO LECTURE VIEW
  if (activeCourse) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-card/80 border-b border-border backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveCourse(null)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
            <div><h2 className="text-foreground font-bold text-sm sm:text-base">{activeCourse.title}</h2><p className="text-muted-foreground text-xs">with {activeCourse.instructor} · {activeCourse.episode}</p></div>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">{activeCourse.category}</span>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 bg-card flex items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6 max-w-lg">
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl sm:text-7xl mb-6">🎓</motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold mb-4"><Zap size={14} className="animate-pulse" /> Demo Lecture — Launching Soon</div>
                <h2 className="text-foreground text-2xl sm:text-3xl font-bold mb-3">{activeCourse.title}</h2>
                <p className="text-muted-foreground text-sm mb-6">{activeCourse.subtitle}</p>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold">{activeCourse.avatar}</div>
                  <div className="text-left"><p className="text-foreground text-sm font-medium">{activeCourse.instructor}</p><p className="text-muted-foreground text-xs">Instructor</p></div>
                </div>
              </motion.div>
            </div>
            <div className="bg-card/60 border-t border-border p-4 max-h-48 overflow-y-auto">
              <h4 className="text-muted-foreground text-xs uppercase tracking-wider mb-3 font-semibold">Episodes</h4>
              <div className="space-y-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition ${i === 0 ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary"}`}>
                    <div className={`w-7 h-7 rounded-full ${i === 0 ? "gradient-orange" : "bg-secondary"} flex items-center justify-center flex-shrink-0`}>{i === 0 ? <Play size={12} className="text-primary-foreground fill-primary-foreground ml-0.5" /> : <Lock size={10} className="text-muted-foreground" />}</div>
                    <div className="flex-1"><p className={`text-sm ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>Episode {i + 1}: {["Introduction", "Core Concepts", "Advanced Topics", "Projects", "Final Exam"][i]}</p></div>
                    <span className="text-muted-foreground text-xs">{["15m", "28m", "45m", "1h", "30m"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-72 hidden lg:flex flex-col bg-card/60 border-l border-border">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2"><BookOpen size={16} className="text-primary" /><span className="text-foreground font-semibold text-sm">Course Info</span></div>
            <div className="p-4 space-y-4">
              <div className="p-4 rounded-2xl bg-secondary border border-border"><p className="text-muted-foreground text-xs mb-1">Instructor</p><p className="text-foreground font-semibold">{activeCourse.instructor}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-secondary text-center"><p className="text-primary font-bold text-lg">{activeCourse.students.toLocaleString()}</p><p className="text-muted-foreground text-xs">Students</p></div>
                <div className="p-3 rounded-xl bg-secondary text-center"><p className="text-accent font-bold text-lg">{activeCourse.rating}</p><p className="text-muted-foreground text-xs">Rating</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* HERO BANNER */}
      <PageBanner
        title="Learn"
        titleHighlight="Casually"
        subtitle="One episode at a time. No pressure. Just growth."
        badge={{ icon: <BookOpen size={11} />, text: "Courses" }}
        stats={`${courses.length} courses available`}
        images={bannerImages}
      />

      {/* COURSES GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8, scale: 1.02 }} className="group cursor-pointer" onClick={() => handleJoin(course)}>
              <div className="relative rounded-3xl overflow-hidden border border-border hover:border-primary/30 bg-card h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="h-44 relative overflow-hidden flex-shrink-0">
                  <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold text-sm border-2 border-card">{course.avatar}</div>
                    <div><p className="text-foreground text-sm font-semibold drop-shadow-lg">{course.instructor}</p><p className="text-foreground/70 text-xs drop-shadow-lg">Instructor</p></div>
                  </div>
                  <div className="absolute top-4 left-4"><span className="px-2.5 py-1 rounded-full bg-card/70 backdrop-blur-sm text-foreground text-xs font-medium border border-border">{course.category}</span></div>
                  <div className="absolute top-4 right-4">{course.isFree ? (<span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-bold">FREE</span>) : (<span className="px-2.5 py-1 rounded-full bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-bold">PRO</span>)}</div>
                  {!course.isFree && userProfile?.role === "VIEW" && (<div className="absolute inset-0 bg-card/60 backdrop-blur-[2px] flex items-center justify-center"><div className="text-center"><Lock size={28} className="text-muted-foreground mx-auto mb-1" /><p className="text-foreground/70 text-xs font-semibold">Upgrade to Access</p></div></div>)}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-foreground font-bold text-base leading-snug mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 flex-1">{course.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">{course.tags.map((tag, t) => (<span key={t} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs">{tag}</span>))}</div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star size={11} className="fill-accent text-accent" /> {course.rating}</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${!course.isFree && userProfile?.role === "VIEW" ? "bg-primary/20 text-primary border border-primary/30" : "gradient-orange text-primary-foreground hover:opacity-90"}`}>
                      {!course.isFree && userProfile?.role === "VIEW" ? "Upgrade" : "Watch Now →"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
