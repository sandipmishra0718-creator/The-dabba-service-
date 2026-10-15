import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    {
      src: '/src/assets/images/hero_tiffin_spread_1792079798650.jpg',
      title: 'Traditional Multi-Tier Steel Dabba Feast',
      category: 'Tiffin Packaging',
      desc: 'Steaming dal tadka, fresh seasonal paneer sabzi, golden roasted potatoes, jeera rice, and ghee phulkas.',
    },
    {
      src: '/src/assets/images/story_fresh_rotis_1792079800638.jpg',
      title: 'Iron Tawa Whole-Wheat Phulkas',
      category: 'Kitchen Craft',
      desc: 'Hand-rolled, flame-puffed daily with pure cow ghee.',
    },
    {
      src: '/src/assets/images/promo_dabba_banner_1792079801217.jpg',
      title: 'Executive 4-Compartment Meal Box',
      category: 'Daily Thali',
      desc: 'Hygienically compartmentalized lunch box ready for office desk delivery.',
    },
    {
      src: '/src/assets/images/dish_executive_thali_1792079801892.jpg',
      title: 'Homestyle North Indian Thali Spread',
      category: 'Executive Meal',
      desc: 'Complete nutrition balanced with lentils, greens, curd, salad, and soft rotis.',
    },
    {
      src: '/src/assets/images/dish_rajma_chawal_1792079803065.jpg',
      title: 'Slow-Simmered Punjabi Rajma Chawal',
      category: 'Special Rice Bowls',
      desc: 'Ginger juliennes, fresh coriander, and steamed aromatic basmati.',
    },
    {
      src: '/src/assets/images/dish_dal_khichdi_1792079803408.jpg',
      title: 'Comfort Moong Dal Khichdi & Papad',
      category: 'Comfort Dabba',
      desc: 'Light, restorative comfort meal with pure desi ghee tempering.',
    },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // 2. Photos Clip-Path Reveal (inset 100% -> 0) + Inner Scale (1.2 -> 1)
      const items = gridRef.current?.querySelectorAll('.gallery-card-item');
      if (items && items.length > 0) {
        items.forEach((item, index) => {
          const img = item.querySelector('.gallery-inner-img');
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
            },
          });

          tl.fromTo(
            item,
            { clipPath: 'inset(100% 0% 0% 0% round 16px)', opacity: 0.6 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 16px)',
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              delay: (index % 3) * 0.1,
            }
          );

          if (img) {
            tl.fromTo(
              img,
              { scale: 1.25 },
              {
                scale: 1,
                duration: 1.3,
                ease: 'power3.out',
              },
              '<'
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-[#1A1A17] text-[#F8F5EF] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-[#B92326]/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold mb-2">
            <Camera className="h-3.5 w-3.5" />
            <span>Kitchen & Food Archive</span>
          </div>
          <h2
            ref={headingRef}
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF]"
          >
            Real Kitchen Moments
          </h2>
          <p className="font-sans-clean text-xs sm:text-sm text-[#E8E2D8]/70 mt-3">
            An authentic glimpse into the meals, packaging, and artisanal cooking at The Dabba Central.
          </p>
        </div>

        {/* Gallery Grid with Clip-Path Reveal & Inner Zoom */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className="gallery-card-item group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#22221D] border border-[#33332D] cursor-pointer shadow-lg hover:border-[#E7AA3C]/60 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_25px_rgba(231,170,60,0.15)] transition-all duration-300 shimmer-card will-change-transform"
            >
              <img
                src={img.src}
                alt={img.title}
                className="gallery-inner-img w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-wider text-[#E7AA3C] font-semibold mb-1">
                  {img.category}
                </span>
                <h3 className="font-editorial text-2xl text-white leading-tight">
                  {img.title}
                </h3>
                <p className="font-sans-clean text-xs text-white/70 line-clamp-1 mt-1">
                  {img.desc}
                </p>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#1C1C18] border border-[#33332D] rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-[#B92326] text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[16/10] w-full bg-black overflow-hidden">
              <img
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <span className="text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold block mb-1">
                {galleryImages[activeImageIndex].category}
              </span>
              <h3 className="font-editorial text-3xl text-[#F8F5EF] mb-2">
                {galleryImages[activeImageIndex].title}
              </h3>
              <p className="font-sans-clean text-sm text-[#E8E2D8]/80 leading-relaxed">
                {galleryImages[activeImageIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
