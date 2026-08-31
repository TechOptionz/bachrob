import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-w-[320px]">
      <TopBar />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
