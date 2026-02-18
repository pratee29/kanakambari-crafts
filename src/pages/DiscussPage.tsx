import { useState } from "react";
import { Calendar, Clock, Plus, ArrowLeft, Loader, Users, MessageCircle, Send, Flame, X, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const discussItems = [
  {
    title: "Will AI-Powered Robots Replace Human Jobs?",
    speaker: "Dr. James Martinez", category: "🤖 AI & Future",
    date: "Today", time: "6 PM", members: 234, hot: true,
    gradient: "from-violet-600 to-pink-600",
    tags: ["AI", "Future", "Jobs"]
  },
  {
    title: "Is AI-Generated Art the Future of Creativity?",
    speaker: "Emma Thompson", category: "🎨 Art & AI",
    date: "Today", time: "7 PM", members: 189, hot: true,
    gradient: "from-orange-500 to-rose-600",
    tags: ["Art", "Creativity", "AI"]
  },
  {
    title: "Why Communication Skills Matter More Than Technical Skills",
    speaker: "Sarah Chen", category: "💼 Career Growth",
    date: "Tomorrow", time: "5 PM", members: 312, hot: false,
    gradient: "from-emerald-600 to-teal-600",
    tags: ["Career", "Skills", "Growth"]
  },
  {
    title: "The Future of Web3 and Decentralization",
    speaker: "Raj Patel", category: "⛓️ Web3",
    date: "Tomorrow", time: "8 PM", members: 156, hot: false,
    gradient: "from-blue-600 to-indigo-600",
    tags: ["Web3", "Crypto", "Tech"]
  },
  {
    title: "Mental Health in the Age of Social Media",
    speaker: "Dr. Priya Nair", category: "🧠 Wellness",
    date: "This Week", time: "6 PM", members: 421, hot: true,
    gradient: "from-amber-500 to-orange-600",
    tags: ["Mental Health", "Wellness"]
  },
  {
    title: "Building Startups Without Investors",
    speaker: "Amir Khan", category: "🚀 Startups",
    date: "This Week", time: "7 PM", members: 98, hot: false,
    gradient: "from-pink-600 to-rose-600",
    tags: ["Startup", "Business"]
  },
];

export default function DiscussPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeDiscuss, setActiveDiscuss] = useState<typeof discussItems[0] | null>(null);
  const [chatMsg, setChatMsg] = useState("");
  const [form, setForm] = useState({ title: "", category: "", description: "", date: "", time: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "discussions"), {
        ...form,
        speaker: userProfile.fullName,
        hostUid: userProfile.uid,
        status: "scheduled",
        members: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Discussion room created successfully!");
      setForm({ title: "", category: "", description: "", date: "", time: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating discussion:", err);
      alert("Failed to create discussion. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // DISCUSSION ROOM VIEW
  if (activeDiscuss) {
    return (
      <div className="min-h-screen bg-[#070B24] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveDiscuss(null)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h2 className="text-white font-bold text-sm">{activeDiscuss.title}</h2>
              <p className="text-white/50 text-xs">with {activeDiscuss.speaker}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> LIVE
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col">
            <div className={`relative flex-1 bg-gradient-to-br ${activeDiscuss.gradient} opacity-20 min-h-[400px]`} />
            <div className="relative flex-1 flex items-center justify-center min-h-[400px] bg-[#0d1117]">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeDiscuss.gradient} opacity-10`} />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">💬</motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-semibold mb-4">
                  🚀 Launching Soon
                </div>
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">{activeDiscuss.title}</h2>
                <p className="text-white/50 text-sm mb-6">Hosted by {activeDiscuss.speaker}</p>
                <p className="text-white/30 text-sm">Discussion rooms are coming soon.<br />Be the first to join when we launch!</p>
              </motion.div>
            </div>
          </div>

          {/* CHAT */}
          <div className="w-72 hidden lg:flex flex-col bg-black/40 border-l border-white/10">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <MessageCircle size={16} className="text-emerald-400" />
              <span className="text-white font-semibold text-sm">Discussion Chat</span>
              <span className="ml-auto text-white/40 text-xs">{activeDiscuss.members}</span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center">
              <p className="text-white/30 text-sm text-center">Be the first to send a message when this room goes live!</p>
            </div>
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Type a message..." className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-full px-3 py-2 placeholder:text-white/30 outline-none" />
                <button className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition"><Send size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B24] overflow-x-hidden">
      <Header />

      {/* HERO */}
      <div className="relative pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-28 right-1/4 w-48 h-48 bg-pink-500/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-400 text-xs font-bold">
                    <TrendingUp size={11} /> Trending Discussions
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  Discuss <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">Rooms</span>
                </h1>
                <p className="text-white/50 mt-2 text-base">Talk freely. Debate boldly. Grow together.</p>
              </div>
            </div>
            {canCreate ? (
              <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-violet-500/30">
                <Plus size={18} /> Create Room
              </button>
            ) : (
              <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-white/5 border border-violet-400/30 text-violet-400 font-semibold flex items-center gap-2 hover:bg-white/10 transition">
                🔒 Upgrade to Host
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CREATE FORM */}
      <AnimatePresence>
        {showCreate && canCreate && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="max-w-7xl mx-auto px-6 mb-8">
            <div className="bg-white/5 border border-violet-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">💬 Create Discussion Room</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white/60"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Discussion Topic</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Will AI Replace Jobs?" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Category</label>
                  <Input name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Technology, Career" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will be discussed..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 min-h-[80px] placeholder:text-white/30 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Date</label>
                  <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Time</label>
                  <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {loading ? "Creating..." : "🚀 Launch Room"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DISCUSSION CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discussItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
              onClick={() => setActiveDiscuss(item)}
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.03] h-full">
                {/* TOP GRADIENT BAR */}
                <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />

                <div className="p-6">
                  {/* HEADER ROW */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">{item.category}</span>
                    <div className="flex items-center gap-1.5">
                      {item.hot && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs">
                          <Flame size={10} className="fill-current" /> Hot
                        </span>
                      )}
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-orange-300 transition-colors">{item.title}</h3>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs">{tag}</span>
                    ))}
                  </div>

                  {/* SPEAKER */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                      {item.speaker[0]}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.speaker}</p>
                      <p className="text-white/40 text-xs">Host</p>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {item.time}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {item.members}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${item.gradient} text-white hover:opacity-90 transition`}
                    >
                      Join →
                    </motion.button>
                  </div>
                </div>

                {/* HOVER GLOW */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
