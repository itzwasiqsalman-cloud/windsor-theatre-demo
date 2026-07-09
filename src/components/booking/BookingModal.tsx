import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Info,
  Loader2,
  Ticket,
  X,
} from "lucide-react";
import type { Show } from "@/data/shows";
import {
  formatPrice,
  paymentProvider,
  priceBands,
  sectionName,
  ticketingApi,
  type Performance,
  type Seat,
  type SeatMapData,
} from "@/data/booking";
import SeatMap from "@/components/booking/SeatMap";

type Step = "dates" | "seats" | "checkout" | "confirmed";

const MAX_SEATS = 9;

const stepLabels: { key: Step; label: string }[] = [
  { key: "dates", label: "Date" },
  { key: "seats", label: "Seats" },
  { key: "checkout", label: "Pay" },
];

const availabilityPill = (soldPct: number) =>
  soldPct < 0.45
    ? { text: "Good availability", cls: "bg-gold/15 text-gold" }
    : soldPct < 0.65
      ? { text: "Limited", cls: "bg-cream/10 text-cream/70" }
      : { text: "Selling fast", cls: "bg-crimson/25 text-crimson-bright" };

const Spinner = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-24 text-cream/60">
    <Loader2 className="h-8 w-8 animate-spin text-gold" aria-hidden="true" />
    <p className="text-sm">{label}</p>
  </div>
);

interface BookingModalProps {
  show: Show | null;
  onClose: () => void;
}

