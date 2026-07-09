import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Show } from "@/data/shows";
import BookingModal from "@/components/booking/BookingModal";

interface BookingContextValue {
  openBooking: (show: Show) => void;
}

const BookingContext = createContext<BookingContextValue>({
  openBooking: () => {},
});

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<Show | null>(null);
  const openBooking = useCallback((s: Show) => setShow(s), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal show={show} onClose={() => setShow(null)} />
    </BookingContext.Provider>
  );
};
