import { Heart } from "lucide-react";

const items = [
  "FAQ",
  "Help & Support",
  "Contacts",
  "Privacy",
  "Terms & Conditions",
];

const Triangle = ({
  text,
  down = false,
}: {
  text: string;
  down?: boolean;
}) => {
  return (
    <div className="relative w-[13rem] h-[10rem] flex items-center justify-center">
      <svg
        viewBox="0 0 200 180"
        className={`absolute inset-0 ${down ? "rotate-180" : ""}`}
      >
        <defs>
          <filter id="orangeBlur" x="-50%" y="-50%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* DARK ORANGE BLUR GLOW */}
        <polygon
          points="100,15 20,165 180,165"
          fill="#d9772a"
          opacity="10"
          filter="url(#orangeBlur)"
        />

        {/* MAIN TRIANGLE */}
        <polygon
          // points="100,40 150,160 50,160"
          fill="#ff9f43"
          opacity="0.7"
        />
      </svg>

      {/* TEXT */}
      <span className="relative z-10 px-6 py-2 rounded-full bg-[#da934c] text-white text-sm font-medium shadow-md">
        {text}
      </span>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 bg-[#070c2b]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">

          {/* TRIANGLES (GAP REDUCED) */}
          <div className="flex flex-wrap justify-center gap-10">
            {items.map((item, i) => (
              <Triangle
                key={i}
                text={item}
                down={i % 2 === 1}
              />
            ))}
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
