import { useState } from "react";
import { Users, Plus } from "lucide-react";
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
    title: "Python",
    subtitle: "Coding",
    host: "Sarah Chen",
    users: 124,
    mode: "Discussion",
    gradient: "from-[#E6B800] via-[#E89A3C] to-[#D66B6B]",
  },
  {
    title: "UI Design",
    subtitle: "Workshop",
    host: "Alex Rivera",
    users: 89,
    mode: "Learning",
    gradient: "from-[#7F00FF] via-[#9F44FF] to-[#C77DFF]",
  },
  {
    title: "Public",
    subtitle: "Speaking",
    host: "Priya Sharma",
    users: 156,
    mode: "Practice",
    gradient: "from-[#FF512F] via-[#F09819] to-[#FFD200]",
  },
  {
    title: "Android Dev",
    subtitle: "Live Coding",
    host: "David Kim",
    users: 98,
    mode: "Observe",
    gradient: "from-[#FF512F] via-[#F09819] to-[#FFD200]",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
    },
  }),
};

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

        {/* HEADER
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1410] border border-orange-400/30 text-orange-400 font-semibold">
              🔴 LIVE NOW 
            </span>

            <p className="text-white/70 mt-6 text-lg">
              People talking. Ideas flowing. No scripts.
            </p>
          </div>

          <button className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
            View all
          </button>
        </div> */}


         <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white">
             🔴 Live <span className="text-orange-400">Now</span>
            </h2>
            <p className="text-white/60 mt-2">
              People talking. Ideas flowing. No scripts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userRole && (
              <button onClick={handleCreate} className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
                <Plus size={18} /> {userRole === 'CREATE' ? 'Create Live Session' : '🔒 Create (Upgrade)'}
              </button>
            )}
            <button onClick={() => navigate('/live-sessions')} className="px-6 py-2 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition">
              View all
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="">
            {liveRooms.map((room, i) => (
              <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center">
                <div className="w-full max-w-[360px] flex justify-center">
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full"
                  >
                    <div
                      className={`h-20 sm:h-24 rounded-full px-3 sm:px-5
                      bg-gradient-to-r ${room.gradient}
                      flex items-center justify-between
                      shadow-lg hover:shadow-2xl
                      transition-all duration-300
                      transform hover:scale-105
                      cursor-pointer gap-2`}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      {/* LIVE */}
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-1 text-xs bg-black/30 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white font-medium whitespace-nowrap text-[11px] sm:text-xs"
                      >
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-300 rounded-full"
                        />
                        LIVE
                      </motion.span>

                      {/* TITLE & SUBTITLE */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white text-sm sm:text-2xl font-bold leading-tight truncate">
                          {room.title}
                        </h3>
                        <p className="text-white/80 text-xs leading-tight truncate">
                          {room.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-1.5 sm:gap-2 ml-1 flex-shrink-0">
                      <span className="flex items-center gap-0.5 sm:gap-1 bg-[#6B4A2D] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                        <Users size={10} className="sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">{room.users}</span>
                        <span className="sm:hidden text-[10px]">{room.users}</span>
                      </span>

                      <span className="bg-orange-400/90 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                        {room.mode}
                      </span>
                    </div>
                    </div>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-6 sm:-left-10 bg-orange-500 text-black hover:opacity-90 border-0" />
          <CarouselNext className="-right-6 sm:-right-10 bg-orange-500 text-black hover:opacity-90 border-0" />
        </Carousel>
      </div>
    </section>
    </>
  );
}
