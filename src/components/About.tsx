import { motion } from "framer-motion";

const stats = [
  { value: "1793", label: "First curtain up" },
  { value: "633", label: "Seats in the house" },
  { value: "230+", label: "Years of live theatre" },
  { value: "Grade II", label: "Listed Edwardian home" },
];

const About = () => (
  <section
    id="about"
    aria-label="About the theatre"
    className="relative bg-cream text-cocoa"
  >
    {/* Dark-to-light stage transition */}
    <div
      className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent"
      aria-hidden="true"
    />
    <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 md:grid-cols-2 md:items-center md:gap-20 md:px-8 md:py-36">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(61,49,37,0.25)]">
          <img
            src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1600&auto=format&fit=crop"
            alt="Ornate historic theatre interior"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
        </div>
        <div className="absolute -bottom-8 -right-4 rounded-2xl border border-gold/30 bg-parchment px-7 py-5 shadow-xl md:-right-10">
          <p className="font-display text-4xl font-semibold text-crimson">1793</p>
          <p className="eyebrow mt-1 text-[0.6rem] text-cocoa-muted">
            A theatre by the castle
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow text-crimson">Our story</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
          A little theatre with a{" "}
          <span className="italic text-crimson">royal</span> history
        </h2>
        <div className="flourish mt-8 w-28" />
        <p className="mt-8 text-base font-light leading-relaxed text-cocoa-muted md:text-lg">
          Nestled beside the castle walls, our beautiful historic theatre has
          been at the heart of regal Windsor for over two centuries. From
          world-premiere drama to the country's most-loved pantomime, every
          season brings the finest live performance to the Thames-side.
        </p>
        <p className="mt-5 text-base font-light leading-relaxed text-cocoa-muted md:text-lg">
          Today the theatre remains one of the few unsubsidised producing
          houses in the country, and every ticket you buy keeps the curtain
          rising.
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <dt className="order-2 eyebrow mt-2 block text-[0.6rem] text-cocoa-muted">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-3xl font-semibold text-cocoa md:text-4xl">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>
    </div>
  </section>
);

export default About;
