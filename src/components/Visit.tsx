import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Accessibility,
  Armchair,
  Bus,
  Car,
  Ear,
  GlassWater,
  HeartHandshake,
  MapPin,
  PawPrint,
  Sparkles,
  Theater,
  TrainFront,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { priceBands, venue } from "@/data/booking";
import SeatMap from "@/components/booking/SeatMap";
import InfoModal, {
  DetailBlock,
  PriceList,
  PriceRow,
  type InfoPage,
} from "@/components/InfoModal";

type CardId = "getting-here" | "access" | "seating" | "bars";

interface VisitCard {
  id: CardId;
  icon: LucideIcon;
  title: string;
  copy: string;
  link: string;
}

const cards: VisitCard[] = [
  {
    id: "getting-here",
    icon: MapPin,
    title: "Getting Here",
    copy: "Find us on Thames Street, moments from Windsor & Eton Central station and in the shadow of the castle walls. Buses stop right outside the door.",
    link: "Plan your journey",
  },
  {
    id: "access",
    icon: Accessibility,
    title: "Access for All",
    copy: "Step-free access, wheelchair spaces, infrared hearing support and dedicated assisted performances. Our box office team will happily find the perfect seat.",
    link: "Accessibility guide",
  },
  {
    id: "seating",
    icon: Armchair,
    title: "Seating Plan",
    copy: "Front Stalls, Royal Stalls or the Circle? Explore the auditorium view-by-view and choose the seat that suits your evening. Every one is close to the action.",
    link: "View seating plan",
  },
  {
    id: "bars",
    icon: GlassWater,
    title: "Bars & Interval Drinks",
    copy: "Pre-order interval drinks and enjoy our elegant theatre bars. Arrive early, raise a glass, and settle in before the house lights dim.",
    link: "Pre-order upgrades",
  },
];

const GettingHereDetail = () => (
  <>
    <DetailBlock icon={MapPin} title="Where to find us">
      <p>
        32 Thames Street, Windsor, Berkshire SL4 1PS. You'll find us across
        from the walls of Windsor Castle, right in the centre of town and 25
        miles west of London.
      </p>
    </DetailBlock>
    <DetailBlock icon={TrainFront} title="By train">
      <p>
        Two stations are a short walk away.{" "}
        <strong className="font-medium text-cocoa">
          Windsor &amp; Eton Riverside
        </strong>{" "}
        connects to London Waterloo via Staines and Richmond.{" "}
        <strong className="font-medium text-cocoa">
          Windsor &amp; Eton Central
        </strong>{" "}
        serves Slough for the Elizabeth Line and London Paddington, plus
        Reading and Maidenhead.
      </p>
    </DetailBlock>
    <DetailBlock icon={Car} title="By car">
      <p>
        There is no customer parking at the theatre itself, but several public
        car parks sit within easy walking distance. Council car parks use the
        RingGo payment system. Windsor is reached easily from the M3, M4, M25
        and M40. For taxis and drop-off, use postcode SL4 1PS.
      </p>
    </DetailBlock>
    <DetailBlock icon={Bus} title="By bus, coach or air">
      <p>
        The bus stop is directly opposite the theatre entrance, with regular
        routes across Windsor and beyond. Heathrow Airport is around 15
        minutes away.
      </p>
    </DetailBlock>
  </>
);

const AccessDetail = () => (
  <>
    <DetailBlock icon={Accessibility} title="Step-free and wheelchair access">
      <p>
        Step-free access is via our rear entrance, which leads straight to the
        Front Stalls and Stalls Bar. Several wheelchair positions with
        removable seats are available in the auditorium, and the back two rows
        of the Royal Stalls are entirely step-free.
      </p>
    </DetailBlock>
    <DetailBlock icon={Ear} title="Hearing support">
      <p>
        Our ListenIR infrared system covers the whole auditorium. Borrow a
        headset from the Theatre Shop for a refundable £5 deposit, or bring
        your own earphones to use with our receivers.
      </p>
    </DetailBlock>
    <DetailBlock icon={Sparkles} title="Assisted performances">
      <p>
        Selected performances are audio described live via headset (please
        book at least 24 hours ahead). Relaxed performances adapt lighting and
        sound for anyone on the autism spectrum or with sensory needs, with
        freedom to move around. BSL interpreted and captioned dates are
        announced each season.
      </p>
    </DetailBlock>
    <DetailBlock icon={PawPrint} title="Assistance dogs">
      <p>
        Assistance dogs are very welcome. Tell the box office when you book
        and we will reserve seating at the end of a row with plenty of space.
      </p>
    </DetailBlock>
    <DetailBlock icon={HeartHandshake} title="Companion tickets">
      <p>
        Complimentary companion and carer tickets are available with proof of
        eligibility, such as DLA, PIP or a Blue Badge. Register once with our
        access scheme and every future booking is effortless.
      </p>
    </DetailBlock>
  </>
);

