import type { Category, CategorySlug } from './types'

export const CATEGORIES: Category[] = [
  {
    slug: 'gym-fitness',
    name: 'Gym & Fitness',
    shortName: 'Fitness',
    description: 'Gym memberships, home equipment and on-demand workout passes for staff',
    intro: 'Subsidising movement is one of the cheapest wellbeing wins available. Discounts on gym chains, boutique studios and home equipment make it easier for your team to stay active without HR running a separate scheme.',
    emoji: '🏋️',
    accent: 'from-orange-500 to-red-500',
  },
  {
    slug: 'tech-electronics',
    name: 'Tech & Electronics',
    shortName: 'Tech',
    description: 'Laptops, headphones, phones and home-office kit for your team',
    intro: 'Whether someone is replacing a tired home-office monitor or buying their first set of noise-cancelling headphones, tech discounts move the needle more than a gift voucher ever will.',
    emoji: '💻',
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    slug: 'food-drink',
    name: 'Food & Drink',
    shortName: 'Food',
    description: 'Restaurants, food delivery, meal kits and weekly shop savings',
    intro: 'Used weekly, food perks compound: 15% off a delivery app every Friday is hundreds of pounds back into a household over a year, and your team feels it.',
    emoji: '🍽️',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    slug: 'fuel-supermarket',
    name: 'Fuel & Supermarket',
    shortName: 'Fuel',
    description: 'Petrol cashback, supermarket vouchers and grocery delivery savings',
    intro: 'Fuel and weekly shop perks are the most-used category in any UK benefits portal. They are unglamorous but employees notice them on every payslip.',
    emoji: '⛽',
    accent: 'from-green-500 to-emerald-600',
  },
  {
    slug: 'fashion',
    name: 'Fashion & Style',
    shortName: 'Fashion',
    description: 'Clothing, footwear and accessories from major UK retailers',
    intro: 'High-street and online fashion partners cover everything from work attire to weekend trainers, with discount stacks that often beat seasonal sales.',
    emoji: '👕',
    accent: 'from-pink-500 to-rose-500',
  },
  {
    slug: 'travel',
    name: 'Travel & Holidays',
    shortName: 'Travel',
    description: 'Hotels, car hire, flights and weekend getaways',
    intro: 'Travel perks are the highest-value category by ticket size. A 10% partner discount on a £1,200 family holiday is real money back.',
    emoji: '✈️',
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    slug: 'family-kids',
    name: 'Family & Kids',
    shortName: 'Family',
    description: 'Days out, kidswear, nursery essentials and family entertainment',
    intro: 'Working parents disproportionately use family perks. They are also one of the strongest retention signals — they say the employer sees the whole person, not just the worker.',
    emoji: '👨‍👩‍👧',
    accent: 'from-purple-500 to-pink-500',
  },
  {
    slug: 'wellbeing-health',
    name: 'Wellbeing & Health',
    shortName: 'Wellbeing',
    description: 'Therapy apps, health checks, sleep tech and wellbeing subscriptions',
    intro: 'Wellbeing benefits used to mean a fruit bowl. Now it means subsidised therapy apps, free annual health checks and sleep coaching that materially affects sickness absence.',
    emoji: '🌿',
    accent: 'from-teal-500 to-emerald-500',
  },
  {
    slug: 'mobile-broadband',
    name: 'Mobile & Broadband',
    shortName: 'Mobile',
    description: 'Business mobile plans, home broadband and SIM-only deals',
    intro: 'A negotiated business plan often beats anything an employee can buy off-the-shelf — it is also one of the few perks where the employer can save money while giving staff better service.',
    emoji: '📱',
    accent: 'from-indigo-500 to-purple-600',
  },
  {
    slug: 'home-utilities',
    name: 'Home & Utilities',
    shortName: 'Home',
    description: 'Energy switching, home insurance and household savings',
    intro: 'Energy and household-bill perks scale with the cost-of-living crisis. They are the perks employees thank you for when the bills land.',
    emoji: '🏠',
    accent: 'from-yellow-500 to-amber-500',
  },
]

export function getCategory(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export type { CategorySlug } from './types'
