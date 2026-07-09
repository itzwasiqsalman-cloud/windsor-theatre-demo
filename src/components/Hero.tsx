import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";

const SCROLL_HEIGHT = 1500;

const HeroContent = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const opacity = useTransform(scrollY, [0, SCROLL_HEIGHT * 0.45], [1, 0]);
  const y = useTransform(
    scrollY,
    [0, SCROLL_HEIGHT * 0.45],
    prefersReducedMotion ? [0, 0] : [0, -60],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex max-w-4xl flex-col items-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="eyebrow text-gold"
      >
        Nestled beside Windsor Castle
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-cream md:text-7xl lg:text-8xl"
      >
        Royal Theatre
        <span className="block italic text-gold-bright">Windsor</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/80 md:text-lg"
      >
        Two centuries of drama, music and pantomime in the heart of regal
        Windsor. The curtain is about to rise. Will you be with us?
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="#whats-on"
          className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_36px_rgba(201,162,75,0.5)]"
        >
          Explore What's On
        </a>
        <a
          href="#membership"
          className="rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:border-gold hover:text-gold"
        >
          Become a Member
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-16 flex flex-col items-center gap-2 text-cream/50"
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => (
  <section id="top" aria-label="Welcome to Royal Theatre Windsor">
    <SmoothScrollHero
      scrollHeight={SCROLL_HEIGHT}
      desktopImage="https://images.unsplash.com/photo-1507924538820-ede94a04019d?q=80&w=2400&auto=format&fit=crop"
      mobileImage="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop"
      initialClipPercentage={25}
      finalClipPercentage={75}
      youtubeId="7f8uxOay6k4"
    >
      <HeroContent />
    </SmoothScrollHero>
  </section>
);

export default Hero;
