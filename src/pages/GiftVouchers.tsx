import { motion } from "framer-motion";
import { Gift, Mail, Phone, Ticket } from "lucide-react";
import { DetailBlock } from "@/components/InfoModal";

const amounts = ["£20", "£30", "£50", "£100", "Any amount"];

const GiftVouchers = () => (
  <main className="bg-parchment pb-28 pt-32 text-cocoa md:pt-36">
    <div className="mx-auto max-w-3xl px-5 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow text-crimson">Information</p>
        <h1 className="mt-4 font-display text-5xl font-semibold md:text-6xl">
          Gift <span className="italic text-crimson">Vouchers</span>
        </h1>
        <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-cocoa-muted md:text-lg">
          The gift of a night at the theatre: choose any amount, and let them
          choose the show.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 rounded-3xl border border-gold/40 bg-cream p-8 md:p-10"
      >
        <p className="eyebrow text-[0.6rem] text-crimson">Choose a value</p>
        <div className="mt-4 flex flex-wrap gap-2.5" aria-hidden="true">
          {amounts.map((a, i) => (
            <span
              key={a}
              className={`rounded-full border px-5 py-2 text-sm font-medium ${
                i === amounts.length - 1
                  ? "border-crimson bg-crimson text-cream"
                  : "border-cocoa/20 text-cocoa"
              }`}
            >
              {a}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-light leading-relaxed text-cocoa-muted">
          Vouchers are available in any amount you choose and are redeemable
          against every production at the theatre, from gripping drama to the
          Christmas pantomime.
        </p>
        <a
          href="tel:01753853888"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-crimson-bright hover:shadow-[0_12px_28px_rgba(124,34,48,0.35)]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Buy by phone: 01753 853 888
        </a>
      </motion.div>

      <div className="mt-12">
        <DetailBlock icon={Mail} title="Digital, by email">
          <p>
            Have a digital voucher delivered straight to your inbox (or
            theirs), ready to spend the same day. Ideal for birthdays you
            remembered at the last minute.
          </p>
        </DetailBlock>
        <DetailBlock icon={Ticket} title="Printed, in person">
          <p>
            Prefer something to wrap? Pick up a beautifully printed theatre
            ticket voucher from the box office on Thames Street.
          </p>
        </DetailBlock>
        <DetailBlock icon={Gift} title="The small print">
          <p>
            Vouchers are valid for one year from purchase and can be redeemed
            online, by phone or at the box office. Every level of membership
            can also be given as a gift.
          </p>
        </DetailBlock>
      </div>
    </div>
  </main>
);

export default GiftVouchers;
