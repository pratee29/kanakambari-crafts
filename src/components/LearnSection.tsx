import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const learnItems = [
  {
    title: "Motion Graphics",
    subtitle: "Create stunning animations",
    instructor: "Rahul Mehta",
    category: "Graphics",
    episode: "Ep: 1",
    gradient: "from-[#F7B733] via-[#E89A3C] to-[#8E3A59]",
  },
  {
    title: "Motion Graphics",
    subtitle: "Create stunning animations",
    instructor: "Rahul Mehta",
    category: "Graphics",
    episode: "Ep: 1",
    gradient: "from-[#F7B733] via-[#E89A3C] to-[#8E3A59]",
  },
  {
    title: "Motion Graphics",
    subtitle: "Create stunning animations",
    instructor: "Rahul Mehta",
    category: "Graphics",
    episode: "Ep: 1",
    gradient: "from-[#F7B733] via-[#E89A3C] to-[#8E3A59]",
  },
  {
    title: "Motion Graphics",
    subtitle: "Create stunning animations",
    instructor: "Rahul Mehta",
    category: "Graphics",
    episode: "Ep: 1",
    gradient: "from-[#F7B733] via-[#E89A3C] to-[#8E3A59]",
  },
  {
    title: "Motion Graphics",
    subtitle: "Create stunning animations",
    instructor: "Rahul Mehta",
    category: "Graphics",
    episode: "Ep: 1",
    gradient: "from-[#F7B733] via-[#E89A3C] to-[#8E3A59]",
  },
];

export default function LearnSection() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-[#0A0F2D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 LEARN 🤓
            </span>

            <p className="text-white/70 mt-6 text-lg">
              learn casually, one sip at a time.
            </p>
          </div>

          <button onClick={() => navigate('/learn')} className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
            View all
          </button>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {learnItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="lg:basis-1/3 md:basis-1/2 px-6"
              >
                {/* INSTRUCTOR */}
                <div className="mb-3">
                  <span className="inline-block w-full text-center px-5 py-2 rounded-full bg-orange-400 text-black text-sm font-medium">
                    With {item.instructor}
                  </span>
                </div>

                {/* CARD */}
                <div
                  className={`relative h-[210px] rounded-[28px] p-5
                  bg-gradient-to-br ${item.gradient}
                  flex flex-col justify-between`}
                >
                  {/* TOP */}
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold">
                      {item.category}
                    </span>

                    <span className="px-4 py-1 rounded-full bg-yellow-500 text-black text-sm font-semibold">
                      ↗ {item.episode}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-white/70 mt-2 text-base">
                      {item.subtitle}
                    </p>
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
