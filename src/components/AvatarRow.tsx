import { motion } from "framer-motion";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import { useState, useRef } from "react";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

interface AvatarRowProps {
  direction?: "left" | "right";
  speed?: number;
  offset?: number;
  cardSize?: { width: string; height: string };
  rowIndex?: number;
}

const AvatarCard = ({
  src,
  index,
  cardSize,
  rowIndex = 0,
}: {
  src: string;
  index: number;
  cardSize: { width: string; height: string };
  rowIndex: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="avatar-card flex-shrink-0"
      style={{
        width: cardSize.width,
        height: cardSize.height,
        transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: (index * 0.08) + (rowIndex * 0.15),
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={`Avatar ${(index % avatars.length) + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="avatar-card-shine" />
    </motion.div>
  );
};

const AvatarRow = ({
  direction = "left",
  speed = 30,
  offset = 0,
  cardSize = { width: "160px", height: "190px" },
  rowIndex = 0,
}: AvatarRowProps) => {
  const doubled = [...avatars, ...avatars, ...avatars, ...avatars];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          animationDuration: `${speed}s`,
          animationDelay: `${offset}s`,
        }}
      >
        {doubled.map((src, i) => (
          <AvatarCard
            key={i}
            src={src}
            index={i}
            cardSize={cardSize}
            rowIndex={rowIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarRow;
