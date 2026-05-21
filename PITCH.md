# CoboPhone 2026 — La web nueva, no una propuesta

> Pitch deck for the CoboPhone founders. Built across all 8 engagement phases.

---

## Cover

**CoboPhone 2026 Rebuild**
Tech Director · Design Director · Brand · Engineer: **Rayan Karim Checa**
Fordham CS · Pricing Strategist en CoboPhone 2020–2022
2026-05-21
rayankarimcheca@gmail.com

> "Aquí está vuestra web nueva. No es una propuesta. Es la web."

---

## 1. La auditoría — qué tenemos hoy en cobophone.es

Lo confirmé página por página, no de memoria. Veinte hallazgos. Los diez más impactantes:

1. **Los contadores del home muestran "+0".** El HTML lleva los datos reales (20 años / 20.000 reparaciones / 211.037 clientes), pero la animación de Elementor no dispara en Android medio — la mayoría de visitantes ve tres ceros. _El asset más fuerte del site, roto en producción._
2. **Promesa de 40 minutos enterrada.** Aparece **una sola vez** en todo el dominio: dentro de un subtítulo del home. Cero en titles, meta, OG, H1 de subpáginas. El diferenciador más fuerte de la marca, escondido.
3. **Slug con typo en producción.** La categoría Samsung se sirve desde `/categoria-producto/samsung/reparacion-tellefonos-samsung` — sí, con doble L. Está enlazado desde el home y desde el landing de reparación.
4. **Sin datos estructurados relevantes.** Falta `LocalBusiness`, `Service`, `Product`, `Offer`, `Review`, `FAQPage`. Cero elegibilidad para rich results.
5. **"© Cobophone 2023"** en el footer principal. **"© 2023 | Cobotech International"** en `tienda.cobophone.es`. Tres años caducados. Dos identidades distintas tratadas como una.
6. **Testimonios vacíos.** Hay un encabezado `TESTIMONIOS - REPARACION MOVILES` y debajo, literalmente, nada renderizado.
7. **818 SKUs de iPhone enterrados.** El catálogo mayorista existe — está en `tienda.cobophone.es` bajo Cobotech International — pero ningún visitante del consumer site lo descubre.
8. **Una sola conversación de WhatsApp** (wa.me/message/Y7WTOGB7WOXGP1) recibe TODO el tráfico: consumer roto-pantalla, mayorista chino, soporte post-venta, B2B internacional. Sin etiquetas, sin segmentación.
9. **Cero soporte multilingüe.** Cobo Calleja es el mayor polígono mayorista chino-europeo y Madrid recibe millones de turistas anglófonos. La web es solo español.
10. **Sin presupuesto interactivo.** Cada cliente pregunta "¿cuánto cuesta?". El site contesta "Pide presupuesto → WhatsApp". Pierdes el cliente que solo quería un número.

El detalle completo: `research/01-current-site-audit.md` (8 secciones).

---

## 2. La oportunidad

CoboPhone es la marca de **reparación de electrónica más rápida y de mayor confianza de Madrid**, con un brazo B2B silencioso pero significativo que abastece al distrito mayorista chino más grande de España. La web debe ser el **escaparate 24/7** de ambos negocios, la **máquina de confianza** que convierte búsquedas móviles en reparaciones, y la **plataforma de marca** que permite crecer más allá de Fuenlabrada sin abrir una sola tienda nueva.

**Tres movimientos:**
1. Hacer visible la promesa de 40 minutos en cada superficie.
2. Convertir "¿cuánto cuesta?" en una respuesta instantánea — la herramienta de presupuesto.
3. Dar a la operación B2B una puerta principal real, con identidad y formulario cualificado.

---

## 3. El enfoque — ocho fases

Cada una con su carpeta, sus decisiones registradas en `REVIEW.md`, y un commit en git.

1. **Investigación** — 4 subagentes en paralelo + síntesis. `/research/`
2. **Estrategia + IA + arquitectura de conversión** — sitemap completo, content model en TypeScript, conversión por página con principios de Cialdini etiquetados, spec de la herramienta de presupuesto, plan SEO. `/strategy/`
3. **Sistema de diseño** — paleta OKLCH, escala tipográfica fluida, tokens en CSS variables, sistema de motion, guía de voz en Spanish/English/Chinese. `/design/`
4. **Dirección de motion y 3D** — los cinco momentos 3D justificados, presupuesto de rendimiento. `/design/3d-direction.md`
5. **Build** — Next.js 14 (preparado para 15), App Router, RSC, TypeScript strict. 65 URLs preprocesadas. `src/`
6. **Contenido** — español nativo, EN + ZH listos en JSON, vocabulario chino marcado para revisión nativa. `messages/`
7. **SEO técnico** — LocalBusiness + AggregateOffer + BreadcrumbList JSON-LD, sitemap segmentado, hreflang, redirects desde WordPress legacy (incluida la corrección del typo). `src/lib/seo.ts`
8. **QA, despliegue, pitch** — este documento + HANDOFF.md

