import Preloader from '@/components/Preloader';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Path from '@/components/sections/Path';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <About />
        <Path />
        <Services />
        <Work />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
