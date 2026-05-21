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
  priceMin,
  priceMax,
  offerCount
}: {
  modelName: string;
  modelSlug: string;
  priceMin: number;
  priceMax: number;
  offerCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name: `Reparación ${modelName}`,
    description: `Servicio de reparación para ${modelName}: pantalla, batería, conector de carga, cámara y más.`,
    url: `${SITE}/reparacion/movil/${modelSlug.split('-')[0]}/${modelSlug}`,
    priceCurrency: 'EUR',
    lowPrice: priceMin,
    highPrice: priceMax,
    offerCount,
    seller: { '@id': `${SITE}/#business` }
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
