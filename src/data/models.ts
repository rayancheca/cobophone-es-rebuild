import type { Model } from './types';

// Curated top-N model list per brand. Brand pages render the long tail via a stub for now.
// Production: migrate to a CMS with the full 624-model catalog from the audit (see /research/01-current-site-audit.md §6).
// All images currently stub to placeholders under /public/models/. Replace with manufacturer press-kit URLs (see /design/05-photography.md).

export const models: Model[] = [
  // ─── Apple iPhone ─────────────────────────────────────────────
  { id: 'iphone-15-pro', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-15-pro', name: 'iPhone 15 Pro', year: 2023, image: '/models/iphone-15-pro.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua','placa'], popularityScore: 95, msrpAtRelease: 1219, knownIssues: [{ es: 'Sobrecalentamiento bajo carga rápida en la primera versión de iOS 17.', en: 'Overheating under fast charge on iOS 17 launch firmware.', zh: '初始 iOS 17 固件下快充时发热。' }] },
  { id: 'iphone-15', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-15', name: 'iPhone 15', year: 2023, image: '/models/iphone-15.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 92, msrpAtRelease: 959 },
  { id: 'iphone-14-pro', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-14-pro', name: 'iPhone 14 Pro', year: 2022, image: '/models/iphone-14-pro.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua','placa'], popularityScore: 90, msrpAtRelease: 1319 },
  { id: 'iphone-14', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-14', name: 'iPhone 14', year: 2022, image: '/models/iphone-14.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 88, msrpAtRelease: 1009 },
  { id: 'iphone-13', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-13', name: 'iPhone 13', year: 2021, image: '/models/iphone-13.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 86, msrpAtRelease: 909 },
  { id: 'iphone-12', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-12', name: 'iPhone 12', year: 2020, image: '/models/iphone-12.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 82, msrpAtRelease: 909, knownIssues: [{ es: 'Pérdida de Face ID tras humedad. Reparable a nivel de placa.', en: 'Face ID loss after moisture exposure. Board-level repairable.', zh: '进水后 Face ID 失效。可主板级修复。' }] },
  { id: 'iphone-11', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-11', name: 'iPhone 11', year: 2019, image: '/models/iphone-11.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 78, msrpAtRelease: 809 },
  { id: 'iphone-se-2022', brandId: 'apple', brandSlug: 'apple', slug: 'iphone-se-2022', name: 'iPhone SE (2022)', year: 2022, image: '/models/iphone-se-2022.jpg', repairTypes: ['pantalla','bateria','conector-carga','tapa-trasera'], popularityScore: 70, msrpAtRelease: 529 },

  // ─── Samsung ──────────────────────────────────────────────────
  { id: 'galaxy-s24', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-s24', name: 'Galaxy S24', year: 2024, image: '/models/galaxy-s24.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 94, msrpAtRelease: 909 },
  { id: 'galaxy-s23', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-s23', name: 'Galaxy S23', year: 2023, image: '/models/galaxy-s23.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 92, msrpAtRelease: 859 },
  { id: 'galaxy-s22', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-s22', name: 'Galaxy S22', year: 2022, image: '/models/galaxy-s22.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 84, msrpAtRelease: 849, knownIssues: [{ es: 'Hinchamiento de batería conocido en lotes de 2023. Cambio recomendado.', en: 'Known battery swelling in 2023 batches. Replacement recommended.', zh: '2023 年部分批次电池鼓包。建议更换。' }] },
  { id: 'galaxy-a54', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-a54', name: 'Galaxy A54', year: 2023, image: '/models/galaxy-a54.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 86, msrpAtRelease: 499 },
  { id: 'galaxy-a34', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-a34', name: 'Galaxy A34', year: 2023, image: '/models/galaxy-a34.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 80, msrpAtRelease: 399 },
  { id: 'galaxy-a14', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-a14', name: 'Galaxy A14', year: 2023, image: '/models/galaxy-a14.jpg', repairTypes: ['pantalla','bateria','conector-carga','tapa-trasera'], popularityScore: 75, msrpAtRelease: 229 },
  { id: 'galaxy-z-flip5', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-z-flip5', name: 'Galaxy Z Flip5', year: 2023, image: '/models/galaxy-z-flip5.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara'], popularityScore: 65, msrpAtRelease: 1199 },
  { id: 'galaxy-note20', brandId: 'samsung', brandSlug: 'samsung', slug: 'galaxy-note20', name: 'Galaxy Note 20', year: 2020, image: '/models/galaxy-note20.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 60, msrpAtRelease: 999 },

  // ─── Xiaomi ───────────────────────────────────────────────────
  { id: 'redmi-note-13', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'redmi-note-13', name: 'Redmi Note 13', year: 2024, image: '/models/redmi-note-13.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 93, msrpAtRelease: 229 },
  { id: 'redmi-note-12', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'redmi-note-12', name: 'Redmi Note 12', year: 2023, image: '/models/redmi-note-12.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 90, msrpAtRelease: 199 },
  { id: 'mi-13', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'mi-13', name: 'Xiaomi 13', year: 2023, image: '/models/mi-13.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 78, msrpAtRelease: 999 },
  { id: 'poco-x6', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'poco-x6', name: 'POCO X6', year: 2024, image: '/models/poco-x6.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 82, msrpAtRelease: 299 },
  { id: 'redmi-12c', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'redmi-12c', name: 'Redmi 12C', year: 2023, image: '/models/redmi-12c.jpg', repairTypes: ['pantalla','bateria','conector-carga'], popularityScore: 70, msrpAtRelease: 119 },
  { id: 'mi-11', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'mi-11', name: 'Xiaomi Mi 11', year: 2021, image: '/models/mi-11.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 72, msrpAtRelease: 749 },
  { id: 'redmi-note-11', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'redmi-note-11', name: 'Redmi Note 11', year: 2022, image: '/models/redmi-note-11.jpg', repairTypes: ['pantalla','bateria','conector-carga','tapa-trasera'], popularityScore: 86, msrpAtRelease: 199 },
  { id: 'poco-f5', brandId: 'xiaomi', brandSlug: 'xiaomi', slug: 'poco-f5', name: 'POCO F5', year: 2023, image: '/models/poco-f5.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 76, msrpAtRelease: 399 },

  // ─── Google Pixel ─────────────────────────────────────────────
  { id: 'pixel-8-pro', brandId: 'google', brandSlug: 'google', slug: 'pixel-8-pro', name: 'Pixel 8 Pro', year: 2023, image: '/models/pixel-8-pro.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera','agua'], popularityScore: 74, msrpAtRelease: 1099 },
  { id: 'pixel-8', brandId: 'google', brandSlug: 'google', slug: 'pixel-8', name: 'Pixel 8', year: 2023, image: '/models/pixel-8.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 72, msrpAtRelease: 799 },
  { id: 'pixel-7a', brandId: 'google', brandSlug: 'google', slug: 'pixel-7a', name: 'Pixel 7a', year: 2023, image: '/models/pixel-7a.jpg', repairTypes: ['pantalla','bateria','conector-carga','camara','tapa-trasera'], popularityScore: 68, msrpAtRelease: 509 }
];

export const getModel = (slug: string) => models.find(m => m.slug === slug);
export const getModelsByBrand = (brandSlug: string) => models.filter(m => m.brandSlug === brandSlug);
export const getTopModels = (brandSlug: string, limit = 8) =>
  getModelsByBrand(brandSlug).sort((a, b) => b.popularityScore - a.popularityScore).slice(0, limit);
