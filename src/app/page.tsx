import Hero from "@/components/Hero";
import About from "@/components/About";
import RecentFeed from "@/components/RecentFeed";
import CtaBanner1 from "@/components/CtaBanner1";
import Testimonials from "@/components/Testimonials";
import ServicesShowcase from "@/components/ServicesShowcase";
import CtaBanner2 from "@/components/CtaBanner2";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <RecentFeed />
      <CtaBanner1 />
      <Testimonials />
      <ServicesShowcase />
      <CtaBanner2 />
      <Footer />
    </>
  );
}
