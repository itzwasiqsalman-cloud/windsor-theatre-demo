import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      aria-label="Newsletter signup"
      className="bg-cream py-24 text-cocoa md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl px-5 text-center md:px-8"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-crimson/10 text-crimson">
          <Mail className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-8 font-display text-4xl font-semibold leading-tight md:text-5xl">
          Never miss a <span className="italic text-crimson">first night</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-cocoa-muted">
          On-sale alerts, backstage stories and priority panto news, straight
          to your inbox once or twice a month.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.p
              key="thanks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-full border border-gold/40 bg-parchment px-6 py-4 text-sm font-medium text-cocoa"
              role="status"
            >
              <CheckCircle2
                className="h-5 w-5 text-crimson"
                aria-hidden="true"
              />
              Wonderful, you're on the list. See you in the stalls!
            </motion.p>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-13 w-full rounded-full border border-cocoa/20 bg-parchment px-6 py-3.5 text-sm text-cocoa placeholder:text-cocoa-muted/60 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/30"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-crimson px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-crimson-bright hover:shadow-[0_12px_28px_rgba(124,34,48,0.35)]"
              >
                Sign Up
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Newsletter;
