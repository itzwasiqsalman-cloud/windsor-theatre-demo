import { BookingProvider } from "@/components/booking/BookingContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShowsMarquee from "@/components/ShowsMarquee";
import About from "@/components/About";
import Visit from "@/components/Visit";
import Membership from "@/components/Membership";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const App = () => (
  <BookingProvider>
    <Navbar />
    <main>
      <Hero />
      <ShowsMarquee />
      <About />
      <Visit />
      <Membership />
      <Newsletter />
    </main>
    <Footer />
  </BookingProvider>
);

export default App;
