import React, { useState, useEffect, useRef } from 'react';
import { TIFFIN_PLANS } from '../data/dabbaData';
import { TiffinPlan } from '../types';
import { Check, Calendar, ArrowRight, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TiffinPlansProps {
  onSelectPlanForInquiry: (plan: TiffinPlan) => void;
}

export const TiffinPlans: React.FC<TiffinPlansProps> = ({ onSelectPlanForInquiry }) => {
  const [selectedDiet, setSelectedDiet] = useState<'veg' | 'jain'>('veg');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headingWords = ["Flexible", "Tiffin", "Plans"];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Heading Word-by-Word Scrub Text-Fill Reveal
      const words = headingRef.current?.querySelectorAll('.plans-fill-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
      }

      // 2. Cards entrance: y 60->0, opacity 0->1, scale 0.96->1, stagger 0.12s, start "top 80%"
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );

        // 3. Inside cards: tags/chips pop-in
        gsap.fromTo(
          '.plan-tag-chip',
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#171715] text-[#F8F5EF] relative overflow-hidden"
    >
      {/* Ambient Saffron Glow behind the plans grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#E7AA3C]/7 filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold mb-3">
            <Calendar className="h-3.5 w-3.5" />
            <span>Curated Everyday Plans</span>
          </div>
          <h2
            ref={headingRef}
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF]"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="plans-fill-word inline-block mr-2.5 sm:mr-3.5 will-change-transform">
                {word}
              </span>
            ))}
          </h2>
          <p className="font-sans-clean text-sm sm:text-base text-[#E8E2D8]/70 mt-4 leading-relaxed">
            Designed for working professionals, students, and families in BTM Layout. Choose flexible single-day trials or monthly memberships with hassle-free pause policies.
          </p>

          {/* Interactive Dietary Preference Selector with smooth pill transition */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#23231F] rounded-lg border border-[#33332D] shadow-md">
            <button
              onClick={() => setSelectedDiet('veg')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 ${
                selectedDiet === 'veg'
                  ? 'bg-[#B92326] text-white shadow-[0_2px_10px_rgba(185,35,38,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Standard Homestyle Veg
            </button>
            <button
              onClick={() => setSelectedDiet('jain')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 ${
                selectedDiet === 'jain'
                  ? 'bg-[#B92326] text-white shadow-[0_2px_10px_rgba(185,35,38,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Jain Preparation (No Onion / Garlic)
            </button>
          </div>
        </div>

        {/* 3-Column Plan Grid with Staggered Fade-Up & -8px Hover Lift */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {TIFFIN_PLANS.map((plan) => {
            const isRec = plan.recommended;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 shimmer-card will-change-transform ${
                  isRec
                    ? 'bg-[#22221D] border-2 border-[#E7AA3C] shadow-[0_16px_50px_rgba(231,170,60,0.18)] lg:-translate-y-2 hover:-translate-y-3.5 hover:shadow-[0_24px_60px_rgba(231,170,60,0.25)]'
                    : 'bg-[#1C1C18] border border-[#33332D] hover:border-white/30 hover:-translate-y-2 shadow-lg'
                }`}
              >
                {/* Recommended Tag */}
                {isRec && (
                  <div className="plan-tag-chip absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E7AA3C] text-[#171715] text-[11px] font-sans-clean font-bold uppercase tracking-wider shadow will-change-transform">
                    Most Popular in BTM
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-editorial text-3xl text-[#F8F5EF]">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="font-sans-clean text-xs text-[#E8E2D8]/70 mb-6 min-h-[36px]">
                    {plan.subtitle}
                  </p>

                  {/* Pricing Display */}
                  <div className="p-4 rounded-xl bg-[#171715] border border-white/5 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-editorial text-3xl sm:text-4xl text-[#F8F5EF] font-bold tabular-nums">
                        ₹{plan.pricePerMeal}
                      </span>
                      <span className="text-xs text-white/50 font-sans-clean">
                        / meal approx
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#E7AA3C] mt-1">
                      {plan.totalPriceText}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] uppercase tracking-wider text-white/40 block font-semibold">
                      Plan Highlights:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E8E2D8]/80 leading-snug">
                        <Check className="h-4 w-4 text-[#E7AA3C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div className="pt-4 border-t border-[#292925]">
                  <button
                    onClick={() => onSelectPlanForInquiry(plan)}
                    className={`w-full py-3.5 px-4 rounded-lg font-sans-clean text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                      isRec
                        ? 'bg-[#B92326] hover:bg-[#a01c1f] text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-[#F8F5EF]'
                    }`}
                  >
                    <span>Inquire About {plan.name.split('/')[0]}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="mt-3 text-center text-[11px] text-white/40 flex items-center justify-center gap-1">
                    <HelpCircle className="h-3 w-3" />
                    <span>Free pause or cancel anytime</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Corporate & Bulk Tiffin Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#20201C] via-[#2A2A24] to-[#20201C] border border-[#383832] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="font-editorial text-2xl sm:text-3xl text-[#F8F5EF]">
              Are you an Office, PG, or Co-working Space in South Bengaluru?
            </h4>
            <p className="font-sans-clean text-xs sm:text-sm text-white/70 mt-1">
              We provide customized daily bulk tiffin batches and corporate thalis with dedicated hot-delivery logistics.
            </p>
          </div>
          <button
            onClick={() => {
              const bulkPlan: TiffinPlan = {
                id: 'corporate-bulk',
                name: 'Corporate / Bulk Dabbas',
                subtitle: 'Special corporate rate for teams & PGs',
                pricePerMeal: 85,
                totalPriceText: 'Custom batch quotation',
                durationDays: 30,
                mealOptions: ['Lunch', 'Dinner'],
                features: ['Customized menus', 'Direct delivery to pantry', 'Monthly invoice']
              };
              onSelectPlanForInquiry(bulkPlan);
            }}
            className="px-6 py-3 rounded-lg bg-[#E7AA3C] hover:bg-[#d89b30] text-[#171715] font-sans-clean text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-transform active:scale-95 shadow-md"
          >
            Inquire Bulk Rates
          </button>
        </div>

      </div>
    </section>
  );
};
