export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  theme: RestaurantTheme;
  contact: ContactInfo;
  settings: RestaurantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardStyle: 'minimal' | 'glass' | 'elevated';
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface RestaurantSettings {
  languages: string[];
  currency: string;
  timezone: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  tags?: string[];
  allergens?: string[];
  isAvailable: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  preparationTime?: number;
  order: number;
}

export interface Menu {
  restaurantId: string;
  categories: Category[];
  items: MenuItem[];
}
