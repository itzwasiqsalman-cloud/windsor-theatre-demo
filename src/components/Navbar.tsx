import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Crown, Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavChild {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "What's On", to: "/whats-on" },
  {
    label: "Information",
    children: [
      { label: "Digital Brochure", to: "/digital-brochure" },
      { label: "Pantomime", to: "/pantomime" },
      { label: "Gift Vouchers", to: "/gift-vouchers" },
      { label: "Theatre Tours", to: "/theatre-tours" },
      { label: "Community Shows", to: "/community-shows" },
      { label: "Booking Information", to: "/booking-information" },
    ],
  },
  { label: "Your Visit", to: "/#visit" },
  {
    label: "Get Involved",
    children: [
      { label: "Membership", to: "/#membership" },
      { label: "Creative Learning", to: "/creative-learning" },
      { label: "Community Shows", to: "/community-shows" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "About Us", to: "/about-us" },
      { label: "Our History", to: "/history" },
      { label: "Off Script", to: "/off-script" },
      { label: "Private Hire", to: "/private-hire" },
      { label: "Technical", to: "/technical" },
      { label: "Work With Us", to: "/work-with-us" },
      { label: "Contact Us", to: "/contact-us" },
    ],
  },
];

const Logo = () => (
  <Link to="/" className="group flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
      <Crown className="h-5 w-5" aria-hidden="true" />
    </span>
    <span className="leading-tight">
      <span className="block font-display text-lg font-semibold tracking-wide text-cream">
        Royal Theatre
      </span>
      <span className="eyebrow block text-[0.6rem] text-gold">
        Windsor · Est. 1793
      </span>
    </span>
  </Link>
);

const Navbar = () => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // On the home page the utility bar appears after scrolling down from the
  // hero; on every other page it is always present.
  const utility = !isHome || scrolledPastHero;

  useEffect(() => {
    const onScroll = () =>
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset transient menu state when the bars swap or the route changes
  useEffect(() => {
    setOpen(false);
    setDropdown(null);
    setMobileSection(null);
  }, [utility, pathname]);

  // Close the desktop dropdown when clicking elsewhere or pressing Escape
  useEffect(() => {
    if (!dropdown) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdown(null);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdown(null);
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  const closeMenus = () => {
    setDropdown(null);
    setOpen(false);
  };

  const childLink = (child: NavChild) => (
    <Link
      to={child.to}
      onClick={closeMenus}
      className="block rounded-lg px-4 py-2.5 text-sm text-cream/80 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
    >
      {child.label}
    </Link>
  );

  const hamburger = (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen((v) => !v)}
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );

  const mobileMenu: ReactNode = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-gold/15 bg-ink/95 backdrop-blur-md lg:hidden"
        >
          <ul className="space-y-1 px-5 py-4">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={mobileSection === item.label}
                    onClick={() =>
                      setMobileSection(
                        mobileSection === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base text-cream/90 transition-colors hover:bg-ink-raised hover:text-gold"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileSection === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {mobileSection === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pl-3"
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>{childLink(child)}</li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to!}
                    onClick={closeMenus}
                    className="block rounded-lg px-3 py-3 text-base text-cream/90 transition-colors hover:bg-ink-raised hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li className="pt-2">
              <Link
                to="/whats-on"
                onClick={closeMenus}
                className="block rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-ink"
              >
                Book Tickets
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence initial={false}>
      {!utility ? (
        /* Minimal bar over the hero: just the brand and the essentials */
        <motion.header
          key="hero-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-50"
        >
          <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
            <Logo />
            <div className="flex items-center gap-5">
              <a
                href="tel:01753853888"
                className="hidden items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-gold md:flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                01753 853 888
              </a>
              <Link
                to="/whats-on"
                className="hidden rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.45)] sm:block"
              >
                Book Tickets
              </Link>
              {hamburger}
            </div>
          </nav>
          {mobileMenu}
        </motion.header>
      ) : (
        /* Utility bar: slides down with the full navigation */
        <motion.header
          key="utility-bar"
          initial={{ y: -96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -96, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-ink/90 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          <nav
            ref={navRef}
            className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8"
          >
            <Logo />

            <ul className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) =>
                item.children ? (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDropdown(item.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={dropdown === item.label}
                      aria-haspopup="true"
                      onClick={() =>
                        setDropdown(dropdown === item.label ? null : item.label)
                      }
                      className={`group flex cursor-pointer items-center gap-1.5 py-2 text-sm font-medium transition-colors duration-300 ${
                        dropdown === item.label
                          ? "text-gold"
                          : "text-cream/80 hover:text-gold"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          dropdown === item.label ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {dropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-2"
                        >
                          <ul className="overflow-hidden rounded-2xl border border-gold/20 bg-ink/95 p-2 shadow-[0_24px_48px_rgba(0,0,0,0.5)] backdrop-blur-md">
                            {item.children.map((child) => (
                              <li key={child.label}>{childLink(child)}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      to={item.to!}
                      className="group relative py-2 text-sm font-medium text-cream/80 transition-colors duration-300 hover:text-gold"
                    >
                      {item.label}
                      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="hidden items-center gap-5 lg:flex">
              <a
                href="tel:01753853888"
                className="flex items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                01753 853 888
              </a>
              <Link
                to="/whats-on"
                className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.45)]"
              >
                Book Tickets
              </Link>
            </div>

            {hamburger}
          </nav>
          {mobileMenu}
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
