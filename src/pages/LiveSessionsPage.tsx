import { useState } from "react";
import { Users, Plus, ArrowLeft, Loader, Mic, MicOff, Video, VideoOff, MessageSquare, Heart, Send, Eye, Clock, Zap, X, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";

const liveRooms = [
  { title: "Python Masterclass", subtitle: "Advanced Data Structures & Algorithms", host: "Sarah Chen", avatar: "SC", users: 124, mode: "Discussion", tag: "Coding", duration: "2h 15m", isFree: true, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format" },
  { title: "UI/UX Design Bootcamp", subtitle: "Figma to Production Workflow", host: "Alex Rivera", avatar: "AR", users: 89, mode: "Learning", tag: "Design", duration: "1h 45m", isFree: false, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format" },
  { title: "Public Speaking Mastery", subtitle: "Confidence, Clarity & Stage Presence", host: "Priya Sharma", avatar: "PS", users: 156, mode: "Practice", tag: "Soft Skills", duration: "3h 00m", isFree: true, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format" },
  { title: "Android Dev Live", subtitle: "Building Real Apps with Jetpack Compose", host: "David Kim", avatar: "DK", users: 98, mode: "Observe", tag: "Development", duration: "2h 30m", isFree: false, image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&auto=format" },
  { title: "Machine Learning 101", subtitle: "Neural Networks from Scratch", host: "Aisha Patel", avatar: "AP", users: 203, mode: "Learning", tag: "AI/ML", duration: "1h 20m", isFree: true, image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format" },
  { title: "Startup Pitch Workshop", subtitle: "How to Raise Your First Round", host: "Marcus Lee", avatar: "ML", users: 67, mode: "Discussion", tag: "Business", duration: "45m", isFree: false, image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format" },
];

const chatMessages = [
  { user: "Rahul K", msg: "This session is amazing! 🔥", time: "2m" },
  { user: "Sneha M", msg: "Can you explain pointers again?", time: "1m" },
  { user: "Ankit S", msg: "Thanks for the live demo!", time: "45s" },
  { user: "Pooja R", msg: "When is the next session?", time: "30s" },
  { user: "Dev T", msg: "Mind blown 🤯", time: "10s" },
];

export default function LiveSessionsPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeRoom, setActiveRoom] = useState<typeof liveRooms[0] | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [liked, setLiked] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "", description: "", date: "", time: "", duration: "" });

  const canCreate = userProfile?.role === "CREATE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    try {
      setLoading(true);
      await addDoc(collection(db, "liveSessions"), {
        ...form,
        hostName: userProfile.fullName,
        hostUid: userProfile.uid,
        status: "scheduled",
        viewers: 0,
        createdAt: new Date().toISOString(),
      });
      alert("Live session created successfully!");
      setForm({ title: "", subject: "", description: "", date: "", time: "", duration: "" });
      setShowCreate(false);
    } catch (err) {
      console.error("Error creating live session:", err);
      alert("Failed to create session. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = (room: typeof liveRooms[0]) => {
    if (!room.isFree && userProfile?.role === "VIEW") {
      navigate("/subscription");
      return;
    }
    setActiveRoom(room);
  };

  // STREAM VIEW
  if (activeRoom) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-4 bg-card/80 border-b border-border backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveRoom(null)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <div>
              <h2 className="text-foreground font-bold text-sm sm:text-base">{activeRoom.title}</h2>
              <p className="text-muted-foreground text-xs">{activeRoom.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-destructive/20 border border-destructive/40 text-destructive px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <span className="w-1.5 h-1.5 bg-destructive rounded-full" /> LIVE
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Eye size={12} /> {activeRoom.users}
            </span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* VIDEO AREA */}
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 bg-card flex items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 px-6">
                <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6">🚀</motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold mb-4">
                  <Zap size={14} className="animate-pulse" /> Launching Soon
                </div>
                <h2 className="text-foreground text-3xl sm:text-4xl font-bold mb-3">{activeRoom.title}</h2>
                <p className="text-muted-foreground text-base mb-6">{activeRoom.subtitle}</p>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {activeRoom.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-sm font-medium">{activeRoom.host}</p>
                    <p className="text-muted-foreground text-xs">Host</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">Live streaming feature is coming very soon.<br />Stay tuned for an immersive learning experience!</p>
              </motion.div>

              {/* FLOATING REACTIONS */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                {["❤️", "🔥", "👏", "😮", "🎯"].map((emoji, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-secondary backdrop-blur-sm flex items-center justify-center text-lg hover:bg-secondary/80 transition">
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CONTROLS BAR */}
            <div className="flex items-center justify-center gap-4 py-4 px-6 bg-card/60 border-t border-border">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMicOn(!micOn)} className={`p-3 rounded-full transition ${micOn ? "gradient-orange text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCamOn(!camOn)} className={`p-3 rounded-full transition ${camOn ? "gradient-orange text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
                {camOn ? <Video size={20} /> : <VideoOff size={20} />}
              </motion.button>
              <button className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 transition"><MessageSquare size={20} /></button>
              <button onClick={() => setLiked(!liked)} className={`p-3 rounded-full transition ${liked ? "bg-destructive text-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
                <Heart size={20} className={liked ? "fill-current" : ""} />
              </button>
              <button onClick={() => setActiveRoom(null)} className="px-6 py-2.5 rounded-full bg-destructive text-foreground font-semibold text-sm hover:bg-destructive/90 transition ml-4">Leave</button>
            </div>
          </div>

          {/* CHAT SIDEBAR */}
          <div className="w-72 hidden lg:flex flex-col bg-card/60 border-l border-border">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" />
              <span className="text-foreground font-semibold text-sm">Live Chat</span>
              <span className="ml-auto text-muted-foreground text-xs">{activeRoom.users} watching</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full gradient-orange flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0">{c.user[0]}</div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-primary text-xs font-semibold">{c.user}</span>
                        <span className="text-muted-foreground text-[10px]">{c.time}</span>
                      </div>
                      <p className="text-foreground/80 text-sm">{c.msg}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Say something..." className="flex-1 bg-secondary border border-border text-foreground text-sm rounded-full px-3 py-2 placeholder:text-muted-foreground outline-none focus:border-primary/50" />
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

      {/* HERO SECTION */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-accent/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/20 border border-destructive/40 text-destructive text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" /> LIVE NOW
                  </motion.span>
                  <span className="text-muted-foreground text-sm">{liveRooms.reduce((a, r) => a + r.users, 0)}+ people watching</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
                  Live <span className="gradient-orange-text">Sessions</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-base">Real teachers. Real learning. No recordings.</p>
              </div>
            </div>
            {canCreate ? (
              <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full gradient-orange text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition glow-orange">
                <Plus size={18} /> Create Session
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
                <h2 className="text-xl font-bold text-foreground">🎙️ Create a Live Session</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition text-muted-foreground"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Session Title</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Python Masterclass" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Subject / Topic</label>
                  <Input name="subject" value={form.subject} onChange={handleChange} required placeholder="e.g. Web Development" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will you teach..." className="w-full bg-secondary border border-border text-foreground rounded-xl p-3 min-h-[80px] placeholder:text-muted-foreground outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Date</label>
                  <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Time</label>
                  <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Duration</label>
                  <Input name="duration" value={form.duration} onChange={handleChange} required placeholder="e.g. 1.5 hours" className="bg-secondary border-border text-foreground rounded-xl" />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={loading} className="w-full gradient-orange text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {loading ? "Creating..." : "🚀 Go Live"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SESSIONS GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveRooms.map((room, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
              onClick={() => handleJoin(room)}
            >
              <div className="relative rounded-3xl overflow-hidden border border-border hover:border-primary/30 bg-card transition-all duration-300">
                {/* IMAGE BANNER */}
                <div className="h-44 relative overflow-hidden">
                  <img src={room.image} alt={room.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  
                  {/* LIVE BADGE */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-card/70 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-destructive rounded-full" />
                    <span className="text-foreground text-xs font-bold">LIVE</span>
                  </div>
                  
                  {/* TAG */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-semibold border border-primary/30">
                    {room.tag}
                  </div>
                  
                  {/* AVATAR */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-bold text-sm border-2 border-card">
                      {room.avatar}
                    </div>
                    <span className="text-foreground text-sm font-medium drop-shadow-lg">{room.host}</span>
                  </div>
                  
                  {/* PLAN LOCK */}
                  {!room.isFree && userProfile?.role === "VIEW" && (
                    <div className="absolute inset-0 bg-card/60 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-1">🔒</div>
                        <p className="text-foreground text-xs font-semibold">Upgrade to Access</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CARD BODY */}
                <div className="p-5">
                  <h3 className="text-foreground font-bold text-base leading-snug mb-1 group-hover:text-primary transition-colors">{room.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{room.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1"><Users size={11} /> {room.users}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {room.duration}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                        !room.isFree && userProfile?.role === "VIEW"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "gradient-orange text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {!room.isFree && userProfile?.role === "VIEW" ? "Upgrade" : "Join Now →"}
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
