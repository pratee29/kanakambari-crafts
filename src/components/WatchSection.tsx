import { Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const watchItems = [
  {
    title: "Successful Roadmap to UI UX ",
    instructor: "Alex Rivera",
    views: 12,
    category: "UX UI Design",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format",
    profileImage:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    title: "Perks of being a Data Scientist",
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

export default function WatchSection() {
  return (
    <section className="py-24 bg-[#070B24] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-orange-500/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold fontsize-[100px]">
              📍 WATCH 🤓
            </span>

            <p className="text-white/70 mt-6 text-lg">
              Sit back & watch real journeys.
            </p>
          </div>

          <button className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
            View all
          </button>
        </div>

        {/* CAROUSEL */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {watchItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="lg:basis-1/3 md:basis-1/2 px-6"
              >
                <div className="relative group">
                  {/* WHITE FRAME */}
                  <div className="absolute -inset-[6px] rounded-[28px] border-[3px] border-white" />

                  {/* PINK ACCENT */}
                  <div className="absolute -bottom-3 left-0 right-0 h-[100%] rounded-[28px] bg-[#FF5C8D] -z-10" />

                  {/* MAIN CARD */}
                  <div className="relative bg-[#0F172A] rounded-[28px] overflow-hidden">
                    {/* IMAGE */}
                    <div className="relative h-[160px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* PROFILE AVATAR (ONLY THIS CHANGES) */}
                      <img
                        src={item.profileImage}
                        alt={item.instructor}
                        className="absolute bottom-[-22px] right-6
                        w-14 h-14 rounded-full border-4 border-white
                        object-cover bg-white"
                      />

                      {/* CATEGORY */}
                      <span className="absolute top-4 left-4 px-5 py-1.5 rounded-full bg-[#FF9A3C] text-black text-sm font-semibold">
                        {item.category}
                      </span>

                      {/* VIEWS */}
                      <span className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-[#FFD84D] text-black text-sm font-semibold flex items-center gap-1">
                        <Eye size={14} /> {item.views}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 pt-8">
                      <h3 className="text-2xl font-semibold text-white leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-white/70 mt-3 text-lg">
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
