// Content model — mirrors strategy/02-content-model.ts but Next-runtime ready.

export type Locale = 'es' | 'en' | 'zh';

export type DeviceCategory =
  | 'movil'
  | 'tablet'
  | 'portatil'
  | 'smartwatch'
  | 'consola'
  | 'television'
  | 'patinete-electrico';

export type LocalizedString = {
  es: string;
  en?: string;
  zh?: string;
  _verify?: Partial<Record<Locale, true>>;
};

export interface RepairType {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  averageDurationMinutes: number;
  warrantyMonths: number;
  applicableCategories: DeviceCategory[];
  sortOrder: number;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: string;
  brandColor: string;
  popularModels: string[];
  totalModelCount: number;
  sortOrder: number;
  description: LocalizedString;
}

export interface Model {
  id: string;
  brandId: string;
  brandSlug: string;
  slug: string;
  name: string;
  shortName?: string;
  year: number;
  image: string;
  imageSource?: string;
  repairTypes: string[];
  knownIssues?: LocalizedString[];
  popularityScore: number;
  msrpAtRelease?: number;
}

export interface PriceEntry {
  modelSlug: string;
  repairSlug: string;
  priceMin: number;
  priceMax: number;
  currency: 'EUR';
  lastUpdated: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface Service {
  id: string;
  slug: string;
  category: DeviceCategory;
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  icon: string;
  repairTypes: string[];
  mailInEligible: boolean;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
    country: 'ES';
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp: string;
  whatsappPrefilledLink: string;
  email: string;
  hours: Record<
    'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
    Array<{ from: string; to: string }>
  >;
  photos: string[];
  transit?: LocalizedString;
  parking?: LocalizedString;
}

export interface Review {
  id: string;
  source: 'google' | 'trustpilot' | 'facebook' | 'instagram' | 'internal';
  author: string;
  rating: number;
  body: LocalizedString;
  date: string;
  verified: boolean;
  sourceUrl?: string;
}

export interface ServiceArea {
  slug: string;
  name: string;
  neighborhoods: string[];
  lat: number;
  lng: number;
  populationServed?: number;
  travelTimeFromStoreMin?: number;
  freePickupAvailable: boolean;
  description: LocalizedString;
}
