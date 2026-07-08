export type CategorySlug =
  | 'gym-fitness'
  | 'tech-electronics'
  | 'food-drink'
  | 'fuel-supermarket'
  | 'fashion'
  | 'travel'
  | 'family-kids'
  | 'wellbeing-health'
  | 'mobile-broadband'
  | 'home-utilities'

export interface Category {
  slug: CategorySlug
  name: string
  shortName: string
  description: string
  intro: string
  emoji: string
  accent: string
}

export interface Offer {
  id: string
  merchant: string
  merchantSlug: string
  title: string
  category: CategorySlug
  discount: string
  discountValue?: number
  description: string
  ctaUrl: string
  affiliateProvider?: 'skimlinks' | 'awin' | 'cj' | 'impact' | 'rakuten' | 'direct'
  expires?: string
  terms: string
  featured?: boolean
  trending?: boolean
  logoBg: string
  logoText: string
  logoColor: string
  updatedAt: string
}
