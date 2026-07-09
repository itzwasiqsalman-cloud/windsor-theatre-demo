import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { getInfoPage } from "@/data/infoPages";

/** Renders any infoPages entry as a full page (parchment theme) */
const InfoPageView = ({ id }: { id: string }) => {
  const page = getInfoPage(id);
  if (!page) return null;

  return (
    <main className="bg-parchment pb-28 pt-32 text-cocoa md:pt-36">
      <div
        className={`mx-auto px-5 md:px-8 ${page.wide ? "max-w-5xl" : "max-w-3xl"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-colors duration-300 hover:text-gold-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <p className="eyebrow mt-8 text-crimson">{page.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl font-semibold md:text-6xl">
            {page.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          {page.body}
        </motion.div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold/40 bg-cream px-7 py-6">
          <p className="text-sm text-cocoa-muted">
            Questions? Our box office team is here to help.
          </p>
          <a
            href="tel:01753853888"
            className="flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-crimson-bright"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            01753 853 888
          </a>
        </div>
      </div>
    </main>
  );
};

export default InfoPageView;
