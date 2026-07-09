/**
 * Ticketing data layer.
 *
 * Everything the booking UI consumes goes through the `TicketingApi` and
 * `PaymentProvider` interfaces at the bottom of this file. The demo ships
 * mock implementations with generated data; going live means writing an
 * adapter for the theatre's real platform (Spektrix, Ticketsolve, Stripe,
 * Opayo...) with the same signatures. The UI never changes.
 */

export type BandId = "A" | "B" | "C" | "D" | "BOX";

export interface PriceBand {
  id: BandId;
  name: string;
  price: number;
  color: string;
}

export interface Seat {
  id: string;
  section: string;
  row: string;
  num: number;
  x: number;
  y: number;
  band: BandId;
}

export interface VenueSection {
  id: string;
  name: string;
  labelY: number;
  labelX?: number;
  labelSize?: number;
  note?: string;
  seats: Seat[];
}

export interface Venue {
  width: number;
  height: number;
  sections: VenueSection[];
}

export interface Performance {
  id: string;
  showId: string;
  iso: string;
  dateLabel: string;
  timeLabel: string;
  soldPct: number;
}

export interface SeatMapData {
  venue: Venue;
  sold: Set<string>;
}

export interface CheckoutResult {
  reference: string;
}

export const priceBands: Record<BandId, PriceBand> = {
  A: { id: "A", name: "Price A", price: 28.0, color: "#c9a24b" },
  B: { id: "B", name: "Price B", price: 23.0, color: "#a52a3d" },
  C: { id: "C", name: "Price C", price: 21.5, color: "#6f8aa5" },
  D: { id: "D", name: "Price D", price: 19.5, color: "#7d9b76" },
  BOX: { id: "BOX", name: "Boxes", price: 28.0, color: "#9d84c9" },
};

/* ------------------------------------------------------------------ */
/* Deterministic PRNG so every performance has stable availability     */
/* ------------------------------------------------------------------ */

const hashStr = (s: string) => {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
};

const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ------------------------------------------------------------------ */
/* Venue generation, modelled on the real house:                       */
/* Front Stalls A–G and Royal Stalls H–R below, Circle A–J above,      */
/* plus four restricted-view boxes flanking the stage.                 */
/* ------------------------------------------------------------------ */

const CENTER_X = 500;
const SEAT_SPACING = 17;
const ROW_GAP = 25;

/** A row laid out as blocks of seats separated by aisles */
function segmentedRow(
  section: string,
  row: string,
  segments: number[],
  y: number,
  band: BandId,
  opts?: { gap?: number; curve?: number },
): Seat[] {
  const gap = opts?.gap ?? 18;
  const curve = opts?.curve ?? 0.0003;
  const total = segments.reduce((a, b) => a + b, 0);
  const width =
    (total - segments.length) * SEAT_SPACING + (segments.length - 1) * gap;
  const seats: Seat[] = [];
  let x = CENTER_X - width / 2;
  let num = 1;
  for (const segment of segments) {
    for (let i = 0; i < segment; i++) {
      const dx = x - CENTER_X;
      seats.push({
        id: `${section}-${row}${num}`,
        section,
        row,
        num,
        x,
        y: y + curve * dx * dx,
        band,
      });
      x += SEAT_SPACING;
      num++;
    }
    x += gap - SEAT_SPACING;
  }
  return seats;
}

/** A 2x2 box beside the stage */
function buildBox(id: string, name: string, x: number, y: number): VenueSection {
  const seats: Seat[] = [];
  const rows = ["A", "B"];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      seats.push({
        id: `${id}-${rows[r]}${c + 1}`,
        section: id,
        row: rows[r],
        num: c + 1,
        x: x + c * 19,
        y: y + r * 19,
        band: "BOX",
      });
    }
  }
  return {
    id,
    name,
    labelX: x + 9.5,
    labelY: y - 16,
    labelSize: 10.5,
    note: "Restricted view",
    seats,
  };
}

function buildVenue(): Venue {
  const frontRows: [string, number[]][] = [
    ["A", [5, 8, 5]],
    ["B", [5, 10, 5]],
    ["C", [6, 10, 6]],
    ["D", [6, 10, 6]],
    ["E", [6, 12, 6]],
    ["F", [6, 12, 6]],
    ["G", [7, 12, 7]],
  ];
  const frontStalls = frontRows.flatMap(([row, segments], i) =>
    segmentedRow("front-stalls", row, segments, 220 + i * ROW_GAP, "A"),
  );

  const royalRows: [string, number[]][] = [
    ["H", [7, 12, 7]],
    ["I", [7, 12, 7]],
    ["J", [7, 14, 7]],
    ["K", [7, 14, 7]],
    ["L", [7, 14, 7]],
    ["M", [7, 14, 7]],
    ["N", [7, 14, 7]],
    ["O", [7, 12, 7]],
    ["P", [7, 12, 7]],
    ["Q", [6, 12, 6]],
    ["R", [6, 10, 6]],
  ];
  const royalStalls = royalRows.flatMap(([row, segments], i) =>
    segmentedRow("royal-stalls", row, segments, 435 + i * ROW_GAP, "B"),
  );

  // Circle: three full rows, then winged rows with a wide gap each side
  const circleRows: [string, number[], number][] = [
    ["A", [6, 8, 6], 18],
    ["B", [6, 10, 6], 18],
    ["C", [6, 10, 6], 18],
    ["D", [5, 12, 5], 48],
    ["E", [5, 12, 5], 48],
    ["F", [5, 12, 5], 48],
    ["G", [5, 12, 5], 48],
    ["H", [5, 12, 5], 48],
    ["I", [5, 12, 5], 48],
    ["J", [5, 12, 5], 48],
  ];
  const circle = circleRows.flatMap(([row, segments, gap], i) =>
    segmentedRow("circle", row, segments, 755 + i * ROW_GAP, i < 5 ? "C" : "D", {
      gap,
      curve: 0.00035,
    }),
  );

  return {
    width: 1000,
    height: 1035,
    sections: [
      buildBox("box-circle-6", "Circle Box 6", 140, 95),
      buildBox("box-stalls-5", "Royal Stalls Box 5", 140, 178),
      buildBox("box-circle-3", "Circle Box 3", 841, 95),
      buildBox("box-stalls-2", "Royal Stalls Box 2", 841, 178),
      { id: "front-stalls", name: "Front Stalls", labelY: 200, seats: frontStalls },
      { id: "royal-stalls", name: "Royal Stalls", labelY: 415, seats: royalStalls },
      { id: "circle", name: "Circle", labelY: 735, seats: circle },
    ],
  };
}

