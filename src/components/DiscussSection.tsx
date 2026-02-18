import { useState } from "react";
import { Calendar, Clock, Plus, Mic, MicOff, Users, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CreateDiscussionModal from "./CreateDiscussionModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const discussItems = [
  {
    title: "Will AI-Powered Robots Replace Human Jobs?",
    speaker: "Dr. James Martinez",
    category: "🤖 AI & Future",
    date: "Today", time: "6 PM", members: 234, active: true,
    gradient: "from-violet-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format",
    avatar: "JM",
  },
  {
    title: "Is AI-Generated Art the Future of Creativity?",
    speaker: "Emma Thompson",
    category: "🎨 Art & AI",
    date: "Today", time: "7 PM", members: 189, active: true,
    gradient: "from-orange-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format",
    avatar: "ET",
  },
  {
    title: "Why Communication Skills Matter More Than Tech",
    speaker: "Sarah Chen",
    category: "💼 Career Growth",
    date: "Tomorrow", time: "5 PM", members: 312, active: false,
    gradient: "from-emerald-600 to-teal-600",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format",
    avatar: "SC",
  },
  {
    title: "The Future of Web3 and Decentralization",
    speaker: "Raj Patel",
    category: "⛓️ Web3",
    date: "Tomorrow", time: "8 PM", members: 156, active: false,
    gradient: "from-blue-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format",
    avatar: "RP",
  },
  {
    title: "Mental Health in the Age of Social Media",
    speaker: "Dr. Priya Nair",
    category: "🧠 Wellness",
    date: "This Week", time: "6 PM", members: 421, active: true,
    gradient: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format",
    avatar: "PN",
  },
];

export default function DiscussSection({ userRole }: { userRole?: string }) {
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (userRole === 'CREATE') {
      navigate('/discuss');
    } else {
      navigate('/subscription');
    }
  };

  return (
    <>
      <CreateDiscussionModal open={showCreate} onClose={() => setShowCreate(false)} />
      <section className="py-24 bg-[#070B24] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-start justify-between mb-16"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
                📍 DISCUSS 🤓
              </span>
              <p className="text-white/70 mt-6 text-lg">Talk, ask & share freely</p>
            </div>

            <div className="flex items-center gap-3">
              {userRole && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreate}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Plus size={18} /> {userRole === 'CREATE' ? 'Create Discussion' : '🔒 Create (Upgrade)'}
                </motion.button>
              )}
              <button onClick={() => navigate('/discuss')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
                View all
              </button>
            </div>
          </motion.div>

          {/* SLIDER with image cards */}
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {discussItems.map((item, i) => (
                <CarouselItem
                  key={i}
                  className="lg:basis-1/3 md:basis-1/2 px-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer"
                    onClick={() => navigate('/discuss')}
                  >
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 h-[260px]">
                      {/* BG IMAGE */}
                      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-55`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                      {/* CONTENT */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">{item.category}</span>
                          {item.active && (
                            <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/50 backdrop-blur-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-green-400 text-xs font-semibold">ACTIVE</span>
                            </div>
                          )}
                        </div>

                        {/* BOTTOM */}
                        <div>
                          <h3 className="text-white font-bold text-base leading-snug mb-3 drop-shadow-lg">{item.title}</h3>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold`}>
                                {item.avatar}
                              </div>
                              <div>
                                <p className="text-white/90 text-xs font-medium">{item.speaker}</p>
                                <div className="flex items-center gap-2 text-white/50 text-xs">
                                  <span className="flex items-center gap-1"><Clock size={9} /> {item.time}</span>
                                  <span className="flex items-center gap-1"><Users size={9} /> {item.members}</span>
                                </div>
                              </div>
                            </div>

                            <button className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${item.gradient} text-white hover:opacity-90 transition`}>
                              Join →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-8 bg-orange-500 text-black hover:bg-orange-400" />
            <CarouselNext className="-right-8 bg-orange-500 text-black hover:bg-orange-400" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
