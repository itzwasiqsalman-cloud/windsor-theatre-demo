import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X, type LucideIcon } from "lucide-react";

/* Shared building blocks for information modals (light parchment theme) */

export const DetailBlock = ({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) => (
  <section className="border-t border-cocoa/10 py-5 first:border-t-0 first:pt-0 last:pb-0">
    <h4 className="flex items-center gap-2.5 font-display text-lg font-semibold text-cocoa">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-crimson">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      {title}
    </h4>
    <div className="mt-3 space-y-2 text-sm font-light leading-relaxed text-cocoa-muted">
      {children}
    </div>
  </section>
);

export const PriceRow = ({ item, price }: { item: string; price: string }) => (
  <li className="flex items-baseline justify-between gap-4 py-1.5">
    <span>{item}</span>
    <span className="shrink-0 font-medium tabular-nums text-cocoa">{price}</span>
  </li>
);

export const PriceList = ({ children }: { children: ReactNode }) => (
  <ul className="mt-3 divide-y divide-cocoa/10 rounded-2xl border border-cocoa/10 bg-cream px-5 py-2">
    {children}
  </ul>
);

export interface InfoPage {
  eyebrow: string;
  title: string;
  wide?: boolean;
  body: ReactNode;
}

interface InfoModalProps {
  page: InfoPage | null;
  onClose: () => void;
}

const InfoModal = ({ page, onClose }: InfoModalProps) => {
  useEffect(() => {
    if (!page) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [page, onClose]);

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={page.title}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-ink/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-gold/40 bg-parchment shadow-[0_40px_90px_rgba(0,0,0,0.55)] ${
              page.wide ? "max-w-4xl" : "max-w-2xl"
            }`}
          >
            <header className="flex items-center justify-between gap-4 border-b border-cocoa/10 px-6 py-5 md:px-8">
              <div>
                <p className="eyebrow text-[0.6rem] text-crimson">
                  {page.eyebrow}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-cocoa md:text-3xl">
                  {page.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-cocoa/15 text-cocoa/70 transition-colors duration-300 hover:border-crimson hover:text-crimson"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
              {page.body}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-cocoa/10 bg-cream px-6 py-4 md:px-8">
              <p className="text-xs text-cocoa-muted">
                Questions? Our box office team is here to help.
              </p>
              <a
                href="tel:01753853888"
                className="flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-crimson-bright"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                01753 853 888
              </a>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