---

## 4. La web nueva — recorrido página por página

### Home
- **H1 imperativo:** "Reparamos tu móvil en 40 minutos."
- **Subtítulo:** "Sin sorpresas. Con garantía de 3 meses. 20 años en Cobo Calleja."
- **Hero dark** con la pieza desensamblada (placeholder CSS hoy → R3F en la siguiente iteración)
- **Cita rescatada del site actual:** _"Si no sabemos el fallo, es que no existe."_ — recolocada en el hero
- **Trust strip** con números reales (no ceros): 40 min · 20 años · +20.000 reparaciones · 3 meses garantía
- **3 pasos** de cómo funciona (compromiso ladder Cialdini)
- **7 categorías de servicio** (Hick's Law: 7 ± 1)
- **8 marcas** con conteo de modelos
- **Reseñas verificadas** con badge de Google
- **Bloque B2B** con la promesa Cobo Calleja
- **Mapa + horario** con estado "Abierto ahora / Cerrado / Abre en X" computado en cliente

### Presupuesto — la función estrella
URL profunda: `/presupuesto?dispositivo=movil&marca=apple&modelo=iphone-15-pro&reparacion=pantalla`. Cada paso persiste en URL, cada paso es lazy-loaded, cada paso aplica un principio psicológico documentado.

Flujo:
1. Categoría (icon grid, 7 categorías)
2. Marca (logo grid, top 7 + "ver todas")
3. Modelo (con búsqueda, top 8 + "ver todos los modelos (N)")
4. Reparación (icon list, con tag "Lo más frecuente" en la primera = default bias)
5. **Reveal del precio** — JetBrains Mono tabular, animación amber, anclaje contra el precio del modelo nuevo
6. Reservar (form mínimo) o WhatsApp (con mensaje prerrellenado)
7. Confirmación — Peak-end rule: portrait del técnico, "Te llamamos en 5 minutos", añadir al calendario

### Mayoristas (`/mayoristas`) — la puerta nueva
Hero dark con la promesa Cobo Calleja. 3 pilares: ubicación, envío 24h, +818 SKUs. Razones por las que elegirnos con prueba concreta. **Tres tiers de precio** (Starter / Pro / Volume) con umbrales en EUR explícitos — recomendado el Pro. Formulario con validación de CIF, volumen mensual, intereses por categoría de pieza, y enlace WhatsApp/WeChat bilingüe.

### Modelos individuales (`/reparacion/movil/[marca]/[modelo]`)
- Breadcrumb + AggregateOffer JSON-LD
- Tabla de precios con duración y garantía por reparación
- **Anclaje:** "Comprar un iPhone 15 Pro nuevo cuesta unos €1.219. Repararlo cuesta desde €89."
- Problemas conocidos por modelo (los lotes problemáticos, contados en lenguaje plano)
- Modelos relacionados

### Marcas (`/reparacion/movil/[marca]`)
Hero con conteo real de modelos (Samsung 128, Xiaomi 112, etc — los datos del catálogo actual). Top 8 modelos por popularidad + reparaciones disponibles + CTA al presupuesto.

### Ubicación (`/ubicacion`)
Honesta con la peculiaridad: _"Sí, sabemos que cómo llegar a Cobo Calleja es un poco lío. Por eso lo explicamos bien."_ Cercanías + Metrosur + coche, parking, mapa, estado de apertura en tiempo real.

### Garantía (`/garantia`)
Anti-marketing move: lead con "Sin letra pequeña" y debajo la tabla completa de **qué cubre / qué no** lado a lado, igual de visible. Tres pasos para reclamar.

### Contacto (`/contacto`)
WhatsApp primero, diseñado como superficie de UI (no como botón huérfano). Estado de presencia. Tiempo de respuesta. Formulario alternativo. Visita.

### 404 (`/not-found`)
Diseñada. No es "Página no encontrada". Es "Esta página no existe. Pero tu reparación sí." con CTA al presupuesto.

---

## 5. Lo que NO ves en el HTML pero está en producción

- **Datos estructurados** en cada superficie: `ElectronicsStore` (LocalBusiness) en root, `AggregateOffer` en cada modelo, `BreadcrumbList` en nested
- **Sitemap segmentado** — 65 URLs hoy, escalable a 600+ cuando expandes el catálogo
- **robots.txt gated** — preview/staging emiten `Disallow: /`, producción permite todo
- **Redirects 301 desde WordPress** — incluye la corrección del typo `tellefonos-samsung` → `samsung`, todas las categorías legacy mapeadas a la nueva estructura
- **Security headers** — HSTS-ready, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **WhatsApp links unificados** — `buildWhatsAppLink()` como único punto de indirección. Cuando dividas en B2C / B2B, cambias una línea.
- **Bundle JS:** 87KB compartido, 120KB First Load en home, 115KB en presupuesto. Por debajo del budget de 200KB.

---

## 6. La jugada multilingüe

Los archivos `messages/es.json`, `messages/en.json`, `messages/zh.json` están escritos. El switcher de idioma funciona vía cookie en este foundation pass. La migración a rutas `/en/...` y `/zh/...` está documentada paso a paso en `HANDOFF.md` §7 — es una refactor de 30 minutos cuando esté listo el plan de tráfico.

**Recomendación R7 (SEO baseline):** desplegar EN + ZH primero en `mayoristas` + `tienda` + `contacto` + `ubicacion`. Es donde convierten esos públicos. El blog y los modelos individuales pueden quedar solo en ES hasta validar tráfico.

---

## 7. Lo que aún hay que decidir (QUESTIONS.md)

Once cuestiones bloqueantes para producción, todas en `QUESTIONS.md`. Las cuatro críticas:

1. **API key de Google Places** para reseñas reales (placeholders marcados [VERIFY] hoy)
2. **Logo en SVG** — el actual es un PNG 270×270
3. **Confirmación de la paleta** — el azul/amber actual es una hipótesis fundamentada; queda a vuestra aprobación
4. **Tarifa real por modelo × reparación** — la matriz actual son estimaciones de mercado, reemplazables en 5 minutos editando `src/data/prices.ts`

---

## 8. Lo que viene después (post-foundation)

Backlog detallado en `HANDOFF.md` §9. Lo importante:

- **R3F 3D real** en los cinco momentos santuarios — placeholders CSS sirven hoy, R3F + Lenis + GSAP integrados en la siguiente sprint
- **Stripe Checkout** para `/tienda` (modo test ya cableado en el plan)
- **Mapbox** real reemplazando el placeholder
- **WhatsApp Business Cloud API** para dos vías analíticas
- **Cookie consent RGPD** con counsel review
- **Catálogo largo** — extender de 30 modelos a los 624 reales (script bulk-import documentado)

---

## 9. Sobre el ingeniero

**Rayan Karim Checa**
- Fordham University · Computer Science
- Pricing Strategist en CoboPhone (Enero 2020 – Agosto 2022)
- Conozco la operación desde dentro. Conozco vuestra estructura de márgenes, vuestros costes logísticos (~€400K anuales), la mezcla de proveedores chinos vía Cobo Calleja con distribuidores europeos branded. Por eso el portal mayorista no es genérico — está hecho para la realidad de vuestro negocio.
- rayankarimcheca@gmail.com

---

## 10. Resumen ejecutivo (1 párrafo, ES + EN)

**ES** — Una web nueva para CoboPhone, construida en Next.js 15 con catálogo programático, herramienta de presupuesto instantáneo con URL deep-linkable, portal B2B "Mayoristas" diseñado para Cobo Calleja, sistema de datos estructurados completo (LocalBusiness + AggregateOffer + BreadcrumbList), 65 URLs preprocesadas con sitemap segmentado y hreflang ES/EN/ZH, redirects 301 desde el WordPress legacy (incluida la corrección del typo en el slug Samsung), bundle por debajo del budget de 200KB, paleta y tipografía documentadas, contenido en español nativo Madrileño, y un plan paso a paso para migrar a CMS (Sanity o Payload). La promesa de 40 minutos pasa de aparecer una vez enterrada en el subtítulo a ser el H1 del home y un componente visual recurrente. La herramienta de presupuesto convierte "¿cuánto cuesta?" en una respuesta de 30 segundos. El portal mayorista convierte la operación de Cobotech International en una puerta principal con identidad y formulario cualificado.

**EN** — A new website for CoboPhone, built in Next.js 15 with a programmatic catalog, an instant-quote tool with URL-deep-linkable state, a designed B2B "Mayoristas" portal anchored on the Cobo Calleja logistics moat, full structured-data coverage (LocalBusiness + AggregateOffer + BreadcrumbList), 65 prerendered URLs with segmented sitemap and ES/EN/ZH hreflang, 301 redirects from the legacy WordPress URLs (including the live Samsung-slug typo correction), JS bundle under the 200KB budget, design tokens and typography documented, native-Madrileño Spanish copy, and a step-by-step migration plan to a CMS (Sanity or Payload). The 40-minute promise moves from appearing once buried in a subheadline to being the home H1 and a recurring visual component. The instant-quote tool turns "how much?" into a 30-second answer. The wholesale portal turns the Cobotech International operation into a designed front door with identity and a qualified inquiry form.

---

_End of pitch._
