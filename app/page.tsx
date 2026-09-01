import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-w-[320px]">
      <TopBar />
      <Nav />
      <Hero />
      {/* Higher stacking context than the sticky hero — this whole block
          scrolls up and covers the pinned hero (Fusion-style curtain). The
          curved, shadowed top edge overlaps the hero so the navy shows
          behind the corners and the white sheet reads as a separate layer. */}
      <div className="relative z-10 -mt-16 overflow-hidden rounded-t-[50%_48px] bg-cream shadow-[0_-26px_44px_-10px_rgba(18,25,42,0.28)] md:rounded-t-[50%_72px]">
        <main>
          <Services />
          <About />
          <Resources />
          <Contact />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
