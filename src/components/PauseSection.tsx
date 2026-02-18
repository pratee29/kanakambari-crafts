import { useState } from "react";
import { Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    title: "Meditation for Focus",
    views: 5600,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format",
  },
  {
    title: "Nature Sounds",
    views: 8200,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format",
  },
  {
    title: "Breathing Exercises",
    views: 4300,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format",
  },
  {
    title: "Calming Music",
    views: 9100,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format",
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
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 PAUSE 🧘
            </span>

            <p className="text-white/70 mt-6 text-lg">
              Refresh, relax & reset your mind
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userRole && (
              <button onClick={handleCreate} className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
                <Plus size={18} /> {userRole === 'CREATE' ? 'Create Pause Content' : '🔒 Create (Upgrade)'}
              </button>
            )}
            <button onClick={() => navigate('/pause')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
              View all
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {pauseItems.map((item, index) => (
              <CarouselItem
                key={index}
                className="lg:basis-1/3 md:basis-1/2 px-6"
              >
                {/* CARD */}
                <div className="relative h-[260px] rounded-[28px] overflow-hidden group cursor-pointer">

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                      <Eye size={14} />
                      <span>{(item.views / 1000).toFixed(1)}k views</span>
                    </div>

                    <h3 className="text-xl font-semibold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
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
