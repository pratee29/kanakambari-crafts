import { useState } from "react";
import { Palette, FileText, Globe, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateSupportWorkModal from "./CreateSupportWorkModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const supportItems = [
  {
    title: "Create a Logo",
    description: "Need a visual identity? Let's figure it out together.",
    icon: Palette,
    budget: "₹5k - ₹20k",
    timeline: "2–3 weeks",
  },
  {
    title: "Write a Thesis",
    description: "Structured writing with clarity & originality.",
    icon: FileText,
    budget: "₹5k - ₹20k",
    timeline: "2–3 weeks",
  },
  {
    title: "Create a Webpage",
    description: "Simple, fast & modern web presence.",
    icon: Globe,
    budget: "₹5k - ₹20k",
    timeline: "2–3 weeks",
  },
  {
    title: "UI Review",
    description: "Get expert feedback on your product design.",
    icon: Palette,
    budget: "₹3k - ₹10k",
    timeline: "1 week",
  },
];

export default function SupportSection({ userRole }: { userRole?: string }) {
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (userRole === 'CREATE') {
      navigate('/support');
    } else {
      navigate('/subscription');
    }
  };

  return (
    <>
    <CreateSupportWorkModal open={showCreate} onClose={() => setShowCreate(false)} />
    <section className="py-24 bg-[#0A0F2D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 SUPPORT 🤝
            </span>

            <p className="text-white/70 mt-6 text-lg">
              Get help, give help
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userRole && (
              <button onClick={handleCreate} className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition">
                <Plus size={18} /> {userRole === 'CREATE' ? 'Publish Work' : '🔒 Publish (Upgrade)'}
              </button>
            )}
            <button onClick={() => navigate('/support')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
              View all
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {supportItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="lg:basis-1/3 md:basis-1/2 px-6"
              >
                {/* CARD */}
                <div
                  className="
                    h-[300px]
                    rounded-[32px]
                    p-6
                    bg-gradient-to-b from-[#9B5E33] via-[#A8683A] to-[#C87A2F]
                    flex flex-col justify-between
                  "
                >
                  {/* ICON */}
                  <div className="w-14 h-14 rounded-xl bg-[#D8754A] flex items-center justify-center">
                    <item.icon size={26} className="text-white" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* META */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span>Budget</span>
                      <span className="text-yellow-300 font-medium">
                        {item.budget}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span>Timeline</span>
                      <span>{item.timeline}</span>
                    </div>
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
