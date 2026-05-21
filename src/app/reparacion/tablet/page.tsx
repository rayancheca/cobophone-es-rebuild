import type { Metadata } from 'next';
import { Tablet } from 'lucide-react';
import { DeviceHubPage } from '@/components/sections/DeviceHubPage';

export const metadata: Metadata = {
  title: 'Reparación de tablets en Madrid · iPad y Android',
  description: 'Cambio de pantalla, batería, conector de carga y placa para iPad y Android. 40 minutos. Garantía 3 meses. Diagnóstico gratuito.'
};

export default function TabletPage() {
  return (
    <DeviceHubPage
      config={{
        category: 'tablet',
        label: 'tablets',
        h1: 'Reparación de tablets en Madrid.',
        sub: 'Apple iPad y todas las tablets Android — Samsung Galaxy Tab, Xiaomi Pad, Huawei MatePad, Lenovo Tab, Microsoft Surface. Pantalla, batería, conector de carga, placa base.',
        Icon: Tablet,
        commonBrands: ['Apple iPad', 'Samsung Galaxy Tab', 'Xiaomi Pad', 'Huawei MatePad', 'Lenovo Tab', 'Surface'],
        fromPrice: 79,
        whatsappMessage: 'Hola, mi tablet necesita reparación. ¿Cuándo podéis recibirme?',
        commonIssues: [
          { title: 'iPad — pantalla cristal roto', body: 'Cristal roto pero el panel táctil funciona. Cambiamos sólo el cristal (más barato) o pantalla completa según el caso.' },
          { title: 'Galaxy Tab — no carga', body: 'Conector de carga sucio o doblado. Limpieza ultrasónica o sustitución del puerto.' },
          { title: 'Batería se hincha', body: 'Hinchazón visible (la tapa se separa). Riesgo de daño. Sustitución urgente.' },
          { title: 'No reconoce el cargador original', body: 'Chip de gestión de carga dañado. Reparación a nivel de placa.' },
          { title: 'Pantalla parpadea o se queda en negro', body: 'Cable flex de la pantalla suelto o roto. Diagnóstico gratuito.' },
          { title: 'Botón de encendido roto', body: 'Botones desgastados o atascados. Sustitución del flex de botones.' }
        ]
      }}
    />
  );
}
