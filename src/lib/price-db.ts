/**
 * Price-DB lookup — thin search layer over the in-memory price + model + repair
 * data. Used by the chatbot (src/components/chat/Chatbot.tsx) to answer
 * free-text questions like "cuánto cuesta cambiar pantalla iphone 13" without
 * needing to drive the user through the full quote-tool funnel.
 *
 * Production: when the catalog moves to Sanity/Payload (see HANDOFF §2),
 * swap these functions for cached server fetches. The exported function
 * signatures stay the same.
 */

import { models as _models } from '@/data/models';
import { brands } from '@/data/brands';
import { repairTypes } from '@/data/repair-types';
import { prices, getPrice } from '@/data/prices';
import { formatPrice } from '@/lib/utils';

export interface PriceLookupResult {
  modelSlug: string;
  modelName: string;
  brandName: string;
  brandSlug: string;
  repairSlug: string;
  repairName: string;
  priceMin: number;
  priceMax: number;
  priceFormatted: string;
  durationMin: number;
  warrantyMonths: number;
}

/** Normalize: lowercase, strip diacritics, collapse whitespace. */
function norm(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Search models by free-text query. Returns top-N by match strength. */
export function searchModels(query: string, limit = 5): Array<{ slug: string; name: string; brandSlug: string; brandName: string; popularityScore: number }> {
  const q = norm(query);
  if (q.length < 2) return [];

  const scored = _models.map(m => {
    const nameN = norm(m.name);
    const slugN = norm(m.slug);
    const brandN = norm(m.brandSlug);
    let score = 0;
    if (nameN === q) score += 100;
    if (nameN.startsWith(q)) score += 50;
    if (nameN.includes(q)) score += 30;
    if (slugN.includes(q)) score += 20;
    if (brandN.includes(q)) score += 10;
    // Token-level scoring: each query token that hits the name boosts further
    for (const tok of q.split(' ')) {
      if (tok.length < 2) continue;
      if (nameN.includes(tok)) score += 8;
    }
    return { m, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score || b.m.popularityScore - a.m.popularityScore)
    .slice(0, limit)
    .map(s => {
      const brand = brands.find(b => b.slug === s.m.brandSlug);
      return {
        slug: s.m.slug,
        name: s.m.name,
        brandSlug: s.m.brandSlug,
        brandName: brand?.name ?? s.m.brandSlug,
        popularityScore: s.m.popularityScore
      };
    });
}

/** Search repair types by free-text. */
export function searchRepairs(query: string): Array<{ slug: string; name: string }> {
  const q = norm(query);
  if (q.length < 2) return [];

  // Map common Spanish phrases to repair slugs
  const PHRASE_MAP: Array<{ phrases: string[]; slug: string }> = [
    { phrases: ['pantalla', 'screen', 'display', 'cristal', 'lcd', 'oled', 'roto', 'rota'], slug: 'pantalla' },
    { phrases: ['bateria', 'battery', 'pila', 'autonomia', 'no carga', 'descarga'], slug: 'bateria' },
    { phrases: ['conector', 'carga', 'puerto', 'usb', 'lightning', 'cargar', 'no carga'], slug: 'conector-carga' },
    { phrases: ['camara', 'lente', 'foto', 'borrosa'], slug: 'camara' },
    { phrases: ['tapa', 'trasera', 'back cover', 'cristal trasero'], slug: 'tapa-trasera' },
    { phrases: ['agua', 'water', 'mojado', 'humedad'], slug: 'agua' },
    { phrases: ['placa', 'motherboard', 'mainboard', 'chip', 'micro soldadura'], slug: 'placa' }
  ];

  for (const entry of PHRASE_MAP) {
    if (entry.phrases.some(p => q.includes(p))) {
      const rt = repairTypes.find(r => r.slug === entry.slug);
      if (rt) return [{ slug: rt.slug, name: rt.name.es }];
    }
  }
  return [];
}

/** Look up the exact price for a (model, repair) pair. */
export function lookupPrice(modelSlug: string, repairSlug: string): PriceLookupResult | null {
  const m = _models.find(mm => mm.slug === modelSlug);
  const rt = repairTypes.find(r => r.slug === repairSlug);
  const p = getPrice(modelSlug, repairSlug);
  if (!m || !rt || !p) return null;
  const brand = brands.find(b => b.slug === m.brandSlug);
  return {
    modelSlug: m.slug,
    modelName: m.name,
    brandName: brand?.name ?? m.brandSlug,
    brandSlug: m.brandSlug,
    repairSlug: rt.slug,
    repairName: rt.name.es,
    priceMin: p.priceMin,
    priceMax: p.priceMax,
    priceFormatted: formatPrice(p.priceMin, p.priceMax),
    durationMin: rt.averageDurationMinutes,
    warrantyMonths: rt.warrantyMonths
  };
}

/** Get all available repair types for a given model (those with price entries). */
export function getRepairsForModel(modelSlug: string): Array<{ slug: string; name: string; priceMin: number; priceMax: number; priceFormatted: string }> {
  return prices
    .filter(p => p.modelSlug === modelSlug)
    .map(p => {
      const rt = repairTypes.find(r => r.slug === p.repairSlug);
      return {
        slug: p.repairSlug,
        name: rt?.name.es ?? p.repairSlug,
        priceMin: p.priceMin,
        priceMax: p.priceMax,
        priceFormatted: formatPrice(p.priceMin, p.priceMax)
      };
    });
}

/** All brand options for the device picker. */
export function getBrandOptions(): Array<{ slug: string; name: string }> {
  return brands.map(b => ({ slug: b.slug, name: b.name }));
}

/** Top-N most popular models for a brand. */
export function getTopModels(brandSlug: string, limit = 6): Array<{ slug: string; name: string }> {
  return _models
    .filter(m => m.brandSlug === brandSlug)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit)
    .map(m => ({ slug: m.slug, name: m.name }));
}

/** All repair-type options. */
export function getRepairOptions(): Array<{ slug: string; name: string }> {
  return repairTypes
    .filter(r => r.slug !== 'otros')
    .map(r => ({ slug: r.slug, name: r.name.es }));
}
