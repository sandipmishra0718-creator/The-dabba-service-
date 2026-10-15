import { MenuItem, TiffinPlan, Review } from '../types';

export const BUSINESS_INFO = {
  name: 'The Dabba Central',
  tagline: 'Ghar Jaisa Khana. Har Din, Fresh Dabba.',
  category: 'Home-Style Tiffin Service',
  phone: '+91 74043 88224',
  phoneRaw: '+917404388224',
  whatsappUrl: 'https://wa.me/917404388224',
  address: 'BTM 2nd Stage, 13th Main, 7th Cross Road, near Dry Fruit Gallery, Sunshine Colony, Bengaluru, Karnataka 560076, India',
  shortAddress: 'Sunshine Colony, BTM 2nd Stage, Bengaluru - 560076',
  landmark: 'Near Dry Fruit Gallery, 13th Main, 7th Cross',
  mapsUrl: 'https://maps.app.goo.gl/6oUf5ueqijAb3xdN8',
  lunchHours: '11:30 AM – 3:30 PM',
  dinnerHours: '7:00 PM – 10:30 PM',
  operationalDays: 'Monday to Sunday (7 Days a week)',
  verifiedBadge: 'Verified Local Kitchen · BTM 2nd Stage'
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'executive-homestyle-thali',
    name: 'Executive Homestyle Thali',
    hindiName: 'घर की थाली',
    category: 'thalis',
    description: 'A wholesome daily thali cooked in cold-pressed oil with balanced mild spices. Served piping hot.',
    price: 140,
    isVeg: true,
    isPopular: true,
    image: '/src/assets/images/dish_executive_thali_1792079801892.jpg',
    includes: ['4 Whole Wheat Phulkas (with Ghee)', '1 Paneer / Special Sabzi', '1 Daily Seasonal Sabzi', 'Dal Tadka / Dal Fry', 'Jeera Rice', 'Salad & Pickle'],
    calories: '650 kcal'
  },
  {
    id: 'punjabi-rajma-chawal-dabba',
    name: 'Dilli Style Rajma Chawal Bowl',
    hindiName: 'राजमा चावल डिब्बा',
    category: 'rice-bowls',
    description: 'Slow-simmered Kashmiri rajma cooked in rich tomato gravy with ginger juliennes, served over fragrant long-grain rice.',
    price: 120,
    isVeg: true,
    isPopular: true,
    image: '/src/assets/images/dish_rajma_chawal_1792079803065.jpg',
    includes: ['Generous Portion Slow-cooked Rajma', 'Fluffy Steamed Basmati Rice', 'Sliced Onions & Green Chilli', 'Mint Chutney & Pickle'],
    calories: '540 kcal'
  },
  {
    id: 'comfort-dal-khichdi-bowl',
    name: 'Desi Ghee Moong Dal Khichdi',
    hindiName: 'देसी घी दाल खिचड़ी',
    category: 'comfort-meals',
    description: 'Light on the stomach, nourishing for the soul. Yellow moong dal and rice tempered with cumin, hing, and pure cow ghee.',
    price: 110,
    isVeg: true,
    isPopular: true,
    image: '/src/assets/images/dish_dal_khichdi_1792079803408.jpg',
    includes: ['Hot Desi Ghee Khichdi', 'Crispy Roasted Papad', 'Homestyle Curd / Raita', 'Spicy Mango Pickle'],
    calories: '480 kcal'
  },
  {
    id: 'deluxe-four-tier-dabba',
    name: 'The Central Deluxe Feast Dabba',
    hindiName: 'सेंट्रल डीलक्स डिब्बा',
    category: 'thalis',
    description: 'Our most comprehensive home feast. 4-compartment stainless steel tiffin experience packed for hearty appetites.',
    price: 180,
    isVeg: true,
    isPopular: false,
    image: '/src/assets/images/promo_dabba_banner_1792079801217.jpg',
    includes: ['5 Soft Butter Phulkas', 'Paneer Makhani', 'Aloo Methi / Gobhi Roast', 'Slow-cooked Dal Makhani', 'Peas Pulao', 'Boondi Raita & Sweet of the Day'],
    calories: '820 kcal'
  },
  {
    id: 'classic-phulka-sabzi-meal',
    name: 'Classic 4 Phulka & Double Sabzi',
    hindiName: 'फुल्का सब्ज़ी भोजन',
    category: 'roti-combos',
    description: 'Freshly puffed whole wheat rotis straight off the iron tawa with two homestyle daily dry & gravy preparations.',
    price: 115,
    isVeg: true,
    isPopular: false,
    image: '/src/assets/images/story_fresh_rotis_1792079800638.jpg',
    includes: ['4 Soft Whole Wheat Phulkas', '1 Gravy Vegetable Curry', '1 Dry Seasonal Sabzi', 'Fresh Cut Cucumber Salad', 'Khatta Meetha Pickle'],
    calories: '490 kcal'
  },
  {
    id: 'mini-daily-tiffin-box',
    name: 'Standard Daily Routine Tiffin',
    hindiName: 'रोज़ाना सादा डिब्बा',
    category: 'thalis',
    description: 'Minimalist, no-fuss weekday lunch designed for working professionals. Non-greasy, non-spicy, easy to digest.',
    price: 100,
    isVeg: true,
    isPopular: false,
    image: '/src/assets/images/hero_tiffin_spread_1792079798650.jpg',
    includes: ['3 Phulkas or Steamed Rice', 'Yellow Dal Tadka', 'Daily Sukhi Sabzi', 'Salad & Lemon'],
    calories: '420 kcal'
  }
];

