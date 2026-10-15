import React, { useState, useEffect, useRef } from 'react';
import { BUSINESS_INFO, DELIVERY_AREAS } from '../data/dabbaData';
import { Phone, MapPin, Navigation, Clock, MessageSquare, CheckCircle2, Search, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LocationContactProps {
  onOpenOrderModal: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenOrderModal }) => {
  const [searchArea, setSearchArea] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
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

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredAreas = searchArea.trim() === ''
    ? DELIVERY_AREAS
    : DELIVERY_AREAS.filter(a => a.name.toLowerCase().includes(searchArea.toLowerCase()));

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-28 bg-[#171715] text-[#F8F5EF] relative overflow-hidden">
      
      {/* Cinematic Horizon Corona Arc behind Contact section (Reference Video 0:36-0:38) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-36 rounded-[100%] bg-gradient-to-b from-[#E7AA3C]/15 via-[#E7AA3C]/5 to-transparent blur-2xl pointer-events-none horizon-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7AA3C] font-semibold mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>Visit or Order Locally</span>
          </div>
          <h2
            ref={headingRef}
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F8F5EF]"
          >
            Kitchen & Delivery Hub
          </h2>
          <p className="font-sans-clean text-sm sm:text-base text-[#E8E2D8]/70 mt-3">
            Located in the heart of Sunshine Colony, BTM 2nd Stage. Serving hot, timely dabbas daily.
          </p>
        </div>

        {/* 2-Column Split: Verified Details & Map Embed/Directions */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Business Info & Actions */}
          <div className="lg:col-span-6 bg-[#1F1F1B] rounded-2xl border border-[#33332D] p-6 sm:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#2D2D29] pb-4 mb-6">
                <div>
                  <h3 className="font-editorial text-3xl text-[#F8F5EF]">
                    The Dabba Central
                  </h3>
                  <span className="text-xs text-[#E7AA3C] font-sans-clean font-medium">
                    Verified Home-Style Tiffin Service
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#B92326]/20 border border-[#B92326]/40 flex items-center justify-center text-[#B92326]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>

              {/* Exact Verified Address */}
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="h-5 w-5 text-[#E7AA3C] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/40 block font-semibold mb-0.5">
                    Kitchen Address:
                  </span>
                  <p className="font-sans-clean text-sm text-[#F8F5EF] leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="font-sans-clean text-xs text-[#E7AA3C] mt-1">
                    Landmark: {BUSINESS_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Contact Phone & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pt-4 border-t border-[#2D2D29]">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#E7AA3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 block font-semibold">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="font-sans-clean text-base font-semibold text-white hover:text-[#E7AA3C] transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#E7AA3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 block font-semibold">
                      Daily Service Hours
                    </span>
                    <div className="text-xs text-[#E8E2D8]/80 space-y-0.5">
                      <div>Lunch: {BUSINESS_INFO.lunchHours}</div>
                      <div>Dinner: {BUSINESS_INFO.dinnerHours}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2D2D29]">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#E7AA3C] hover:bg-[#d89b30] text-[#171715] font-sans-clean text-xs font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Google Maps Directions</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#B92326] hover:bg-[#a01c1f] text-white font-sans-clean text-xs font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95"
              >
                <Phone className="h-4 w-4" />
                <span>Call Kitchen Now</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed & Directions Card */}
          <div className="lg:col-span-6 bg-[#1F1F1B] rounded-2xl border border-[#33332D] overflow-hidden shadow-xl flex flex-col">
            <div className="p-4 bg-[#262621] border-b border-[#33332D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-sans-clean text-white/80 font-medium">
                  Live Map Navigation · BTM 2nd Stage Hub
                </span>
              </div>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#E7AA3C] hover:underline inline-flex items-center gap-1"
              >
                <span>Open in App</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Embedded Responsive Map */}
            <div className="w-full h-[340px] sm:h-[400px] relative bg-[#171715]">
              <iframe
                title="The Dabba Central Location BTM 2nd Stage"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8827011925345!2d77.6074211!3d12.912173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1500048e77a3%3A0x89e8550731a5e1cf!2sBTM%202nd%20Stage%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-4 bg-[#1C1C18] border-t border-[#33332D] flex items-center justify-between text-xs text-white/60">
              <span>Coordinates: 12.9121° N, 77.6096° E</span>
              <button
                onClick={onOpenOrderModal}
                className="text-[#E7AA3C] hover:text-white font-medium"
              >
                Inquire For Doorstep Delivery &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* Bengaluru Delivery Coverage Checker */}
        <div className="bg-[#1F1F1B] rounded-2xl border border-[#33332D] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="font-editorial text-2xl sm:text-3xl text-[#F8F5EF]">
                Check Delivery Coverage For Your Area
              </h4>
              <p className="font-sans-clean text-xs sm:text-sm text-white/60 mt-0.5">
                We deliver throughout BTM Layout, Tavarekere, Koramangala, and nearby South Bengaluru sectors.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search area (e.g. BTM, HSR)..."
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#171715] border border-white/10 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E7AA3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAreas.map((loc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#171715] border border-white/5 flex items-center justify-between"
              >
                <div>
                  <span className="font-sans-clean text-xs font-semibold text-white block">
                    {loc.name}
                  </span>
                  <span className="font-sans-clean text-[11px] text-emerald-400 mt-0.5 block">
                    {loc.status}
                  </span>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2D2D29] flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3">
            <span>Living slightly further? Custom subscriptions are available on request.</span>
            <a
              href={`https://wa.me/917404388224?text=${encodeURIComponent('Hi The Dabba Central, I would like to check if you deliver to my area.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#E7AA3C] hover:text-white font-medium"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Ask On WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
