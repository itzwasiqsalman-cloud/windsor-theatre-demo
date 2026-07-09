import { motion } from "framer-motion";
import { Check, Phone, Sparkles } from "lucide-react";

const perks = [
  "Save up to £27.50 on most visits",
  "Priority booking before the general public",
  "Discounts at all theatre bars",
  "Exclusive members' clubroom access",
  "Invitations to press nights and special events",
];

const tiers = [
  { name: "Silver", price: 55, popular: true },
  { name: "Gold", price: 85, popular: false },
  { name: "Platinum", price: 160, popular: false },
  { name: "Diamond", price: 260, popular: false },
  { name: "Royal", price: 500, popular: false },
];

const Membership = () => (
  <section
    id="membership"
    aria-label="Membership and support"
    className="relative overflow-hidden bg-ink py-28 md:py-36"
  >
    {/* Curtain-red ambient glow */}
    <div
      className="pointer-events-none absolute -left-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-crimson/20 blur-3xl"
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      aria-hidden="true"
    />

    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow text-gold">Get involved</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-cream md:text-5xl">
          Take your seat among{" "}
          <span className="italic text-gold-bright">friends</span>
        </h2>
        <div className="flourish mt-8 w-28" />
        <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-cream/70 md:text-lg">
          Choose from five levels of annual membership, from Silver to Royal.
          Every level brings you closer to the theatre while directly
          supporting one of the country's last unsubsidised producing houses.
        </p>
        <ul className="mt-10 space-y-4">
          {perks.map((perk, i) => (
            <motion.li
              key={perk}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-3 text-sm text-cream/85 md:text-base"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {perk}
            </motion.li>
          ))}
        </ul>
        <p className="mt-10 max-w-lg text-sm font-light leading-relaxed text-cream/50">
          For corporate support and sponsorship opportunities, contact{" "}
          <a
            href="mailto:development@theatreroyalwindsor.co.uk"
            className="text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
          >
            development@theatreroyalwindsor.co.uk
          </a>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-gold/25 bg-gradient-to-b from-ink-raised to-ink-soft p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)] md:p-10"
      >
        <span className="absolute -top-5 left-10 flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Annual membership
        </span>
        <p className="eyebrow mt-2 text-gold">Choose your level</p>
        <ul className="mt-6 divide-y divide-cream/10">
          {tiers.map((tier, i) => (
            <motion.li
              key={tier.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.25 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-4 text-left transition-colors duration-300 hover:bg-cream/5"
              >
                <span className="flex items-center gap-3">
                  <span className="font-display text-xl font-semibold text-cream transition-colors duration-300 group-hover:text-gold-bright">
                    {tier.name}
                  </span>
                  {tier.popular && (
                    <span className="eyebrow rounded-full bg-gold/15 px-2.5 py-1 text-[0.5rem] text-gold">
                      Most popular
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-display text-xl tabular-nums text-gold">
                  £{tier.price}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
        <a
          href="tel:01753853888"
          className="mt-7 flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-center text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_36px_rgba(201,162,75,0.5)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Join via the box office: 01753 853 888
        </a>
        <p className="mt-4 text-center text-sm text-cream/60">
          Every level can also be given as a gift, alongside our theatre gift
          vouchers.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Membership;
