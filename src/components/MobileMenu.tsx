import React, { useEffect } from 'react';
import { Phone, ArrowUpRight, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/dabbaData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenOrderModal }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { label: 'Home', href: '#hero', num: '01' },
    { label: 'Menu', href: '#menu', num: '02' },
    { label: 'Our Story', href: '#story', num: '03' },
    { label: 'Tiffin Plans', href: '#plans', num: '04' },
    { label: 'Reviews', href: '#reviews', num: '05' },
    { label: 'Contact & Location', href: '#contact', num: '06' },
  ];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#171715]/95 backdrop-blur-xl p-6 sm:p-10 transition-opacity duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] animate-fadeIn"
    >
      {/* Top Header Row with Brand & Close Button */}
      <div className="flex items-center justify-between border-b border-[#2d2d29] pb-6">
        <div className="font-editorial text-2xl italic tracking-wide text-[#F8F5EF]">
          The Dabba Central
        </div>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F8F5EF] transition-all duration-300 hover:border-[#B92326] hover:bg-[#B92326] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92326]"
        >
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      {/* Navigation Links with Staggered Entrance */}
      <nav className="my-auto flex flex-col space-y-4 py-8">
        {navLinks.map((item, index) => (
          <div
            key={item.href}
            className="border-b border-[#2d2d29]/60 pb-3"
            style={{
              animation: `slideUpFade 700ms cubic-bezier(0.76, 0, 0.24, 1) forwards`,
              animationDelay: `${index * 80}ms`,
              opacity: 0,
              transform: 'translateY(32px)',
            }}
          >
            <a
              href={item.href}
              onClick={() => onClose()}
              className="group flex items-baseline justify-between font-editorial text-3xl sm:text-4xl text-[#F8F5EF] transition-colors duration-200 hover:text-[#B92326]"
            >
              <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                {item.label}
              </span>
              <span className="font-sans-clean text-xs uppercase tracking-widest text-white/30 group-hover:text-[#B92326]">
                {item.num}
              </span>
            </a>
          </div>
        ))}
      </nav>

      {/* Prominent Bottom CTA & Verified Contact */}
      <div className="space-y-4 pt-4 border-t border-[#2d2d29]">
        <button
          onClick={() => {
            onClose();
            onOpenOrderModal();
          }}
          className="flex w-full items-center justify-center gap-2 bg-[#B92326] py-3.5 px-6 rounded-lg font-sans-clean text-sm font-semibold tracking-wide text-white shadow-lg transition-transform active:scale-95 hover:bg-[#a01c1f]"
        >
          <span>Order Your Dabba Now</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-between text-xs text-white/60 font-sans-clean">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#E7AA3C]" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
          <span className="text-white/40">BTM 2nd Stage, BLR</span>
        </div>
      </div>
    </div>
  );
};
