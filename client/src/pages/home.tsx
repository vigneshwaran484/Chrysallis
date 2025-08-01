import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import EventsSection from "@/components/events-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
