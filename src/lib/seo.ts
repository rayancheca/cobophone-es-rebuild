import type { Metadata } from 'next';
import { cobophoneLocation } from '@/data/location';

const SITE = 'https://cobophone.es';

export function buildMetadata({
  title,
  description,
  path = '/',
  locale = 'es',
  image
}: {
  title: string;
  description: string;
  path?: string;
  locale?: 'es' | 'en' | 'zh';
  image?: string;
}): Metadata {
  const url = `${SITE}${locale === 'es' ? '' : `/${locale}`}${path}`;
  const ogImage = image ?? `${SITE}/og/default.jpg`;
  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: url,
      languages: {
        'es-ES': `${SITE}${path}`,
        en: `${SITE}/en${path}`,
        'zh-Hans': `${SITE}/zh${path}`,
        'x-default': `${SITE}${path}`
      }
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'CoboPhone',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : 'zh_CN',
      images: [{ url: ogImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots: { index: true, follow: true }
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    '@id': `${SITE}/#business`,
    name: 'CoboPhone',
    image: `${SITE}/og/storefront.jpg`,
    telephone: cobophoneLocation.phone,
    email: cobophoneLocation.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: cobophoneLocation.address.street,
      addressLocality: cobophoneLocation.address.city,
      addressRegion: cobophoneLocation.address.region,
      postalCode: cobophoneLocation.address.postalCode,
      addressCountry: cobophoneLocation.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: cobophoneLocation.address.lat,
      longitude: cobophoneLocation.address.lng
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '19:00' }
    ],
    sameAs: [
      'https://facebook.com/cobophonespain',
      'https://instagram.com/cobophonespain'
    ],
    priceRange: '€€',
    areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' }
  };
}

export function modelOfferJsonLd({
  modelName,
  modelSlug,
  brandSlug,
  priceMin,
  priceMax,
  offerCount
}: {
  modelName: string;
  modelSlug: string;
  brandSlug?: string;
  priceMin: number;
  priceMax: number;
  offerCount: number;
}) {
  const url = `${SITE}/reparacion/movil/${brandSlug ?? modelSlug.split('-')[0]}/${modelSlug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name: `Reparación ${modelName}`,
    description: `Servicio de reparación para ${modelName}: pantalla, batería, conector de carga, cámara y más.`,
    url,
    priceCurrency: 'EUR',
    lowPrice: priceMin,
    highPrice: priceMax,
    offerCount,
    seller: { '@id': `${SITE}/#business` }
  };
}

/**
 * Service JSON-LD wrapping an AggregateOffer — surfaces the page in Google's
 * service-business rich results in addition to the offer carousel.
 */
export function modelServiceJsonLd({
  modelName,
  modelSlug,
  brandSlug,
  priceMin,
  priceMax,
  offerCount
}: {
  modelName: string;
  modelSlug: string;
  brandSlug: string;
  priceMin: number;
  priceMax: number;
  offerCount: number;
}) {
  const url = `${SITE}/reparacion/movil/${brandSlug}/${modelSlug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Reparación ${modelName}`,
    serviceType: 'Reparación de móvil',
    provider: { '@id': `${SITE}/#business` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
    url,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: priceMin,
      highPrice: priceMax,
      offerCount
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.url}`
    }))
  };
}

/**
 * F27 — Aggregate rating + per-review schema for the home page, sourced
 * from the verified-Google reviews in src/data/location.ts. Gives Google
 * the data it needs to render star-rating snippets in SERPs.
 */
export function aggregateRatingJsonLd({
  ratingValue,
  reviewCount,
  reviews
}: {
  ratingValue: number;
  reviewCount: number;
  reviews: Array<{ author: string; rating: number; body: string; date: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#business`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount
    },
    review: reviews.slice(0, 5).map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
      datePublished: r.date
    }))
  };
}
