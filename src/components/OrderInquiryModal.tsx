import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO, MENU_ITEMS, TIFFIN_PLANS } from '../data/dabbaData';
import { X, Phone, MessageSquare, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { MenuItem, TiffinPlan } from '../types';

interface OrderInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMeal?: MenuItem | null;
  preselectedPlan?: TiffinPlan | null;
}

export const OrderInquiryModal: React.FC<OrderInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedMeal,
  preselectedPlan,
}) => {
  const [inquiryType, setInquiryType] = useState<string>('trial');
  const [selectedMealId, setSelectedMealId] = useState<string>('');
  const [mealSlot, setMealSlot] = useState<'lunch' | 'dinner' | 'both'>('lunch');
  const [dietPref, setDietPref] = useState<'veg' | 'jain'>('veg');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedMeal) {
      setInquiryType('single-dish');
      setSelectedMealId(preselectedMeal.id);
    } else if (preselectedPlan) {
      setInquiryType(preselectedPlan.id);
    } else {
      setInquiryType('weekly-plan');
    }
  }, [preselectedMeal, preselectedPlan]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    let planName = 'Tiffin Plan Inquiry';
    if (inquiryType === 'single-dish') {
      const dish = MENU_ITEMS.find(m => m.id === selectedMealId);
      planName = dish ? `Dish: ${dish.name} (₹${dish.price})` : 'Single Dabba';
    } else {
      const plan = TIFFIN_PLANS.find(p => p.id === inquiryType);
      planName = plan ? plan.name : inquiryType;
    }

    const message = `Namaste The Dabba Central, I would like to order / inquire about a tiffin:
• Plan/Dish: ${planName}
• Meal Timing: ${mealSlot.toUpperCase()}
• Diet: ${dietPref === 'jain' ? 'Jain (No Onion/Garlic)' : 'Standard Homestyle Veg'}
• Name: ${name || 'Customer'}
• Phone: ${phone || 'Not provided'}
• Delivery Area: ${address || 'BTM 2nd Stage'}
${notes ? `• Special Notes: ${notes}` : ''}

Please confirm availability and dispatch schedule.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917404388224?text=${encoded}`;
    
    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order or Inquire Dabba"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1C18] border border-[#33332D] rounded-2xl max-w-xl w-full p-6 sm:p-8 text-[#F8F5EF] shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2E2E28] pb-4 mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#E7AA3C] font-semibold block">
              Quick Kitchen Inquiry
            </span>
            <h3 className="font-editorial text-3xl text-[#F8F5EF]">
              Order Your Fresh Dabba
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full border border-white/10 hover:border-[#B92326] hover:bg-[#B92326] text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="font-editorial text-3xl text-white mb-2">
              Inquiry Dispatched!
            </h4>
            <p className="font-sans-clean text-sm text-[#E8E2D8]/80 max-w-md mx-auto mb-6">
              Your inquiry has been formulated for WhatsApp. The kitchen team at Sunshine Colony, BTM 2nd Stage will respond shortly to confirm your delivery slot.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B92326] rounded-lg text-xs font-semibold uppercase text-white shadow"
              >
                <Phone className="h-4 w-4" />
                <span>Call Kitchen: {BUSINESS_INFO.phone}</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/15 rounded-lg text-xs font-semibold text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppInquiry} className="space-y-5">
            
            {/* Step 1: Select Plan or Dish */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                1. Select Dabba or Subscription
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInquiryType('daily-trial')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    inquiryType === 'daily-trial'
                      ? 'border-[#B92326] bg-[#B92326]/20 text-white font-semibold'
                      : 'border-white/10 bg-[#171715] text-white/70 hover:border-white/25'
                  }`}
                >
                  Daily Trial Dabba (₹100–₹140)
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('weekly-plan')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    inquiryType === 'weekly-plan'
                      ? 'border-[#B92326] bg-[#B92326]/20 text-white font-semibold'
                      : 'border-white/10 bg-[#171715] text-white/70 hover:border-white/25'
                  }`}
                >
                  Weekly Routine (6 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('monthly-saver')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    inquiryType === 'monthly-saver'
                      ? 'border-[#B92326] bg-[#B92326]/20 text-white font-semibold'
                      : 'border-white/10 bg-[#171715] text-white/70 hover:border-white/25'
                  }`}
                >
                  Monthly Pass (24 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('single-dish')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    inquiryType === 'single-dish'
                      ? 'border-[#B92326] bg-[#B92326]/20 text-white font-semibold'
                      : 'border-white/10 bg-[#171715] text-white/70 hover:border-white/25'
                  }`}
                >
                  Specific Signature Dish
                </button>
              </div>

              {inquiryType === 'single-dish' && (
                <div className="mt-3">
                  <select
                    value={selectedMealId}
                    onChange={(e) => setSelectedMealId(e.target.value)}
                    className="w-full bg-[#171715] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E7AA3C]"
                  >
                    <option value="">-- Choose Signature Dish --</option>
                    {MENU_ITEMS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} — ₹{m.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Step 2: Meal Slot & Diet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                  2. Meal Slot
                </label>
                <div className="flex gap-2 text-xs">
                  {(['lunch', 'dinner', 'both'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setMealSlot(slot)}
                      className={`flex-1 py-2 px-2 rounded-lg border text-center uppercase tracking-wider font-semibold transition-all ${
                        mealSlot === slot
                          ? 'border-[#E7AA3C] bg-[#E7AA3C]/20 text-[#E7AA3C]'
                          : 'border-white/10 bg-[#171715] text-white/60 hover:border-white/25'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                  3. Dietary Prep
                </label>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDietPref('veg')}
                    className={`flex-1 py-2 px-2 rounded-lg border text-center font-semibold transition-all ${
                      dietPref === 'veg'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-white/10 bg-[#171715] text-white/60 hover:border-white/25'
                    }`}
                  >
                    Homestyle Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietPref('jain')}
                    className={`flex-1 py-2 px-2 rounded-lg border text-center font-semibold transition-all ${
                      dietPref === 'jain'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-white/10 bg-[#171715] text-white/60 hover:border-white/25'
                    }`}
                  >
                    Jain (No Onion)
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Customer Details */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                4. Your Contact & Delivery Location
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#171715] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E7AA3C]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#171715] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E7AA3C]"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Delivery Area / Address in Bengaluru (e.g., BTM 2nd Stage, Sunshine Colony) *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#171715] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E7AA3C]"
              />

              <textarea
                rows={2}
                placeholder="Preferences (e.g. less spicy, 4 rotis instead of rice, start date)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#171715] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E7AA3C] resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <MessageSquare className="h-4 w-4 fill-current" />
                <span>Send Inquiry On WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>No upfront payment required to inquire</span>
                </span>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="text-[#E7AA3C] hover:underline"
                >
                  Or Call {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
