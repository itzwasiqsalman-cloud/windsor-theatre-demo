import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Ticket } from "lucide-react";
import {
  categoryLabels,
  shows,
  type Show,
  type ShowCategory,
} from "@/data/shows";
import { useBooking } from "@/components/booking/BookingContext";

const monthFmt = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

const monthOf = (show: Show) =>
  monthFmt.format(new Date(`${show.startIso}T12:00:00`));

const filters: ("all" | ShowCategory)[] = [
  "all",
  "drama",
  "thriller",
  "musical",
  "music",
  "comedy",
  "dance",
  "family",
];

const ShowRow = ({ show, index }: { show: Show; index: number }) => {
  const { openBooking } = useBooking();
  const oneNight = show.startIso === show.endIso;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index, 3) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col gap-5 rounded-3xl border border-gold/10 bg-ink-soft p-5 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_44px_rgba(0,0,0,0.4)] sm:flex-row md:gap-7"
    >
      <div className="relative w-full shrink-0 overflow-hidden rounded-2xl sm:w-52 md:w-64">
        <img
          src={show.image}
          alt={`${show.title} artwork`}
          loading="lazy"
          className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:aspect-auto sm:min-h-40"
        />
        {show.status === "Now Playing" && (
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-crimson/85 px-3 py-1 text-[0.55rem] text-cream backdrop-blur-sm">
            Now Playing
          </span>
        )}
        {oneNight && (
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-gold/90 px-3 py-1 text-[0.55rem] text-ink backdrop-blur-sm">
            One Night Only
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="eyebrow text-[0.6rem] text-gold-bright">{show.genre}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-cream md:text-3xl">
          {show.title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-cream/70">
          <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
          {show.dates}
        </p>
        <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-cream/65">
          {show.description}
        </p>
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => openBooking(show)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.45)]"
          >
            <Ticket className="h-4 w-4" aria-hidden="true" />
            Book Tickets
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const WhatsOn = () => {
  const [filter, setFilter] = useState<"all" | ShowCategory>("all");

  const grouped = useMemo(() => {
    const visible =
      filter === "all" ? shows : shows.filter((s) => s.category === filter);
    const groups: { month: string; items: Show[] }[] = [];
    for (const show of visible) {
      const month = monthOf(show);
      const last = groups[groups.length - 1];
      if (last && last.month === month) last.items.push(show);
      else groups.push({ month, items: [show] });
    }
    return groups;
  }, [filter]);

  return (
    <main className="bg-ink pb-28 pt-32 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-gold">The full season</p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-cream md:text-6xl">
            What's <span className="italic text-gold-bright">On</span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-cream/65">
            Every production, concert and one-night special on the Windsor
            stage, month by month. Filter by what you love and book your seats
            in a few clicks.
          </p>
        </motion.div>

        {/* Category filters */}
        <div
          className="mt-10 flex flex-wrap gap-2.5"
          role="group"
          aria-label="Filter shows by category"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? "border-gold bg-gold text-ink"
                  : "border-cream/15 text-cream/70 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {f === "all" ? "All Shows" : categoryLabels[f]}
            </button>
          ))}
        </div>

        {/* Month groups */}
        {grouped.length === 0 ? (
          <p className="mt-16 text-cream/60">
            Nothing in this category right now. Try another filter, or call the
            box office on 01753 853 888 for the very latest additions.
          </p>
        ) : (
          grouped.map((group) => (
            <section key={group.month} aria-label={group.month}>
              <div className="mt-16 flex items-center gap-6">
                <h2 className="shrink-0 font-display text-2xl font-semibold text-cream md:text-3xl">
                  {group.month}
                </h2>
                <div className="flourish w-full" />
              </div>
              <div className="mt-7 space-y-5">
                {group.items.map((show, i) => (
                  <ShowRow key={show.id} show={show} index={i} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
};

export default WhatsOn;
