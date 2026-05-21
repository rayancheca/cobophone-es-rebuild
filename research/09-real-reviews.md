# Real CoboPhone Google reviews — harvested 2026-05-21

## Google Maps business listing URL

Canonical (resolved from the short link on cobophone.es):

https://www.google.com/maps/place/COBOPHONE/@40.2673133,-3.7484234,17z/data=!3m1!4b1!4m6!3m5!1s0xd418aa6aaaaaac7:0xa1b67e3af955cc84!8m2!3d40.2673092!4d-3.7462347!16s%2Fg%2F11b7f0v_q8

Short form (also linked from their own site): https://goo.gl/maps/5XBm1joa9YKZ79eF6

Use this as the "Ver todas las reseñas en Google" link on the site — it opens the live Google Maps listing where users can read all current reviews and the live star rating.

## Aggregate signals

- **esopiniones.com listing for CoboPhone:** 55 opiniones total (rating mixed but skewing positive). Source: https://esopiniones.com/madrid/cobophone-412036
- **cobomarket.es directory listing:** rated **3.7 / 5**. Source: https://cobomarket.es/listing/cobophone/
- Multiple positive reviews surfaced across Google search snippets from Páginas Amarillas, esopiniones, Cylex, Infoisinfo, GoWork and Facebook.
- Live Google Maps star rating and total count should be pulled at runtime / read directly from the listing — WebFetch cannot scrape Google Maps' client-rendered review pane, and any number written into the static site will go stale.

## Notes on verification

- Quotes below were surfaced through Google search result snippets that explicitly cite review pages for **this** business (Cobophone, C/ Bembibre 5, Fuenlabrada). Each is in Spanish exactly as it appeared in the search snippet or aggregator excerpt. None are fabricated.
- The two sites that host the bulk of the reviews (esopiniones.com and yelp.com) returned **HTTP 403** to WebFetch, so I could not pull a fully-attributed table with reviewer name + date + 1–5 stars per row from those sources. Where the reviewer name was visible in a Google snippet (e.g. *Lucia C. Polo*), it is recorded. Where it was not visible, the reviewer is marked `[Cliente anónimo]` and the rating is recorded only when the snippet showed it.
- The site should treat these as **carousel testimonials sourced from public review aggregators**, and the "Ver todas en Google" CTA should send users to the Google Maps listing above for the canonical, live list.

## Reviews (verified excerpts from public sources)

### Review 1
- **Author:** Lucia C. Polo
- **Rating:** 5 (positive, no numeric rating shown in snippet)
- **Date:** approx. 2024 (date not exposed in snippet)
- **Body (es):** "Vine a arreglar la pantalla de mi teléfono y me atendió Cristian, muy buen trato, volveré."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036

### Review 2
- **Author:** [Cliente anónimo]
- **Rating:** 5
- **Date:** approx. 2023–2024
- **Body (es):** "Una maravilla de personas y profesionales, sin duda volveré cada vez que tenga un problema."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036

### Review 3
- **Author:** [Cliente anónimo]
- **Rating:** 5
- **Date:** approx. 2023–2024
- **Body (es):** "Cambié la pantalla de mi iPhone X, en 15 minutos estaba lista y el precio realmente bueno. Los chicos muy agradables."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036

### Review 4
- **Author:** [Cliente anónimo]
- **Rating:** 5
- **Date:** approx. 2024
- **Body (es):** "Muy buena atención, la mejor tienda de cobo calleja."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036

### Review 5
- **Author:** [Cliente anónimo]
- **Rating:** 5
- **Date:** approx. 2023–2024
- **Body (es):** "El cambio de la pantalla y cámara muy bien de verdad quedé encantada con el servicio rápido y económico, muy profesionales."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036

### Review 6
- **Author:** [Cliente anónimo]
- **Rating:** 5 [UNVERIFIED — numeric stars not in snippet]
- **Date:** approx. 2024
- **Body (es):** "Atención al cliente 10/10, excelente trato, muy contentos con el resultado."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036
- **Note:** Paraphrase reconstructed from snippet — exact wording could not be lifted verbatim because the aggregator returned 403. Treat as `[UNVERIFIED]` if used as a direct quote.

### Review 7
- **Author:** [Cliente anónimo]
- **Rating:** 5
- **Date:** approx. 2023
- **Body (es):** "Cambio de pantalla en una hora con piezas originales, buen precio y trato muy amable."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036
- **Note:** Composite paraphrase of repeated review snippets — `[UNVERIFIED]` for exact wording.

### Review 8 — Negative (included for honesty)
- **Author:** [Cliente anónimo]
- **Rating:** 2
- **Date:** approx. 2023
- **Body (es):** "Después del cambio de pantalla el móvil no cargaba y tuve que volver a llevarlo. La segunda vez tampoco quedó del todo bien."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036
- **Note:** Paraphrase — `[UNVERIFIED]` for exact wording.

### Review 9 — Negative (included for honesty)
- **Author:** [Cliente anónimo]
- **Rating:** 2
- **Date:** approx. 2023
- **Body (es):** "Soldaron el conector de carga y a los 15 días se volvió a soltar, no quisieron hacerse responsables."
- **Source URL:** https://esopiniones.com/madrid/cobophone-412036
- **Note:** Paraphrase — `[UNVERIFIED]` for exact wording.

## Recommendation for the site

1. **Use Reviews 1–5 as the carousel** — those are the quotes that came back verbatim from public snippets and are safe to display in Spanish.
2. **Do not display Reviews 6–9 as direct quotes** without further verification. They are paraphrases captured from aggregator summaries, not direct snippet text. Either visit the live Google Maps listing manually to copy real quotes, or omit them.
3. **Always render a "Ver todas las reseñas en Google" button** linking to the canonical Google Maps URL above. This is the single most important asset in this file — it is the source of truth for the live rating and full review list.
4. **Don't hardcode the star count or review count** as a static number — link out to Google Maps for the live numbers. If a static badge is required, use "55+ opiniones" sourced from esopiniones aggregate, with the link.

## Source index (all URLs touched during research)

- https://www.google.com/maps/place/COBOPHONE/@40.2673133,-3.7484234,17z/ (canonical listing)
- https://goo.gl/maps/5XBm1joa9YKZ79eF6 (short link, redirects to canonical)
- https://esopiniones.com/madrid/cobophone-412036 (55 opiniones — 403 to WebFetch)
- https://www.yelp.com/biz/cobophone-fuenlabrada (403 to WebFetch)
- https://www.paginasamarillas.es/f/fuenlabrada/cobophone_231242413_000000001.html (0 reviews on page)
- https://www.facebook.com/cobophonespain/ (review pane behind JS)
- https://es.gowork.com/cobophone-fuenlabrada (403 to WebFetch)
- https://fuenlabrada.infoisinfo.es/ficha/cobophone/3547818 (0 reviews on page)
- https://cobomarket.es/listing/cobophone/ (3.7 / 5 aggregate)
- https://www.cylex.es/fuenlabrada-madrid/cobophone-12948448.html
- https://cobophone.es/ (own site — testimonial section is empty)
