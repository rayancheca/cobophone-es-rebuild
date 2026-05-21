import type { Metadata } from 'next';
import { Bike } from 'lucide-react';
import { DeviceHubPage } from '@/components/sections/DeviceHubPage';

export const metadata: Metadata = {
  title: 'Reparación de patinetes eléctricos en Madrid · Xiaomi, Cecotec, Segway',
  description: 'Batería, rueda, freno, controlador, motor. Xiaomi M365 / Mi Pro, Cecotec, Segway Ninebot, Smartgyro.'
};

export default function PatinetePage() {
  return (
    <DeviceHubPage
      config={{
        category: 'patinete-electrico',
        label: 'patinetes eléctricos',
        h1: 'Reparación de patinetes eléctricos.',
        sub: 'Batería, neumáticos, frenos, controlador, motor, manillar. Trabajamos con Xiaomi (M365, Pro, Pro 2, Mi 4), Cecotec, Segway Ninebot, Smartgyro y otras marcas.',
        Icon: Bike,
        commonBrands: ['Xiaomi M365', 'Xiaomi Pro 2', 'Cecotec', 'Segway Ninebot', 'Smartgyro'],
        fromPrice: 35,
        whatsappMessage: 'Hola, mi patinete eléctrico necesita reparación. ¿Cuándo podéis verlo?',
        commonIssues: [
          { title: 'Batería con poca autonomía', body: 'Celdas degradadas. Cambio del pack completo. Calibración del controlador.' },
          { title: 'Pinchazo o cambio de neumático', body: 'Cubiertas tubeless o con cámara. Tenemos stock para los modelos más comunes.' },
          { title: 'Frenos no responden bien', body: 'Pastillas desgastadas, cable de freno tensado o reemplazo del freno de tambor.' },
          { title: 'Patinete no enciende', body: 'Diagnóstico del controlador y de la batería. Casi siempre es una de las dos.' },
          { title: 'Acelerador no responde', body: 'Sensor Hall del puño dañado por humedad. Sustitución del acelerador completo.' },
          { title: 'Plegado flojo / vibración en el manillar', body: 'Mecanismo de cierre desgastado. Sustitución de la pieza de plegado.' }
        ]
      }}
    />
  );
}
