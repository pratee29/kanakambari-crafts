import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const inTheAirItems = [
  {
    rank: 1,
    title: "Motion Graphics",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 2,
    title: "UX UI Design",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: false,
  },
  {
    rank: 3,
    title: "Full Stack Development",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 4,
    title: "Motion Graphics",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: false,
  },
  {
    rank: 3,
    title: "Full Stack Development",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 4,
    title: "Motion Graphics",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: false,
  },
  {
    rank: 3,
    title: "Full Stack Development",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: true,
  },
  {
    rank: 4,
    title: "Motion Graphics",
    description: "Create stunning animations",
    category: "Discussion",
    isLive: false,
  },
];

export default function InTheAirSection() {
  return (
    <section className="py-24 bg-[#0A0F2D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 IN THE AIR ☁️
            </span>

            <p className="text-white/70 mt-6 text-lg">
              What everyone is talking about right now
            </p>
          </div>

          <button className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
            View all
          </button>
        </div>

        {/* SLIDER */}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {inTheAirItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 flex justify-center px-6"
              >
                {/* OUTER OVAL – SAME SIZE */}
                <div
                  className="
                    relative w-full max-w-[260px] aspect-[2/3]
                    rounded-[140px]
                    border border-orange-400/70
                    flex items-center justify-center
                  "
                >
                  {/* INNER OVAL */}
                  <div
                    className="
                      w-[90%] aspect-[2/3]
                      rounded-[120px]
                      bg-gradient-to-b from-[#4A2E24] via-[#5A3A2E] to-[#3A241C]
                      flex flex-col items-center text-center
                      px-6
                    "
                  >
                    {/* RANK */}
                    <div className="mt-6 w-12 h-12 rounded-full bg-pink-500/90 text-white flex items-center justify-center text-xl font-semibold shadow-lg">
                      {item.rank}
                    </div>

                    {/* CATEGORY */}
                    <span className="mt-4 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm">
                      {item.category}
                    </span>

                    {/* TITLE */}
                    <h3 className="mt-6 text-white text-lg font-semibold leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-white/70 text-sm">
                      {item.description}
                    </p>

                    {/* LIVE TAG */}
                    {item.isLive && (
                      <span className="mt-auto mb-6 px-4 py-1.5 rounded-full bg-orange-500 text-black text-sm font-medium">
                        LIVE
                      </span>
                    )}
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
