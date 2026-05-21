import type { PriceEntry } from './types';

// Price matrix — market-rate estimates derived from competitor analysis.
// REPLACE with CoboPhone's internal pricing before launch (see QUESTIONS.md).
// All prices in EUR.

// Helper: build a price entry quickly.
const p = (modelSlug: string, repairSlug: string, min: number, max: number, confidence: PriceEntry['confidence'] = 'medium'): PriceEntry => ({
  modelSlug, repairSlug, priceMin: min, priceMax: max, currency: 'EUR', lastUpdated: '2026-05-01', confidence
});

export const prices: PriceEntry[] = [
  // ─── Apple iPhone ─────────────────────────────────────────
  // iPhone 15 Pro
  p('iphone-15-pro', 'pantalla', 299, 379, 'high'),
  p('iphone-15-pro', 'bateria', 89, 119, 'high'),
  p('iphone-15-pro', 'conector-carga', 79, 109),
  p('iphone-15-pro', 'camara', 169, 249),
  p('iphone-15-pro', 'tapa-trasera', 149, 199),
  p('iphone-15-pro', 'agua', 49, 199),

  // iPhone 15
  p('iphone-15', 'pantalla', 199, 269, 'high'),
  p('iphone-15', 'bateria', 79, 99, 'high'),
  p('iphone-15', 'conector-carga', 69, 99),
  p('iphone-15', 'tapa-trasera', 129, 169),

  // iPhone 14 Pro
  p('iphone-14-pro', 'pantalla', 269, 349, 'high'),
  p('iphone-14-pro', 'bateria', 79, 99, 'high'),
  p('iphone-14-pro', 'conector-carga', 69, 99),
  p('iphone-14-pro', 'camara', 149, 219),
  p('iphone-14-pro', 'tapa-trasera', 129, 169),

  // iPhone 14
  p('iphone-14', 'pantalla', 179, 239, 'high'),
  p('iphone-14', 'bateria', 69, 89, 'high'),
  p('iphone-14', 'conector-carga', 59, 89),

  // iPhone 13
  p('iphone-13', 'pantalla', 149, 199, 'high'),
  p('iphone-13', 'bateria', 59, 79, 'high'),
  p('iphone-13', 'conector-carga', 49, 79),
  p('iphone-13', 'tapa-trasera', 99, 139),

  // iPhone 12
  p('iphone-12', 'pantalla', 129, 179, 'high'),
  p('iphone-12', 'bateria', 49, 69, 'high'),
  p('iphone-12', 'conector-carga', 49, 79),
  p('iphone-12', 'tapa-trasera', 89, 129),

  // iPhone 11
  p('iphone-11', 'pantalla', 99, 149, 'high'),
  p('iphone-11', 'bateria', 49, 69, 'high'),
  p('iphone-11', 'conector-carga', 49, 79),

  // iPhone SE 2022
  p('iphone-se-2022', 'pantalla', 79, 119, 'high'),
  p('iphone-se-2022', 'bateria', 39, 59, 'high'),

  // ─── Samsung ──────────────────────────────────────────────
  // Galaxy S24
  p('galaxy-s24', 'pantalla', 219, 289, 'high'),
  p('galaxy-s24', 'bateria', 79, 99),
  p('galaxy-s24', 'conector-carga', 69, 99),

  // Galaxy S23
  p('galaxy-s23', 'pantalla', 199, 259, 'high'),
  p('galaxy-s23', 'bateria', 69, 89, 'high'),
  p('galaxy-s23', 'conector-carga', 59, 89),
  p('galaxy-s23', 'tapa-trasera', 99, 139),

  // Galaxy S22
  p('galaxy-s22', 'pantalla', 169, 229, 'high'),
  p('galaxy-s22', 'bateria', 59, 79, 'high'),
  p('galaxy-s22', 'conector-carga', 49, 79),

  // Galaxy A54
  p('galaxy-a54', 'pantalla', 119, 159, 'high'),
  p('galaxy-a54', 'bateria', 49, 69),
  p('galaxy-a54', 'conector-carga', 39, 59),

  // Galaxy A34
  p('galaxy-a34', 'pantalla', 99, 139, 'high'),
  p('galaxy-a34', 'bateria', 49, 69),

  // Galaxy A14
  p('galaxy-a14', 'pantalla', 79, 109, 'high'),
  p('galaxy-a14', 'bateria', 39, 59),

  // Galaxy Z Flip5
  p('galaxy-z-flip5', 'pantalla', 379, 489, 'medium'),
  p('galaxy-z-flip5', 'bateria', 89, 119),

  // Galaxy Note 20
  p('galaxy-note20', 'pantalla', 159, 219, 'high'),
  p('galaxy-note20', 'bateria', 59, 79),

  // ─── Xiaomi ───────────────────────────────────────────────
  p('redmi-note-13', 'pantalla', 79, 119, 'high'),
  p('redmi-note-13', 'bateria', 39, 59),
  p('redmi-note-13', 'conector-carga', 39, 59),
  p('redmi-note-12', 'pantalla', 69, 109, 'high'),
  p('redmi-note-12', 'bateria', 39, 59),
  p('mi-13', 'pantalla', 159, 219, 'medium'),
  p('mi-13', 'bateria', 59, 79),
  p('poco-x6', 'pantalla', 89, 129),
  p('poco-x6', 'bateria', 49, 69),
  p('redmi-12c', 'pantalla', 49, 79),
  p('redmi-12c', 'bateria', 35, 55),
  p('mi-11', 'pantalla', 119, 169),
  p('mi-11', 'bateria', 49, 69),
  p('redmi-note-11', 'pantalla', 59, 89),
  p('redmi-note-11', 'bateria', 39, 59),
  p('poco-f5', 'pantalla', 99, 139),
  p('poco-f5', 'bateria', 49, 69),

  // ─── Google Pixel ─────────────────────────────────────────
  p('pixel-8-pro', 'pantalla', 199, 269, 'medium'),
  p('pixel-8-pro', 'bateria', 79, 109),
  p('pixel-8', 'pantalla', 169, 229),
  p('pixel-8', 'bateria', 69, 89),
  p('pixel-7a', 'pantalla', 119, 169),
  p('pixel-7a', 'bateria', 59, 79),

  // ─── Additional repair types — top models ─────────────────
  // Speakers
  p('iphone-15-pro', 'altavoz', 79, 119),
  p('iphone-14-pro', 'altavoz', 69, 99),
  p('iphone-13', 'altavoz', 59, 89),
  p('iphone-12', 'altavoz', 49, 79),
  p('galaxy-s24', 'altavoz', 69, 99),
  p('galaxy-s23', 'altavoz', 59, 89),
  p('redmi-note-13', 'altavoz', 39, 69),

  // Microphone
  p('iphone-15-pro', 'microfono', 69, 99),
  p('iphone-14-pro', 'microfono', 59, 89),
  p('iphone-13', 'microfono', 49, 79),
  p('iphone-12', 'microfono', 49, 69),
  p('galaxy-s24', 'microfono', 59, 89),
  p('galaxy-s23', 'microfono', 49, 79),

  // Vibration
  p('iphone-15-pro', 'vibrador', 49, 79),
  p('iphone-13', 'vibrador', 39, 59),
  p('galaxy-s23', 'vibrador', 39, 59),

  // Proximity / light sensor
  p('iphone-15-pro', 'sensor-proximidad', 59, 89),
  p('iphone-13', 'sensor-proximidad', 49, 79),
  p('galaxy-s23', 'sensor-proximidad', 49, 69),

  // Face ID / fingerprint
  p('iphone-15-pro', 'biometria', 149, 249, 'medium'),
  p('iphone-14-pro', 'biometria', 139, 229),
  p('iphone-13', 'biometria', 119, 199),
  p('iphone-12', 'biometria', 99, 179),
  p('galaxy-s24', 'biometria', 89, 149),
  p('galaxy-s23', 'biometria', 79, 139),

  // WiFi antenna
  p('iphone-15-pro', 'antena-wifi', 79, 119),
  p('iphone-13', 'antena-wifi', 59, 89),
  p('galaxy-s23', 'antena-wifi', 59, 89),

  // Buttons
  p('iphone-15-pro', 'botones', 49, 79),
  p('iphone-13', 'botones', 39, 69),
  p('iphone-12', 'botones', 39, 59),
  p('galaxy-s23', 'botones', 39, 69),

  // SIM unlock (universal price)
  p('iphone-15-pro', 'liberacion-sim', 25, 45),
  p('iphone-14-pro', 'liberacion-sim', 25, 45),
  p('iphone-13', 'liberacion-sim', 25, 45),
  p('iphone-12', 'liberacion-sim', 25, 45),
  p('iphone-11', 'liberacion-sim', 25, 45),
  p('galaxy-s24', 'liberacion-sim', 25, 45),
  p('galaxy-s23', 'liberacion-sim', 25, 45),

  // Data recovery (success-based)
  p('iphone-15-pro', 'recuperacion-datos', 99, 299, 'low'),
  p('iphone-13', 'recuperacion-datos', 99, 249, 'low'),
  p('iphone-12', 'recuperacion-datos', 99, 249, 'low'),
  p('galaxy-s24', 'recuperacion-datos', 99, 249, 'low'),
  p('galaxy-s23', 'recuperacion-datos', 99, 249, 'low'),

  // OS install / factory reset
  p('iphone-15-pro', 'sistema-operativo', 39, 69),
  p('iphone-13', 'sistema-operativo', 39, 59),
  p('iphone-12', 'sistema-operativo', 39, 59),
  p('galaxy-s24', 'sistema-operativo', 39, 59),
  p('galaxy-s23', 'sistema-operativo', 39, 59)
];

export const getPrice = (modelSlug: string, repairSlug: string) =>
  prices.find(p => p.modelSlug === modelSlug && p.repairSlug === repairSlug);

export const getPricesForModel = (modelSlug: string) =>
  prices.filter(p => p.modelSlug === modelSlug);
