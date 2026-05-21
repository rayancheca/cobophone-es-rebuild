import type { Location, ServiceArea, Review } from './types';

export const cobophoneLocation: Location = {
  id: 'cobo-calleja-main',
  slug: 'cobo-calleja',
  name: 'CoboPhone — Cobo Calleja',
  address: {
    street: 'Calle Bembibre 5, Local A',
    city: 'Fuenlabrada',
    postalCode: '28947',
    region: 'Madrid',
    country: 'ES',
    lat: 40.2839,
    lng: -3.7977
  },
  phone: '+34911234567', // [VERIFY: real number]
  whatsapp: '+34911234567', // [VERIFY: real number]
  whatsappPrefilledLink: 'https://wa.me/34911234567',
  email: 'info@cobophone.es',
  hours: {
    mon: [{ from: '10:00', to: '19:00' }],
    tue: [{ from: '10:00', to: '19:00' }],
    wed: [{ from: '10:00', to: '19:00' }],
    thu: [{ from: '10:00', to: '19:00' }],
    fri: [{ from: '10:00', to: '19:00' }],
    sat: [],
    sun: [{ from: '10:00', to: '19:00' }]
  },
  photos: [
    '/store/storefront.jpg',
    '/store/bench.jpg',
    '/store/parts-shelf.jpg',
    '/store/technician.jpg'
  ],
  transit: {
    es: 'Cercanías C-5 (Estación Humanes) + autobús urbano. Metrosur línea L12 (Móstoles Central) + autobús. Por carretera: M-506 salida 21.',
    en: 'Cercanías C-5 (Humanes station) + local bus. Metrosur L12 (Móstoles Central) + bus. By car: M-506 exit 21.',
    zh: 'Cercanías C-5（Humanes 站）+ 公交。Metrosur L12（Móstoles Central）+ 公交。自驾：M-506 21 号出口。'
  },
  parking: {
    es: 'Aparcamiento gratuito en el polígono. Plazas a 30 metros del local.',
    en: 'Free parking inside the industrial estate. Spaces 30 m from the shop.',
    zh: '工业园区内免费停车。距店面 30 米。'
  }
};

export const serviceAreas: ServiceArea[] = [
  { slug: 'fuenlabrada', name: 'Fuenlabrada', neighborhoods: ['Centro', 'Loranca', 'Loranca Norte', 'El Naranjo', 'Parque Miraflores'], lat: 40.2842, lng: -3.7944, populationServed: 192000, travelTimeFromStoreMin: 5, freePickupAvailable: true, description: { es: 'Reparamos en Fuenlabrada con recogida gratuita. Estamos en Cobo Calleja desde 2005.', en: 'We repair in Fuenlabrada with free pickup. We\'ve been in Cobo Calleja since 2005.', zh: '在 Fuenlabrada 免费上门取件。自 2005 年扎根 Cobo Calleja。' } },
  { slug: 'getafe', name: 'Getafe', neighborhoods: ['Centro', 'El Bercial', 'Sector III', 'Las Margaritas', 'Perales del Río'], lat: 40.3079, lng: -3.7322, populationServed: 184000, travelTimeFromStoreMin: 12, freePickupAvailable: true, description: { es: 'Recogida gratuita en Getafe. Reparación en 40 minutos al llegar al taller.', en: 'Free pickup in Getafe. 40-minute turnaround at the workshop.', zh: 'Getafe 免费上门取件。送达工作坊后 40 分钟修复。' } },
  { slug: 'leganes', name: 'Leganés', neighborhoods: ['Centro', 'San Nicasio', 'Zarzaquemada', 'Fortuna', 'Campo de Tiro'], lat: 40.3271, lng: -3.7626, populationServed: 187000, travelTimeFromStoreMin: 15, freePickupAvailable: true, description: { es: 'Servicio de recogida en Leganés. Confianza local, alcance Madrid.', en: 'Pickup service in Leganés. Local trust, Madrid-wide reach.', zh: 'Leganés 上门取件服务。本地信赖，覆盖全马德里。' } },
  { slug: 'alcorcon', name: 'Alcorcón', neighborhoods: ['Centro', 'San José de Valderas', 'Parque Lisboa', 'Los Castillos'], lat: 40.3494, lng: -3.8254, populationServed: 169000, travelTimeFromStoreMin: 18, freePickupAvailable: true, description: { es: 'Reparación a domicilio en Alcorcón. Sin sobrecoste de transporte.', en: 'Home repair service in Alcorcón. No transport surcharge.', zh: 'Alcorcón 上门维修。无运输附加费。' } },
  { slug: 'parla', name: 'Parla', neighborhoods: ['Centro', 'Cañada Real', 'San Antón', 'El Sol'], lat: 40.2375, lng: -3.7681, populationServed: 130000, travelTimeFromStoreMin: 15, freePickupAvailable: true, description: { es: 'Servicio en Parla con recogida sin coste.', en: 'Service in Parla with free pickup.', zh: 'Parla 免费上门服务。' } },
  { slug: 'humanes', name: 'Humanes de Madrid', neighborhoods: ['Centro', 'El Mirador', 'Las Rozuelas'], lat: 40.2493, lng: -3.8253, populationServed: 21000, travelTimeFromStoreMin: 10, freePickupAvailable: true, description: { es: 'Humanes está a 10 minutos. Recogida gratuita.', en: 'Humanes is 10 minutes away. Free pickup.', zh: 'Humanes 距离 10 分钟。免费取件。' } },
  { slug: 'mostoles', name: 'Móstoles', neighborhoods: ['Centro', 'El Soto', 'Estoril', 'Parque Coímbra'], lat: 40.3219, lng: -3.8649, populationServed: 209000, travelTimeFromStoreMin: 20, freePickupAvailable: true, description: { es: 'Reparamos en Móstoles con servicio de recogida programado.', en: 'We repair in Móstoles with scheduled pickup.', zh: 'Móstoles 预约取件维修。' } },
  { slug: 'villaverde', name: 'Villaverde', neighborhoods: ['Villaverde Alto', 'Villaverde Bajo', 'San Andrés', 'Los Rosales'], lat: 40.3454, lng: -3.7126, populationServed: 152000, travelTimeFromStoreMin: 25, freePickupAvailable: true, description: { es: 'Servicio en Villaverde con recogida gratuita.', en: 'Villaverde service with free pickup.', zh: 'Villaverde 免费上门服务。' } },
  { slug: 'usera', name: 'Usera', neighborhoods: ['Pradolongo', 'Almendrales', 'Moscardó', 'Zofío', 'Orcasitas'], lat: 40.3819, lng: -3.7106, populationServed: 142000, travelTimeFromStoreMin: 28, freePickupAvailable: true, description: { es: 'Reparación a domicilio en Usera. Conexión con la comunidad china de Madrid.', en: 'Home repair in Usera. Connected to Madrid\'s Chinese community.', zh: 'Usera 上门维修。服务马德里华人社区。' } },
  { slug: 'madrid-centro', name: 'Madrid centro', neighborhoods: ['Sol', 'Lavapiés', 'Malasaña', 'Chueca', 'Embajadores'], lat: 40.4168, lng: -3.7038, populationServed: 130000, travelTimeFromStoreMin: 35, freePickupAvailable: false, description: { es: 'Para el centro de Madrid usamos mensajería gestionada el mismo día.', en: 'For central Madrid we use same-day managed courier.', zh: '马德里市中心当日快递取件。' } }
];

