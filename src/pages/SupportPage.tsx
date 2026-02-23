import { useState } from "react";
import { Palette, FileText, Globe, Plus, ArrowLeft, Loader, Briefcase, DollarSign, Clock, Users, ChevronRight, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const supportItems = [
  { title: "Brand Identity Design", description: "Full brand kit — logo, colors, typography, and usage guidelines.", icon: Palette, emoji: "🎨", budget: "₹8k – ₹25k", timeline: "2–3 weeks", applicants: 14, tags: ["Logo", "Branding", "Design"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format" },
  { title: "Academic Thesis Writing", description: "Structured research writing with clarity, citations & originality.", icon: FileText, emoji: "📝", budget: "₹5k – ₹20k", timeline: "1–4 weeks", applicants: 8, tags: ["Research", "Writing", "Academic"], image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format" },
  { title: "Landing Page Development", description: "Fast, modern, responsive webpage that converts visitors.", icon: Globe, emoji: "🌐", budget: "₹6k – ₹18k", timeline: "1–2 weeks", applicants: 22, tags: ["React", "Tailwind", "Web"], image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format" },
  { title: "UI/UX Design Review", description: "Expert audit of your product design with actionable improvements.", icon: Palette, emoji: "🔍", budget: "₹3k – ₹10k", timeline: "3–5 days", applicants: 6, tags: ["UX", "Figma", "Review"], image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format" },
  { title: "Video Editing & Reels", description: "Cinematic edits for YouTube, Instagram Reels and social media.", icon: Globe, emoji: "🎬", budget: "₹4k – ₹15k", timeline: "1 week", applicants: 18, tags: ["Video", "Reels", "Editing"], image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format" },
  { title: "Mobile App Development", description: "React Native or Flutter app from design to deployment.", icon: Globe, emoji: "📱", budget: "₹20k – ₹60k", timeline: "4–8 weeks", applicants: 11, tags: ["React Native", "Flutter", "Mobile"], image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format" },
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
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "supportWork"), {
        ...form, publishedBy: userProfile.fullName, publisherUid: userProfile.uid,
        status: "open", applicants: 0, createdAt: new Date().toISOString(),
      });
      alert("Work published successfully!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error publishing work:", err);
      alert("Failed to publish. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* HERO */}
      <div className="relative pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-accent/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold">
                    <Briefcase size={11} /> Work & Earn
                  </span>
                  <span className="text-muted-foreground text-sm">60+ open opportunities</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
                  Support <span className="gradient-orange-text">Work</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-base">Get skilled help. Give your expertise. Earn real money.</p>
              </div>
            </div>

            {canCreate ? (
              <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition glow-orange">
                <Plus size={18} /> Post a Requirement
              </button>
            ) : (
              <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-secondary border border-primary/30 text-primary font-semibold flex items-center gap-2 hover:bg-secondary/80 transition">
                🔒 Upgrade to Post
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
                <h2 className="text-xl font-bold text-foreground">📋 Post Work Requirement</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition text-muted-foreground"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Work Title</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Create a Logo for my Brand" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the work you need..." className="w-full bg-secondary border border-border text-foreground rounded-xl p-3 min-h-[80px] placeholder:text-muted-foreground outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Budget (₹)</label>
                  <Input name="budget" value={form.budget} onChange={handleChange} required placeholder="e.g. ₹5k – ₹20k" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Deadline</label>
                  <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {loading ? "Publishing..." : "🚀 Publish Work"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUPPORT CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden border border-border hover:border-primary/30 bg-card h-full flex flex-col transition-all duration-300">
                {/* IMAGE */}
                <div className="h-40 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-2xl bg-card/70 backdrop-blur-sm flex items-center justify-center text-xl border border-border">
                      {item.emoji}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-accent text-accent" />)}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-foreground font-bold text-base leading-snug group-hover:text-primary transition-colors mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs">{tag}</span>
                    ))}
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-secondary text-center border border-border">
                      <p className="text-primary font-bold text-sm">{item.budget}</p>
                      <p className="text-muted-foreground text-xs mt-0.5 flex items-center justify-center gap-1"><DollarSign size={9} /> Budget</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary text-center border border-border">
                      <p className="text-accent font-bold text-sm">{item.timeline}</p>
                      <p className="text-muted-foreground text-xs mt-0.5 flex items-center justify-center gap-1"><Clock size={9} /> Timeline</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Users size={11} /> {item.applicants} applicants
                    </span>
                    <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-full text-xs font-semibold gradient-orange text-primary-foreground hover:opacity-90 transition flex items-center gap-1">
                      Apply Now <ChevronRight size={12} />
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
