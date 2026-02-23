import { useState } from "react";
import { Plus, ArrowLeft, Loader, Users, Mic, MicOff, Video, VideoOff, MessageCircle, Send, X, Phone, Coffee, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

const bannerImages = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&auto=format",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format",
];

const pauseRooms = [
  { title: "Bollywood Gossip 🎬", subtitle: "Latest movie reviews, celeb news & industry talks", host: "Riya Patel", avatar: "RP", members: 234, type: "voice", active: true, tags: ["Gossip", "Movies", "Entertainment"], image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format" },
  { title: "Cricket Talk 🏏", subtitle: "Match analysis, predictions & fan banter", host: "Vikram Singh", avatar: "VS", members: 189, type: "video", active: true, tags: ["Cricket", "Sports", "IPL"], image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format" },
  { title: "Relationship Advice 💕", subtitle: "Open talk about dating, love & friendships", host: "Sneha Gupta", avatar: "SG", members: 312, type: "voice", active: true, tags: ["Relationships", "Love", "Advice"], image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format" },
  { title: "Late Night Chill 🌙", subtitle: "Random talks, memes & midnight vibes", host: "Arjun Mehta", avatar: "AM", members: 156, type: "voice", active: false, tags: ["Chill", "Night", "Random"], image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format" },
  { title: "Food & Travel Stories 🍕", subtitle: "Share your food adventures & travel tales", host: "Priya Nair", avatar: "PN", members: 98, type: "video", active: true, tags: ["Food", "Travel", "Stories"], image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format" },
  { title: "College Life Talks 🎓", subtitle: "Campus stories, exam stress & college fun", host: "Kabir Shah", avatar: "KS", members: 421, type: "voice", active: true, tags: ["College", "Students", "Fun"], image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&auto=format" },
];

export default function PausePage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRoom, setActiveRoom] = useState<typeof pauseRooms[0] | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [form, setForm] = useState({ title: "", description: "", type: "voice" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "pauseRooms"), {
        ...form, host: userProfile.fullName, hostUid: userProfile.uid,
        members: 0, active: true, createdAt: new Date().toISOString(),
      });
      alert("Room created successfully!");
      setForm({ title: "", description: "", type: "voice" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating room:", err);
      alert("Failed to create room. Try again.");
    } finally { setLoading(false); }
  };

  // ROOM VIEW (Voice/Video/Chat)
  if (activeRoom) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-card/80 border-b border-border backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveRoom(null)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
            <div><h2 className="text-foreground font-bold text-sm">{activeRoom.title}</h2><p className="text-muted-foreground text-xs">Hosted by {activeRoom.host} · {activeRoom.type === "voice" ? "🎤 Voice" : "📹 Video"} Room</p></div>
          </div>
          <div className="flex items-center gap-3">
            {activeRoom.active && <span className="flex items-center gap-1.5 bg-primary/20 border border-primary/40 text-primary px-3 py-1 rounded-full text-xs font-bold"><span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> ACTIVE</span>}
            <span className="flex items-center gap-1 text-muted-foreground text-xs"><Users size={12} /> {activeRoom.members}</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 flex items-center justify-center min-h-[400px] bg-card">
              <div className="absolute inset-0">
                <img src={activeRoom.image} alt="" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6">☕</motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold mb-4">🚀 Launching Soon</div>
                <h2 className="text-foreground text-2xl sm:text-3xl font-bold mb-3">{activeRoom.title}</h2>
                <p className="text-muted-foreground text-sm mb-6">{activeRoom.subtitle}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold text-sm">{activeRoom.avatar}</div>
                  <div className="text-left"><p className="text-foreground text-sm font-medium">{activeRoom.host}</p><p className="text-muted-foreground text-xs">Host</p></div>
                </div>
                <p className="text-muted-foreground/60 text-sm">Voice & video rooms are coming very soon!</p>
              </motion.div>
            </div>
            <div className="flex items-center justify-center gap-4 py-4 px-6 bg-card/60 border-t border-border">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMicOn(!micOn)} className={`p-3 rounded-full transition ${micOn ? "gradient-orange text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{micOn ? <Mic size={20} /> : <MicOff size={20} />}</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCamOn(!camOn)} className={`p-3 rounded-full transition ${camOn ? "gradient-orange text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{camOn ? <Video size={20} /> : <VideoOff size={20} />}</motion.button>
              <button className="p-3 rounded-full bg-secondary text-muted-foreground"><MessageCircle size={20} /></button>
              <button onClick={() => setActiveRoom(null)} className="px-6 py-2.5 rounded-full bg-destructive text-foreground font-semibold text-sm hover:bg-destructive/90 transition ml-4">Leave</button>
            </div>
          </div>
          <div className="w-72 hidden lg:flex flex-col bg-card/60 border-l border-border">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2"><MessageCircle size={16} className="text-primary" /><span className="text-foreground font-semibold text-sm">Room Chat</span></div>
            <div className="flex-1 p-4 flex items-center justify-center"><p className="text-muted-foreground text-sm text-center">Chat feature coming soon! 💬</p></div>
            <div className="p-3 border-t border-border"><div className="flex gap-2"><input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Say something..." className="flex-1 bg-secondary border border-border text-foreground text-sm rounded-full px-3 py-2 placeholder:text-muted-foreground outline-none" /><button className="p-2 rounded-full gradient-orange text-primary-foreground"><Send size={14} /></button></div></div>
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
        title="Pause &"
        titleHighlight="Chill"
        subtitle="Gossip, general talks, fun conversations — join voice & video rooms!"
        badge={{ icon: <Coffee size={11} />, text: "Hangout Zone" }}
        stats={`${pauseRooms.reduce((a, r) => a + r.members, 0)}+ people chatting`}
        images={bannerImages}
        rightContent={
          canCreate ? (
            <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition glow-orange"><Plus size={18} /> Create Room</button>
          ) : (
            <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 text-primary font-semibold flex items-center gap-2 hover:bg-card transition">🔒 Upgrade to Create</button>
          )
        }
      />

      {/* CREATE FORM */}
      <AnimatePresence>
        {showCreate && canCreate && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="max-w-7xl mx-auto px-6 mb-8">
            <div className="card-glass rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-foreground">☕ Create a Chill Room</h2><button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition text-muted-foreground"><X size={18} /></button></div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div><label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Room Title</label><Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Bollywood Gossip Night" className="bg-secondary border-border text-foreground rounded-xl" /></div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Room Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="w-full bg-secondary border border-border text-foreground rounded-xl p-3 outline-none">
                    <option value="voice">🎤 Voice Room</option>
                    <option value="video">📹 Video Room</option>
                  </select>
                </div>
                <div className="md:col-span-2"><label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Description</label><textarea name="description" value={form.description} onChange={handleChange} required placeholder="What's the vibe..." className="w-full bg-secondary border border-border text-foreground rounded-xl p-3 min-h-[80px] placeholder:text-muted-foreground outline-none" /></div>
                <div className="md:col-span-2"><Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">{loading && <Loader className="w-4 h-4 animate-spin" />}{loading ? "Creating..." : "☕ Create Room"}</Button></div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROOMS GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pauseRooms.map((room, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8, scale: 1.02 }} className="group cursor-pointer" onClick={() => setActiveRoom(room)}>
              <div className="relative rounded-3xl overflow-hidden border border-border hover:border-primary/30 bg-card transition-all duration-300 h-full hover:shadow-xl hover:shadow-primary/10">
                <div className="h-44 relative overflow-hidden">
                  <img src={room.image} alt={room.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-card/70 backdrop-blur-sm text-foreground text-xs font-medium border border-border">
                      {room.type === "voice" ? "🎤 Voice" : "📹 Video"}
                    </span>
                  </div>
                  {room.active && (
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-semibold border border-primary/30">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Active
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold text-sm border-2 border-card">{room.avatar}</div>
                    <span className="text-foreground text-sm font-medium drop-shadow-lg">{room.host}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-foreground font-bold text-base leading-snug mb-1 group-hover:text-primary transition-colors">{room.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{room.subtitle}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">{room.tags.map((tag, t) => (<span key={t} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs">{tag}</span>))}</div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1"><Users size={11} /> {room.members} people</span>
                      <span className="flex items-center gap-1">{room.type === "voice" ? <Phone size={11} /> : <Video size={11} />} {room.type}</span>
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

      <Footer />
    </div>
  );
}
