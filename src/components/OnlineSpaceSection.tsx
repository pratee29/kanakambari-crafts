import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

export default function OnlineSpaceSection() {
  // const autoplay = useRef(
  //   Autoplay({
  //     delay: 0, // continuous like Swiper
  //     stopOnInteraction: false,
  //     stopOnMouseEnter: false,
  //   })
  // );

  return (
    <section className="py-24 bg-[#070B24] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER (same rhythm as Support) */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              In the <span className="text-orange">Online Space</span>
            </h2>
          </div>

          <button className="px-7 py-2.5 rounded-full bg-orange text-black font-medium hover:opacity-90 transition">
            View all
          </button>
        </div>

        {/* CURVED SLIDER WRAPPER */}
        <div className="relative curved-slider">

          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true, // 🔥 Swiper feel
            }}
            // plugins={[autoplay.current]}
          >
            <CarouselContent className="items-center gap-8">

              {/* repeat array for seamless loop */}
              {[...avatars, ...avatars].map((src, i) => (
                <CarouselItem
                  key={i}
                  className="basis-[180px] sm:basis-[220px] md:basis-[240px]"
                >
                  <div className="relative h-[260px] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

                    <img
                      src={src}
                      alt="online-user"
                      className="w-full h-full object-cover"
                    />

                    {/* subtle gold edge */}
                    <div className="absolute inset-0 ring-1 ring-orange/40 rounded-lg" />
                  </div>
                </CarouselItem>
              ))}

            </CarouselContent>
          </Carousel>

        </div>
      </div>
    </section>
  );
}
