// Capture desktop + mobile screenshots of the live site for README.
// Usage: node scripts/capture-screenshots.mjs (requires `npm run start` on :3940)

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE = process.env.SCREEN_BASE || 'http://localhost:3940';
const OUT = resolve(process.cwd(), 'docs/screenshots');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile:  { width: 390,  height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
};

const PAGES = [
  { slug: '01-home-hero',             path: '/',                                                                                                                        title: 'Home — hero with trust strip',  scrollTo: 0,    viewportOnly: true },
  { slug: '02-journey-panic',         path: '/',                                                                                                                        title: 'Phone journey — act 1 panic',   scrollTo: 1000, viewportOnly: true, motion: true },
  { slug: '03-journey-tears',         path: '/',                                                                                                                        title: 'Phone journey — act 2 tears',   scrollTo: 1800, viewportOnly: true, motion: true },
  { slug: '04-journey-chase',         path: '/',                                                                                                                        title: 'Phone journey — act 3 chase',   scrollTo: 2700, viewportOnly: true, motion: true },
  { slug: '05-journey-arrival',       path: '/',                                                                                                                        title: 'Phone journey — act 4 arrival', scrollTo: 3500, viewportOnly: true, motion: true },
  { slug: '06-journey-repaired',      path: '/',                                                                                                                        title: 'Phone journey — act 5 repaired',scrollTo: 4200, viewportOnly: true, motion: true },
  { slug: '07-home-howitworks',       path: '/',                                                                                                                        title: 'Home — how it works',           scrollTo: 5000, viewportOnly: true },
  { slug: '08-home-services',         path: '/',                                                                                                                        title: 'Home — services grid',          scrollTo: 5800, viewportOnly: true },
  { slug: '09-home-brands',           path: '/',                                                                                                                        title: 'Home — brands grid',            scrollTo: 6600, viewportOnly: true },
  { slug: '10-home-reviews',          path: '/',                                                                                                                        title: 'Home — verified reviews',       scrollTo: 7400, viewportOnly: true },
  { slug: '11-home-wholesale',        path: '/',                                                                                                                        title: 'Home — B2B teaser',             scrollTo: 8200, viewportOnly: true },
  { slug: '12-quote-step1',           path: '/presupuesto',                                                                                                             title: 'Quote tool — step 1 device' },
  { slug: '13-quote-step5-price',     path: '/presupuesto?dispositivo=movil&marca=apple&modelo=iphone-15-pro&reparacion=pantalla',                                       title: 'Quote tool — price reveal' },
  { slug: '14-mayoristas-hero',       path: '/mayoristas',                                                                                                              title: 'Mayoristas — B2B portal hero',  viewportOnly: true },
  { slug: '15-mayoristas-pillars',    path: '/mayoristas',                                                                                                              title: 'Mayoristas — three pillars',    scrollTo: 700, viewportOnly: true },
  { slug: '16-mayoristas-tiers',      path: '/mayoristas',                                                                                                              title: 'Mayoristas — pricing tiers',    scrollTo: 2000, viewportOnly: true },
  { slug: '17-mayoristas-form',       path: '/mayoristas',                                                                                                              title: 'Mayoristas — inquiry form',     scrollTo: 2800, viewportOnly: true },
  { slug: '18-reparacion-hub',        path: '/reparacion',                                                                                                              title: 'Reparación — device-category hub' },
  { slug: '19-brand-apple',           path: '/reparacion/movil/apple',                                                                                                  title: 'Brand hub — Apple' },
  { slug: '20-model-iphone-15-pro',   path: '/reparacion/movil/apple/iphone-15-pro',                                                                                    title: 'Model page — iPhone 15 Pro' },
  { slug: '21-model-price-table',     path: '/reparacion/movil/apple/iphone-15-pro',                                                                                    title: 'Model page — price table',      scrollTo: 800, viewportOnly: true },
  { slug: '22-ubicacion',             path: '/ubicacion',                                                                                                               title: 'Ubicación — store + transit' },
  { slug: '23-garantia',              path: '/garantia',                                                                                                                title: 'Garantía — covered vs not' },
  { slug: '24-contacto',              path: '/contacto',                                                                                                                title: 'Contacto — WhatsApp first' },
  { slug: '25-404',                   path: '/this-page-does-not-exist',                                                                                                title: '404 — designed error page' }
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const [device, viewport] of Object.entries(VIEWPORTS)) {
  console.log(`\n→ ${device.toUpperCase()} (${viewport.width}×${viewport.height})`);

  // We need two contexts:
  // - Default with reduced-motion ON for steady screenshots
  // - One without reduced-motion for the phone-journey acts where we want to show motion
  const baseContextOpts = {
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile ?? false,
    hasTouch: viewport.hasTouch ?? false
  };
  const calmContext = await browser.newContext({ ...baseContextOpts, reducedMotion: 'reduce' });
  const motionContext = await browser.newContext({ ...baseContextOpts, reducedMotion: 'no-preference' });

  for (const p of PAGES) {
    const url = `${BASE}${p.path}`;
    const fname = `${p.slug}-${device}.png`;
    const out = resolve(OUT, fname);
    const ctx = p.motion ? motionContext : calmContext;
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForLoadState('load');
      await page.waitForTimeout(800);
      if (p.scrollTo !== undefined) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), p.scrollTo);
        await page.waitForTimeout(700);  // let motion settle on the act
      }
      const fullPage = !p.scrollTo && !p.viewportOnly;
      await page.screenshot({ path: out, fullPage });
      console.log(`  ✓ ${fname}`);
    } catch (err) {
      console.error(`  ✗ ${fname}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
  await calmContext.close();
  await motionContext.close();
}

await browser.close();
console.log(`\nDone. Screenshots → ${OUT}`);
