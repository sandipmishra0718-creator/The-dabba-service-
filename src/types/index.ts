export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'thalis' | 'roti-combos' | 'rice-bowls' | 'comfort-meals';
  description: string;
  price: number;
  isVeg: boolean;
  isPopular?: boolean;
  image: string;
  includes: string[];
  calories?: string;
}

export interface TiffinPlan {
  id: string;
  name: string;
  badge?: string;
  subtitle: string;
  pricePerMeal: number;
  totalPriceText: string;
  durationDays: number;
  mealOptions: string[];
  features: string[];
  recommended?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
}

export interface OrderInquiry {
  planType: string;
  mealType: 'lunch' | 'dinner' | 'both';
  dietType: 'regular-veg' | 'jain-veg';
  customerName: string;
  phone: string;
  deliveryArea: string;
  notes?: string;
}
