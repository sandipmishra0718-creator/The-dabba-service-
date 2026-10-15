import React, { useState, useEffect } from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/dabbaData';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileMenu,
  isMobileMenuOpen,
  onOpenOrderModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 pointer-events-none px-4 sm:px-6 ${
        isScrolled ? 'pt-3 sm:pt-4' : 'pt-5'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 pointer-events-auto flex items-center justify-between gap-6 sm:gap-8 ${
          isScrolled
            ? 'max-w-4xl px-5 sm:px-7 py-2.5 rounded-full bg-[#171715]/90 backdrop-blur-md border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(231,170,60,0.12)]'
            : 'max-w-7xl px-0 py-0 bg-transparent border-transparent'
        }`}
      >
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a
            href="#hero"
            aria-label="The Dabba Central - Home"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92326] rounded"
          >
            <span
              className="font-editorial text-2xl sm:text-3xl tracking-tight text-[#F8F5EF] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-[#E7AA3C] transition-colors"
            >
              The Dabba Central
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#B92326] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
          </a>

          {/* Zone 2: Navigation Links (4-5 single-line links with subtle underline) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#F8F5EF]"
          >
            <a
              href="#menu"
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] hover:text-[#E7AA3C] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E7AA3C] after:transition-all hover:after:w-full"
            >
              Menu
            </a>
            <a
              href="#story"
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] hover:text-[#E7AA3C] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E7AA3C] after:transition-all hover:after:w-full"
            >
              Our Story
            </a>
            <a
              href="#plans"
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] hover:text-[#E7AA3C] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E7AA3C] after:transition-all hover:after:w-full"
            >
              Tiffin Plans
            </a>
            <a
              href="#reviews"
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] hover:text-[#E7AA3C] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E7AA3C] after:transition-all hover:after:w-full"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] hover:text-[#E7AA3C] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#E7AA3C] after:transition-all hover:after:w-full"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action (Desktop) & Animated Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Phone Affordance on Desktop */}
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              aria-label={`Call ${BUSINESS_INFO.phone}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#F8F5EF] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] hover:text-[#E7AA3C] transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="h-3.5 w-3.5 text-[#E7AA3C]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenOrderModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#B92326] shadow-[0_4px_16px_rgba(185,35,38,0.45)] hover:bg-[#a01c1f] transition-all hover:shadow-[0_6px_20px_rgba(185,35,38,0.6)] active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Order Dabba</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mobile Hamburger Button with exact specifications */}
            <button
              onClick={onOpenMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="flex md:hidden flex-col justify-center items-end w-10 h-10 p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92326]"
            >
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isMobileMenuOpen
                    ? 'w-6 translate-y-[7px] rotate-45'
                    : 'w-6'
                }`}
              />
              <span
                className={`block h-[2px] bg-[#E7AA3C] rounded-full my-[5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isMobileMenuOpen
                    ? 'w-0 opacity-0'
                    : 'w-4'
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isMobileMenuOpen
                    ? 'w-6 -translate-y-[7px] -rotate-45'
                    : 'w-6'
                }`}
              />
            </button>
          </div>
        </div>
      </header>
  );
};
