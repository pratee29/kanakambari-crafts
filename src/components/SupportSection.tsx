import { useState } from "react";
import { Palette, FileText, Globe, Plus, DollarSign, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    emoji: "🎨",
    budget: "₹5k - ₹20k",
    timeline: "2–3 weeks",
    applicants: 14,
    gradient: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format",
    postedBy: "Creative Studio",
  },
  {
    title: "Write a Thesis",
    description: "Structured writing with clarity & originality.",
    icon: FileText,
    emoji: "📝",
    budget: "₹5k - ₹20k",
    timeline: "2–3 weeks",
    applicants: 8,
    gradient: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format",
    postedBy: "EdTech Platform",
  },
  {
    title: "Create a Webpage",
    description: "Simple, fast & modern web presence.",
    icon: Globe,
    emoji: "🌐",
    budget: "₹6k - ₹18k",
    timeline: "1-2 weeks",
    applicants: 22,
    gradient: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format",
    postedBy: "Startup Hub",
  },
  {
    title: "UI Review",
    description: "Get expert feedback on your product design.",
    icon: Palette,
    emoji: "🔍",
    budget: "₹3k - ₹10k",
    timeline: "1 week",
    applicants: 6,
    gradient: "from-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format",
    postedBy: "Design Agency",
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-start justify-between mb-16"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
                📍 SUPPORT 🤝
              </span>
              <p className="text-white/70 mt-6 text-lg">Get help, give help</p>
            </div>

            <div className="flex items-center gap-3">
              {userRole && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreate}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Plus size={18} /> {userRole === 'CREATE' ? 'Publish Work' : '🔒 Publish (Upgrade)'}
                </motion.button>
              )}
              <button onClick={() => navigate('/support')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
                View all
              </button>
            </div>
          </motion.div>

          {/* SLIDER with image-backed cards */}
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {supportItems.map((item, i) => (
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
                    onClick={() => navigate('/support')}
                  >
                    <div className="relative rounded-3xl overflow-hidden border border-white/10">
                      {/* IMAGE TOP */}
                      <div className="relative h-[140px] overflow-hidden">
                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`} />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

                        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                          <span className="text-2xl">{item.emoji}</span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-base drop-shadow-lg">{item.title}</h3>
                          <p className="text-white/60 text-xs mt-0.5">by {item.postedBy}</p>
                        </div>
                      </div>

                      {/* BODY */}
                      <div className="bg-[#0d1117] border-t border-white/5 p-4">
                        <p className="text-white/60 text-sm leading-relaxed mb-4">{item.description}</p>

                        <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-emerald-400 font-bold text-sm">{item.budget}</p>
                              <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><DollarSign size={8} /> Budget</p>
                            </div>
                            <div>
                              <p className="text-blue-400 font-bold text-sm">{item.timeline}</p>
                              <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><Clock size={8} /> Timeline</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-white/50 text-xs mb-3">📊 {item.applicants} applicants</p>

                        <button className={`w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${item.gradient} text-white hover:opacity-90 transition`}>
                          Apply Now →
                        </button>
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
