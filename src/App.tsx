import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { BrandLoader } from './components/BrandLoader';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { CategoryStrip } from './components/CategoryStrip';
import { BrandStory } from './components/BrandStory';
import { SignatureMeals } from './components/SignatureMeals';
import { TiffinPlans } from './components/TiffinPlans';
import { PromoBanner } from './components/PromoBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Reviews } from './components/Reviews';
import { Gallery } from './components/Gallery';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { OrderInquiryModal } from './components/OrderInquiryModal';
import { MenuItem, TiffinPlan } from './types';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from './data/dabbaData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Order Inquiry Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MenuItem | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<TiffinPlan | null>(null);

  // Initialize Lenis Smooth Scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Scroll Progress Bar at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenOrderModal = () => {
    setSelectedMeal(null);
    setSelectedPlan(null);
    setIsOrderModalOpen(true);
  };

  const handleSelectMealForOrder = (meal: MenuItem) => {
    setSelectedMeal(meal);
    setSelectedPlan(null);
    setIsOrderModalOpen(true);
  };

  const handleSelectPlanForInquiry = (plan: TiffinPlan) => {
    setSelectedPlan(plan);
    setSelectedMeal(null);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#171715] text-[#F8F5EF] flex flex-col font-sans-clean selection:bg-[#B92326] selection:text-white relative">
      
      {/* Scroll Progress Bar at the very top of page */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B92326] via-[#E7AA3C] to-[#B92326] z-50 origin-left pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(231,170,60,0.8)]"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Custom Cursor (Dot + Follower Ring) */}
      <CustomCursor />

      {/* Brand Intro Loader */}
      {isLoading && <BrandLoader onComplete={() => setIsLoading(false)} />}

      {/* Floating Transparent Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Fullscreen Mobile Navigation Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero onOpenOrderModal={handleOpenOrderModal} loaderFinished={!isLoading} />

        {/* Section 2: Horizontal Category Strip */}
        <CategoryStrip
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            const menuElement = document.getElementById('menu');
            if (menuElement) {
              menuElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Section 3: Brand Story */}
        <BrandStory />

        {/* Section 4: Signature Meals */}
        <SignatureMeals
          activeCategory={activeCategory}
          onSelectMealForOrder={handleSelectMealForOrder}
        />

        {/* Section 5: Tiffin Plans */}
        <TiffinPlans onSelectPlanForInquiry={handleSelectPlanForInquiry} />

        {/* Section 6: Editorial Promotional Banner */}
        <PromoBanner onOpenOrderModal={handleOpenOrderModal} />

        {/* Section 7: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 8: Customer Reviews */}
        <Reviews />

        {/* Section 9: Gallery */}
        <Gallery />

        {/* Section 10: Location & Contact */}
        <LocationContact onOpenOrderModal={handleOpenOrderModal} />
      </main>

      {/* Section 11: Footer */}
      <Footer />

      {/* Order / Inquiry Modal */}
      <OrderInquiryModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedMeal={selectedMeal}
        preselectedPlan={selectedPlan}
      />

      {/* Mobile Floating Action Pill (adheres to <= 15% sticky cap) */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden flex items-center gap-2">
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          aria-label="Call Kitchen"
          className="h-12 w-12 rounded-full bg-[#171715] border border-white/20 text-[#E7AA3C] flex items-center justify-center shadow-2xl active:scale-95"
        >
          <Phone className="h-5 w-5" />
        </a>
        <button
          onClick={handleOpenOrderModal}
          className="h-12 px-4 rounded-full bg-[#B92326] text-white text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 active:scale-95 border border-red-500/30"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Order Dabba</span>
        </button>
      </div>

    </div>
  );
}
