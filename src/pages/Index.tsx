
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StyleGallery from '@/components/StyleGallery';
import About from '@/components/About';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />
      <Hero />
      <StyleGallery />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
