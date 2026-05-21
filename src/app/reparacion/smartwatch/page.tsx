import type { Metadata } from 'next';
import { Watch } from 'lucide-react';
import { DeviceHubPage } from '@/components/sections/DeviceHubPage';

export const metadata: Metadata = {
  title: 'Reparación de smartwatches en Madrid · Apple Watch, Galaxy Watch',
  description: 'Cambio de pantalla, batería, cristal y resistencia al agua. Apple Watch, Galaxy Watch, Huawei Watch, Garmin, Xiaomi Mi Band.'
};

export default function SmartwatchPage() {
  return (
    <DeviceHubPage
      config={{
        category: 'smartwatch',
        label: 'smartwatches',
        h1: 'Reparación de smartwatches.',
        sub: 'Apple Watch (todas las series), Galaxy Watch, Huawei Watch, Garmin y Xiaomi Mi Band. Pantalla, batería, cristal trasero, resellado del cuerpo.',
        Icon: Watch,
        commonBrands: ['Apple Watch', 'Galaxy Watch', 'Huawei Watch', 'Garmin', 'Mi Band'],
        fromPrice: 59,
        whatsappMessage: 'Hola, mi smartwatch necesita reparación. ¿Cuándo podéis recibirme?',
        commonIssues: [
          { title: 'Apple Watch — cristal roto', body: 'Sustitución de cristal sin abrir el cuerpo. Re-pegado profesional para mantener resistencia al agua.' },
          { title: 'Batería se hincha (Apple Watch S3 / S4)', body: 'Problema conocido. La pantalla se levanta. Sustitución de batería + recalibración.' },
          { title: 'Botón de corona atascado', body: 'Mecanismo sucio o dañado. Limpieza o sustitución del flex de la corona.' },
          { title: 'Galaxy Watch no enciende', body: 'Diagnóstico de placa. A veces es un capacitor; otras la batería. Te lo decimos antes de tocar nada.' },
          { title: 'Sensor de pulso no lee', body: 'Sensor óptico sucio o desconectado. Limpieza interna o sustitución del módulo.' }
        ]
      }}
    />
  );
}
