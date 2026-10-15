import React, { useState, useEffect, useRef } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/dabbaData';
import { Plus, Check, Info, Flame, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SignatureMealsProps {
  activeCategory: string;
  onSelectMealForOrder: (meal: MenuItem) => void;
}

export const SignatureMeals: React.FC<SignatureMealsProps> = ({
  activeCategory,
  onSelectMealForOrder,
}) => {
  const [selectedMealForDetail, setSelectedMealForDetail] = useState<MenuItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Heading Word-by-Word Scrub Text-Fill Reveal
      const words = headingRef.current?.querySelectorAll('.menu-fill-word');
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

        // 3. Inside cards: tags/chips pop-in: scale 0.8->1, stagger 0.08s, back.out
        gsap.fromTo(
          '.meal-tag-chip',
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

        // 4. Visual dish images slow zoom: scale 1.1 -> 1 on scroll
        gsap.fromTo(
          '.meal-img-zoom',
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const headingWords = ["Signature", "Daily", "Dabbas"];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-20 bg-[#1F1F1B] text-[#F8F5EF] relative overflow-hidden"
    >
      {/* Subtle ambient light orb */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-[#E7AA3C]/6 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Warm Food Styling */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B92326] font-semibold mb-2">
            <Flame className="h-3.5 w-3.5" />
            <span>Daily Kitchen Selection</span>
          </div>
          <h2
            ref={headingRef}
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF] tracking-tight"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="menu-fill-word inline-block mr-2.5 sm:mr-3.5 will-change-transform">
                {word}
              </span>
            ))}
          </h2>
          <p className="font-sans-clean text-sm text-[#E8E2D8]/70 mt-3">
            Freshly prepared home-style meals with rotational seasonal sabzis and warm phulkas.
          </p>
        </div>

        {/* Product Grid with Staggered Fade-Up & -8px Hover Lift */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((meal) => (
            <div
              key={meal.id}
              className="group bg-[#171715] rounded-2xl border border-[#33332D] overflow-hidden flex flex-col justify-between hover:border-[#E7AA3C]/60 transition-all duration-300 shadow-xl hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(231,170,60,0.16)] shimmer-card will-change-transform"
            >
              <div>
                {/* Product Image Slot with Fallback Container & Badges */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#252521]">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="meal-img-zoom w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171715] via-transparent to-transparent opacity-80" />

                  {/* Veg Indicator Stamp */}
                  <div className="meal-tag-chip absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm border border-emerald-500/40 text-[11px] font-sans-clean font-medium text-emerald-400 will-change-transform">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Pure Veg</span>
                  </div>

                  {meal.isPopular && (
                    <div className="meal-tag-chip absolute top-4 right-4 px-2.5 py-1 rounded bg-[#B92326] text-white text-[10px] font-semibold uppercase tracking-wider shadow will-change-transform">
                      Daily Favorite
                    </div>
                  )}

                  {/* Quick Detail View Trigger */}
                  <button
                    onClick={() => setSelectedMealForDetail(meal)}
                    aria-label={`View details for ${meal.name}`}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-sm transition-colors border border-white/10"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="font-editorial text-2xl text-[#F8F5EF] group-hover:text-[#E7AA3C] transition-colors leading-tight">
                      {meal.name}
                    </h3>
                  </div>

                  {meal.hindiName && (
                    <div className="text-xs text-[#E7AA3C]/80 font-sans-clean mb-2">
                      {meal.hindiName}
                    </div>
                  )}

                  <p className="font-sans-clean text-xs text-[#E8E2D8]/70 line-clamp-2 leading-relaxed mb-4">
                    {meal.description}
                  </p>

                  {/* Includes List (Top 3 items) */}
                  <div className="border-t border-[#292925] pt-3 mb-4 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                      Box Contents:
                    </span>
                    {meal.includes.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                        <Check className="h-3 w-3 text-[#E7AA3C] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {meal.includes.length > 3 && (
                      <span className="text-[11px] text-white/40 italic block pt-0.5">
                        +{meal.includes.length - 3} more items included
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#292925] flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Price / Dabba</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-2xl text-[#F8F5EF] tabular-nums font-semibold">
                      ₹{meal.price}
                    </span>
                    <span className="text-[11px] text-white/50 font-sans-clean">all incl.</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectMealForOrder(meal)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B92326] hover:bg-[#a01c1f] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 group/btn"
                >
                  <Plus className="h-3.5 w-3.5 group-hover/btn:rotate-90 transition-transform" />
                  <span>Order Now</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center text-xs text-white/50 flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#E7AA3C]" />
          <span>Need customized spices, no-onion-garlic (Jain), or diet preferences? Tell us during inquiry.</span>
        </div>

      </div>

      {/* Quick Meal Detail Modal */}
      {selectedMealForDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedMealForDetail(null)}
        >
          <div
            className="bg-[#1F1F1B] border border-[#33332D] rounded-2xl max-w-lg w-full p-6 text-[#F8F5EF] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-black">
              <img
                src={selectedMealForDetail.image}
                alt={selectedMealForDetail.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-editorial text-3xl text-[#F8F5EF]">
                  {selectedMealForDetail.name}
                </h3>
                <span className="text-xs text-[#E7AA3C] font-sans-clean">
                  {selectedMealForDetail.hindiName}
                </span>
              </div>
              <span className="font-editorial text-3xl text-white font-bold tabular-nums">
                ₹{selectedMealForDetail.price}
              </span>
            </div>

            <p className="font-sans-clean text-sm text-[#E8E2D8]/80 mb-4">
              {selectedMealForDetail.description}
            </p>

            <div className="bg-[#171715] p-4 rounded-xl border border-white/5 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">
                Complete Box Inclusions:
              </h4>
              <ul className="space-y-1.5 text-xs text-white/80">
                {selectedMealForDetail.includes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const m = selectedMealForDetail;
                  setSelectedMealForDetail(null);
                  onSelectMealForOrder(m);
                }}
                className="flex-1 py-3 px-4 bg-[#B92326] hover:bg-[#a01c1f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all text-center shadow-lg"
              >
                Order This Dabba
              </button>
              <button
                onClick={() => setSelectedMealForDetail(null)}
                className="py-3 px-5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
