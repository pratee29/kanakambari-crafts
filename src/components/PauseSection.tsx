import { useState } from "react";
import { Eye, Plus, Play, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CreatePauseContentModal from "./CreatePauseContentModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const pauseItems = [
  {
    title: "Meditation for Deep Focus",
    subtitle: "10-minute guided session",
    duration: "10 min",
    type: "Meditation",
    emoji: "🧘",
    views: 5600,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format",
    gradient: "from-indigo-900/80 to-violet-900/80",
  },
  {
    title: "Forest Sounds & Rain",
    subtitle: "Immersive nature soundscape",
    duration: "25 min",
    type: "Nature",
    emoji: "🌲",
    views: 8200,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format",
    gradient: "from-emerald-900/80 to-teal-900/80",
  },
  {
    title: "4-7-8 Breathing Exercise",
    subtitle: "Calm your nervous system",
    duration: "8 min",
    type: "Breathing",
    emoji: "💨",
    views: 4300,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format",
    gradient: "from-cyan-900/80 to-blue-900/80",
  },
  {
    title: "Lo-Fi Study Beats",
    subtitle: "Chill music to focus and relax",
    duration: "60 min",
    type: "Music",
    emoji: "🎵",
    views: 9100,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format",
    gradient: "from-amber-900/80 to-orange-900/80",
  },
];

export default function PauseSection({ userRole }: { userRole?: string }) {
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (userRole === 'CREATE') {
      navigate('/pause');
    } else {
      navigate('/subscription');
    }
  };

  return (
    <>
      <CreatePauseContentModal open={showCreate} onClose={() => setShowCreate(false)} />
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
                📍 PAUSE 🧘
              </span>
              <p className="text-white/70 mt-6 text-lg">Refresh, relax & reset your mind</p>
            </div>

            <div className="flex items-center gap-3">
              {userRole && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreate}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Plus size={18} /> {userRole === 'CREATE' ? 'Create Pause Content' : '🔒 Create (Upgrade)'}
                </motion.button>
              )}
              <button onClick={() => navigate('/pause')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
                View all
              </button>
            </div>
          </motion.div>

          {/* SLIDER */}
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {pauseItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="lg:basis-1/3 md:basis-1/2 px-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group cursor-pointer"
                    onClick={() => navigate('/pause')}
                  >
                    <div className="relative h-[280px] rounded-3xl overflow-hidden border border-white/10">
                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* GRADIENT OVERLAY */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* CONTENT */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">{item.type}</span>
                          <span className="flex items-center gap-1.5 text-white/60 text-xs">
                            <Eye size={11} /> {(item.views / 1000).toFixed(1)}k
                          </span>
                        </div>

                        {/* CENTER EMOJI */}
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          className="self-center text-5xl"
                        >
                          {item.emoji}
                        </motion.div>

                        {/* CENTER PLAY */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="self-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-12"
                        >
                          <Play size={18} className="text-white fill-white ml-0.5" />
                        </motion.div>

                        {/* BOTTOM */}
                        <div>
                          <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                            <Clock size={11} />
                            <span>{item.duration}</span>
                          </div>
                          <h3 className="text-white text-base font-bold leading-snug">{item.title}</h3>
                          <p className="text-white/60 text-xs mt-1">{item.subtitle}</p>
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
