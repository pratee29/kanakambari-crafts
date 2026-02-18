import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Avatars (24)
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import avatar8 from "@/assets/avatar-8.jpg";
import avatar9 from "@/assets/avatar-9.jpg";
import avatar10 from "@/assets/avatar-10.jpg";
import avatar11 from "@/assets/avatar-11.jpg";
import avatar12 from "@/assets/avatar-12.jpg";
import avatar13 from "@/assets/avatar-1.jpg";
import avatar14 from "@/assets/avatar-2.jpg";
import avatar15 from "@/assets/avatar-3.jpg";
import avatar16 from "@/assets/avatar-4.jpg";
import avatar17 from "@/assets/avatar-5.jpg";
import avatar18 from "@/assets/avatar-6.jpg";
import avatar19 from "@/assets/avatar-7.jpg";
import avatar20 from "@/assets/avatar-8.jpg";
import avatar21 from "@/assets/avatar-9.jpg";
import avatar22 from "@/assets/avatar-10.jpg";
import avatar23 from "@/assets/avatar-11.jpg";
import avatar24 from "@/assets/avatar-12.jpg";

const avatars = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8,
  avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15, avatar16,
  avatar17, avatar18, avatar19, avatar20, avatar21, avatar22, avatar23, avatar24,
];

const words = ["Observe", "Learn", "Discuss", "Support", "Pause"];

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveWord((prev) => (prev + 1) % words.length),
      2200
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24
      bg-gradient-to-b from-[#050B2E] via-[#120C2F] to-[#050B2E]"
    >
      {/* BACKGROUND AVATAR GRID */}
      <div className="absolute inset-x-0 top-[96px] bottom-0 z-0 px-6">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {avatars.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-black/20" />
              <img
                src={src}
                alt="avatar"
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 min-h-screen top-[-96px] flex items-center justify-center text-center px-6">
        
        {/* CHOCOLATY BLUR BEHIND TEXT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="
              w-[65%] h-[65%]
              bg-[#5A2A1A]/70
              blur-[140px]
              rounded-full
            "
          />
        </div>

        {/* TEXT BLOCK */}
        <div className="relative z-10 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2">
            Welcome to Your
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold italic text-[#FDBA4D] drop-shadow-[0_0_25px_rgba(253,186,77,0.35)]">
              Online Space
            </h2>
            <span className="text-[#FDBA4D] text-xl">✦ ✦</span>
          </div>

          {/* SUBTITLE */}
          <div className="flex flex-wrap justify-center gap-4 text-lg md:text-xl italic text-white/75 mb-10">
            {words.map((word, i) => (
              <span
                key={word}
                className={`transition-all duration-500 ${
                  i === activeWord ? "text-[#FDBA4D]" : ""
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full px-9 py-6 text-lg font-semibold
              bg-gradient-to-r from-orange-400 to-orange-500
              text-black shadow-xl shadow-orange-500/40 hover:opacity-90"
            >
              Start a Discussion
            </Button>

            <Button
              size="lg"
              className="rounded-full px-9 py-6 text-lg font-semibold
              bg-gradient-to-r from-orange-400 to-orange-500
              text-black shadow-xl shadow-orange-500/40 hover:opacity-90"
            >
              Explore Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
