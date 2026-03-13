import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import HowItWorks from "@/components/HowItWorks";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <HowItWorks />
      <InterestForm />
      <Footer />
    </main>
  );
}
