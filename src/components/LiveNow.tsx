import { useState } from "react";
import { Users, Plus, Eye, Play, Clock, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CreateLiveSessionModal from "./CreateLiveSessionModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const liveRooms = [
  {
    title: "Python Masterclass",
    subtitle: "Advanced Data Structures & Algorithms",
    host: "Sarah Chen",
    users: 124,
    mode: "Coding",
    gradient: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format",
    duration: "2h 15m",
    isFree: true,
    avatar: "SC",
  },
  {
    title: "UI/UX Design Workshop",
    subtitle: "Figma to Production Workflow",
    host: "Alex Rivera",
    users: 89,
    mode: "Design",
    gradient: "from-violet-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format",
    duration: "1h 45m",
    isFree: false,
    avatar: "AR",
  },
  {
    title: "Public Speaking Mastery",
    subtitle: "Confidence, Clarity & Stage Presence",
    host: "Priya Sharma",
    users: 156,
    mode: "Practice",
    gradient: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format",
    duration: "3h 00m",
    isFree: true,
    avatar: "PS",
  },
  {
    title: "Machine Learning 101",
    subtitle: "Neural Networks from Scratch",
    host: "Aisha Patel",
    users: 203,
    mode: "AI/ML",
    gradient: "from-rose-500 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format",
    duration: "1h 20m",
    isFree: true,
    avatar: "AP",
  },
];

export default function LiveNow({ userRole }: { userRole?: string }) {
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (userRole === 'CREATE') {
      navigate('/live-sessions');
    } else {
      navigate('/subscription');
    }
  };

  return (
    <>
      <CreateLiveSessionModal open={showCreate} onClose={() => setShowCreate(false)} />
      <section className="py-24 bg-[#070B24] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold"
                >
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" /> LIVE NOW
                </motion.span>
                <span className="text-white/40 text-sm">{liveRooms.reduce((a, r) => a + r.users, 0)}+ watching</span>
              </div>
              <h2 className="text-4xl font-black text-white">
                Live <span className="text-orange-400">Sessions</span>
              </h2>
              <p className="text-white/60 mt-2">Real teachers. Real learning. No recordings.</p>
            </div>

            <div className="flex items-center gap-3">
              {userRole && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreate}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Plus size={18} /> {userRole === 'CREATE' ? 'Create Session' : '🔒 Create (Upgrade)'}
                </motion.button>
              )}
              <button onClick={() => navigate('/live-sessions')} className="px-6 py-2 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition">
                View all
              </button>
            </div>
          </motion.div>

          {/* CAROUSEL with image cards */}
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {liveRooms.map((room, i) => (
                <CarouselItem key={i} className="lg:basis-1/3 md:basis-1/2 px-3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer"
                    onClick={() => navigate('/live-sessions')}
                  >
                    <div className="relative h-[280px] rounded-3xl overflow-hidden border border-white/10">
                      {/* BG IMAGE */}
                      <img src={room.image} alt={room.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-50`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                      {/* CONTENT */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                          <motion.span
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/30 backdrop-blur-sm border border-red-400/50 text-red-300 text-xs font-bold"
                          >
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> LIVE
                          </motion.span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/70 flex items-center gap-1">
                              <Clock size={10} /> {room.duration}
                            </span>
                            {!room.isFree && (
                              <span className="text-xs px-2 py-1 rounded-full bg-orange-500/30 backdrop-blur-sm border border-orange-400/50 text-orange-300">
                                PRO
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CENTER PLAY */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="self-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Play size={22} className="text-white fill-white ml-1" />
                        </motion.div>

                        {/* BOTTOM */}
                        <div>
                          <span className="px-2.5 py-1 rounded-full bg-orange-500/30 backdrop-blur-sm border border-orange-400/30 text-orange-300 text-xs font-medium mb-2 inline-block">{room.mode}</span>
                          <h3 className="text-white font-bold text-base leading-snug mb-1 drop-shadow-lg">{room.title}</h3>
                          <p className="text-white/60 text-xs mb-3">{room.subtitle}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${room.gradient} border-2 border-white/30 flex items-center justify-center text-white text-[10px] font-bold`}>
                                {room.avatar}
                              </div>
                              <span className="text-white/70 text-xs">{room.host}</span>
                            </div>
                            <span className="flex items-center gap-1 text-white/60 text-xs">
                              <Users size={11} /> {room.users}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-8 bg-orange-500 text-black hover:bg-orange-400 border-0" />
            <CarouselNext className="-right-8 bg-orange-500 text-black hover:bg-orange-400 border-0" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
