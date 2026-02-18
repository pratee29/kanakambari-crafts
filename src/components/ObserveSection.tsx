import { Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const observeItems = [
  {
    title: "Successful Roadmap to UI UX Design Journey",
    instructor: "Alex Rivera",
    views: 12,
    category: "UX UI Design",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format",
    profileImage:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    title: "Perks of being a Data Scientist in 2026",
    instructor: "Jhon Philips",
    views: 36,
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format",
    profileImage:
      "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    title: "How Animation with AI works?",
    instructor: "Rahul Pahariya",
    views: 50,
    category: "Animation with AI",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format",
    profileImage:
      "https://randomuser.me/api/portraits/men/68.jpg",
  },
];

export default function ObserveSection() {
  return (
    <section className="py-20 bg-[#0A0F2D] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-orange-500/10 blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-14">
          <div>
            <span className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 OBSERVE 🤓
            </span>

            <p className="text-white/70 mt-5 text-base">
              Sit back & observe real journeys.
            </p>
          </div>

          <button className="px-6 py-2 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
            View all
          </button>
        </div>

        {/* CAROUSEL */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {observeItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="lg:basis-1/3 md:basis-1/2 px-4"
              >
                <div className="relative group">
                  {/* WHITE FRAME */}
                  <div className="absolute -inset-[4px] rounded-[24px] border-[2px] border-white" />

                  {/* PINK ACCENT */}
                  <div className="absolute -bottom-2 left-0 right-0 h-[55%] rounded-[24px] bg-[#FF5C8D] -z-10" />

                  {/* MAIN CARD */}
                  <div className="relative bg-[#0F172A] rounded-[24px] overflow-hidden">
                    {/* IMAGE */}
                    <div className="relative h-[180px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* PROFILE AVATAR */}
                      <img
                        src={item.profileImage}
                        alt={item.instructor}
                        className="absolute bottom-[-18px] right-5
                        w-12 h-12 rounded-full border-4 border-white
                        object-cover bg-white"
                      />

                      {/* CATEGORY */}
                      <span className="absolute top-3 left-3 px-4 py-1 rounded-full bg-[#FF9A3C] text-black text-xs font-semibold">
                        {item.category}
                      </span>

                      {/* VIEWS */}
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#FFD84D] text-black text-xs font-semibold flex items-center gap-1">
                        <Eye size={13} /> {item.views}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 pt-8">
                      <h3 className="text-xl font-semibold text-white leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-white/70 mt-2 text-base">
                        With {item.instructor}
                      </p>
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
  );
}
