import type { Brand } from './types';

export const brands: Brand[] = [
  {
    id: 'samsung',
    slug: 'samsung',
    name: 'Samsung',
    logo: '/brands/samsung.svg',
    brandColor: '#1428A0',
    popularModels: ['galaxy-s24', 'galaxy-s23', 'galaxy-a54', 'galaxy-a34', 'galaxy-s22', 'galaxy-a14', 'galaxy-z-flip5', 'galaxy-note20'],
    totalModelCount: 128,
    sortOrder: 1,
    description: {
      es: 'Reparamos toda la serie Galaxy — S, Note, A, M, J y Z (Fold y Flip). 128 modelos en catálogo.',
      en: 'We repair the full Galaxy lineup — S, Note, A, M, J and Z (Fold and Flip). 128 models in catalog.',
      zh: '我们维修 Galaxy 全系列 — S、Note、A、M、J 与 Z（Fold 和 Flip）。目录中收录 128 款型号。'
    }
  },
  {
    id: 'apple',
    slug: 'apple',
    name: 'Apple',
    logo: '/brands/apple.svg',
    brandColor: '#1D1D1F',
    popularModels: ['iphone-15-pro', 'iphone-15', 'iphone-14-pro', 'iphone-14', 'iphone-13', 'iphone-12', 'iphone-11', 'iphone-se-2022'],
    totalModelCount: 38,
    sortOrder: 2,
    description: {
      es: 'Desde el iPhone 6 hasta el iPhone 15 Pro Max. SE, Mini, Plus y Pro Max — los reparamos todos.',
      en: 'From iPhone 6 to iPhone 15 Pro Max. SE, Mini, Plus, and Pro Max — we repair them all.',
      zh: '从 iPhone 6 到 iPhone 15 Pro Max。SE、Mini、Plus 与 Pro Max 全系列均可维修。'
    }
  },
  {
    id: 'xiaomi',
    slug: 'xiaomi',
    name: 'Xiaomi',
    logo: '/brands/xiaomi.svg',
    brandColor: '#FF6700',
    popularModels: ['redmi-note-13', 'redmi-note-12', 'mi-13', 'poco-x6', 'redmi-12c', 'mi-11', 'redmi-note-11', 'poco-f5'],
    totalModelCount: 112,
    sortOrder: 3,
    description: {
      es: 'Mi, Redmi, Redmi Note y POCO — 112 modelos. Recambios originales y compatibles certificados.',
      en: 'Mi, Redmi, Redmi Note, and POCO — 112 models. Original and certified-compatible parts.',
      zh: 'Mi、Redmi、Redmi Note 与 POCO — 共 112 款。原厂与认证兼容配件。'
    }
  },
  {
    id: 'oppo',
    slug: 'oppo',
    name: 'Oppo',
    logo: '/brands/oppo.svg',
    brandColor: '#1A8943',
    popularModels: ['find-x6', 'reno-10', 'a98', 'a78', 'find-x5', 'reno-8', 'a17', 'a57'],
    totalModelCount: 65,
    sortOrder: 4,
    description: {
      es: 'Find, Reno, A y K — 65 modelos en catálogo. Especialistas en pantalla curva.',
      en: 'Find, Reno, A, and K — 65 models in catalog. Curved-screen specialists.',
      zh: 'Find、Reno、A 与 K — 目录 65 款。曲面屏维修专家。'
    }
  },
  {
    id: 'realme',
    slug: 'realme',
    name: 'Realme',
    logo: '/brands/realme.svg',
    brandColor: '#FFC915',
    popularModels: ['gt-5', 'number-12', 'c55', 'gt-neo-5', 'narzo-60', 'c33', '11-pro', '10'],
    totalModelCount: 51,
    sortOrder: 5,
    description: {
      es: 'GT, Number Series, C y Narzo — 51 modelos. Reparación rápida y económica.',
      en: 'GT, Number Series, C, and Narzo — 51 models. Fast, affordable repairs.',
      zh: 'GT、Number、C 与 Narzo — 51 款。快速、经济的维修。'
    }
  },
  {
    id: 'huawei',
    slug: 'huawei',
    name: 'Huawei',
    logo: '/brands/huawei.svg',
    brandColor: '#C7000B',
    popularModels: ['p60-pro', 'mate-50', 'nova-11', 'p50', 'mate-40', 'nova-10', 'y90', 'y70'],
    totalModelCount: 27,
    sortOrder: 6,
    description: {
      es: 'P, Mate, Nova y Y. Incluye reparación de modelos sin servicios Google.',
      en: 'P, Mate, Nova, and Y. Includes repair of non-GMS models.',
      zh: 'P、Mate、Nova 与 Y 系列。包含无 Google 服务版本维修。'
    }
  },
  {
    id: 'google',
    slug: 'google',
    name: 'Google',
    logo: '/brands/google.svg',
    brandColor: '#4285F4',
    popularModels: ['pixel-8-pro', 'pixel-8', 'pixel-7a', 'pixel-7', 'pixel-6a', 'pixel-6', 'pixel-fold', 'pixel-5'],
    totalModelCount: 8,
    sortOrder: 7,
    description: {
      es: 'Pixel 5 al 8 Pro, incluyendo Pixel Fold. Catálogo pequeño, expertise grande.',
      en: 'Pixel 5 through 8 Pro, including Pixel Fold. Small catalog, deep expertise.',
      zh: 'Pixel 5 至 8 Pro，含 Pixel Fold。型号不多，经验丰富。'
    }
  },
  {
    id: 'honor',
    slug: 'honor',
    name: 'Honor',
    logo: '/brands/honor.svg',
    brandColor: '#0085CE',
    popularModels: ['magic5-pro', '90', 'x9a', 'magic-vs', 'x8a', '70', 'x7a', 'play-30'],
    totalModelCount: 15,
    sortOrder: 8,
    description: {
      es: 'Magic, Number Series y X. 15 modelos cubiertos.',
      en: 'Magic, Number Series, and X. 15 models covered.',
      zh: 'Magic、Number 与 X 系列。覆盖 15 款。'
    }
  }
];

export const getBrand = (slug: string) => brands.find(b => b.slug === slug);
