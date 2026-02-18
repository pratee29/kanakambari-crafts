import { useState } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    category: "Robotics",
    date: "Today",
    time: "6 PM",
  },
  {
    title: "Is AI-Generated Art the Future of Creativity?",
    speaker: "Emma Thompson",
    category: "Robotics",
    date: "Today",
    time: "6 PM",
  },
  {
    title: "Why Communication Skills Matter More Than Technical Skills",
    speaker: "Sarah Chen",
    category: "Robotics",
    date: "Today",
    time: "6 PM",
  },
  {
    title: "Why Communication Skills Matter More Than Technical Skills",
    speaker: "Sarah Chen",
    category: "Robotics",
    date: "Today",
    time: "6 PM",
  },
  {
    title: "Why Communication Skills Matter More Than Technical Skills",
    speaker: "Sarah Chen",
    category: "Robotics",
    date: "Today",
    time: "6 PM",
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
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 DISCUSS 🤓
            </span>

            <p className="text-white/70 mt-6 text-lg">
              Talk, ask & share freely
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userRole && (
              <button onClick={handleCreate} className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
                <Plus size={18} /> {userRole === 'CREATE' ? 'Create Discussion' : '🔒 Create (Upgrade)'}
              </button>
            )}
            <button onClick={() => navigate('/discuss')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
              View all
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="">
            {discussItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
              >
                {/* RESPONSIVE WRAPPER */}
                <div className="w-full max-w-[360px] flex justify-center">

                  {/* OUTER CIRCLE (PERFECT) */}
                  <div className="relative w-full max-w-[340px] aspect-square rounded-[600px_600px_1260px_600px] border-[3px] sm:border-[5px] bg-[conic-gradient(from_90deg,_#fb923c_0deg_180deg,_#ec4899_180deg_360deg)]
 flex items-center justify-center card card-hover">

                    {/* INNER CARD */}
                    <div className="w-[85%] aspect-square rounded-full bg-card p-4 sm:p-6 flex flex-col justify-between">

                      {/* CATEGORY */}
                      <div className="flex justify-center">
                        <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-xs sm:text-sm font-medium">
                          {item.category}
                        </span>
                      </div>

                      {/* CONTENT */}
                      <div className="text-center">
                        <h3 className="text-foreground text-base sm:text-lg font-semibold leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                          with {item.speaker}
                        </p>
                      </div>

                      {/* META */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange text-black text-xs sm:text-sm">
                          <Calendar size={12} /> {item.date}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange text-black text-xs sm:text-sm">
                          <Clock size={12} /> {item.time}
                        </span>
                      </div>

                      {/* CTA */}
                      <button className="w-full mt-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-pink-500 text-white font-medium text-sm hover:opacity-90 transition">
                        Join Discussion →
                      </button>

                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* ARROWS */}
          <CarouselPrevious className="-left-6 sm:-left-10 bg-orange text-black hover:opacity-90" />
          <CarouselNext className="-right-6 sm:-right-10 bg-orange text-black hover:opacity-90" />
        </Carousel>
      </div>
    </section>
    </>
  );
}