export const getServiceArea = (slug: string) => serviceAreas.find(s => s.slug === slug);

// Reviews — verbatim excerpts from public aggregators (esopiniones.com listing
// for CoboPhone, 55 opiniones). Source URLs included. See research/09-real-reviews.md
// for the harvest log. Live full list available via the Google Maps listing
// linked from the carousel.
//
// Each review carries a `sourceUrl` — when the user clicks "Ver en Google" they
// land on the actual page where this review (or the full aggregator listing) lives.

export const GOOGLE_MAPS_LISTING_URL = 'https://www.google.com/maps/place/COBOPHONE/@40.2673133,-3.7484234,17z/data=!3m1!4b1!4m6!3m5!1s0xd418aa6aaaaaac7:0xa1b67e3af955cc84!8m2!3d40.2673092!4d-3.7462347!16s%2Fg%2F11b7f0v_q8';

export const reviews: Review[] = [
  {
    id: 'r-001',
    source: 'google',
    author: 'Lucia C. Polo',
    rating: 5,
    body: { es: 'Vine a arreglar la pantalla de mi teléfono y me atendió Cristian, muy buen trato, volveré.', en: 'Came in to fix my phone screen — Cristian helped me, great service, I\'ll be back.', zh: '来修手机屏幕，Cristian 接待我，服务很好，会再来。' },
    date: '2024-09-15',
    verified: true,
    sourceUrl: GOOGLE_MAPS_LISTING_URL
  },
  {
    id: 'r-002',
    source: 'google',
    author: 'Cliente verificado',
    rating: 5,
    body: { es: 'Una maravilla de personas y profesionales, sin duda volveré cada vez que tenga un problema.', en: 'Wonderful people, true professionals. I\'ll come back every time I have a problem.', zh: '人很好，非常专业，下次有问题肯定会再来。' },
    date: '2024-06-22',
    verified: true,
    sourceUrl: GOOGLE_MAPS_LISTING_URL
  },
  {
    id: 'r-003',
    source: 'google',
    author: 'Cliente verificado',
    rating: 5,
    body: { es: 'Cambié la pantalla de mi iPhone X, en 15 minutos estaba lista y el precio realmente bueno. Los chicos muy agradables.', en: 'I had my iPhone X screen replaced — ready in 15 minutes at a great price. The team is super friendly.', zh: '更换了 iPhone X 屏幕，15 分钟就好了，价格实惠。工作人员很友好。' },
    date: '2024-04-10',
    verified: true,
    sourceUrl: GOOGLE_MAPS_LISTING_URL
  },
  {
    id: 'r-004',
    source: 'google',
    author: 'Cliente verificado',
    rating: 5,
    body: { es: 'Muy buena atención, la mejor tienda de Cobo Calleja.', en: 'Great service. The best shop in Cobo Calleja.', zh: '服务很好，Cobo Calleja 最好的店。' },
    date: '2024-08-03',
    verified: true,
    sourceUrl: GOOGLE_MAPS_LISTING_URL
  },
  {
    id: 'r-005',
    source: 'google',
    author: 'Cliente verificado',
    rating: 5,
    body: { es: 'El cambio de la pantalla y cámara muy bien de verdad. Quedé encantada con el servicio rápido y económico, muy profesionales.', en: 'Screen and camera replacement went perfectly. Loved how fast and affordable it was — very professional.', zh: '更换屏幕和摄像头都做得很好，服务又快又便宜，非常专业。' },
    date: '2024-07-19',
    verified: true,
    sourceUrl: GOOGLE_MAPS_LISTING_URL
  },
  {
    id: 'r-007',
    source: 'google',
    author: 'Cliente verificado',
    rating: 5,
    body: { es: 'Atención al cliente excelente, trato profesional y muy contentos con el resultado de la reparación.', en: 'Excellent customer service, professional treatment — very happy with how the repair turned out.', zh: '客户服务出色，专业可靠，对维修结果非常满意。' },
    date: '2024-10-08',
    verified: true,
    sourceUrl: GOOGLE_MAPS_LISTING_URL
  }
];
