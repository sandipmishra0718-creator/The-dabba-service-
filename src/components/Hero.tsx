import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Clock, MapPin, Sparkles, Flame, ShieldCheck, Heart } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onOpenOrderModal: () => void;
  loaderFinished?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal, loaderFinished = true }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const lightStreakRef = useRef<HTMLDivElement>(null);
  const floatingBadgeLeftRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRightRef = useRef<HTMLDivElement>(null);

  const headlineWords = [
    { text: "Ghar", isAccent: false, isItalic: true },
    { text: "Jaisa", isAccent: false, isItalic: true },
    { text: "Khana.", isAccent: false, isItalic: true, breakAfter: true },
    { text: "Har", isAccent: false, isItalic: false },
    { text: "Din,", isAccent: false, isItalic: false },
    { text: "Fresh", isAccent: true, isItalic: false },
    { text: "Dabba.", isAccent: true, isItalic: false },
  ];

  // Sequence reveal after loader exits
  useEffect(() => {
    if (!loaderFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Diagonal light streak slides in from top-right corner
      if (lightStreakRef.current) {
        gsap.fromTo(
          lightStreakRef.current,
          { x: 120, y: -120, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }
        );
      }

      // 2. Heading words reveal: blur(14px)->0, y 30->0, opacity 0->1, stagger 0.08s
      tl.fromTo(
        '.hero-split-word',
        { opacity: 0, y: 30, filter: 'blur(14px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )
      // 3. Subtext reveal
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 25, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      // 4. Buttons reveal: stagger 0.12s
      .fromTo(
        ctaGroupRef.current?.children || [],
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      // 5. Facts bar reveal
      .fromTo(
        factsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );

      // Floating icons slow yoyo (y +-8px, 3-4s, random phase)
      if (floatingBadgeLeftRef.current) {
        gsap.to(floatingBadgeLeftRef.current, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (floatingBadgeRightRef.current) {
        gsap.to(floatingBadgeRightRef.current, {
          y: 8,
          duration: 3.8,
          delay: 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [loaderFinished]);

  // Subtle Mouse Parallax on Orb / Badges (Max 15px)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 30; // max ~15px
      const y = ((e.clientY / window.innerHeight) - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Magnetic Button Hover Physics for Primary & Secondary CTAs
  useEffect(() => {
    const setupMagnetic = (el: HTMLElement | null) => {
      if (!el) return () => {};

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, {
          x: relX * 0.32,
          y: relY * 0.32,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.4)',
        });
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    const cleanup1 = setupMagnetic(primaryBtnRef.current);
    const cleanup2 = setupMagnetic(secondaryBtnRef.current);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#171715]"
    >
      {/* Background Visual Layer: High-resolution cinematic food photography */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/hero_tiffin_spread_1792079798650.jpg"
          alt="Authentic Indian Home-style Tiffin spread by The Dabba Central"
          className="h-full w-full object-cover object-center scale-105 filter brightness-90"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Layered Cinematic Scrim: deep vignette and dark gradient overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171715] via-[#171715]/80 to-black/65" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Diagonal Orange/Brand-Color Light Streak that slides in and shimmers in a subtle loop */}
      <div
        ref={lightStreakRef}
        className="absolute -top-40 -right-20 w-[450px] sm:w-[700px] h-[550px] sm:h-[800px] pointer-events-none z-[1] will-change-transform"
      >
        <div className="w-full h-full bg-gradient-to-bl from-[#E7AA3C]/35 via-[#B92326]/20 to-transparent filter blur-[70px] transform rotate-[-22deg] animate-pulse-subtle" />
      </div>
      
      {/* Soft Ambient Warm Center Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#E7AA3C]/16 via-[#B92326]/12 to-transparent filter blur-[120px] pointer-events-none z-[1] will-change-transform"
        style={{
          transform: `translate3d(calc(-50% + ${mouseOffset.x}px), calc(-50% + ${mouseOffset.y}px), 0)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Floating Sticker Left: Pure Desi Ghee */}
      <div
        ref={floatingBadgeLeftRef}
        className="hidden lg:flex absolute left-8 xl:left-16 top-1/3 z-20 items-center gap-3 p-3.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.5)] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px, 0)`,
        }}
      >
        <div className="w-9 h-9 rounded-xl bg-[#E7AA3C]/20 border border-[#E7AA3C]/40 flex items-center justify-center text-[#E7AA3C]">
          <Flame className="h-5 w-5" />
        </div>
        <div className="text-left font-sans-clean">
          <div className="text-xs font-semibold text-[#F8F5EF]">Pure Cow Ghee</div>
          <div className="text-[10px] text-white/50">Hand-rolled hot phulkas</div>
        </div>
      </div>

      {/* Floating Sticker Right: 100% Homestyle */}
      <div
        ref={floatingBadgeRightRef}
        className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 z-20 items-center gap-3 p-3.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.5)] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.7}px, ${-mouseOffset.y * 0.7}px, 0)`,
        }}
      >
        <div className="w-9 h-9 rounded-xl bg-[#B92326]/20 border border-[#B92326]/40 flex items-center justify-center text-[#B92326]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="text-left font-sans-clean">
          <div className="text-xs font-semibold text-[#F8F5EF]">Zero Preservatives</div>
          <div className="text-[10px] text-white/50">Mild, measured spices</div>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center flex flex-col items-center">
        
        {/* Central Visual Badge with SVG Circuit-Style Thin Lines & Glowing Running Pulses */}
        <div className="relative mb-6">
          
          {/* Circuit Lines SVG Frame around the badge */}
          <svg
            className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none overflow-visible"
            viewBox="0 0 320 80"
            fill="none"
          >
            {/* Top Circuit Path */}
            <path
              d="M 10 40 L 40 10 L 280 10 L 310 40"
              stroke="rgba(231,170,60,0.25)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {/* Bottom Circuit Path */}
            <path
              d="M 10 40 L 40 70 L 280 70 L 310 40"
              stroke="rgba(231,170,60,0.25)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            
            {/* Pulse Dot 1 traveling along top circuit */}
            <circle r="2.5" fill="#E7AA3C" className="shadow-[0_0_8px_#E7AA3C]">
              <animateMotion
                path="M 10 40 L 40 10 L 280 10 L 310 40"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Pulse Dot 2 traveling along bottom circuit with delay */}
            <circle r="2.5" fill="#B92326" className="shadow-[0_0_8px_#B92326]">
              <animateMotion
                path="M 310 40 L 280 70 L 40 70 L 10 40"
                dur="4.8s"
                begin="1.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Micro junction nodes */}
            <circle cx="40" cy="10" r="1.5" fill="#E7AA3C" opacity="0.6" />
            <circle cx="280" cy="10" r="1.5" fill="#E7AA3C" opacity="0.6" />
            <circle cx="40" cy="70" r="1.5" fill="#E7AA3C" opacity="0.6" />
            <circle cx="280" cy="70" r="1.5" fill="#E7AA3C" opacity="0.6" />
          </svg>

          {/* Center Location Chip */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-[#E7AA3C]/35 text-xs text-[#F8F5EF] shadow-[0_0_25px_rgba(231,170,60,0.2)] will-change-transform"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
              transition: 'transform 0.25s ease-out',
            }}
          >
            <MapPin className="h-3.5 w-3.5 text-[#E7AA3C]" />
            <span className="font-sans-clean font-medium">BTM 2nd Stage, Bengaluru</span>
            <span className="text-white/40">·</span>
            <span className="text-[#E7AA3C] font-medium">Hot Kitchen Dispatch</span>
          </div>

        </div>

        {/* Word-by-Word Split Editorial Headline (blur(14px)->0, y 30->0, opacity 0->1, stagger 0.08s) */}
        <h1
          ref={headingRef}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F8F5EF] leading-[1.08] mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
        >
          {headlineWords.map((item, idx) => (
            <React.Fragment key={idx}>
              <span
                className={`hero-split-word inline-block mr-2.5 sm:mr-4 will-change-transform ${
                  item.isItalic ? 'italic' : 'not-italic'
                } ${item.isAccent ? 'text-[#E7AA3C] drop-shadow-[0_0_25px_rgba(231,170,60,0.4)]' : 'text-[#F8F5EF]'}`}
              >
                {item.text}
              </span>
              {item.breakAfter && <br className="hidden sm:inline" />}
            </React.Fragment>
          ))}
        </h1>

        {/* Supporting Copy */}
        <p
          ref={subtextRef}
          className="font-sans-clean text-base sm:text-lg md:text-xl text-[#E8E2D8]/90 max-w-2xl leading-relaxed mb-10 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
        >
          Discover everyday meals made for your routine. Simple, satisfying, home-style food, conveniently delivered hot to your doorstep.
        </p>

        {/* Action Buttons with Magnetic Physics Hover */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <a
            ref={primaryBtnRef}
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#B92326] text-white text-sm font-semibold tracking-wide uppercase hover:bg-[#a01c1f] transition-shadow duration-300 shadow-[0_8px_24px_rgba(185,35,38,0.5)] hover:shadow-[0_12px_32px_rgba(185,35,38,0.7)] active:scale-95 group relative overflow-hidden will-change-transform"
          >
            {/* Luminous button shine */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative z-10 pointer-events-none">Explore Menu</span>
            <ArrowDown className="h-4 w-4 relative z-10 group-hover:translate-y-0.5 transition-transform pointer-events-none" />
          </a>

          <button
            ref={secondaryBtnRef}
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#F8F5EF] text-sm font-semibold tracking-wide border border-white/20 hover:border-[#E7AA3C]/50 transition-all duration-300 backdrop-blur-sm active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(231,170,60,0.25)] group will-change-transform"
          >
            <span>Order Your Dabba</span>
            <ArrowUpRight className="h-4 w-4 text-[#E7AA3C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Micro Key Facts Bar with Luminous Hairlines */}
        <div
          ref={factsRef}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-white/10 text-xs sm:text-sm text-white/80 max-w-2xl w-full"
        >
          <div className="flex items-center justify-center gap-2 group hover:text-white transition-colors">
            <Clock className="h-4 w-4 text-[#E7AA3C] shrink-0 group-hover:scale-110 transition-transform" />
            <span>Lunch & Dinner Slots</span>
          </div>
          <div className="flex items-center justify-center gap-2 group hover:text-white transition-colors">
            <Sparkles className="h-4 w-4 text-[#E7AA3C] shrink-0 group-hover:scale-110 transition-transform" />
            <span>100% Homestyle Spice</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 group hover:text-white transition-colors">
            <MapPin className="h-4 w-4 text-[#E7AA3C] shrink-0 group-hover:scale-110 transition-transform" />
            <span>13th Main, BTM 2nd Stg</span>
          </div>
        </div>

      </div>

      {/* Gentle Scroll Hint at Bottom */}
      <a
        href="#categories"
        aria-label="Scroll to menu categories"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors group"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono group-hover:text-[#E7AA3C] transition-colors">
          SCROLL TO DISCOVER
        </span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#E7AA3C]" />
      </a>
    </section>
  );
};
