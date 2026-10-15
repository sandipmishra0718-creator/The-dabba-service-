import React, { useEffect, useRef, useState } from 'react';
import { Utensils, Clock, CalendarCheck, MapPin, Sparkles, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState({
    dabbas: 0,
    rating: 0,
    gheePercent: 0,
    minutes: 0,
  });

  const headingWords = "Why People in BTM Choose Us".split(" ");

  const features = [
    {
      icon: Utensils,
      title: 'Ghar Jaisa Swad',
      desc: 'Balanced mild home spices, hand-rolled whole-wheat phulkas, and fresh everyday sabzis cooked like mother makes at home.',
    },
    {
      icon: Clock,
      title: 'Punctual Meal Delivery',
      desc: 'Hot lunch delivered between 11:30 AM – 1:30 PM, and dinner between 7:30 PM – 9:30 PM across BTM and surrounding areas.',
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Pause & Resume',
      desc: 'Going home for the weekend or traveling? Pause your tiffin anytime via a simple WhatsApp message without losing money.',
    },
    {
      icon: MapPin,
      title: 'Hyperlocal to BTM 2nd Stage',
      desc: 'Prepared in Sunshine Colony, 13th Main. Because our kitchen is local, your dabba reaches you piping hot without long delivery transit.',
    },
    {
      icon: Sparkles,
      title: 'Clean Daily Cooking',
      desc: 'Prepared fresh within 90 minutes of dispatch in small batches with zero soda, zero preservatives, and clean filtered water.',
    },
    {
      icon: HeartHandshake,
      title: 'Friendly WhatsApp Support',
      desc: 'Direct contact with kitchen management. Need extra rotis, less spice, or special meal packaging? We listen and adapt.',
    },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStats({ dabbas: 15000, rating: 4.9, gheePercent: 100, minutes: 30 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Heading words scrub text-fill reveal (0.2 -> 1)
      if (headingRef.current) {
        gsap.fromTo(
          '.why-word',
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

      // 2. Feature cards staggered entrance: y 60->0, opacity 0->1, scale 0.96->1, stagger 0.12s
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

      // 3. Numbers / Stats count-up on scroll
      if (statsRef.current) {
        const statsTargets = { dabbas: 0, rating: 0, gheePercent: 0, minutes: 0 };
        gsap.to(statsTargets, {
          dabbas: 15000,
          rating: 4.9,
          gheePercent: 100,
          minutes: 30,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            setStats({
              dabbas: Math.round(statsTargets.dabbas),
              rating: Number(statsTargets.rating.toFixed(1)),
              gheePercent: Math.round(statsTargets.gheePercent),
              minutes: Math.round(statsTargets.minutes),
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#1A1A17] text-[#F8F5EF] relative border-t border-b border-[#2B2B26] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full bg-[#E7AA3C]/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold block mb-2">
            The Daily Difference
          </span>
          <h2
            ref={headingRef}
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF]"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="why-word inline-block mr-2.5">
                {word}
              </span>
            ))}
          </h2>
          <p className="font-sans-clean text-sm text-[#E8E2D8]/70 mt-3">
            Simple, honest principles that make daily meals healthy, affordable, and dependable.
          </p>
        </div>

        {/* Numbers & Stats Count-up Strip */}
        <div
          ref={statsRef}
          className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#141412] border border-[#2B2B26] shadow-xl"
        >
          <div className="text-center p-3 border-r border-[#242420] last:border-r-0">
            <span className="font-editorial text-3xl sm:text-5xl text-[#E7AA3C] font-bold block mb-1">
              {stats.dabbas.toLocaleString()}+
            </span>
            <span className="text-xs uppercase tracking-wider text-white/60 font-sans-clean font-medium">
              Meals Delivered
            </span>
          </div>

          <div className="text-center p-3 sm:border-r border-[#242420]">
            <span className="font-editorial text-3xl sm:text-5xl text-[#F8F5EF] font-bold block mb-1">
              {stats.rating.toFixed(1)}★
            </span>
            <span className="text-xs uppercase tracking-wider text-white/60 font-sans-clean font-medium">
              Google Maps Rating
            </span>
          </div>

          <div className="text-center p-3 border-r border-[#242420] last:border-r-0">
            <span className="font-editorial text-3xl sm:text-5xl text-[#E7AA3C] font-bold block mb-1">
              {stats.gheePercent}%
            </span>
            <span className="text-xs uppercase tracking-wider text-white/60 font-sans-clean font-medium">
              Whole Wheat & Pure Ghee
            </span>
          </div>

          <div className="text-center p-3">
            <span className="font-editorial text-3xl sm:text-5xl text-[#F8F5EF] font-bold block mb-1">
              {stats.minutes}m
            </span>
            <span className="text-xs uppercase tracking-wider text-white/60 font-sans-clean font-medium">
              Avg. Kitchen-to-Desk Transit
            </span>
          </div>
        </div>

        {/* 6-Item Clean Grid with Hover Lift (-8px) and Border Glow */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl bg-[#171715] border border-[#2E2E28] hover:border-[#E7AA3C]/50 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6),0_0_25px_rgba(231,170,60,0.12)] shimmer-card will-change-transform"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E7AA3C] group-hover:bg-[#B92326] group-hover:text-white group-hover:border-[#B92326] transition-all duration-300 mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans-clean text-lg font-semibold text-[#F8F5EF] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans-clean text-xs sm:text-sm text-[#E8E2D8]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
