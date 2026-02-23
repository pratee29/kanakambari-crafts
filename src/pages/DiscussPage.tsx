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
  { title: "Will AI-Powered Robots Replace Human Jobs?", speaker: "Dr. James Martinez", category: "🤖 AI & Future", date: "Today", time: "6 PM", members: 234, hot: true, tags: ["AI", "Future", "Jobs"], image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format" },
  { title: "Is AI-Generated Art the Future of Creativity?", speaker: "Emma Thompson", category: "🎨 Art & AI", date: "Today", time: "7 PM", members: 189, hot: true, tags: ["Art", "Creativity", "AI"], image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format" },
  { title: "Why Communication Skills Matter More Than Technical Skills", speaker: "Sarah Chen", category: "💼 Career Growth", date: "Tomorrow", time: "5 PM", members: 312, hot: false, tags: ["Career", "Skills", "Growth"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format" },
  { title: "The Future of Web3 and Decentralization", speaker: "Raj Patel", category: "⛓️ Web3", date: "Tomorrow", time: "8 PM", members: 156, hot: false, tags: ["Web3", "Crypto", "Tech"], image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&auto=format" },
  { title: "Mental Health in the Age of Social Media", speaker: "Dr. Priya Nair", category: "🧠 Wellness", date: "This Week", time: "6 PM", members: 421, hot: true, tags: ["Mental Health", "Wellness"], image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=600&auto=format" },
  { title: "Building Startups Without Investors", speaker: "Amir Khan", category: "🚀 Startups", date: "This Week", time: "7 PM", members: 98, hot: false, tags: ["Startup", "Business"], image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format" },
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
        ...form, speaker: userProfile.fullName, hostUid: userProfile.uid,
        status: "scheduled", members: 0, createdAt: new Date().toISOString(),
      });
      alert("Discussion room created successfully!");
      setForm({ title: "", category: "", description: "", date: "", time: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating discussion:", err);
      alert("Failed to create discussion. Try again.");
    } finally { setLoading(false); }
  };

  // DISCUSSION ROOM VIEW
  if (activeDiscuss) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-card/80 border-b border-border backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveDiscuss(null)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div>
              <h2 className="text-foreground font-bold text-sm">{activeDiscuss.title}</h2>
              <p className="text-muted-foreground text-xs">with {activeDiscuss.speaker}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 bg-primary/20 border border-primary/40 text-primary px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> LIVE
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 flex items-center justify-center min-h-[400px] bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-6">💬</motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold mb-4">🚀 Launching Soon</div>
                <h2 className="text-foreground text-2xl sm:text-3xl font-bold mb-3">{activeDiscuss.title}</h2>
                <p className="text-muted-foreground text-sm mb-6">Hosted by {activeDiscuss.speaker}</p>
                <p className="text-muted-foreground/60 text-sm">Discussion rooms are coming soon.<br />Be the first to join when we launch!</p>
              </motion.div>
            </div>
          </div>

          {/* CHAT */}
          <div className="w-72 hidden lg:flex flex-col bg-card/60 border-l border-border">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <MessageCircle size={16} className="text-primary" />
              <span className="text-foreground font-semibold text-sm">Discussion Chat</span>
              <span className="ml-auto text-muted-foreground text-xs">{activeDiscuss.members}</span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center">Be the first to send a message when this room goes live!</p>
            </div>
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Type a message..." className="flex-1 bg-secondary border border-border text-foreground text-sm rounded-full px-3 py-2 placeholder:text-muted-foreground outline-none" />
                <button className="p-2 rounded-full gradient-orange text-primary-foreground hover:opacity-90 transition"><Send size={14} /></button>
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

      {/* HERO */}
      <div className="relative pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-28 right-1/4 w-48 h-48 bg-accent/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold">
                    <TrendingUp size={11} /> Trending Discussions
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
                  Discuss <span className="gradient-orange-text">Rooms</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-base">Talk freely. Debate boldly. Grow together.</p>
              </div>
            </div>
            {canCreate ? (
              <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition glow-orange">
                <Plus size={18} /> Create Room
              </button>
            ) : (
              <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-secondary border border-primary/30 text-primary font-semibold flex items-center gap-2 hover:bg-secondary/80 transition">
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
            <div className="card-glass rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">💬 Create Discussion Room</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition text-muted-foreground"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Discussion Topic</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Will AI Replace Jobs?" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Category</label>
                  <Input name="category" value={form.category} onChange={handleChange} required placeholder="e.g. Technology, Career" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will be discussed..." className="w-full bg-secondary border border-border text-foreground rounded-xl p-3 min-h-[80px] placeholder:text-muted-foreground outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Date</label>
                  <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Time</label>
                  <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
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
              <div className="relative rounded-3xl overflow-hidden border border-border hover:border-primary/30 bg-card transition-all duration-300 h-full">
                {/* IMAGE */}
                <div className="h-40 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-card/70 backdrop-blur-sm text-foreground/80 text-xs font-medium border border-border">{item.category}</span>
                  </div>
                  {item.hot && (
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-semibold border border-primary/30">
                        <Flame size={10} className="fill-current" /> Hot
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-foreground font-bold text-base leading-snug mb-3 group-hover:text-primary transition-colors">{item.title}</h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs">{tag}</span>
                    ))}
                  </div>

                  {/* SPEAKER */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center text-primary-foreground text-xs font-bold">{item.speaker[0]}</div>
                    <div>
                      <p className="text-foreground text-sm font-medium">{item.speaker}</p>
                      <p className="text-muted-foreground text-xs">Host</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {item.time}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {item.members}</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-1.5 rounded-full text-xs font-semibold gradient-orange text-primary-foreground hover:opacity-90 transition">
                      Join →
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