export const TIFFIN_PLANS: TiffinPlan[] = [
  {
    id: 'daily-trial',
    name: 'Single Meal / Trial Dabba',
    subtitle: 'Try a fresh dabba with zero subscription commitment',
    pricePerMeal: 110,
    totalPriceText: 'Starting ₹100 – ₹140 / meal',
    durationDays: 1,
    mealOptions: ['Lunch', 'Dinner'],
    features: [
      'Delivered hot in hygienic insulated container',
      'Choose between Phulka meal or Rice combo',
      'Freshly cooked within 90 minutes of dispatch',
      'No deposit or subscription contract required'
    ],
    recommended: false
  },
  {
    id: 'weekly-plan',
    name: 'Weekly Routine Plan',
    badge: 'Popular for Working Pros',
    subtitle: '6 Days a week (Mon – Sat) uninterrupted lunch or dinner',
    pricePerMeal: 100,
    totalPriceText: '₹600 / 6 meals (Lunch or Dinner)',
    durationDays: 6,
    mealOptions: ['Lunch Only', 'Dinner Only', 'Both (12 meals)'],
    features: [
      'Different sabzi and dal menu every single day',
      'Free pause anytime with 4-hour WhatsApp notice',
      'Free delivery across BTM 2nd Stage zone',
      'Choice of 4 Phulkas OR 2 Phulkas + Rice'
    ],
    recommended: true
  },
  {
    id: 'monthly-saver',
    name: 'Monthly Member Pass',
    badge: 'Best Value for Everyday Comfort',
    subtitle: '24 or 26 days of worry-free homely meals',
    pricePerMeal: 90,
    totalPriceText: 'From ₹2,160 / month',
    durationDays: 24,
    mealOptions: ['Lunch (24 meals)', 'Dinner (24 meals)', 'Lunch + Dinner (48 meals)'],
    features: [
      'Guaranteed on-time priority delivery slot',
      'Special Sunday sweet / gulab jamun or kheer treat',
      'Carry-forward unused meals up to 10 days',
      'Dedicated delivery executive for your doorstep'
    ],
    recommended: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aditya Swaminathan',
    role: 'Software Engineer',
    location: 'BTM 2nd Stage (Sunshine Colony)',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Been taking their lunch dabba for 3 months now. The rotis are soft even after 1 hour, exactly like mother makes back in Indore. Not greasy, and they never reuse oil. Highly recommended!'
  },
  {
    id: 'rev-2',
    author: 'Priyanka Sharma',
    role: 'Product Designer',
    location: 'Koramangala 4th Block',
    rating: 5,
    date: '1 month ago',
    comment: 'The Moong Dal Khichdi and Executive Thali are lifesavers after long design sprints. You can eat every single day without feeling heavy or lethargic. Great WhatsApp communication too.'
  },
  {
    id: 'rev-3',
    author: 'Vikram Patel',
    role: 'CA Finalist & Student',
    location: 'BTM 1st Stage near Udupi Garden',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Super reliable delivery timing. They deliver exactly between 12:45 PM and 1:15 PM every single day. The rajma chawal and bhindi masala are my favorites. Very economical for students.'
  }
];

export const DELIVERY_AREAS = [
  { name: 'BTM 2nd Stage (Sunshine Colony, 13th Main)', status: 'Free Instant Delivery (15-20 min)', active: true },
  { name: 'BTM 1st Stage (Near Udupi Garden, Outer Ring Rd)', status: 'Active Delivery (20-30 min)', active: true },
  { name: 'Tavarekere & Maruthi Nagar', status: 'Active Delivery (25-35 min)', active: true },
  { name: 'JP Nagar 1st & 2nd Phase', status: 'Active Delivery (25-35 min)', active: true },
  { name: 'Koramangala 4th, 5th, 6th Blocks', status: 'Active Delivery (30-40 min)', active: true },
  { name: 'HSR Layout Sectors 1-5', status: 'Active for Weekly / Monthly Subscriptions', active: true }
];
