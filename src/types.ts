export interface Product {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  price: number;
  weight: number; // in grams
  image: string;
  rating: number;
  discountPrice?: number;
  purity: string; // e.g. "22K Gold", "18K Diamond", "925 Silver"
  description: string;
  isFeatured: boolean;
  isNewArrived: boolean;
  sku: string;
  gender?: 'Female' | 'Male' | 'Unisex' | 'Kids & Teens';
  occasion?: 'Casual Wear' | 'Party Wear' | 'Traditional Wear';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface MetalRate {
  id: string;
  name: string; // "Gold 22k", "Gold 24k", "Silver", "Platinum"
  ratePerGram: number;
  change: string; // e.g. "+₹15", "-₹8"
  isUp: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface SchemeCalculatorResult {
  monthlyInstallment: number;
  tenureMonths: number;
  totalInvested: number;
  bonusAmount: number;
  totalMaturityValue: number;
  approxGoldGrams: number;
}

export interface StoreLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  whatsapp: string;
}

export interface AuspiciousDay {
  id: string;
  date: string; // YYYY-MM-DD
  title: {
    en: string;
    ta: string;
    hi: string;
    te?: string;
  };
  description: {
    en: string;
    ta: string;
    hi: string;
    te?: string;
  };
  type: 'tamil' | 'general' | 'both';
  nallaNeram: {
    en: string;
    ta: string;
    hi: string;
    te?: string;
  };
  rahukalam: string; // Rahu Kaal
  yamagandam: string; // Yama Gandam
  goldBuyingFactor: number; // 1-5 rating of auspiciousness for purchasing gold
  isMuhurtham: boolean;
  isFestival: boolean;
}
