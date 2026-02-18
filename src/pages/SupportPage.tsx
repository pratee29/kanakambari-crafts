import { useState } from "react";
import { Palette, FileText, Globe, Plus, ArrowLeft, Loader, Briefcase, DollarSign, Clock, Users, ChevronRight, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const supportItems = [
  {
    title: "Brand Identity Design",
    description: "Full brand kit — logo, colors, typography, and usage guidelines.",
    icon: Palette,
    emoji: "🎨",
    budget: "₹8k – ₹25k",
    timeline: "2–3 weeks",
    applicants: 14,
    tags: ["Logo", "Branding", "Design"],
    gradient: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format",
    postedBy: "TechStart Inc",
  },
  {
    title: "Academic Thesis Writing",
    description: "Structured research writing with clarity, citations & originality.",
    icon: FileText,
    emoji: "📝",
    budget: "₹5k – ₹20k",
    timeline: "1–4 weeks",
    applicants: 8,
    tags: ["Research", "Writing", "Academic"],
    gradient: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format",
    postedBy: "EdTech Platform",
  },
  {
    title: "Landing Page Development",
    description: "Fast, modern, responsive webpage that converts visitors.",
    icon: Globe,
    emoji: "🌐",
    budget: "₹6k – ₹18k",
    timeline: "1–2 weeks",
    applicants: 22,
    tags: ["React", "Tailwind", "Web"],
    gradient: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format",
    postedBy: "Digital Solutions",
  },
  {
    title: "UI/UX Design Review",
    description: "Expert audit of your product design with actionable improvements.",
    icon: Palette,
    emoji: "🔍",
    budget: "₹3k – ₹10k",
    timeline: "3–5 days",
    applicants: 6,
    tags: ["UX", "Figma", "Review"],
    gradient: "from-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format",
    postedBy: "Creative Minds",
  },
  {
    title: "Video Editing & Reels",
    description: "Cinematic edits for YouTube, Instagram Reels and social media.",
    icon: Globe,
    emoji: "🎬",
    budget: "₹4k – ₹15k",
    timeline: "1 week",
    applicants: 18,
    tags: ["Video", "Reels", "Editing"],
    gradient: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format",
    postedBy: "Media House",
  },
  {
    title: "Mobile App Development",
    description: "React Native or Flutter app from design to deployment.",
    icon: Globe,
    emoji: "📱",
    budget: "₹20k – ₹60k",
    timeline: "4–8 weeks",
    applicants: 11,
    tags: ["React Native", "Flutter", "Mobile"],
    gradient: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format",
    postedBy: "Startup Hub",
  },
];

export default function SupportPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", budget: "", deadline: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowCreate(false);
      setForm({ title: "", description: "", budget: "", deadline: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#070B24] overflow-x-hidden">
      <Header />

      {/* HERO with background image */}
      <div className="relative pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B24]/60 via-[#070B24]/80 to-[#070B24]" />
        </div>
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 relative"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                    <Briefcase size={11} /> Work & Earn
                  </span>
                  <span className="text-white/40 text-sm">60+ open opportunities</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  Support <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Work</span>
                </h1>
                <p className="text-white/50 mt-2 text-base">Get skilled help. Give your expertise. Earn real money.</p>
              </div>
            </div>

            {canCreate ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-emerald-500/30">
                <Plus size={18} /> Post a Requirement
              </motion.button>
            ) : (
              <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-white/5 border border-emerald-400/30 text-emerald-400 font-semibold flex items-center gap-2 hover:bg-white/10 transition">
                🔒 Upgrade to Post
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* CREATE FORM */}
      <AnimatePresence>
        {showCreate && canCreate && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="max-w-7xl mx-auto px-6 mb-8">
            <div className="bg-white/5 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">📋 Post Work Requirement</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white/60"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Work Title</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Create a Logo for my Brand" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the work you need..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 min-h-[80px] placeholder:text-white/30 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Budget (₹)</label>
                  <Input name="budget" value={form.budget} onChange={handleChange} required placeholder="e.g. ₹5k – ₹20k" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Deadline</label>
                  <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {loading ? "Publishing..." : "🚀 Publish Work"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUPPORT CARDS — Dashboard style with image background */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {supportItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                {/* IMAGE BG */}
                <div className="relative h-[160px] overflow-hidden">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

                  {/* TOP BADGE */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="text-3xl">{item.emoji}</span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>

                  {/* BOTTOM OF IMAGE */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-snug drop-shadow-lg">{item.title}</h3>
                    <p className="text-white/70 text-xs mt-1">by {item.postedBy}</p>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="bg-[#0d1117] border-t border-white/5 p-5">
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{item.description}</p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">{tag}</span>
                    ))}
                  </div>

                  {/* STATS ROW */}
                  <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-emerald-400 font-bold text-base">{item.budget}</p>
                        <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><DollarSign size={9} /> Budget Range</p>
                      </div>
                      <div>
                        <p className="text-blue-400 font-bold text-base">{item.timeline}</p>
                        <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><Clock size={9} /> Timeline</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm mb-4">📊 {item.applicants} applicants</p>

                  {/* CTA BUTTONS */}
                  {(userProfile?.role === "VIEW" || userProfile?.role === "TALK" || !userProfile) ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${item.gradient} text-white hover:opacity-90 transition flex items-center justify-center gap-2`}
                    >
                      Apply Now <ChevronRight size={14} />
                    </motion.button>
                  ) : (
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-white/10 text-white rounded-xl hover:bg-white/20 text-sm">
                        Edit
                      </Button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${item.gradient} text-white hover:opacity-90 transition flex items-center justify-center gap-2`}
                      >
                        View Applications <ChevronRight size={14} />
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