export const venue = buildVenue();
export const seatCount = venue.sections.reduce(
  (n, s) => n + s.seats.length,
  0,
);

export const sectionName = (id: string) =>
  venue.sections.find((s) => s.id === id)?.name ?? id;

/* ------------------------------------------------------------------ */
/* Performance schedules per show                                      */
/* ------------------------------------------------------------------ */

const runs: Record<string, { start: string; end: string }> = {
  "our-man-in-havana": { start: "2026-07-01", end: "2026-07-11" },
  "hidden-dangers-of-camping": { start: "2026-07-17", end: "2026-07-25" },
  "we-will-rock-you": { start: "2026-08-19", end: "2026-08-22" },
  "heathers-the-musical": { start: "2026-08-26", end: "2026-08-29" },
  "twelve-angry-men": { start: "2026-09-03", end: "2026-09-12" },
  "jack-and-the-beanstalk": { start: "2026-11-20", end: "2027-01-10" },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const soldPctFor = (performanceId: string) => {
  const rand = mulberry32(hashStr(performanceId));
  return 0.25 + rand() * 0.55;
};

function generatePerformances(showId: string): Performance[] {
  const run = runs[showId];
  if (!run) return [];
  const performances: Performance[] = [];
  const day = new Date(`${run.start}T12:00:00`);
  const end = new Date(`${run.end}T12:00:00`);

  while (day <= end && performances.length < 12) {
    const dow = day.getDay();
    if (dow !== 0) {
      const iso = day.toISOString().slice(0, 10);
      const slots = dow === 4 || dow === 6 ? ["2:30 PM", "7:30 PM"] : ["7:30 PM"];
      for (const timeLabel of slots) {
        if (performances.length >= 12) break;
        const id = `${showId}_${iso}_${timeLabel.replace(/[\s:]/g, "")}`;
        performances.push({
          id,
          showId,
          iso,
          dateLabel: dateFmt.format(day),
          timeLabel,
          soldPct: soldPctFor(id),
        });
      }
    }
    day.setDate(day.getDate() + 1);
  }
  return performances;
}

function computeSold(performanceId: string): Set<string> {
  const rand = mulberry32(hashStr(performanceId) ^ 0x9e3779b9);
  const soldPct = soldPctFor(performanceId);
  const sold = new Set<string>();
  for (const section of venue.sections) {
    for (const seat of section.seats) {
      // premium seats sell first; boxes are usually sold via the box office
      const weight =
        seat.band === "A"
          ? 1.15
          : seat.band === "B"
            ? 1
            : seat.band === "BOX"
              ? 0.45
              : 0.8;
      if (rand() < soldPct * weight) sold.add(seat.id);
    }
  }
  return sold;
}

/* ------------------------------------------------------------------ */
/* Swappable service interfaces (the "plug in their data" seam)        */
/* ------------------------------------------------------------------ */

export interface TicketingApi {
  getPerformances(showId: string): Promise<Performance[]>;
  getSeatMap(performanceId: string): Promise<SeatMapData>;
}

export interface PaymentProvider {
  beginCheckout(total: number, seats: Seat[]): Promise<CheckoutResult>;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/** Demo implementation. Replace with a Spektrix/Ticketsolve adapter. */
export const ticketingApi: TicketingApi = {
  async getPerformances(showId) {
    await delay(450);
    return generatePerformances(showId);
  },
  async getSeatMap(performanceId) {
    await delay(600);
    return { venue, sold: computeSold(performanceId) };
  },
};

/** Demo implementation. Replace with Stripe/Opayo or a platform basket. */
export const paymentProvider: PaymentProvider = {
  async beginCheckout(_total, seats) {
    await delay(1400);
    const rand = mulberry32(hashStr(seats.map((s) => s.id).join()));
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let ref = "RTW-";
    for (let i = 0; i < 6; i++) {
      ref += chars[Math.floor(rand() * chars.length)];
    }
    return { reference: ref };
  },
};

export const formatPrice = (n: number) =>
  `£${n.toFixed(2).replace(/\.00$/, "")}`;
