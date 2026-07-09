import * as React from "react";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
  /**
   * Height of the scroll section in pixels
   * @default 1500
   */
  scrollHeight: number;
  /**
   * Background image URL for desktop view (also the poster/fallback
   * shown behind the video while it loads)
   */
  desktopImage: string;
  /**
   * Background image URL for mobile view
   */
  mobileImage: string;
  /**
   * Initial clip path percentage
   * @default 25
   */
  initialClipPercentage: number;
  /**
   * Final clip path percentage
   * @default 75
   */
  finalClipPercentage: number;
  /**
   * Optional YouTube video ID rendered as an ambient, muted, looping
   * background inside the clip-path window (e.g. "7f8uxOay6k4").
   * Falls back to the images when omitted or while loading.
   */
  youtubeId?: string;
  /**
   * Content overlaid on the hero (titles, CTAs). Stays pinned while
   * the clip window expands.
   */
  children?: React.ReactNode;
}

interface iISmoothScrollHeroBackgroundProps extends iISmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroBackgroundProps> = ({
  scrollHeight,
  desktopImage,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
  youtubeId,
  children,
}) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    prefersReducedMotion ? [0, 0] : [initialClipPercentage, 0],
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    prefersReducedMotion ? [100, 100] : [finalClipPercentage, 100],
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "100%"],
  );
  // Equivalent zoom-out for the video layer, which can't use background-size
  const videoScale = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    prefersReducedMotion ? [1, 1] : [1.7, 1],
  );

  return (
    <div className="sticky top-0 h-screen w-full">
      <motion.div
        className="absolute inset-0 overflow-hidden bg-black"
        style={{
          clipPath,
          willChange: "transform, opacity",
        }}
      >
      {/* Mobile background */}
      <motion.div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Desktop background */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${desktopImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Ambient YouTube video layer, sized to cover the viewport */}
      {youtubeId && !prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{ scale: videoScale }}
          aria-hidden="true"
        >
          <iframe
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "max(100vw, 177.78vh)",
              height: "max(100vh, 56.25vw)",
              border: 0,
            }}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&rel=0&playsinline=1&disablekb=1&iv_load_policy=3&modestbranding=1`}
            title="Theatre showreel"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </motion.div>
      )}
      {/* Legibility scrim over image/video */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      </motion.div>
      {/* Overlay content lives outside the clipped layer so it never gets cropped */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * A smooth scroll hero component with parallax background effect
 * @param props - Component props
 * @returns React component
 */
const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
  mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=2412&auto=format&fit=crop",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  youtubeId,
  children,
}) => {
  return (
    <div
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <SmoothScrollHeroBackground
        scrollHeight={scrollHeight}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
        youtubeId={youtubeId}
        children={children}
      />
    </div>
  );
};
export default SmoothScrollHero;
