export interface MetaItem {
  setting_key: string;
  setting_value: string;
}

export interface Service {
  id: string;
  title: string;       // full SEO title — used on the service detail page
  short_title?: string; // short display title — used on cards (e.g. "Wind & Hail Damage")
  icon: string;
  summary?: string;
  sumary?: string;   // typo-tolerant alias for Sheet column header mistakes
  body: string;
  image: string;
  sort_order: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  claim_type: string;
  quote: string;
  stars: string;
  image: string;
  date: string;
  featured: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  image: string;
  category: string;
  published: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  license_no: string;
  sort_order: string;
}
