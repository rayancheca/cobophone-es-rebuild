import type { RepairType } from './types';

export const repairTypes: RepairType[] = [
  {
    id: 'pantalla',
    slug: 'pantalla',
    name: { es: 'Cambio de pantalla', en: 'Screen replacement', zh: '更换屏幕' },
    description: {
      es: 'Sustituimos pantalla completa con calidad original. Mantenemos las certificaciones Face ID, True Tone y huella donde aplica.',
      en: 'Full-screen replacement with original-grade parts. Face ID, True Tone, and fingerprint sensor preserved where applicable.',
      zh: '使用原厂级别配件更换整块屏幕。保留 Face ID、True Tone 与指纹功能（如适用）。'
    },
    icon: 'screen',
    averageDurationMinutes: 40,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'smartwatch'],
    sortOrder: 1
  },
  {
    id: 'bateria',
    slug: 'bateria',
    name: { es: 'Cambio de batería', en: 'Battery replacement', zh: '更换电池' },
    description: {
      es: 'Batería nueva con adhesivo original y calibración. Devuelves la autonomía del primer día.',
      en: 'New battery with original adhesive and calibration. Day-one battery life restored.',
      zh: '全新电池，原厂粘合剂与重新校准。恢复首日续航。'
    },
    icon: 'battery',
    averageDurationMinutes: 40,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'smartwatch', 'patinete-electrico'],
    sortOrder: 2
  },
  {
    id: 'conector-carga',
    slug: 'conector-carga',
    name: { es: 'Conector de carga', en: 'Charging port', zh: '充电口' },
    description: {
      es: 'Si tu móvil no carga o solo carga en una posición concreta, sustituimos el conector. Diagnóstico gratuito.',
      en: 'If your phone won\'t charge — or only in one position — we replace the port. Free diagnostic.',
      zh: '若手机无法充电或只能在某个角度充电，我们更换充电口。免费诊断。'
    },
    icon: 'plug',
    averageDurationMinutes: 60,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'consola'],
    sortOrder: 3
  },
  {
    id: 'camara',
    slug: 'camara',
    name: { es: 'Cámara', en: 'Camera', zh: '摄像头' },
    description: {
      es: 'Sustituimos módulo de cámara trasera o frontal. Calibración incluida.',
      en: 'Front or rear camera module replacement. Calibration included.',
      zh: '更换前置或后置摄像头模块。包含校准。'
    },
    icon: 'camera',
    averageDurationMinutes: 60,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet'],
    sortOrder: 4
  },
  {
    id: 'tapa-trasera',
    slug: 'tapa-trasera',
    name: { es: 'Tapa trasera', en: 'Back cover', zh: '后盖' },
    description: {
      es: 'Cristal trasero roto o agrietado. Mantenemos la carga inalámbrica donde aplica.',
      en: 'Broken or cracked rear glass. Wireless charging preserved where applicable.',
      zh: '后玻璃破裂或开裂。保留无线充电（如适用）。'
    },
    icon: 'cover',
    averageDurationMinutes: 50,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'smartwatch'],
    sortOrder: 5
  },
  {
    id: 'agua',
    slug: 'agua',
    name: { es: 'Daño por agua', en: 'Water damage', zh: '进水损坏' },
    description: {
      es: 'Diagnóstico y limpieza ultrasónica. Te decimos qué se puede salvar antes de cobrar nada.',
      en: 'Diagnostic and ultrasonic cleaning. We tell you what can be saved before charging anything.',
      zh: '诊断与超声波清洗。在收取费用前明确告知可修复部分。'
    },
    icon: 'water',
    averageDurationMinutes: 180,
    warrantyMonths: 1,
    applicableCategories: ['movil', 'tablet', 'portatil', 'smartwatch'],
    sortOrder: 6
  },
  {
    id: 'placa',
    slug: 'placa',
    name: { es: 'Placa base', en: 'Motherboard', zh: '主板' },
    description: {
      es: 'Reparaciones de microsoldadura: chip de carga, audio, retroiluminación, conexión SIM, controlador táctil.',
      en: 'Micro-soldering repairs: charging IC, audio, backlight, SIM, touch controller.',
      zh: '微焊修复：充电芯片、音频、背光、SIM、触控芯片。'
    },
    icon: 'chip',
    averageDurationMinutes: 240,
    warrantyMonths: 1,
    applicableCategories: ['movil', 'tablet', 'portatil', 'consola'],
    sortOrder: 7
  },
  {
    id: 'otros',
    slug: 'otros',
    name: { es: 'Otros problemas', en: 'Other issues', zh: '其它问题' },
    description: {
      es: 'Si no estás seguro de qué le pasa, mándanos un mensaje. Diagnóstico gratuito.',
      en: 'Not sure what\'s wrong? Send us a message. Free diagnostic.',
      zh: '不确定故障？给我们留言。免费诊断。'
    },
    icon: 'help',
    averageDurationMinutes: 0,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'smartwatch', 'consola', 'television', 'patinete-electrico'],
    sortOrder: 99
  }
];

export const getRepairType = (slug: string) => repairTypes.find(r => r.slug === slug);
