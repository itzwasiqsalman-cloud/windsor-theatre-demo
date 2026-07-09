import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { BookingProvider } from "@/components/booking/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import WhatsOn from "@/pages/WhatsOn";
import Pantomime from "@/pages/Pantomime";
import GiftVouchers from "@/pages/GiftVouchers";
import InfoPageView from "@/pages/InfoPageView";
import { infoPages } from "@/data/infoPages";

/** Scrolls to top on route change, or to the hash target when present */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Give the page a frame to render before scrolling to the anchor
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <BookingProvider>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whats-on" element={<WhatsOn />} />
        <Route path="/pantomime" element={<Pantomime />} />
        <Route path="/gift-vouchers" element={<GiftVouchers />} />
        {Object.keys(infoPages)
          .filter((id) => id !== "pantomime" && id !== "gift-vouchers")
          .map((id) => (
            <Route
              key={id}
              path={`/${id}`}
              element={<InfoPageView id={id} />}
            />
          ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BookingProvider>
  </BrowserRouter>
);

export default App;
