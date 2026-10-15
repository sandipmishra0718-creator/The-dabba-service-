import React from 'react';
import { BUSINESS_INFO } from '../data/dabbaData';
import { Phone, MapPin, Clock, ArrowUpRight, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121210] text-[#F8F5EF] pt-16 pb-12 border-t border-[#292925] relative overflow-hidden">
      {/* Luminous Top Hairline inspired by Reference Video */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E7AA3C]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#23231F]">
          
          {/* Brand & Overview Column */}
          <div className="lg:col-span-5">
            <a href="#hero" className="inline-block mb-4">
              <span className="font-editorial text-3xl sm:text-4xl italic text-[#F8F5EF] hover:text-[#E7AA3C] transition-colors">
                The Dabba Central
              </span>
            </a>
            <p className="font-sans-clean text-xs sm:text-sm text-[#E8E2D8]/70 leading-relaxed max-w-sm mb-6">
              Wholesome home-style tiffin and meal subscriptions based in Sunshine Colony, BTM 2nd Stage, Bengaluru. Everyday honest food cooked fresh with pure desi ghee and low oil.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#E7AA3C]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{BUSINESS_INFO.verifiedBadge}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="font-editorial text-xl text-[#F8F5EF] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8E2D8]/75 font-sans-clean">
              <li>
                <a href="#menu" className="hover:text-[#E7AA3C] transition-colors">
                  Daily Signature Dabbas
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#E7AA3C] transition-colors">
                  Our Cooking Philosophy
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-[#E7AA3C] transition-colors">
                  Weekly & Monthly Tiffin Plans
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#E7AA3C] transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E7AA3C] transition-colors">
                  BTM Delivery Coverage
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-editorial text-xl text-[#F8F5EF] mb-4">
              Kitchen Details
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-[#E8E2D8]/75">
              <MapPin className="h-4 w-4 text-[#E7AA3C] shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#E8E2D8]/75">
              <Phone className="h-4 w-4 text-[#E7AA3C] shrink-0" />
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white font-medium">
                {BUSINESS_INFO.phone}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#E8E2D8]/75">
              <Clock className="h-4 w-4 text-[#E7AA3C] shrink-0 mt-0.5" />
              <div>
                <div>Lunch: {BUSINESS_INFO.lunchHours}</div>
                <div>Dinner: {BUSINESS_INFO.dinnerHours}</div>
                <div className="text-white/40 mt-0.5">{BUSINESS_INFO.operationalDays}</div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E7AA3C] hover:underline"
              >
                <span>Locate Kitchen On Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p className="flex items-center gap-1 font-sans-clean">
            <span>© {new Date().getFullYear()} The Dabba Central. All rights reserved.</span>
          </p>

          <p className="flex items-center gap-1.5 font-sans-clean">
            <span>Crafted for true home food lovers in BTM Layout</span>
            <Heart className="h-3 w-3 text-[#B92326] fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
};
