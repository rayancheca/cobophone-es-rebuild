import type { Metadata } from 'next';
import { Tv } from 'lucide-react';
import { DeviceHubPage } from '@/components/sections/DeviceHubPage';

export const metadata: Metadata = {
  title: 'Reparación de televisores en Madrid · LED, OLED, QLED',
  description: 'LED individuales fundidos, fuente de alimentación, placa principal, t-con. Samsung, LG, Sony, Philips, TCL.'
};

export default function TelevisionPage() {
  return (
    <DeviceHubPage
      config={{
        category: 'television',
        label: 'televisores',
        h1: 'Reparación de televisores en Madrid.',
        sub: 'Tu tele no es para tirar. Reemplazo de LEDs individuales fundidos, fuente de alimentación, placa principal, t-con. Servicio a domicilio para pantallas grandes.',
        Icon: Tv,
        commonBrands: ['Samsung', 'LG', 'Sony', 'Philips', 'TCL', 'Hisense'],
        fromPrice: 89,
        whatsappMessage: 'Hola, mi televisor necesita reparación. ¿Cuándo podéis verlo?',
        commonIssues: [
          { title: 'TV se enciende pero pantalla negra (LED retroiluminación)', body: 'LEDs individuales fundidos en la tira de retroiluminación. Sustitución de la tira completa.' },
          { title: 'Se apaga sola al rato', body: 'Condensadores de la fuente hinchados. Sustitución de los condensadores específicos.' },
          { title: 'Líneas verticales o horizontales en la imagen', body: 'T-con o cable del panel. Diagnóstico para saber si es reparable o requiere panel nuevo.' },
          { title: 'No enciende del todo (luz roja parpadea)', body: 'Fuente de alimentación. Reparación a nivel de placa o sustitución del módulo.' },
          { title: 'Sin sonido', body: 'Etapa de audio en la placa principal. Reparación de componentes específicos.' }
        ]
      }}
    />
  );
}
