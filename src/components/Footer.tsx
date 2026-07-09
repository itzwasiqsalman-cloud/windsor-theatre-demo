import { Crown, Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  {
    heading: "What's On",
    links: [
      { label: "All Shows", to: "/whats-on" },
      { label: "Pantomime", to: "/pantomime" },
      { label: "Gift Vouchers", to: "/gift-vouchers" },
      { label: "Booking Information", to: "/booking-information" },
    ],
  },
  {
    heading: "Your Visit",
    links: [
      { label: "Getting Here", to: "/#visit" },
      { label: "Accessibility", to: "/#visit" },
      { label: "Seating Plan", to: "/#visit" },
      { label: "Theatre Tours", to: "/theatre-tours" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our History", to: "/history" },
      { label: "Private Hire", to: "/private-hire" },
      { label: "Creative Learning", to: "/creative-learning" },
      { label: "Work With Us", to: "/work-with-us" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-gold/15 bg-ink pb-10 pt-20 text-cream">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Crown className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-wide">
                Royal Theatre
              </span>
              <span className="eyebrow block text-[0.6rem] text-gold">
                Windsor · Est. 1793
              </span>
            </span>
          </Link>
          <address className="mt-6 space-y-3 text-sm not-italic font-light text-cream/60">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              32 Thames Street, Windsor, Berkshire SL4 1PS
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href="tel:01753853888"
                className="transition-colors hover:text-gold"
              >
                Box Office: 01753 853 888
              </a>
            </p>
          </address>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "Twitter" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="eyebrow text-[0.65rem] text-gold">{col.heading}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-light text-cream/60 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/40 md:flex-row">
        <p>
          © {new Date().getFullYear()} Royal Theatre Windsor. Demonstration
          website, not affiliated with Theatre Royal Windsor.
        </p>
        <p>Crafted for the love of live theatre.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
