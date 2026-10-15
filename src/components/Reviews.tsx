import React, { useEffect, useRef } from 'react';
import { REVIEWS, BUSINESS_INFO } from '../data/dabbaData';
import { Star, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const marqueeBadges = [
    'Pure Cow Ghee Used Daily',
    'BTM 2nd Stage Local Kitchen',
    'Zero Soda & Measured Low Oil',
    'Fresh Rotis Off Iron Tawa',
    'Guaranteed Hot Lunch Delivery',
    'Over 4.9★ Average Rating on Maps',
  ];

  const headingWords = ["Trusted", "By", "BTM", "Locals"];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Heading Word-by-Word Scrub Text-Fill Reveal
      const words = headingRef.current?.querySelectorAll('.reviews-fill-word');
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

      // 2. Reviews Cards entrance: y 60->0, opacity 0->1, scale 0.96->1, stagger 0.12s
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#171715] text-[#F8F5EF] relative overflow-hidden"
    >
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-10 w-[380px] h-[380px] rounded-full bg-[#E7AA3C]/5 filter blur-[110px] pointer-events-none" />

      {/* Infinite Marquee Strip with Pause on Hover */}
      <div className="mb-14 overflow-hidden border-y border-[#292925] bg-[#141412] py-3 select-none">
        <div className="animate-marquee flex items-center gap-8">
          {[...marqueeBadges, ...marqueeBadges].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/70 font-sans-clean font-medium shrink-0">
              <Sparkles className="h-3 w-3 text-[#E7AA3C]" />
              <span>{item}</span>
              <span className="text-white/20">·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold mb-2">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Real Customer Words</span>
            </div>
            <h2
              ref={headingRef}
              className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF]"
            >
              {headingWords.map((word, i) => (
                <span key={i} className="reviews-fill-word inline-block mr-2.5 sm:mr-3.5 will-change-transform">
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#E7AA3C] hover:text-white transition-colors group"
          >
            <span>Read More on Google Maps</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Reviews Grid with Staggered Fade-Up & -8px Hover Lift */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#1C1C18] border border-[#2E2E28] hover:border-[#E7AA3C]/50 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_25px_rgba(231,170,60,0.1)] transition-all duration-300 flex flex-col justify-between shimmer-card will-change-transform"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#E7AA3C] text-[#E7AA3C]" />
                  ))}
                  <span className="text-xs text-white/40 ml-2 font-mono">5.0</span>
                </div>

                {/* Review Text */}
                <p className="font-sans-clean text-sm text-[#E8E2D8]/85 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Context Info */}
              <div className="pt-4 border-t border-[#292925] flex items-center justify-between">
                <div>
                  <h4 className="font-sans-clean text-sm font-semibold text-[#F8F5EF]">
                    {rev.author}
                  </h4>
                  <div className="text-xs text-white/50 font-sans-clean">
                    {rev.role} · {rev.location}
                  </div>
                </div>
                <span className="text-[11px] text-white/30 font-mono">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