const SeatingDetail = () => (
  <>
    <div className="rounded-2xl bg-ink p-4 md:p-6">
      <SeatMap
        data={{ venue, sold: new Set() }}
        selected={new Map()}
        onToggle={() => {}}
        interactive={false}
      />
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
      {Object.values(priceBands).map((band) => (
        <span
          key={band.id}
          className="flex items-center gap-2 text-sm text-cocoa-muted"
        >
          <span
            className="h-3.5 w-3.5 rounded-full"
            style={{ backgroundColor: band.color }}
            aria-hidden="true"
          />
          {band.name} · £{band.price.toFixed(2)}
          {band.id === "BOX" && " (restricted view)"}
        </span>
      ))}
    </div>
    <DetailBlock icon={Theater} title="Choosing your seat">
      <p>
        The auditorium sits on two levels, with the Front Stalls and Royal
        Stalls below and the Circle above. You choose your exact seats when
        you book, so you always know your view before you pay.
      </p>
      <p>
        Our four boxes beside the stage all have a restricted view. For box
        availability, please contact the box office on 01753 853 888 and the
        team will talk you through it.
      </p>
    </DetailBlock>
  </>
);

const BarsDetail = () => (
  <>
    <DetailBlock icon={GlassWater} title="Three bars, open early">
      <p>
        Our three bars and front of house areas open one hour before curtain
        up, their walls lined with the theatre's photography collection.
        Arrive early and settle in.
      </p>
    </DetailBlock>
    <DetailBlock icon={Wine} title="Pre-order when you book">
      <p>
        Add any of these to your basket when booking online, or call the box
        office. Your interval order will be waiting at the bar.
      </p>
      <PriceList>
        <PriceRow
          item="Nicolas Feuillate Champagne, bottle (£55.75 at the bar)"
          price="£50"
        />
        <PriceRow item="Jules Feraud Cuvée de Réserve Brut, half bottle" price="£22" />
        <PriceRow item="Apericena Prosecco, bottle" price="£26" />
        <PriceRow
          item="Drinks voucher: beer, cider, 175ml wine or a spirit and mixer"
          price="£7"
        />
        <PriceRow item="Beechdean ice cream voucher" price="£3.50" />
      </PriceList>
      <p className="mt-3">
        Ice cream flavours include Luxury Vanilla, Chocolate Truffle, Eton
        Mess and Salted Caramel, with vegan options available.
      </p>
    </DetailBlock>
  </>
);

const detailContent: Record<CardId, { title: string; body: ReactNode; wide?: boolean }> = {
  "getting-here": { title: "Getting Here", body: <GettingHereDetail /> },
  access: { title: "Access for All", body: <AccessDetail /> },
  seating: { title: "Seating Plan", body: <SeatingDetail />, wide: true },
  bars: { title: "Bars & Interval Drinks", body: <BarsDetail /> },
};

const Visit = () => {
  const [active, setActive] = useState<CardId | null>(null);

  const page: InfoPage | null = active
    ? {
        eyebrow: "Your visit",
        title: detailContent[active].title,
        wide: detailContent[active].wide,
        body: detailContent[active].body,
      }
    : null;

  return (
    <section
      id="visit"
      aria-label="Plan your visit"
      className="bg-parchment py-28 text-cocoa md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="eyebrow text-crimson">Your visit</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Make an <span className="italic text-crimson">evening</span> of it
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-cocoa-muted md:text-lg">
            Everything you need for the perfect trip to the theatre, from
            directions and seating to interval drinks waiting at the bar.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-3xl border border-cocoa/10 bg-cream p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_24px_48px_rgba(61,49,37,0.15)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson/10 text-crimson transition-colors duration-500 group-hover:bg-crimson group-hover:text-cream">
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold">
                {card.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-cocoa-muted">
                {card.copy}
              </p>
              <button
                type="button"
                onClick={() => setActive(card.id)}
                className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-crimson transition-colors duration-300 hover:text-gold-deep"
              >
                {card.link}
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <InfoModal page={page} onClose={() => setActive(null)} />
    </section>
  );
};

export default Visit;
