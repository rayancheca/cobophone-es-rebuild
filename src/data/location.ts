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
  whatsappPrefilledLink: 'https://wa.me/message/Y7WTOGB7WOXGP1',
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

// Reviews — these are demonstrative placeholders. [VERIFY] via Google Places API before launch.
export const reviews: Review[] = [
  {
    id: 'r-001',
    source: 'google',
    author: 'María L.',
    rating: 5,
    body: { es: 'Me cambiaron la pantalla del iPhone 13 en 35 minutos y por un precio cerrado. Sin sorpresas. Vuelvo seguro.', en: 'They replaced my iPhone 13 screen in 35 minutes for a fixed price. No surprises. Definitely going back.', zh: '35 分钟内修好了我的 iPhone 13 屏幕，价格固定，没有意外。一定还会再来。' },
    date: '2026-04-12',
    verified: true
  },
  {
    id: 'r-002',
    source: 'google',
    author: 'Wei Z.',
    rating: 5,
    body: { es: 'Compro pantallas al por mayor desde hace tres años. Calidad consistente y precios competitivos. Trato cercano.', en: 'I\'ve been buying screens wholesale from them for three years. Consistent quality, competitive pricing, personal service.', zh: '三年来一直从他们这里批发屏幕。品质稳定，价格有竞争力，服务亲切。' },
    date: '2026-03-28',
    verified: true
  },
  {
    id: 'r-003',
    source: 'google',
    author: 'Carlos R.',
    rating: 5,
    body: { es: 'Patinete eléctrico con la batería muerta. Me la cambiaron y diagnosticaron un problema de freno que ni sabía. Excelente.', en: 'Dead e-scooter battery. They replaced it and caught a brake issue I didn\'t even know about. Excellent.', zh: '电动滑板车电池没电。他们更换了电池，还发现了我不知道的刹车问题。非常出色。' },
    date: '2026-03-15',
    verified: true
  },
  {
    id: 'r-004',
    source: 'google',
    author: 'Patricia G.',
    rating: 5,
    body: { es: '20 años aquí no son casualidad. Saben de lo que hablan. Y abren los domingos.', en: '20 years here is no coincidence. They know what they\'re doing. And they\'re open on Sundays.', zh: '在这里二十年绝非偶然。他们真的懂。而且周日营业。' },
    date: '2026-02-09',
    verified: true
  },
  {
    id: 'r-005',
    source: 'google',
    author: 'Diego M.',
    rating: 5,
    body: { es: 'Recogieron el portátil en Móstoles, lo arreglaron y lo devolvieron al día siguiente. Sin moverme.', en: 'They picked up my laptop in Móstoles, fixed it, and returned it next day. No effort on my part.', zh: 'Móstoles 上门取笔记本，第二天送回。完全无需我操心。' },
    date: '2026-02-02',
    verified: true
  },
  {
    id: 'r-006',
    source: 'google',
    author: 'Sandra V.',
    rating: 5,
    body: { es: 'Pantalla Galaxy S22 que tenía la batería hinchada también. Me avisaron antes de cobrar y cambiaron las dos cosas.', en: 'Galaxy S22 screen — battery was also swollen. They flagged it before charging me and replaced both.', zh: 'Galaxy S22 屏幕维修时发现电池也鼓包。他们在收费前告知并同时更换。' },
    date: '2026-01-22',
    verified: true
  }
];
