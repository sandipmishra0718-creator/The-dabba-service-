import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/dabbaData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PromoBannerProps {
  onOpenOrderModal: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenOrderModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (cardRef.current && containerRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            rotateX: 25,
            scale: 0.85,
            y: 0,
            boxShadow: '0 12px 30px rgba(185,35,38,0.2)',
          },
          {
            rotateX: 0,
            scale: 1,
            y: -60,
            boxShadow: '0 35px 80px rgba(185,35,38,0.5), 0 0 40px rgba(231,170,60,0.25)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'bottom 50%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-28 bg-[#171715] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-container">
        
        {/* Banner Outer Card with Deep Red Palette & 3D Scroll Reveal */}
        <div
          ref={cardRef}
          style={{ transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
          className="relative rounded-3xl bg-gradient-to-br from-[#B92326] via-[#9e1b1e] to-[#7a1215] overflow-hidden border border-red-700/50 will-change-transform"
        >
          
          {/* Luminous Horizon Arc at the bottom inspired by Reference Video 0:36-0:38 */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[110%] h-40 rounded-[100%] bg-gradient-to-t from-[#E7AA3C]/35 via-[#E7AA3C]/10 to-transparent blur-xl pointer-events-none horizon-glow" />

          {/* Diagonal Ambient Light Highlight */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
            
            {/* Left Content Column (Layered Text & CTAs) */}
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 z-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 text-[#F8F5EF] text-xs font-sans-clean font-medium mb-6 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(231,170,60,0.2)]">
                <Clock className="h-3.5 w-3.5 text-[#E7AA3C]" />
                <span>Daily Fresh Cooking Schedule</span>
              </div>

              {/* Editorial Display Headline */}
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF] leading-[1.08] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Your Everyday Meal, <br />
                <span className="italic text-[#E8E2D8]">Made Simple.</span>
              </h2>

              <p className="font-sans-clean text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mb-8">
                Skip the daily cooking hassle, grocery runs, and heavy takeaway grease. Wholesome home-cooked lunches and dinners delivered hot right to your doorstep in BTM 2nd Stage and nearby areas.
              </p>

              {/* Kitchen Timing Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
                <div className="p-3 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm hover:border-[#E7AA3C]/50 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block font-semibold">
                    Lunch Dispatch
                  </span>
                  <span className="font-sans-clean text-sm font-semibold text-white">
                    {BUSINESS_INFO.lunchHours}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm hover:border-[#E7AA3C]/50 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block font-semibold">
                    Dinner Dispatch
                  </span>
                  <span className="font-sans-clean text-sm font-semibold text-white">
                    {BUSINESS_INFO.dinnerHours}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenOrderModal}
                  className="px-8 py-4 rounded-xl bg-[#F8F5EF] hover:bg-white text-[#B92326] font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 active:scale-95 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Order Your Dabba</span>
                  <ArrowUpRight className="h-4 w-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="px-6 py-4 rounded-xl bg-black/35 hover:bg-black/55 text-white font-sans-clean text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20 text-center hover:border-white/40"
                >
                  Call Kitchen: {BUSINESS_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-white/75">
                <ShieldCheck className="h-4 w-4 text-[#E7AA3C]" />
                <span>Zero Soda · Low Oil · Hand-kneaded Whole Wheat</span>
              </div>

            </div>

            {/* Right Media Column: Large Authentic Food Photo */}
            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[380px] relative overflow-hidden">
              <img
                src="/src/assets/images/promo_dabba_banner_1792079801217.jpg"
                alt="The Central Deluxe Feast Dabba arrangement"
                className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#B92326] via-transparent to-transparent opacity-80" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
