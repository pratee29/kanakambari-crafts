import { useState } from "react";
import { ArrowLeft, Play, Lock, Clock, Users, Star, Zap, BookOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const courses = [
  {
    title: "Motion Graphics Mastery",
    subtitle: "Create stunning animations from scratch",
    instructor: "Rahul Mehta",
    avatar: "RM",
    category: "Design",
    episode: "12 Episodes",
    duration: "8h 30m",
    students: 4200,
    rating: 4.9,
    isFree: true,
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    tags: ["Figma", "After Effects", "Animation"],
  },
  {
    title: "Full-Stack Web Development",
    subtitle: "React, Node.js & MongoDB from Zero",
    instructor: "Sneha Kapoor",
    avatar: "SK",
    category: "Coding",
    episode: "24 Episodes",
    duration: "18h 00m",
    students: 8900,
    rating: 4.8,
    isFree: false,
    gradient: "from-blue-600 via-indigo-500 to-violet-600",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Machine Learning Fundamentals",
    subtitle: "Neural networks, NLP & Computer Vision",
    instructor: "Dr. Aisha Patel",
    avatar: "AP",
    category: "AI/ML",
    episode: "18 Episodes",
    duration: "14h 15m",
    students: 6100,
    rating: 4.9,
    isFree: false,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    tags: ["Python", "TensorFlow", "ML"],
  },
  {
    title: "UI/UX Design Bootcamp",
    subtitle: "Design products people love to use",
    instructor: "Alex Rivera",
    avatar: "AR",
    category: "Design",
    episode: "16 Episodes",
    duration: "11h 45m",
    students: 5400,
    rating: 4.7,
    isFree: true,
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    tags: ["Figma", "UX Research", "Prototyping"],
  },
  {
    title: "Public Speaking & Confidence",
    subtitle: "Master the art of communication",
    instructor: "James Liu",
    avatar: "JL",
    category: "Soft Skills",
    episode: "10 Episodes",
    duration: "6h 20m",
    students: 3200,
    rating: 4.8,
    isFree: true,
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    tags: ["Speaking", "Leadership", "Mindset"],
  },
  {
    title: "Startup & Entrepreneurship",
    subtitle: "Build a business from idea to launch",
    instructor: "Priya Sharma",
    avatar: "PS",
    category: "Business",
    episode: "20 Episodes",
    duration: "15h 00m",
    students: 7300,
    rating: 4.9,
    isFree: false,
    gradient: "from-yellow-500 via-amber-500 to-orange-600",
    tags: ["Strategy", "Pitch", "Growth"],
  },
];

export default function LearnPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState<typeof courses[0] | null>(null);

  const handleJoin = (course: typeof courses[0]) => {
    if (!course.isFree && userProfile?.role === "VIEW") {
      navigate("/subscription");
      return;
    }
    setActiveCourse(course);
  };

  // DEMO LECTURE VIEW
  if (activeCourse) {
    return (
      <div className="min-h-screen bg-[#070B24] flex flex-col">
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveCourse(null)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h2 className="text-white font-bold text-sm sm:text-base">{activeCourse.title}</h2>
              <p className="text-white/50 text-xs">with {activeCourse.instructor} · {activeCourse.episode}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">{activeCourse.category}</span>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="flex flex-1 overflow-hidden">
          {/* VIDEO PLAYER */}
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 bg-[#0d1117] flex items-center justify-center min-h-[400px]">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCourse.gradient} opacity-10`} />

              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6 max-w-lg">
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl sm:text-7xl mb-6">🎓</motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-sm font-semibold mb-4">
                  <Zap size={14} className="animate-pulse" /> Demo Lecture — Launching Soon
                </div>
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">{activeCourse.title}</h2>
                <p className="text-white/60 text-sm mb-6">{activeCourse.subtitle}</p>

                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${activeCourse.gradient} flex items-center justify-center text-white font-bold`}>
                    {activeCourse.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">{activeCourse.instructor}</p>
                    <p className="text-white/40 text-xs">Instructor</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-white/40 text-sm mb-8">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {activeCourse.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} /> {activeCourse.students.toLocaleString()} students</span>
                  <span className="flex items-center gap-1.5"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {activeCourse.rating}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {activeCourse.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">{tag}</span>
                  ))}
                </div>
              </motion.div>

              {/* PLAY BUTTON OVERLAY */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute w-20 h-20 rounded-full bg-gradient-to-br ${activeCourse.gradient} flex items-center justify-center shadow-2xl cursor-pointer opacity-30 hover:opacity-60 transition-opacity`}
                style={{ bottom: "30%", left: "50%", transform: "translateX(-50%)" }}
              >
                <Play size={32} className="text-white fill-white ml-1" />
              </motion.div>
            </div>

            {/* EPISODES LIST */}
            <div className="bg-black/40 border-t border-white/10 p-4 max-h-48 overflow-y-auto">
              <h4 className="text-white/50 text-xs uppercase tracking-wider mb-3 font-semibold">Episodes</h4>
              <div className="space-y-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition ${i === 0 ? "bg-white/10" : "hover:bg-white/5"}`}>
                    <div className={`w-7 h-7 rounded-full ${i === 0 ? `bg-gradient-to-br ${activeCourse.gradient}` : "bg-white/10"} flex items-center justify-center flex-shrink-0`}>
                      {i === 0 ? <Play size={12} className="text-white fill-white ml-0.5" /> : <Lock size={10} className="text-white/40" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${i === 0 ? "text-white font-medium" : "text-white/40"}`}>Episode {i + 1}: {["Introduction", "Core Concepts", "Advanced Topics", "Projects", "Final Exam"][i]}</p>
                    </div>
                    <span className="text-white/30 text-xs">{["15m", "28m", "45m", "1h", "30m"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-72 hidden lg:flex flex-col bg-black/40 border-l border-white/10">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <BookOpen size={16} className="text-orange-400" />
              <span className="text-white font-semibold text-sm">Course Info</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/50 text-xs mb-1">Instructor</p>
                <p className="text-white font-semibold">{activeCourse.instructor}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <p className="text-orange-400 font-bold text-lg">{activeCourse.students.toLocaleString()}</p>
                  <p className="text-white/40 text-xs">Students</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <p className="text-yellow-400 font-bold text-lg">{activeCourse.rating}</p>
                  <p className="text-white/40 text-xs">Rating</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/50 text-xs mb-2">Topics Covered</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeCourse.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B24] overflow-x-hidden">
      {/* HERO */}
      <div className="relative pt-20 pb-10 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  Learn <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Casually</span>
                </h1>
                <p className="text-white/50 mt-2 text-base">One episode at a time. No pressure. Just growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
              onClick={() => handleJoin(course)}
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.03] h-full flex flex-col">
                {/* GRADIENT BANNER */}
                <div className={`h-40 bg-gradient-to-br ${course.gradient} relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute inset-0 bg-black/20" />
                  {/* INSTRUCTOR */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm border border-white/30">
                      {course.avatar}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{course.instructor}</p>
                      <p className="text-white/70 text-xs">Instructor</p>
                    </div>
                  </div>
                  {/* BADGES */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">{course.category}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {course.isFree ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-bold">FREE</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold">PRO</span>
                    )}
                  </div>

                  {/* PLAN LOCK */}
                  {!course.isFree && userProfile?.role === "VIEW" && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="text-center">
                        <Lock size={28} className="text-white/60 mx-auto mb-1" />
                        <p className="text-white/70 text-xs font-semibold">Upgrade to Access</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* BODY */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-orange-300 transition-colors">{course.title}</h3>
                  <p className="text-white/50 text-sm mb-3 flex-1">{course.subtitle}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.tags.map((tag, t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star size={11} className="fill-yellow-400 text-yellow-400" /> {course.rating}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                        !course.isFree && userProfile?.role === "VIEW"
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : `bg-gradient-to-r ${course.gradient} text-white hover:opacity-90`
                      }`}
                    >
                      {!course.isFree && userProfile?.role === "VIEW" ? "Upgrade" : "Watch Now →"}
                    </motion.button>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
