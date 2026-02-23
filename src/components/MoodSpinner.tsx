import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const segments = [
  {
    label: "Observe",
    color: "#F4C7A1",
    description: "Watch real people work, decide, struggle, and grow",
    path: "/observe",
  },
  {
    label: "Learn",
    color: "#E39A14",
    description: "Casual learning, one sip at a time",
    path: "/learn",
  },
  {
    label: "Discuss",
    color: "#E67E3A",
    description: "Talk it out. Question everything.",
    path: "/discuss",
  },
  {
    label: "Support",
    color: "#FF9A3C",
    description: "Sometimes you need help. Sometimes you are the help.",
    path: "/support",
  },
  {
    label: "Pause",
    color: "#E3B012",
    description: "Just breathe. Reset before the next move.",
    path: "/pause",
  },
];

export default function MoodSpinner() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const wheelRef = useRef(null);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const segmentAngle = 360 / segments.length;
    const randomIndex = Math.floor(Math.random() * segments.length);
    const spins = 6;

    const finalRotation =
      spins * 360 +
      (segments.length - randomIndex) * segmentAngle -
      segmentAngle / 2;

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIndex(randomIndex);
      navigate(segments[randomIndex].path);
    }, 4000);
  };

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const createSegmentPath = (index, total) => {
    const angle = 360 / total;
    const startAngle = index * angle - 90;
    const endAngle = startAngle + angle;

    const start = polarToCartesian(150, 150, 140, endAngle);
    const end = polarToCartesian(150, 150, 140, startAngle);

    return `M150 150 L${start.x} ${start.y}
            A140 140 0 0 0 ${end.x} ${end.y} Z`;
  };

  const getLabelPosition = (index, total) => {
    const angle = (360 / total) * index + (360 / total) / 2 - 90;
    return polarToCartesian(150, 150, 90, angle);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#050B2E] to-[#0A0F2D]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-start justify-center gap-20">

          {/* LEFT SIDE (PILL + ARROW + WHEEL) */}
          <div className="relative flex flex-col items-center">

            {/* YELLOW PILL */}
            <div className="mb-6 px-8 py-3 rounded-full bg-yellow-400 text-black font-medium shadow-lg">
              Not sure how you're feeling right now? Relax – let the spin decide
            </div>

            {/* ARROW */}
            <div className="mb-3">
              <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[24px]
                border-l-transparent border-r-transparent border-t-white" />
            </div>

            {/* WHEEL */}
            <div className="relative w-[320px] h-[320px]">
              <svg
                ref={wheelRef}
                viewBox="0 0 300 300"
                className="w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                    : "none",
                }}
              >
                {segments.map((seg, i) => (
                  <g key={seg.label}>
                    <path
                      d={createSegmentPath(i, segments.length)}
                      fill={seg.color}
                      stroke="#020617"
                      strokeWidth="2"
                    />
                    <text
                      x={getLabelPosition(i, segments.length).x}
                      y={getLabelPosition(i, segments.length).y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#020617"
                      fontWeight="bold"
                      fontSize="14"
                      style={{
                        transform: `rotate(${(360 / segments.length) * i +
                          360 / segments.length / 2}deg)`,
                        transformOrigin: `${getLabelPosition(i, segments.length).x}px ${getLabelPosition(i, segments.length).y}px`,
                      }}
                    >
                      {seg.label}
                    </text>
                  </g>
                ))}

                <circle
                  cx="150"
                  cy="150"
                  r="42"
                  fill="#7A3A1E"
                  stroke="#fff"
                  strokeWidth="3"
                />
              </svg>

              {/* SPIN BUTTON */}
              <Button
                onClick={spin}
                disabled={isSpinning}
                className="absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-16 h-16 rounded-full
                bg-[#7A3A1E] text-white font-bold
                hover:opacity-90"
              >
                {isSpinning ? "..." : "Spin"}
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="space-y-6 max-w-xl w-full">
            <h3 className="text-yellow-400 text-lg font-semibold mb-2">
              Stop where your mood feels right:
            </h3>

            {segments.map((seg, i) => (
              <div
                key={seg.label}
                className="p-6 rounded-xl"
                style={{ backgroundColor: seg.color }}
              >
                <h4 className="font-bold text-black text-lg mb-1">
                  {seg.label}
                </h4>
                <p className="text-black/80 text-sm">
                  {seg.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
