import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryStripProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'all',
      name: 'All Creations',
      subtitle: 'Complete Dabba Menu',
      image: '/src/assets/images/hero_tiffin_spread_1792079798650.jpg',
    },
    {
      id: 'thalis',
      name: 'Executive Thalis',
      subtitle: 'Roti + 2 Sabzi + Dal + Rice',
      image: '/src/assets/images/dish_executive_thali_1792079801892.jpg',
    },
    {
      id: 'rice-bowls',
      name: 'Punjabi Rice Bowls',
      subtitle: 'Rajma / Chole with Basmati',
      image: '/src/assets/images/dish_rajma_chawal_1792079803065.jpg',
    },
    {
      id: 'roti-combos',
      name: 'Tawa Phulka Combos',
      subtitle: '100% Whole Wheat & Ghee',
      image: '/src/assets/images/story_fresh_rotis_1792079800638.jpg',
    },
    {
      id: 'comfort-meals',
      name: 'Moong Dal Khichdi',
      subtitle: 'Desi Ghee Comfort Meals',
      image: '/src/assets/images/dish_dal_khichdi_1792079803408.jpg',
    },
  ];

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    // Scroll-Linked 3D Reveal (starts rotateX 25deg, scale 0.88 -> levels to rotateX 0, scale 1)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          rotateX: 25,
          scale: 0.88,
          transformPerspective: 1200,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        },
        {
          rotateX: 0,
          scale: 1,
          y: -20,
          boxShadow: '0 30px 60px rgba(0,0,0,0.9), 0 0 35px rgba(231,170,60,0.14)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 50%',
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="categories"
      ref={containerRef}
      className="perspective-container relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        ref={cardRef}
        className="bg-[#20201C] border border-[#33332D] rounded-2xl p-4 sm:p-6 shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(231,170,60,0.06)] backdrop-blur-md relative overflow-hidden will-change-transform"
      >
        {/* Subtle top amber highlight line inspired by Reference Video edge glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E7AA3C]/40 to-transparent" />

        {/* Section Heading Label */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#33332D]">
          <div>
            <span className="font-editorial text-xl sm:text-2xl text-[#F8F5EF] italic">
              Explore By Daily Cravings
            </span>
            <p className="font-sans-clean text-xs text-white/50">
              Select a category to filter today&apos;s fresh menu
            </p>
          </div>
          <span className="hidden sm:inline-block font-sans-clean text-xs uppercase tracking-wider text-[#E7AA3C] font-semibold">
            Prepared Fresh Daily
          </span>
        </div>

        {/* Horizontal Category Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative text-left p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between shimmer-card ${
                  isActive
                    ? 'bg-[#B92326] border-[#B92326] text-white shadow-[0_8px_24px_rgba(185,35,38,0.35)] scale-[1.02]'
                    : 'bg-[#171715]/70 border-[#33332D] hover:border-[#E7AA3C]/50 hover:bg-[#252521] hover:-translate-y-1 text-[#F8F5EF]'
                }`}
              >
                {/* Round Image Thumbnail */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-3 border-2 shadow-md mx-auto transition-all duration-500 group-hover:scale-108 ${
                    isActive
                      ? 'border-white shadow-[0_0_16px_rgba(255,255,255,0.4)]'
                      : 'border-white/20 group-hover:border-[#E7AA3C]/70 group-hover:shadow-[0_0_14px_rgba(231,170,60,0.3)]'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center">
                  <h4 className="font-sans-clean text-sm font-semibold tracking-tight line-clamp-1 group-hover:text-white transition-colors">
                    {cat.name}
                  </h4>
                  <p
                    className={`font-sans-clean text-[11px] mt-0.5 line-clamp-1 ${
                      isActive ? 'text-white/90' : 'text-white/50 group-hover:text-white/80'
                    }`}
                  >
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
