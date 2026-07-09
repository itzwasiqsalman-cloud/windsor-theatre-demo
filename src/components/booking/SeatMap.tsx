import { memo, type KeyboardEvent } from "react";
import { priceBands, type SeatMapData, type Seat } from "@/data/booking";

interface SeatMapProps {
  data: SeatMapData;
  selected: Map<string, Seat>;
  onToggle: (seat: Seat) => void;
  /** When false, renders a non-clickable plan view (used by the seating plan page) */
  interactive?: boolean;
}

const SOLD_COLOR = "#3a332c";

/**
 * SVG rendering of the house. Seats are real buttons: clickable,
 * keyboard-focusable, with native tooltips via <title>.
 */
const SeatMap = memo(
  ({ data, selected, onToggle, interactive = true }: SeatMapProps) => {
    const { venue, sold } = data;

  return (
    <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <svg
        viewBox={`0 0 ${venue.width} ${venue.height}`}
        className="mx-auto block min-w-[640px] max-w-4xl"
        role="group"
        aria-label="Auditorium seat map"
      >
        {/* Stage */}
        <rect
          x={venue.width / 2 - 180}
          y={60}
          width={360}
          height={64}
          rx={14}
          fill="none"
          stroke="#c9a24b"
          strokeOpacity={0.5}
        />
        <text
          x={venue.width / 2}
          y={100}
          textAnchor="middle"
          fill="#c9a24b"
          fontSize={20}
          letterSpacing={10}
          fontFamily="Inter, sans-serif"
        >
          STAGE
        </text>

        {venue.sections.map((section) => (
          <g key={section.id}>
            <text
              x={section.labelX ?? venue.width / 2}
              y={section.labelY}
              textAnchor="middle"
              fill="#f7f1e6"
              opacity={0.45}
              fontSize={section.labelSize ?? 15}
              letterSpacing={(section.labelSize ?? 15) < 12 ? 0.5 : 5}
              fontFamily="Inter, sans-serif"
            >
              {(section.labelSize ?? 15) < 12
                ? section.name
                : section.name.toUpperCase()}
            </text>
            {section.seats.map((seat) => {
              const isSold = sold.has(seat.id);
              const isSelected = selected.has(seat.id);
              const band = priceBands[seat.band];
              const note = section.note ? `, ${section.note.toLowerCase()}` : "";
              const label = isSold
                ? `${section.name} row ${seat.row} seat ${seat.num}, unavailable`
                : `${section.name} row ${seat.row} seat ${seat.num}, ${band.name}, £${band.price.toFixed(2)}${note}${isSelected ? ", selected" : ""}`;
              const a11yProps = interactive
                ? {
                    role: "button",
                    "aria-label": label,
                    "aria-pressed": isSelected,
                    "aria-disabled": isSold,
                    tabIndex: isSold ? -1 : 0,
                    onClick: () => !isSold && onToggle(seat),
                    onKeyDown: (e: KeyboardEvent) => {
                      if (!isSold && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        onToggle(seat);
                      }
                    },
                  }
                : { "aria-label": label };
              return (
                <circle
                  key={seat.id}
                  cx={seat.x}
                  cy={seat.y}
                  r={isSelected ? 8 : 6.5}
                  fill={isSold ? SOLD_COLOR : isSelected ? "#ffffff" : band.color}
                  stroke={isSelected ? "#c9a24b" : "none"}
                  strokeWidth={isSelected ? 3.5 : 0}
                  opacity={isSold ? 0.55 : 1}
                  style={{
                    cursor: !interactive
                      ? "default"
                      : isSold
                        ? "not-allowed"
                        : "pointer",
                    transition: "r 150ms ease, fill 150ms ease",
                  }}
                  {...a11yProps}
                >
                  <title>{label}</title>
                </circle>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
});

SeatMap.displayName = "SeatMap";

export default SeatMap;
