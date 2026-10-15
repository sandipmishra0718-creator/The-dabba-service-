import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Flame, Heart, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/dabbaData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const visualImgRef = useRef<HTMLImageElement>(null);

  const headingWords = [
    { text: "Everyday", isAccent: false },
    { text: "Meals.", isAccent: false, breakAfter: true },
    { text: "A", isAccent: true },
    { text: "Little", isAccent: true },
    { text: "Closer", isAccent: true },
    { text: "to", isAccent: true },
    { text: "Home.", isAccent: true },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-Linked Theme Flip (Dark -> Warm Ivory Off-White -> Dark)
      if (sectionRef.current) {
        // Transition into light
        gsap.fromTo(
          sectionRef.current,
          {
            backgroundColor: '#171715',
            color: '#F8F5EF',
          },
          {
            backgroundColor: '#F8F5EF',
            color: '#171715',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: true,
            },
          }
        );

        // Transition back to dark on exit towards next section
        gsap.to(sectionRef.current, {
          backgroundColor: '#171715',
          color: '#F8F5EF',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom 60%',
            end: 'bottom 10%',
            scrub: true,
          },
        });
      }

      // 2. Heading Word-by-Word Scrub Text-Fill Reveal (0.2 opacity -> full color)
      const words = headingRef.current?.querySelectorAll('.story-fill-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.08,
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

      // 3. Visual Card Slow Zoom (scale 1.1 -> 1) on scroll
      if (visualImgRef.current && sectionRef.current) {
        gsap.fromTo(
          visualImgRef.current,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'bottom 30%',
              scrub: true,
            },
          }
        );
      }

      // 4. Parallax speed difference (Left visual 0.8x vs Right text 1.2x)
      if (leftColRef.current && rightColRef.current && sectionRef.current) {
        gsap.to(leftColRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(rightColRef.current, {
          y: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden transition-colors duration-700"
    >
      {/* Subtle ambient warm glow */}
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-[#E7AA3C]/10 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Layout: Image on one side, Editorial Prose on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Anchor */}
          <div ref={leftColRef} className="lg:col-span-6 relative will-change-transform">
            <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-[#33332D] shadow-[0_20px_50px_rgba(0,0,0,0.25)] group">
              <img
                ref={visualImgRef}
                src="/src/assets/images/story_fresh_rotis_1792079800638.jpg"
                alt="Fresh whole wheat roti puffed on iron tawa with pure ghee"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center will-change-transform"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 shadow-lg text-white">
                <p className="font-editorial text-lg italic text-[#F8F5EF]">
                  &ldquo;Puffed fresh on iron tawa, brushed with real ghee.&rdquo;
                </p>
                <span className="font-sans-clean text-xs text-white/70">
                  Cooked in small batches for genuine ghar jaisa swad.
                </span>
              </div>
            </div>

            {/* Floating Sticker with Infinite Yoyo Up-Down */}
            <div className="absolute -top-4 -right-4 sm:-right-6 w-24 h-24 rounded-full bg-[#B92326] text-white flex flex-col items-center justify-center p-2 text-center shadow-[0_8px_25px_rgba(185,35,38,0.4)] border-2 border-white/20 animate-float-yoyo hover:scale-105 transition-transform z-20">
              <span className="font-editorial text-xl italic font-bold">100%</span>
              <span className="font-sans-clean text-[9px] uppercase tracking-wider font-semibold leading-tight">
                Pure Veg Tiffin
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Core Values */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col justify-center will-change-transform">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Roots in BTM 2nd Stage</span>
            </div>

            {/* Large Editorial Heading with Word-by-Word Scrub Fill */}
            <h2
              ref={headingRef}
              className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-[1.12] mb-6"
            >
              {headingWords.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className={`story-fill-word inline-block mr-2.5 sm:mr-3.5 will-change-transform ${
                      item.isAccent ? 'italic text-[#B92326]' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                  {item.breakAfter && <br />}
                </React.Fragment>
              ))}
            </h2>

            {/* Concise Story Copy */}
            <p className="font-sans-clean text-base opacity-85 leading-relaxed mb-6 font-normal">
              Started in Sunshine Colony, BTM 2nd Stage, The Dabba Central was built around a very simple human craving: eating food that feels like it came straight from your family&apos;s kitchen, not a heavy restaurant or oil-laden takeaway.
            </p>

            <p className="font-sans-clean text-sm opacity-75 leading-relaxed mb-8 font-normal">
              Every meal box is balanced for everyday living — tender rotis, wholesome seasonal vegetables, tempered lentils, and fragrant rice. We keep our spices mild, our oil measured, and our delivery punctual, so your daily meals remain a comforting routine.
            </p>

            {/* Clean Feature List without Pill Slop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shrink-0 text-[#E7AA3C]">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-sans-clean text-sm font-semibold">Fresh Everyday Sabzi</h4>
                  <p className="font-sans-clean text-xs opacity-60 mt-0.5">Varied seasonal vegetables cooked fresh each morning and evening.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shrink-0 text-[#E7AA3C]">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-sans-clean text-sm font-semibold">Light on Digestion</h4>
                  <p className="font-sans-clean text-xs opacity-60 mt-0.5">Low-oil recipes crafted for daily sustenance without afternoon lethargy.</p>
                </div>
              </div>
            </div>

            {/* Link to Menu and Call Action */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B92326] hover:text-[#a01c1f] transition-colors group"
              >
                <span>View Today&apos;s Dabba Menu</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="opacity-40">·</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="text-xs opacity-70 hover:opacity-100 transition-opacity"
              >
                Speak with kitchen: {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
