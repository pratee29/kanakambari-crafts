import { useState } from "react";
import { Users, Plus, ArrowLeft, Loader, Mic, MicOff, Video, VideoOff, MessageSquare, Heart, Send, Radio, Eye, Clock, Zap, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";

const liveRooms = [
  { title: "Python Masterclass", subtitle: "Advanced Data Structures & Algorithms", host: "Sarah Chen", avatar: "SC", users: 124, mode: "Discussion", gradient: "from-amber-500 via-orange-500 to-red-500", tag: "Coding", duration: "2h 15m", isFree: true },
  { title: "UI/UX Design Bootcamp", subtitle: "Figma to Production Workflow", host: "Alex Rivera", avatar: "AR", users: 89, mode: "Learning", gradient: "from-violet-600 via-purple-500 to-pink-500", tag: "Design", duration: "1h 45m", isFree: false },
  { title: "Public Speaking Mastery", subtitle: "Confidence, Clarity & Stage Presence", host: "Priya Sharma", avatar: "PS", users: 156, mode: "Practice", gradient: "from-emerald-500 via-teal-500 to-cyan-500", tag: "Soft Skills", duration: "3h 00m", isFree: true },
  { title: "Android Dev Live", subtitle: "Building Real Apps with Jetpack Compose", host: "David Kim", avatar: "DK", users: 98, mode: "Observe", gradient: "from-blue-600 via-indigo-500 to-violet-500", tag: "Development", duration: "2h 30m", isFree: false },
  { title: "Machine Learning 101", subtitle: "Neural Networks from Scratch", host: "Aisha Patel", avatar: "AP", users: 203, mode: "Learning", gradient: "from-rose-500 via-pink-500 to-fuchsia-500", tag: "AI/ML", duration: "1h 20m", isFree: true },
  { title: "Startup Pitch Workshop", subtitle: "How to Raise Your First Round", host: "Marcus Lee", avatar: "ML", users: 67, mode: "Discussion", gradient: "from-yellow-500 via-orange-400 to-amber-500", tag: "Business", duration: "45m", isFree: false },
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
      <div className="min-h-screen bg-[#070B24] flex flex-col">
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveRoom(null)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h2 className="text-white font-bold text-sm sm:text-base">{activeRoom.title}</h2>
              <p className="text-white/50 text-xs">{activeRoom.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> LIVE
            </span>
            <span className="flex items-center gap-1 text-white/60 text-xs">
              <Eye size={12} /> {activeRoom.users}
            </span>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-1 overflow-hidden">
          {/* VIDEO AREA */}
          <div className="flex-1 flex flex-col">
            {/* STREAM SCREEN */}
            <div className="relative flex-1 bg-gradient-to-br from-[#0d1117] to-[#161b22] flex items-center justify-center min-h-[400px]">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeRoom.gradient} opacity-10`} />

              {/* LAUNCHING SOON */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center z-10 px-6"
              >
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-7xl mb-6"
                >
                  🚀
                </motion.div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-sm font-semibold mb-4">
                  <Zap size={14} className="animate-pulse" /> Launching Soon
                </div>
                <h2 className="text-white text-3xl sm:text-4xl font-bold mb-3">{activeRoom.title}</h2>
                <p className="text-white/60 text-base mb-6">{activeRoom.subtitle}</p>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    {activeRoom.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">{activeRoom.host}</p>
                    <p className="text-white/50 text-xs">Host</p>
                  </div>
                </div>
                <p className="text-white/40 text-sm">Live streaming feature is coming very soon.<br />Stay tuned for an immersive learning experience!</p>
              </motion.div>

              {/* FLOATING REACTIONS */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                {["❤️", "🔥", "👏", "😮", "🎯"].map((emoji, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLiked(!liked)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg hover:bg-white/20 transition"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CONTROLS BAR */}
            <div className="flex items-center justify-center gap-4 py-4 px-6 bg-black/40 border-t border-white/10">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-full transition ${micOn ? "bg-orange-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setCamOn(!camOn)}
                className={`p-3 rounded-full transition ${camOn ? "bg-orange-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
              >
                {camOn ? <Video size={20} /> : <VideoOff size={20} />}
              </motion.button>
              <button className="p-3 rounded-full bg-white/10 text-white/60 hover:bg-white/20 transition">
                <MessageSquare size={20} />
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full transition ${liked ? "bg-red-500 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
              >
                <Heart size={20} className={liked ? "fill-current" : ""} />
              </button>
              <button
                onClick={() => setActiveRoom(null)}
                className="px-6 py-2.5 rounded-full bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition ml-4"
              >
                Leave
              </button>
            </div>
          </div>

          {/* CHAT SIDEBAR */}
          <div className="w-72 hidden lg:flex flex-col bg-black/40 border-l border-white/10">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <MessageSquare size={16} className="text-orange-400" />
              <span className="text-white font-semibold text-sm">Live Chat</span>
              <span className="ml-auto text-white/40 text-xs">{activeRoom.users} watching</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                      {c.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-orange-400 text-xs font-semibold">{c.user}</span>
                        <span className="text-white/30 text-[10px]">{c.time}</span>
                      </div>
                      <p className="text-white/80 text-sm">{c.msg}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  placeholder="Say something..."
                  className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-full px-3 py-2 placeholder:text-white/30 outline-none focus:border-orange-500/50"
                />
                <button className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-400 transition">
                  <Send size={14} />
                </button>
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

      {/* HERO SECTION */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/homepage")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold"
                  >
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" /> LIVE NOW
                  </motion.span>
                  <span className="text-white/40 text-sm">{liveRooms.reduce((a, r) => a + r.users, 0)}+ people watching</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  Live <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Sessions</span>
                </h1>
                <p className="text-white/50 mt-2 text-base">Real teachers. Real learning. No recordings.</p>
              </div>
            </div>
            {canCreate ? (
              <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-orange-500/30">
                <Plus size={18} /> Create Session
              </button>
            ) : (
              <button onClick={() => navigate("/subscription")} className="px-6 py-3 rounded-full bg-white/5 border border-orange-400/30 text-orange-400 font-semibold flex items-center gap-2 hover:bg-white/10 transition">
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
            <div className="bg-white/5 border border-orange-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">🎙️ Create a Live Session</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white/60">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Session Title</label>
                  <Input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Python Masterclass" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Subject / Topic</label>
                  <Input name="subject" value={form.subject} onChange={handleChange} required placeholder="e.g. Web Development" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required placeholder="What will you teach..." className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 min-h-[80px] placeholder:text-white/30 outline-none focus:border-orange-500/50" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Date</label>
                  <Input type="date" name="date" value={form.date} onChange={handleChange} required className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Time</label>
                  <Input type="time" name="time" value={form.time} onChange={handleChange} required className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block uppercase tracking-wider">Duration</label>
                  <Input name="duration" value={form.duration} onChange={handleChange} required placeholder="e.g. 1.5 hours" className="bg-white/5 border-white/10 text-white rounded-xl" />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90">
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
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/3 backdrop-blur-sm">
                {/* GRADIENT BANNER */}
                <div className={`h-36 bg-gradient-to-br ${room.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  {/* LIVE BADGE */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-white text-xs font-bold">LIVE</span>
                  </div>
                  {/* TAG */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                    {room.tag}
                  </div>
                  {/* AVATAR */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm border border-white/30">
                      {room.avatar}
                    </div>
                    <span className="text-white text-sm font-medium">{room.host}</span>
                  </div>
                  {/* PLAN LOCK */}
                  {!room.isFree && userProfile?.role === "VIEW" && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl mb-1">🔒</div>
                        <p className="text-white text-xs font-semibold">Upgrade to Access</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CARD BODY */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base leading-snug mb-1">{room.title}</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{room.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span className="flex items-center gap-1"><Users size={11} /> {room.users}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {room.duration}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                        !room.isFree && userProfile?.role === "VIEW"
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:opacity-90"
                      }`}
                    >
                      {!room.isFree && userProfile?.role === "VIEW" ? "Upgrade" : "Join Now →"}
                    </motion.button>
                  </div>
                </div>

                {/* HOVER GLOW */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${room.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
