import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PageBannerProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  badge?: { icon?: React.ReactNode; text: string };
  images: string[];
  rightContent?: React.ReactNode;
  stats?: string;
}

export default function PageBanner({ title, titleHighlight, subtitle, badge, images, rightContent, stats }: PageBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* BACKGROUND IMAGE CAROUSEL */}
      <div className="absolute inset-0 z-0">
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}>
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i} className="basis-full">
                <div className="relative w-full h-[340px] sm:h-[380px]">
                  <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/85 to-background/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/70" />
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1] bg-gradient-to-t from-background to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/homepage")}
              className="p-2.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition border border-border"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div>
              {badge && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40 text-primary text-xs font-bold">
                    {badge.icon} {badge.text}
                  </span>
                  {stats && <span className="text-muted-foreground text-sm">{stats}</span>}
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-black text-foreground leading-tight"
              >
                {title} <span className="gradient-orange-text">{titleHighlight}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mt-2 text-base sm:text-lg"
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
          {rightContent && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              {rightContent}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
