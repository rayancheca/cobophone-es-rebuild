import type { Metadata } from 'next';
import { Laptop } from 'lucide-react';
import { DeviceHubPage } from '@/components/sections/DeviceHubPage';

export const metadata: Metadata = {
  title: 'Reparación de portátiles en Madrid · MacBook, Windows, Chromebook',
  description: 'Pantalla, batería, disco SSD, ventilador, placa, instalación de sistema operativo. Apple, Lenovo, HP, Dell, Asus, Acer, Microsoft.'
};

export default function PortatilPage() {
  return (
    <DeviceHubPage
      config={{
        category: 'portatil',
        label: 'portátiles',
        h1: 'Reparación de portátiles en Madrid.',
        sub: 'MacBook, Windows y Chromebook. Pantalla, batería, ventilador, disco SSD, RAM, teclado, instalación o reinstalación de sistema operativo. Recuperación de datos.',
        Icon: Laptop,
        commonBrands: ['MacBook', 'Lenovo ThinkPad', 'HP', 'Dell', 'Asus', 'Acer', 'Surface'],
        fromPrice: 49,
        whatsappMessage: 'Hola, mi portátil necesita reparación. ¿Cuándo podéis recibirme?',
        commonIssues: [
          { title: 'MacBook — pantalla negra o tintada', body: 'Flexgate (flex de la pantalla deteriorado). Sustitución del cable o del panel.' },
          { title: 'Batería al 0% en pocos minutos', body: 'Ciclos de carga agotados. Batería nueva con calibración.' },
          { title: 'Ventilador hace ruido fuerte', body: 'Polvo acumulado o rodamiento desgastado. Limpieza interna + cambio si toca.' },
          { title: 'Disco lleno o lento', body: 'Sustitución SSD + clonado del sistema operativo sin perder datos.' },
          { title: 'No arranca / pantalla azul', body: 'Diagnóstico software vs hardware. Reinstalación del SO sin formatear.' },
          { title: 'Teclas no responden', body: 'Membrana del teclado dañada. Sustitución del teclado completo.' }
        ]
      }}
    />
  );
}
