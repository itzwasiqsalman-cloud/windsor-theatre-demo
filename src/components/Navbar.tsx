import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Crown, Menu, Phone, X } from "lucide-react";
import InfoModal from "@/components/InfoModal";
import { getInfoPage } from "@/data/infoPages";

interface NavChild {
  label: string;
  page?: string; // opens an info modal
  href?: string; // scrolls to a section
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "What's On", href: "#whats-on" },
  {
    label: "Information",
    children: [
      { label: "Digital Brochure", page: "digital-brochure" },
      { label: "Pantomime", page: "pantomime" },
      { label: "Gift Vouchers", page: "gift-vouchers" },
      { label: "Theatre Tours", page: "theatre-tours" },
      { label: "Community Shows", page: "community-shows" },
      { label: "Booking Information", page: "booking-information" },
    ],
  },
  { label: "Your Visit", href: "#visit" },
  {
    label: "Get Involved",
    children: [
      { label: "Membership", href: "#membership" },
      { label: "Creative Learning", page: "creative-learning" },
      { label: "Community Shows", page: "community-shows" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "About Us", page: "about-us" },
      { label: "Our History", page: "history" },
      { label: "Off Script", page: "off-script" },
      { label: "Private Hire", page: "private-hire" },
      { label: "Technical", page: "technical" },
      { label: "Work With Us", page: "work-with-us" },
      { label: "Contact Us", page: "contact-us" },
    ],
  },
];

const Logo = () => (
  <a href="#top" className="group flex items-center gap-3">
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
  </a>
);

const Navbar = () => {
  const [utility, setUtility] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // The utility bar appears once the visitor scrolls down from the hero
  useEffect(() => {
    const onScroll = () => setUtility(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset transient menu state when the bars swap
  useEffect(() => {
    setOpen(false);
    setDropdown(null);
    setMobileSection(null);
  }, [utility]);

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

  const openPage = (page: string) => {
    setActivePage(page);
    setDropdown(null);
    setOpen(false);
  };

  const childAction = (child: NavChild) =>
    child.page ? (
      <button
        type="button"
        onClick={() => openPage(child.page!)}
        className="block w-full cursor-pointer rounded-lg px-4 py-2.5 text-left text-sm text-cream/80 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
      >
        {child.label}
      </button>
    ) : (
      <a
        href={child.href}
        onClick={() => {
          setDropdown(null);
          setOpen(false);
        }}
        className="block rounded-lg px-4 py-2.5 text-sm text-cream/80 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
      >
        {child.label}
      </a>
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
                          <li key={child.label}>{childAction(child)}</li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-cream/90 transition-colors hover:bg-ink-raised hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
            <li className="pt-2">
              <a
                href="#whats-on"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-ink"
              >
                Book Tickets
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
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
                <a
                  href="#whats-on"
                  className="hidden rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.45)] sm:block"
                >
                  Book Tickets
                </a>
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
                          setDropdown(
                            dropdown === item.label ? null : item.label,
                          )
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
                                <li key={child.label}>{childAction(child)}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="group relative py-2 text-sm font-medium text-cream/80 transition-colors duration-300 hover:text-gold"
                      >
                        {item.label}
                        <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                      </a>
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
                <a
                  href="#whats-on"
                  className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.45)]"
                >
                  Book Tickets
                </a>
              </div>

              {hamburger}
            </nav>
            {mobileMenu}
          </motion.header>
        )}
      </AnimatePresence>

      <InfoModal
        page={activePage ? getInfoPage(activePage) : null}
        onClose={() => setActivePage(null)}
      />
    </>
  );
};

export default Navbar;
