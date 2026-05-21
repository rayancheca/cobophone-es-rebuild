// Capture screenshots against the LIVE Vercel deployment for the README.
// Quick: ~12 highest-value frames, desktop + mobile.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE = 'http://localhost:3940';
const OUT = resolve(process.cwd(), 'docs/screenshots');

const PAGES = [
  { slug: '01-home-hero',           path: '/',                                                                                                title: 'Home — hero with violet/magenta palette',  scrollTo: 0,    viewport: true },
  { slug: '02-journey-panic',       path: '/',                                                                                                title: 'Phone journey — act 1 (panic)',            scrollTo: 1200, viewport: true, motion: true },
  { slug: '03-journey-chase',       path: '/',                                                                                                title: 'Phone journey — act 3 (chase)',            scrollTo: 2800, viewport: true, motion: true },
  { slug: '04-journey-repaired',   path: '/',                                                                                                title: 'Phone journey — act 5 (repaired)',         scrollTo: 4400, viewport: true, motion: true },
  { slug: '05-home-services',       path: '/',                                                                                                title: 'Home — services grid',                     scrollTo: 5600, viewport: true },
  { slug: '06-home-brands',         path: '/',                                                                                                title: 'Home — brands grid',                       scrollTo: 6400, viewport: true },
  { slug: '07-home-reviews',        path: '/',                                                                                                title: 'Home — verified reviews',                  scrollTo: 7200, viewport: true },
  { slug: '08-chatbot-open',        path: '/',                                                                                                title: 'Chatbot — open with quick replies',        chat: true,    viewport: true },
  { slug: '09-quote-step1',         path: '/presupuesto',                                                                                     title: 'Quote tool — step 1 device',               viewport: true },
  { slug: '10-quote-price',         path: '/presupuesto?dispositivo=movil&marca=apple&modelo=iphone-15-pro&reparacion=pantalla',              title: 'Quote tool — price reveal deep-link',      viewport: true },
  { slug: '11-mayoristas',          path: '/mayoristas',                                                                                      title: 'Mayoristas — B2B portal hero',             viewport: true },
  { slug: '12-model-page',          path: '/reparacion/movil/apple/iphone-15-pro',                                                            title: 'Model page — iPhone 15 Pro',               viewport: true },
  { slug: '13-ubicacion',           path: '/ubicacion',                                                                                       title: 'Ubicación — store + transit',              viewport: true },
  { slug: '14-garantia',            path: '/garantia',                                                                                        title: 'Garantía — covered vs not',                viewport: true }
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile:  { width: 390,  height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
};

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const [device, viewport] of Object.entries(VIEWPORTS)) {
  console.log(`\n→ ${device.toUpperCase()}`);
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile ?? false,
    hasTouch: viewport.hasTouch ?? false,
    reducedMotion: 'reduce'
  });
  const motionContext = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile ?? false,
    hasTouch: viewport.hasTouch ?? false,
    reducedMotion: 'no-preference'
  });

  for (const p of PAGES) {
    const url = `${BASE}${p.path}`;
    const fname = `${p.slug}-${device}.png`;
    const out = resolve(OUT, fname);
    const ctx = p.motion ? motionContext : context;
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(700);
      if (p.scrollTo !== undefined) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), p.scrollTo);
        await page.waitForTimeout(800);
      }
      if (p.chat) {
        await page.locator('button[aria-label="Abrir chat con un técnico"]').click();
        await page.waitForTimeout(900);
      }
      await page.screenshot({ path: out, fullPage: !p.viewport });
      console.log(`  ✓ ${fname}`);
    } catch (err) {
      console.error(`  ✗ ${fname}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
  await context.close();
  await motionContext.close();
}

await browser.close();
console.log(`\nDone. → ${OUT}`);
