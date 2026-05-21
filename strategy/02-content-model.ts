// Content model — TypeScript interfaces for all CMS-bound content.
//
// For the mockup, instances of these live in /data/*.ts files.
// For production, migrate to Sanity or Payload. See HANDOFF.md for the path.
//
// Localized strings use the LocalizedString shape — explicit ES/EN/ZH variants.
// If a field is identical across all locales (e.g., a phone number), keep it flat.

export type Locale = "es" | "en" | "zh";

export type LocalizedString = {
  es: string;
  en?: string;
  zh?: string;
  /** Used to flag content that still needs human translation review. */
  _verify?: Partial<Record<Locale, true>>;
};

export type DeviceCategory =
  | "movil"
  | "tablet"
  | "portatil"
  | "smartwatch"
  | "consola"
  | "television"
  | "patinete-electrico";

export interface RepairType {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  /** lucide-react icon name OR custom svg key from /public/icons */
  icon: string;
  /** Typical duration in minutes for the standard variant of this repair. */
  averageDurationMinutes: number;
  warrantyMonths: number;
  applicableCategories: DeviceCategory[];
  /** Sort order in the repair-picker UI. */
  sortOrder: number;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  /** Path under /public/brands/. SVG preferred. */
  logo: string;
  /** Brand's primary brand color, used for accent on brand pages. */
  brandColor?: string;
  /** Model slugs ordered by popularity for the top-N picker. */
  popularModels: string[];
  totalModelCount: number;
  /** Sort in the brand grid. */
  sortOrder: number;
  description: LocalizedString;
}

export interface Model {
  id: string;
  brandId: string;
  /** Unique within brand. */
  slug: string;
  name: string;
  /** Internal short name shown in compact UIs. */
  shortName?: string;
  /** Release year. */
  year: number;
  /** Path under /public/models/. */
  image: string;
  /** Source URL for the press-kit image — kept for licensing audit. */
  imageSource?: string;
  /** Repair-type slugs available for this model. */
  repairTypes: string[];
  /** Most common known issue for this model — surfaced on the model page. */
  knownIssues?: LocalizedString[];
  /** Popularity score (0-100). Drives sort and top-N selection. */
  popularityScore: number;
  /** Display these in the comparison table next to the repair price. */
  msrpAtRelease?: number;
}

/** A price range per (model, repairType). EUR. */
export interface Price {
  modelId: string;
  repairTypeId: string;
  priceMin: number;
  priceMax: number;
  currency: "EUR";
  /** ISO date string of last review. */
  lastUpdated: string;
  /** Confidence: high = catalog price; medium = formula; low = ask-us range. */
  confidence: "high" | "medium" | "low";
}

export interface Service {
  id: string;
  slug: string;
  category: DeviceCategory;
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  /** Icon for the hub grid. */
  icon: string;
  /** Repair types available within this service. */
  repairTypes: string[];
  /** Whether this service is part of the mail-in flow. */
  mailInEligible: boolean;
  /** SEO H1 override if different from name.es. */
  h1Override?: LocalizedString;
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
    country: "ES";
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp: string;
  whatsappPrefilledLink: string;
  email: string;
  /** ISO 8601 weekday format: opens[day] = [{from, to}] or [] if closed. */
  hours: Record<
    "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
    Array<{ from: string; to: string }>
  >;
  photos: string[];
  /** Public transit notes. */
  transit?: LocalizedString;
  parking?: LocalizedString;
}

export interface Review {
  id: string;
  source: "google" | "trustpilot" | "facebook" | "instagram" | "internal";
  author: string;
  /** 1-5. */
  rating: number;
  body: LocalizedString;
  date: string;
  verified: boolean;
  /** Original URL if scraped. */
  sourceUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  bodyMdx: LocalizedString; // path or inline MDX
  category: "guide" | "news" | "how-to" | "behind-the-scenes";
  author: string;
  publishedAt: string;
  ogImage?: string;
  relatedModelSlugs?: string[];
}

export interface ServiceArea {
  slug: string;
  name: string;
  /** Neighborhoods covered within this area. */
  neighborhoods: string[];
  lat: number;
  lng: number;
  /** Approx population for content density. */
  populationServed?: number;
  /** Travel time from store, used in copy. */
  travelTimeFromStoreMin?: number;
  freePickupAvailable: boolean;
  description: LocalizedString;
}

export interface B2BInquiry {
  companyName: string;
  /** Spanish tax ID (CIF or NIF). */
  taxId: string;
  contactName: string;
  email: string;
  phone: string;
  /** Estimated monthly purchase volume in EUR. */
  monthlyVolume: "<500" | "500-2000" | "2000-5000" | "5000+";
  /** Parts categories of interest. */
  partsOfInterest: Array<"pantallas" | "baterias" | "conectores" | "camaras" | "tapas" | "placas" | "otros">;
  preferredLocale: Locale;
  message?: string;
}

export interface QuoteSubmission {
  category: DeviceCategory;
  brandSlug: string;
  modelSlug: string;
  repairTypeSlug: string;
  /** Customer-visible price range that was shown at submission. */
  shownPriceMin: number;
  shownPriceMax: number;
  flow: "walkin" | "mailin" | "whatsapp";
  customer: {
    name: string;
    phone: string;
    email?: string;
    preferredDate?: string;
    notes?: string;
  };
  /** Optional photo of the damage uploaded by the customer. */
  photoUrl?: string;
  /** UTM and analytics context. */
  context?: {
    referrer?: string;
    locale: Locale;
    utm?: Record<string, string>;
  };
}
