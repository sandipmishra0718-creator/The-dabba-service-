import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BrandLoaderProps {
  onComplete: () => void;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState('00');
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoMaskRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const brandName = "The Dabba Central";

  useEffect(() => {
    // Check sessionStorage
    if (sessionStorage.getItem('tdc_welcomed') === 'true') {
      onComplete();
      return;
    }

    // Scroll Lock during loader
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(ringRef.current, { scale: 0.6, opacity: 0 });
      gsap.set(dotRef.current, { scale: 1, opacity: 0 });
      gsap.set(logoWrapperRef.current, { opacity: 0, scale: 0.4 });
      gsap.set('.loader-char', { yPercent: 110 });
      gsap.set('.loader-sub', { opacity: 0, y: 10 });

      const tl = gsap.timeline();

      // a. Center thin ring and dot appear; ring scales 0.6 -> 1 and pulses (0.8s)
      tl.to([ringRef.current, dotRef.current], {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(ringRef.current, {
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, '<')
      .to(ringRef.current, {
        boxShadow: '0 0 25px rgba(231,170,60,0.4)',
        repeat: 1,
        yoyo: true,
        duration: 0.4,
      }, '-=0.4');

      // b. Dot expands and crossfades into brand SVG logo
      tl.to(dotRef.current, {
        scale: 4,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      }, '-=0.2')
      .to(ringRef.current, {
        scale: 1.3,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '<')
      .to(logoWrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'expo.out',
      }, '-=0.35');

      // c. Brand letters slide from inside overflow-hidden mask (yPercent 100 -> 0, stagger 0.05s)
      tl.to('.loader-char', {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.045,
        ease: 'power3.out',
      }, '-=0.25')
      .to('.loader-sub', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.4');

      // d. Progress counter 00 -> 100 concurrently over 2.2s
      const progressTracker = { val: 0 };
      gsap.to(progressTracker, {
        val: 100,
        duration: 2.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          const rounded = Math.round(progressTracker.val);
          setCounter(rounded < 10 ? `0${rounded}` : `${rounded}`);
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${rounded}%`;
          }
        },
        onComplete: () => {
          // e. Exit: logo slides up into mask and hides, then entire loader lifts like a curtain
          const exitTl = gsap.timeline();

          exitTl.to(logoMaskRef.current, {
            yPercent: -120,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
          })
          .to('.loader-corner', {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          }, '<')
          .to(containerRef.current, {
            yPercent: -100,
            duration: 1.0,
            ease: 'power4.inOut',
            onComplete: () => {
              sessionStorage.setItem('tdc_welcomed', 'true');
              document.body.style.overflow = '';
              onComplete();
            },
          }, '-=0.1');
        },
      });

    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  // If already welcomed in session
  if (typeof window !== 'undefined' && sessionStorage.getItem('tdc_welcomed') === 'true') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#131311] text-[#F8F5EF] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none will-change-transform"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#B92326]/20 via-[#E7AA3C]/18 to-transparent filter blur-[90px] pointer-events-none" />

      {/* Top micro brand header */}
      <div className="loader-corner flex items-center justify-between text-xs text-white/50 font-mono tracking-widest uppercase">
        <span className="text-[#E7AA3C] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7AA3C] animate-pulse" />
          The Dabba Central
        </span>
        <span className="hidden sm:inline">BTM 2nd Stage · Bengaluru</span>
      </div>

      {/* Center Stage: Ring + Dot into Brand SVG Logo and Masked Letters */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        
        {/* Initial Thin Ring & Small Center Dot */}
        <div
          ref={ringRef}
          className="w-16 h-16 rounded-full border border-[#E7AA3C]/50 flex items-center justify-center absolute pointer-events-none transition-shadow"
        >
          <div
            ref={dotRef}
            className="w-2.5 h-2.5 rounded-full bg-[#E7AA3C] shadow-[0_0_10px_#E7AA3C]"
          />
        </div>

        {/* Morph/Crossfade Container: Logo + Masked Brand Name */}
        <div ref={logoMaskRef} className="flex flex-col items-center">
          
          <div ref={logoWrapperRef} className="flex flex-col items-center mb-5">
            {/* Custom Brand Dabba SVG Emblem */}
            <svg
              className="w-20 h-20 text-[#E7AA3C] drop-shadow-[0_0_20px_rgba(231,170,60,0.4)]"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Steam waves */}
              <path
                d="M24 10C24 7 28 6 28 3"
                stroke="#E7AA3C"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-70"
              />
              <path
                d="M32 11C32 7 36 6 36 2"
                stroke="#E7AA3C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M40 10C40 7 44 6 44 3"
                stroke="#E7AA3C"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-70"
              />

              {/* Tiffin Tier 1 (Top) */}
              <rect x="18" y="16" width="28" height="10" rx="3" stroke="#F8F5EF" strokeWidth="2.2" />
              {/* Tiffin Tier 2 (Middle) */}
              <rect x="16" y="28" width="32" height="11" rx="3.5" stroke="#F8F5EF" strokeWidth="2.2" />
              {/* Tiffin Tier 3 (Bottom) */}
              <rect x="14" y="41" width="36" height="13" rx="4" stroke="#F8F5EF" strokeWidth="2.2" />

              {/* Central vertical locking bar */}
              <path d="M32 14V55" stroke="#B92326" strokeWidth="2.5" strokeLinecap="round" />
              {/* Carry handle arch */}
              <path
                d="M22 16V13C22 10.5 26.5 9 32 9C37.5 9 42 10.5 42 13V16"
                stroke="#E7AA3C"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Center latch ring */}
              <circle cx="32" cy="34" r="3" fill="#B92326" stroke="#E7AA3C" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Brand Name with Staggered Letter Mask (overflow-hidden) */}
          <div className="overflow-hidden py-1 mb-2">
            <h1 className="font-editorial text-4xl sm:text-6xl italic text-[#F8F5EF] tracking-tight drop-shadow-[0_4px_24px_rgba(231,170,60,0.3)] flex items-center justify-center">
              {brandName.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden py-0.5"
                >
                  <span className="loader-char inline-block will-change-transform">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden">
            <p className="loader-sub font-sans-clean text-xs sm:text-sm text-[#E8E2D8]/70 tracking-widest uppercase font-medium">
              Authentic Home-Style Tiffin Service
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Corner: Progress Counter 00 -> 100 & Thin Progress Line */}
      <div className="loader-corner flex flex-col gap-3 max-w-sm w-full mx-auto sm:mx-0 sm:ml-auto">
        <div className="flex items-center justify-between text-xs text-white/50 font-mono tabular-nums">
          <span className="tracking-widest uppercase">Ghar Ka Khana</span>
          <span className="text-[#E7AA3C] font-semibold text-sm">{counter}%</span>
        </div>
        
        {/* Thin progress line */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[#E7AA3C] via-[#B92326] to-[#E7AA3C] w-0 transition-[width] duration-75 ease-out shadow-[0_0_12px_#E7AA3C]"
          />
        </div>
      </div>

    </div>
  );
};