const BookingModal = ({ show, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<Step>("dates");
  const [performances, setPerformances] = useState<Performance[] | null>(null);
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [seatMap, setSeatMap] = useState<SeatMapData | null>(null);
  const [selected, setSelected] = useState<Map<string, Seat>>(new Map());
  const [paying, setPaying] = useState(false);
  const [reference, setReference] = useState("");
  const [buyer, setBuyer] = useState({ name: "", email: "", card: "" });

  // Reset whenever a new show is opened
  useEffect(() => {
    if (!show) return;
    setStep("dates");
    setPerformances(null);
    setPerformance(null);
    setSeatMap(null);
    setSelected(new Map());
    setPaying(false);
    setReference("");
    ticketingApi.getPerformances(show.id).then(setPerformances);
  }, [show]);

  // Body scroll lock + Escape to close
  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [show, onClose]);

  const total = useMemo(
    () =>
      [...selected.values()].reduce(
        (sum, seat) => sum + priceBands[seat.band].price,
        0,
      ),
    [selected],
  );

  const pickPerformance = (perf: Performance) => {
    setPerformance(perf);
    setSeatMap(null);
    setSelected(new Map());
    setStep("seats");
    ticketingApi.getSeatMap(perf.id).then(setSeatMap);
  };

  const toggleSeat = (seat: Seat) => {
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else if (next.size < MAX_SEATS) next.set(seat.id, seat);
      return next;
    });
  };

  const submitPayment = async (e: FormEvent) => {
    e.preventDefault();
    if (paying) return;
    setPaying(true);
    const result = await paymentProvider.beginCheckout(total, [
      ...selected.values(),
    ]);
    setReference(result.reference);
    setPaying(false);
    setStep("confirmed");
  };

  const seatSummary = (seat: Seat) =>
    `${sectionName(seat.section)} · Row ${seat.row} · Seat ${seat.num}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Book tickets for ${show.title}`}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close booking"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-ink/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-gold/25 bg-ink-soft shadow-[0_40px_90px_rgba(0,0,0,0.65)]"
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-4 border-b border-gold/15 px-6 py-5 md:px-8">
              <div>
                <p className="eyebrow text-[0.6rem] text-gold">
                  {show.genre} · {show.dates}
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold text-cream md:text-3xl">
                  {show.title}
                </h2>
                {step !== "confirmed" && (
                  <nav aria-label="Booking steps" className="mt-3 flex gap-2">
                    {stepLabels.map((s, i) => {
                      const activeIdx = stepLabels.findIndex(
                        (x) => x.key === step,
                      );
                      const state =
                        i < activeIdx ? "done" : i === activeIdx ? "active" : "todo";
                      return (
                        <span
                          key={s.key}
                          className={`eyebrow rounded-full px-3 py-1 text-[0.55rem] ${
                            state === "active"
                              ? "bg-gold text-ink"
                              : state === "done"
                                ? "bg-gold/20 text-gold"
                                : "bg-cream/5 text-cream/40"
                          }`}
                        >
                          {i + 1} · {s.label}
                        </span>
                      );
                    })}
                  </nav>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* STEP 1: performance picker */}
                {step === "dates" && (
                  <motion.div
                    key="dates"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 md:p-8"
                  >
                    {!performances ? (
                      <Spinner label="Fetching performances..." />
                    ) : (
                      <>
                        <h3 className="font-display text-lg text-cream/90">
                          Choose a performance
                        </h3>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {performances.map((perf) => {
                            const pill = availabilityPill(perf.soldPct);
                            return (
                              <li key={perf.id}>
                                <button
                                  type="button"
                                  onClick={() => pickPerformance(perf)}
                                  className="group w-full cursor-pointer rounded-2xl border border-cream/10 bg-ink px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]"
                                >
                                  <span className="flex items-center gap-2 text-sm font-semibold text-cream">
                                    <CalendarDays
                                      className="h-4 w-4 text-gold"
                                      aria-hidden="true"
                                    />
                                    {perf.dateLabel}
                                  </span>
                                  <span className="mt-1 block text-sm text-cream/60">
                                    {perf.timeLabel}
                                  </span>
                                  <span
                                    className={`eyebrow mt-3 inline-block rounded-full px-2.5 py-1 text-[0.5rem] ${pill.cls}`}
                                  >
                                    {pill.text}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: seat map */}
                {step === "seats" && performance && (
                  <motion.div
                    key="seats"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setStep("dates")}
                          className="flex cursor-pointer items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-gold"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                          {performance.dateLabel} · {performance.timeLabel}
                        </button>
                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          {Object.values(priceBands).map((band) => (
                            <span
                              key={band.id}
                              className="flex items-center gap-1.5 text-xs text-cream/70"
                            >
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: band.color }}
                                aria-hidden="true"
                              />
                              {formatPrice(band.price)}
                            </span>
                          ))}
                          <span className="flex items-center gap-1.5 text-xs text-cream/50">
                            <span
                              className="h-3 w-3 rounded-full bg-[#3a332c]"
                              aria-hidden="true"
                            />
                            Sold
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        {!seatMap ? (
                          <Spinner label="Loading live availability..." />
                        ) : (
                          <>
                            <SeatMap
                              data={seatMap}
                              selected={selected}
                              onToggle={toggleSeat}
                            />
                            <p className="mt-3 text-center text-xs text-cream/45">
                              Boxes have a restricted view. For box
                              availability, call the box office on 01753 853
                              888.
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Basket */}
                    <aside className="w-full shrink-0 lg:w-72">
                      <div className="rounded-2xl border border-gold/20 bg-ink p-5">
                        <h3 className="flex items-center gap-2 font-display text-lg text-cream">
                          <Ticket className="h-4 w-4 text-gold" aria-hidden="true" />
                          Your seats
                        </h3>
                        {selected.size === 0 ? (
                          <p className="mt-3 text-sm font-light text-cream/50">
                            Tap up to {MAX_SEATS} seats on the plan to add them
                            here.
                          </p>
                        ) : (
                          <ul className="mt-3 space-y-2">
                            {[...selected.values()].map((seat) => (
                              <li
                                key={seat.id}
                                className="flex items-center justify-between gap-2 text-sm text-cream/80"
                              >
                                <span>{seatSummary(seat)}</span>
                                <span className="shrink-0 tabular-nums text-gold">
                                  {formatPrice(priceBands[seat.band].price)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-4 text-sm">
                          <span className="text-cream/60">Total</span>
                          <span className="font-semibold tabular-nums text-cream">
                            {formatPrice(total)}
                          </span>
                        </div>
                        <button
                          type="button"
                          disabled={selected.size === 0}
                          onClick={() => setStep("checkout")}
                          className="mt-5 w-full cursor-pointer rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 enabled:hover:bg-gold-bright enabled:hover:shadow-[0_0_28px_rgba(201,162,75,0.45)] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Continue to payment
                        </button>
                      </div>
                    </aside>
                  </motion.div>
                )}

                {/* STEP 3: checkout */}
                {step === "checkout" && performance && (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto w-full max-w-xl p-6 md:p-8"
                  >
                    <button
                      type="button"
                      onClick={() => setStep("seats")}
                      className="flex cursor-pointer items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-gold"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back to seats
                    </button>

                    <div className="mt-5 rounded-2xl border border-cream/10 bg-ink p-5 text-sm text-cream/80">
                      <p className="font-semibold text-cream">
                        {show.title} · {performance.dateLabel},{" "}
                        {performance.timeLabel}
                      </p>
                      <p className="mt-1">
                        {selected.size}{" "}
                        {selected.size === 1 ? "seat" : "seats"} ·{" "}
                        {[...selected.values()]
                          .map((s) => `${s.row}${s.num}`)
                          .join(", ")}
                      </p>
                      <p className="mt-2 font-semibold tabular-nums text-gold">
                        {formatPrice(total)}
                      </p>
                    </div>

                    <form onSubmit={submitPayment} className="mt-6 space-y-4">
                      <div>
                        <label
                          htmlFor="buyer-name"
                          className="mb-1.5 block text-xs font-medium text-cream/70"
                        >
                          Full name
                        </label>
                        <input
                          id="buyer-name"
                          required
                          autoComplete="name"
                          value={buyer.name}
                          onChange={(e) =>
                            setBuyer({ ...buyer, name: e.target.value })
                          }
                          className="w-full rounded-xl border border-cream/15 bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                          placeholder="Ada Lovelace"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="buyer-email"
                          className="mb-1.5 block text-xs font-medium text-cream/70"
                        >
                          Email for tickets
                        </label>
                        <input
                          id="buyer-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={buyer.email}
                          onChange={(e) =>
                            setBuyer({ ...buyer, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-cream/15 bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="buyer-card"
                          className="mb-1.5 block text-xs font-medium text-cream/70"
                        >
                          Card number
                        </label>
                        <div className="relative">
                          <CreditCard
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40"
                            aria-hidden="true"
                          />
                          <input
                            id="buyer-card"
                            required
                            inputMode="numeric"
                            autoComplete="cc-number"
                            value={buyer.card}
                            onChange={(e) =>
                              setBuyer({
                                ...buyer,
                                card: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 16)
                                  .replace(/(.{4})/g, "$1 ")
                                  .trim(),
                              })
                            }
                            className="w-full rounded-xl border border-cream/15 bg-ink py-3 pl-11 pr-4 text-sm tabular-nums text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                            placeholder="4242 4242 4242 4242"
                          />
                        </div>
                      </div>

                      <p className="flex items-start gap-2 rounded-xl bg-cream/5 px-4 py-3 text-xs leading-relaxed text-cream/55">
                        <Info
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        Demo checkout. In production this step hands off to the
                        theatre's own payment provider or ticketing platform
                        basket, so card details never touch the website.
                      </p>

                      <button
                        type="submit"
                        disabled={paying}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 enabled:hover:bg-gold-bright enabled:hover:shadow-[0_0_28px_rgba(201,162,75,0.45)] disabled:opacity-70"
                      >
                        {paying ? (
                          <>
                            <Loader2
                              className="h-4 w-4 animate-spin"
                              aria-hidden="true"
                            />
                            Processing...
                          </>
                        ) : (
                          <>Pay {formatPrice(total)}</>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 4: confirmation */}
                {step === "confirmed" && performance && (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto w-full max-w-lg p-8 text-center md:p-12"
                  >
                    <CheckCircle2
                      className="mx-auto h-14 w-14 text-gold"
                      aria-hidden="true"
                    />
                    <h3 className="mt-6 font-display text-3xl font-semibold text-cream">
                      See you at the theatre!
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-cream/65">
                      {selected.size}{" "}
                      {selected.size === 1 ? "ticket" : "tickets"} for{" "}
                      <span className="text-cream">{show.title}</span> on{" "}
                      {performance.dateLabel} at {performance.timeLabel}.
                      Seats {[...selected.values()]
                        .map((s) => `${s.row}${s.num}`)
                        .join(", ")}.
                    </p>
                    <p className="eyebrow mt-6 text-[0.6rem] text-cream/50">
                      Booking reference
                    </p>
                    <p className="mt-1 font-display text-2xl tracking-widest text-gold">
                      {reference}
                    </p>
                    <p className="mt-4 text-xs text-cream/45">
                      A confirmation email is on its way to {buyer.email}.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-8 cursor-pointer rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
