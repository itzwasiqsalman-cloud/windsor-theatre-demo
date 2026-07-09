import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  HeartHandshake,
  Sparkles,
  Ticket,
  Users,
  Wand2,
} from "lucide-react";
import { shows } from "@/data/shows";
import { useBooking } from "@/components/booking/BookingContext";

const panto = shows.find((s) => s.id === "jack-and-the-beanstalk")!;

const cast = [
  { name: "Kevin Cruise", role: "Star billing" },
  { name: "Steven Blakeley", role: "The Dame" },
  { name: "Hilary O'Neil", role: "The Fairy" },
  { name: "More to be announced", role: "Watch this space" },
];

const Pantomime = () => {
  const { openBooking } = useBooking();

  return (
    <main className="bg-ink pb-28">
      {/* Festive banner */}
      <section className="relative overflow-hidden">
        <img
          src={panto.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-40 md:px-8 md:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow text-gold">
              The giant of all pantomimes · Fri 20 Nov to Sun 10 Jan
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-cream md:text-7xl">
              Jack and the{" "}
              <span className="italic text-gold-bright">Beanstalk</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/75 md:text-lg">
              Windsor's legendary pantomime returns with magic, mischief and
              massive fun. Dazzling sets, a dastardly giant, spectacular dance
              numbers and gags for every generation. Oh yes it is!
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openBooking(panto)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_36px_rgba(201,162,75,0.5)]"
              >
                <Ticket className="h-4 w-4" aria-hidden="true" />
                Book Tickets from £19.50
              </button>
              <span className="flex items-center gap-2 text-sm text-cream/70">
                <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
                Matinee and evening performances most days
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto mt-4 grid max-w-6xl gap-6 px-5 md:grid-cols-3 md:px-8">
        {/* Cast */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-gold/15 bg-ink-soft p-8"
          aria-label="Cast"
        >
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
            <Sparkles className="h-5 w-5 text-gold" aria-hidden="true" />
            This year's stars
          </h2>
          <ul className="mt-5 space-y-4">
            {cast.map((member) => (
              <li key={member.name}>
                <p className="font-display text-lg text-cream">{member.name}</p>
                <p className="eyebrow mt-0.5 text-[0.55rem] text-gold">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Tickets and rates */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-gold/15 bg-ink-soft p-8"
          aria-label="Tickets and rates"
        >
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
            <Users className="h-5 w-5 text-gold" aria-hidden="true" />
            Bring everyone
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-cream/70">
            Tickets start at £19.50, with family rates, school group rates and
            youth group rates available through the box office.
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-cream/70">
            Pantomime has been part of every Windsor Christmas for more than
            80 unbroken years. Start your family's tradition this season.
          </p>
        </motion.section>

        {/* Good to know */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-gold/15 bg-ink-soft p-8"
          aria-label="Good to know"
        >
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
            <Wand2 className="h-5 w-5 text-gold" aria-hidden="true" />
            Good to know
          </h2>
          <ul className="mt-5 space-y-4 text-sm font-light leading-relaxed text-cream/70">
            <li className="flex gap-3">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                aria-hidden="true"
              />
              The production contains haze and some flashing lights.
            </li>
            <li className="flex gap-3">
              <HeartHandshake
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                aria-hidden="true"
              />
              Relaxed and accessible performance dates are announced each
              season. Ask the box office or see our accessibility guide.
            </li>
          </ul>
        </motion.section>
      </div>
    </main>
  );
};

export default Pantomime;
