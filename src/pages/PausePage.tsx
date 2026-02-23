import { useState } from "react";
import { Eye, Plus, ArrowLeft, Loader, Play, X, Headphones, Wind, Music, Leaf, Moon, Waves, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const pauseItems = [
  { title: "Meditation for Deep Focus", subtitle: "10-minute guided session to clear your mind", views: 5600, duration: "10 min", type: "Meditation", emoji: "🧘", icon: Moon, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format" },
  { title: "Forest Sounds & Rain", subtitle: "Immersive nature soundscape for relaxation", views: 8200, duration: "25 min", type: "Nature", emoji: "🌲", icon: Leaf, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format" },
  { title: "4-7-8 Breathing Exercise", subtitle: "Calm your nervous system in minutes", views: 4300, duration: "8 min", type: "Breathing", emoji: "💨", icon: Wind, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format" },
  { title: "Lo-Fi Study Beats", subtitle: "Chill music to help you focus and relax", views: 9100, duration: "60 min", type: "Music", emoji: "🎵", icon: Music, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format" },
  { title: "Ocean Waves Relaxation", subtitle: "Let the waves wash your stress away", views: 6700, duration: "20 min", type: "Nature", emoji: "🌊", icon: Waves, image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format" },
  { title: "Body Scan & Sleep Prep", subtitle: "Wind down before sleep with this guided session", views: 7800, duration: "15 min", type: "Sleep", emoji: "🌙", icon: Headphones, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format" },
];

export default function PausePage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<typeof pauseItems[0] | null>(null);
  const [form, setForm] = useState({ title: "", description: "", type: "", imageUrl: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "pauseContent"), {
        ...form, createdBy: userProfile.fullName, creatorUid: userProfile.uid,
        views: 0, createdAt: new Date().toISOString(),
      });
      alert("Pause content created successfully!");
      setForm({ title: "", description: "", type: "", imageUrl: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating pause content:", err);
      alert("Failed to create. Try again.");
    } finally { setLoading(false); }
  };

  // PLAYER VIEW
  if (activeItem) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={activeItem.image} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative flex items-center justify-between px-6 py-5">
          <button onClick={() => setActiveItem(null)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="px-4 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium border border-border">{activeItem.type}</span>
          <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity }} className="text-8xl mb-8">{activeItem.emoji}</motion.div>
          <h2 className="text-foreground text-3xl font-bold mb-2">{activeItem.title}</h2>
          <p className="text-muted-foreground text-base mb-8">{activeItem.subtitle}</p>

          {/* WAVEFORM */}
          <div className="flex items-end gap-1 h-12 mb-8">
            {Array.from({ length: 32 }, (_, i) => (
              <motion.div key={i} animate={{ height: [`${20 + Math.random() * 30}px`, `${30 + Math.random() * 40}px`, `${20 + Math.random() * 30}px`] }} transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }} className="w-1.5 bg-gradient-to-t from-primary to-accent rounded-full opacity-70" />
            ))}
          </div>

          <div className="flex items-center gap-4 text-muted-foreground text-sm mb-10">
            <span>0:00</span>
            <div className="flex-1 max-w-xs h-1 bg-secondary rounded-full">
              <div className="w-1/4 h-full gradient-orange rounded-full" />
            </div>
            <span>{activeItem.duration}</span>
          </div>

          <div className="card-glass rounded-3xl px-8 py-6 max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold mb-3">
              🚀 Audio Player — Launching Soon
            </div>
            <p className="text-muted-foreground text-sm">Our immersive audio experience is being crafted. <br />You'll love it when it's live!</p>
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
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold">
                    🌙 Calm & Relaxation
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
                  Pause & <span className="gradient-orange-text">Recharge</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-base">Take a breath. You deserve it.</p>
              </div>
            </div>

            {canCreate ? (
              <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition glow-orange">
                <Plus size={18} /> Upload Content
              </button>
            ) : (
              <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-secondary border border-primary/30 text-primary font-semibold flex items-center gap-2 hover:bg-secondary/80 transition">
                🔒 Upgrade to Upload
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
                <h2 className="text-xl font-bold text-foreground">🧘 Upload Pause Content</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition text-muted-foreground"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Title</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Meditation for Focus" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Type</label>
                  <Input name="type" value={form.type} onChange={handleChange} required placeholder="e.g. Meditation, Music, Nature" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the content..." className="w-full bg-secondary border border-border text-foreground rounded-xl p-3 min-h-[80px] placeholder:text-muted-foreground outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Cover Image URL (optional)</label>
                  <Input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {loading ? "Uploading..." : "🌙 Publish Content"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAUSE CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pauseItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group cursor-pointer" onClick={() => setActiveItem(item)}>
              <div className="relative h-[320px] rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-card/70 backdrop-blur-sm text-foreground text-xs font-medium border border-border">{item.type}</span>
                    <span className="flex items-center gap-1.5 text-foreground/60 text-xs bg-card/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Eye size={11} /> {(item.views / 1000).toFixed(1)}k
                    </span>
                  </div>

                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="self-center w-14 h-14 rounded-full gradient-orange flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity glow-orange">
                    <Play size={22} className="text-primary-foreground fill-primary-foreground ml-1" />
                  </motion.div>

                  <div>
                    <div className="flex items-center gap-2 text-foreground/60 text-xs mb-2"><span>{item.duration}</span></div>
                    <h3 className="text-foreground text-lg font-bold leading-snug">{item.title}</h3>
                    <p className="text-foreground/60 text-sm mt-1">{item.subtitle}</p>
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
