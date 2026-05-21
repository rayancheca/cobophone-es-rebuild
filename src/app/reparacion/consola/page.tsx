import type { Metadata } from 'next';
import { Gamepad2 } from 'lucide-react';
import { DeviceHubPage } from '@/components/sections/DeviceHubPage';

export const metadata: Metadata = {
  title: 'Reparación de consolas en Madrid · PlayStation, Xbox, Nintendo Switch',
  description: 'Lector de discos, salida HDMI, ventilador, joystick drift de mandos. PS4, PS5, Xbox One, Xbox Series X/S, Switch.'
};

export default function ConsolaPage() {
  return (
    <DeviceHubPage
      config={{
        category: 'consola',
        label: 'consolas',
        h1: 'Reparación de consolas en Madrid.',
        sub: 'PlayStation 4 y 5, Xbox One, Xbox Series X/S, Nintendo Switch (incluyendo OLED y Lite). Lectores, HDMI, ventiladores, mandos con drift.',
        Icon: Gamepad2,
        commonBrands: ['PS5', 'PS4', 'Xbox Series X', 'Xbox Series S', 'Nintendo Switch'],
        fromPrice: 39,
        whatsappMessage: 'Hola, mi consola necesita reparación. ¿Cuándo podéis recibirme?',
        commonIssues: [
          { title: 'PS5 / PS4 — ventilador muy ruidoso', body: 'Pasta térmica seca y polvo acumulado. Limpieza profunda + cambio de pasta. Vuelve a estar silenciosa.' },
          { title: 'Salida HDMI no muestra imagen', body: 'Puerto HDMI roto por un golpe del cable. Soldadura del nuevo puerto.' },
          { title: 'PS5 — lector de discos no lee', body: 'Lente Blu-ray desgastada. Calibración o sustitución del lector completo.' },
          { title: 'Switch joycon drift', body: 'Joystick que se mueve solo. Sustitución del módulo del joystick — problema muy común.' },
          { title: 'Xbox no enciende', body: 'Diagnóstico de placa: fuente, condensadores, BIOS. Te decimos qué se puede arreglar.' },
          { title: 'Switch no carga', body: 'Conector USB-C dañado por desgaste. Sustitución del puerto a nivel de placa.' }
        ]
      }}
    />
  );
}
