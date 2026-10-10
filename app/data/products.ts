export type HoneyProduct = {
  id: number
  name: string
  image: string
  category: string
  price: number
  oldPrice: number | null
  badge: 'sale' | 'new' | null
  rating: number
  reviews: number
  description: string
}

export const HONEYBABY_PRODUCTS: HoneyProduct[] = [
  {
    id: 1,
    name: 'Snuggle Bear Plush',
    image:
      'https://images.pexels.com/photos/37158/pexels-photo-37158.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'toys',
    price: 2499,
    oldPrice: 3200,
    badge: 'sale',
    rating: 4.9,
    reviews: 238,
    description: 'Soft and cuddly plush bear for little ones.',
  },
  {
    id: 2,
    name: 'Organic Cotton Onesie Set',
    image:
      'https://images.pexels.com/photos/29015875/pexels-photo-29015875.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'clothing',
    price: 1899,
    oldPrice: null,
    badge: 'new',
    rating: 4.8,
    reviews: 145,
    description: 'Breathable organic cotton onesie set.',
  },
  {
    id: 3,
    name: 'Gentle Baby Wash',
    image:
      'https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'skincare',
    price: 899,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    reviews: 89,
    description: 'Mild baby wash for sensitive skin.',
  },
  {
    id: 4,
    name: 'Feeding Bottle Set (3pc)',
    image:
      'https://images.pexels.com/photos/41222/pexels-photo-41222.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'feeding',
    price: 1499,
    oldPrice: 1800,
    badge: 'sale',
    rating: 4.8,
    reviews: 312,
    description: 'Three-piece feeding bottle set.',
  },
  {
    id: 5,
    name: 'Cloud Swaddle Blanket',
    image:
      'https://images.pexels.com/photos/11517553/pexels-photo-11517553.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'sleep',
    price: 1299,
    oldPrice: null,
    badge: 'new',
    rating: 4.9,
    reviews: 178,
    description: 'Soft cloud-light swaddle blanket.',
  },
  {
    id: 6,
    name: 'Musical Mobile',
    image:
      'https://images.pexels.com/photos/26219889/pexels-photo-26219889.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'toys',
    price: 3499,
    oldPrice: 4200,
    badge: 'sale',
    rating: 4.6,
    reviews: 67,
    description: 'Soothing musical crib mobile.',
  },
  {
    id: 7,
    name: 'Silicone Bib Set',
    image:
      'https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'feeding',
    price: 699,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    reviews: 204,
    description: 'Easy-clean silicone bib set.',
  },
  {
    id: 8,
    name: 'Baby Sunscreen SPF 50',
    image:
      'https://images.pexels.com/photos/27393233/pexels-photo-27393233.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'skincare',
    price: 1199,
    oldPrice: null,
    badge: 'new',
    rating: 4.8,
    reviews: 53,
    description: 'Gentle SPF 50 sunscreen for babies.',
  },
  {
    id: 9,
    name: 'Knit Romper',
    image:
      'https://images.pexels.com/photos/28259749/pexels-photo-28259749.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'clothing',
    price: 1599,
    oldPrice: 2000,
    badge: 'sale',
    rating: 4.5,
    reviews: 91,
    description: 'Cozy knit romper for everyday wear.',
  },
  {
    id: 10,
    name: 'Crib Mattress Protector',
    image:
      'https://images.pexels.com/photos/4964372/pexels-photo-4964372.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'sleep',
    price: 2199,
    oldPrice: null,
    badge: null,
    rating: 4.7,
    reviews: 136,
    description: 'Waterproof crib mattress protector.',
  },
  {
    id: 11,
    name: 'Stacking Rings Toy',
    image:
      'https://images.pexels.com/photos/35579565/pexels-photo-35579565.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'toys',
    price: 999,
    oldPrice: null,
    badge: null,
    rating: 4.6,
    reviews: 320,
    description: 'Classic stacking rings learning toy.',
  },
  {
    id: 12,
    name: 'Hooded Towel & Mitt Set',
    image:
      'https://images.pexels.com/photos/19314798/pexels-photo-19314798.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'skincare',
    price: 1799,
    oldPrice: 2200,
    badge: 'sale',
    rating: 4.9,
    reviews: 287,
    description: 'Soft hooded towel and mitt set.',
  },
]

export function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString()}`
}
