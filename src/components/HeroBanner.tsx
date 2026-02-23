import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvatarRow from "./AvatarRow";

const textReveal = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.4 + i * 0.18,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

const HeroBanner = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 15);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 10);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-20">
      
      {/* THREE LAYER BANNER */}
      <div className="relative" style={{ minHeight: "70vh" }}>

        {/* LAYER 1 – TOP */}
        <motion.div
          className="layer-strip relative z-10"
          style={{ x: springX, y: springY }}
        >
          <motion.div
            className="curve-top"
            initial={{ opacity: 0, y: -80, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 6 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <AvatarRow direction="left" speed={60} offset={0} cardSize={{ width: "155px", height: "185px" }} rowIndex={0} />
          </motion.div>
          <div className="edge-blur-left" />
          <div className="edge-blur-right" />
        </motion.div>

        {/* LAYER 2 – MIDDLE */}
        <motion.div
          className="layer-strip relative z-10 my-3"
          style={{
            x: useSpring(mouseX, { stiffness: 30, damping: 25 }),
            y: useSpring(mouseY, { stiffness: 30, damping: 25 }),
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <AvatarRow direction="right" speed={65} offset={-1} cardSize={{ width: "155px", height: "185px" }} rowIndex={1} />
          </motion.div>
          <div className="edge-blur-left" />
          <div className="edge-blur-right" />
        </motion.div>

        {/* LAYER 3 – BOTTOM */}
        <motion.div
          className="layer-strip relative z-10"
          style={{ x: springX, y: springY }}
        >
          <motion.div
            className="curve-bottom"
            initial={{ opacity: 0, y: 80, rotateX: -25 }}
            animate={{ opacity: 1, y: 0, rotateX: -6 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <AvatarRow direction="left" speed={55} offset={-2} cardSize={{ width: "155px", height: "185px" }} rowIndex={2} />
          </motion.div>
          <div className="edge-blur-left" />
          <div className="edge-blur-right" />
        </motion.div>

        {/* CENTER GRADIENT OVERLAY */}
        <div className="absolute inset-0 z-20 pointer-events-none center-gradient-overlay" />

        {/* Radial purple-orange glow */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 50% 50%, hsla(280, 60%, 25%, 0.5) 0%, hsla(36, 80%, 50%, 0.1) 45%, transparent 70%)",
          }}
        />

        {/* TEXT OVERLAY */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <motion.h1
            custom={0}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1 font-display drop-shadow-[0_0_30px_hsla(36,90%,55%,0.15)]"
          >
            Tired of One Way Gyaan?
          </motion.h1>

          <motion.h2
            custom={1}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl lg:text-6xl font-bold italic gold-text mb-3 font-display"
          >
            Welcome to Your Online Adda{" "}
            <span className="animate-sparkle inline-block text-2xl md:text-4xl">✨</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="text-sm md:text-base text-muted-foreground italic tracking-[0.3em] mb-10 font-display"
          >
            Let's Talk & Learn
          </motion.p>

          <motion.div
            custom={3}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <button onClick={() => navigate("/discuss")} className="hero-btn-primary">
              Join Group Discussion
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
