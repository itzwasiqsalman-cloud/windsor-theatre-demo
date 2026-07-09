import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import { shows, type Show } from "@/data/shows";
import { useBooking } from "@/components/booking/BookingContext";

const AUTO_SPEED = 35; // px per second, matches the previous 60s CSS loop
const TWEEN_MS = 550;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const ShowCard = ({ show }: { show: Show }) => {
  const [flipped, setFlipped] = useState(false);
  const { openBooking } = useBooking();

  return (
    <li
      className={`flip-card perspective-1200 h-[26rem] w-72 shrink-0 md:h-[28rem] md:w-80 ${
        flipped ? "is-flipped" : ""
      }`}
    >
      <div className="flip-inner preserve-3d relative h-full w-full">
        {/* Front */}
        <article className="backface-hidden absolute inset-0 overflow-hidden rounded-3xl border border-gold/15 bg-ink-soft shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <img
            src={show.image}
            alt={`${show.title} artwork`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
          <span
            className={`eyebrow absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[0.6rem] backdrop-blur-sm ${
              show.status === "Now Playing"
                ? "bg-crimson/85 text-cream"
                : "bg-gold/85 text-ink"
            }`}
          >
            {show.status}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="eyebrow text-[0.6rem] text-gold-bright">{show.genre}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-cream">
              {show.title}
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-cream/70">
              <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
              {show.dates}
            </p>
            <p className="mt-4 text-xs text-cream/45">
              Hover or tap for details
            </p>
          </div>
          {/* Invisible toggle so touch/keyboard users can flip too */}
          <button
            type="button"
            className="absolute inset-0 cursor-pointer"
            aria-label={`Show details for ${show.title}`}
            onClick={() => setFlipped((v) => !v)}
          />
        </article>

        {/* Back */}
        <article className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-ink-raised to-ink p-7 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <div>
            <p className="eyebrow text-[0.6rem] text-gold">{show.genre}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-cream">
              {show.title}
            </h3>
            <div className="flourish my-5 w-24" />
            <p className="text-sm font-light leading-relaxed text-cream/75">
              {show.description}
            </p>
          </div>
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-sm text-cream/70">
              <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
              {show.dates}
            </p>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.45)]"
              onClick={(e) => {
                e.stopPropagation();
                openBooking(show);
              }}
            >
              <Ticket className="h-4 w-4" aria-hidden="true" />
              Book Tickets
            </button>
          </div>
        </article>
      </div>
    </li>
  );
};

const ShowsMarquee = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(
    null,
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const half = track.scrollWidth / 2;
      const dt = now - last;
      last = now;

      if (tweenRef.current) {
        const { from, to, start } = tweenRef.current;
        const t = Math.min(1, (now - start) / TWEEN_MS);
        offsetRef.current = from + (to - from) * easeOutCubic(t);
        if (t >= 1) tweenRef.current = null;
      } else if (!pausedRef.current && !prefersReducedMotion) {
        offsetRef.current += (dt * AUTO_SPEED) / 1000;
      }

      if (half > 0) {
        offsetRef.current = ((offsetRef.current % half) + half) % half;
      }
      track.style.transform = `translateX(${-offsetRef.current}px)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  // Advance the reel by one card in either direction
  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const gap = parseFloat(getComputedStyle(track).columnGap || "24") || 24;
    const step = (card ? card.getBoundingClientRect().width : 320) + gap;
    const from = offsetRef.current;
    tweenRef.current = {
      from,
      to: from + dir * step,
      start: performance.now(),
    };
  };

  return (
    <section
      id="whats-on"
      aria-label="What's on at Royal Theatre Windsor"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      {/* Ambient spotlight glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-5 md:px-8"
      >
        <p className="eyebrow text-gold">On our stage</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold text-cream md:text-6xl">
            What's On <span className="italic text-gold-bright">&amp;</span>{" "}
            Coming Soon
          </h2>
          <p className="max-w-sm text-sm font-light leading-relaxed text-cream/60">
            From gripping drama to legendary pantomime. Hover over any
            production to reveal the story and book your seats.
          </p>
        </div>
        <div className="flourish mt-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mt-14"
        onPointerEnter={() => (pausedRef.current = true)}
        onPointerLeave={() => (pausedRef.current = false)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
      >
        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-32"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-32"
          aria-hidden="true"
        />

        {/* Manual controls */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous shows"
          className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-gold backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-[0_0_28px_rgba(201,162,75,0.45)] md:left-6"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next shows"
          className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-gold backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-[0_0_28px_rgba(201,162,75,0.45)] md:right-6"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <ul
          ref={trackRef}
          className="flex w-max gap-6 px-6 py-4 will-change-transform md:gap-8"
        >
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
          {/* Duplicate list for a seamless loop */}
          {shows.map((show) => (
            <ShowCard key={`${show.id}-loop`} show={show} />
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default ShowsMarquee;
