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
    id: 'altavoz',
    slug: 'altavoz',
    name: { es: 'Altavoz', en: 'Speaker', zh: '扬声器' },
    description: {
      es: 'Sonido distorsionado, sin volumen o ausente. Sustitución del módulo de altavoz.',
      en: 'Distorted, low or no sound. Speaker module replacement.',
      zh: '声音失真、过低或无声。更换扬声器模组。'
    },
    icon: 'speaker',
    averageDurationMinutes: 45,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'consola', 'television'],
    sortOrder: 8
  },
  {
    id: 'microfono',
    slug: 'microfono',
    name: { es: 'Micrófono', en: 'Microphone', zh: '麦克风' },
    description: {
      es: 'Si no te oyen en las llamadas o se acopla. Sustitución del micrófono.',
      en: 'If you can\'t be heard on calls or the audio loops. Microphone replacement.',
      zh: '通话时对方听不到或有回音。更换麦克风。'
    },
    icon: 'mic',
    averageDurationMinutes: 45,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil'],
    sortOrder: 9
  },
  {
    id: 'vibrador',
    slug: 'vibrador',
    name: { es: 'Vibrador', en: 'Vibration motor', zh: '振动马达' },
    description: {
      es: 'Si el móvil ya no vibra o vibra de forma extraña. Sustitución del motor de vibración.',
      en: 'If the phone won\'t vibrate or vibrates oddly. Vibration motor replacement.',
      zh: '手机不振动或振动异常。更换振动马达。'
    },
    icon: 'vibrate',
    averageDurationMinutes: 40,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet'],
    sortOrder: 10
  },
  {
    id: 'sensor-proximidad',
    slug: 'sensor-proximidad',
    name: { es: 'Sensor de proximidad / luz', en: 'Proximity / light sensor', zh: '距离 / 光线传感器' },
    description: {
      es: 'La pantalla no se apaga al llamar o el brillo automático no funciona. Sustitución del sensor.',
      en: 'Screen doesn\'t turn off on calls or auto-brightness fails. Sensor replacement.',
      zh: '通话时屏幕不熄屏或自动亮度失效。更换传感器。'
    },
    icon: 'eye',
    averageDurationMinutes: 45,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet'],
    sortOrder: 11
  },
  {
    id: 'biometria',
    slug: 'biometria',
    name: { es: 'Face ID / Huella', en: 'Face ID / Fingerprint', zh: 'Face ID / 指纹识别' },
    description: {
      es: 'Reparación o re-calibración de Face ID, Touch ID o sensor de huella en pantalla. Trabajo a nivel de placa.',
      en: 'Face ID, Touch ID or in-display fingerprint repair / recalibration. Board-level work.',
      zh: '修复或重新校准 Face ID、Touch ID 或屏下指纹。主板级修复。'
    },
    icon: 'fingerprint',
    averageDurationMinutes: 120,
    warrantyMonths: 1,
    applicableCategories: ['movil', 'tablet'],
    sortOrder: 12
  },
  {
    id: 'antena-wifi',
    slug: 'antena-wifi',
    name: { es: 'Antena WiFi / Bluetooth', en: 'WiFi / Bluetooth antenna', zh: 'WiFi / 蓝牙天线' },
    description: {
      es: 'Si no conecta a redes o el Bluetooth no detecta dispositivos. Sustitución del módulo de antena.',
      en: 'If it won\'t connect to networks or Bluetooth misses devices. Antenna module replacement.',
      zh: '无法连接网络或蓝牙无法识别设备。更换天线模组。'
    },
    icon: 'wifi',
    averageDurationMinutes: 60,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'consola'],
    sortOrder: 13
  },
  {
    id: 'botones',
    slug: 'botones',
    name: { es: 'Botones (encendido, volumen)', en: 'Buttons (power, volume)', zh: '按键（电源、音量）' },
    description: {
      es: 'Botones atascados o que no responden. Sustitución del flex de botones.',
      en: 'Stuck or unresponsive buttons. Button-flex replacement.',
      zh: '按键卡住或无反应。更换按键排线。'
    },
    icon: 'square',
    averageDurationMinutes: 50,
    warrantyMonths: 3,
    applicableCategories: ['movil', 'tablet', 'portatil', 'consola'],
    sortOrder: 14
  },
  {
    id: 'liberacion-sim',
    slug: 'liberacion-sim',
    name: { es: 'Liberación SIM', en: 'SIM unlock', zh: '解锁 SIM' },
    description: {
      es: 'Liberación del móvil para usar cualquier operadora. Compatible con todas las marcas.',
      en: 'Unlock your phone to use any carrier. Works with every brand.',
      zh: '解锁手机以使用任意运营商。支持所有品牌。'
    },
    icon: 'unlock',
    averageDurationMinutes: 30,
    warrantyMonths: 1,
    applicableCategories: ['movil'],
    sortOrder: 15
  },
  {
    id: 'recuperacion-datos',
    slug: 'recuperacion-datos',
    name: { es: 'Recuperación de datos', en: 'Data recovery', zh: '数据恢复' },
    description: {
      es: 'Si tu dispositivo no enciende y necesitas las fotos, contactos o documentos. Pago según éxito.',
      en: 'If your device won\'t boot and you need photos, contacts or documents. Pay-on-success.',
      zh: '若设备无法启动但需要找回照片、联系人或文件。按结果付费。'
    },
    icon: 'database',
    averageDurationMinutes: 240,
    warrantyMonths: 0,
    applicableCategories: ['movil', 'tablet', 'portatil'],
    sortOrder: 16
  },
  {
    id: 'sistema-operativo',
    slug: 'sistema-operativo',
    name: { es: 'Sistema operativo / formateo', en: 'OS install / factory reset', zh: '系统安装 / 重置' },
    description: {
      es: 'Reinstalación de Windows, macOS, iOS o Android sin perder tus datos cuando es posible.',
      en: 'Windows, macOS, iOS or Android reinstall — preserving your data when possible.',
      zh: '重新安装 Windows / macOS / iOS / Android，尽可能保留您的数据。'
    },
    icon: 'monitor',
    averageDurationMinutes: 90,
    warrantyMonths: 1,
    applicableCategories: ['movil', 'tablet', 'portatil'],
    sortOrder: 17
  },
  {
    id: 'limpieza-interna',
    slug: 'limpieza-interna',
    name: { es: 'Limpieza interna y pasta térmica', en: 'Internal cleaning + thermal paste', zh: '内部清洁与导热硅脂' },
    description: {
      es: 'Para portátiles y consolas que se calientan o hacen ruido. Limpieza profunda + pasta nueva.',
      en: 'For laptops and consoles that overheat or get loud. Deep clean + fresh paste.',
      zh: '适用于过热或噪音大的笔记本和游戏机。深度清洁并更换硅脂。'
    },
    icon: 'fan',
    averageDurationMinutes: 90,
    warrantyMonths: 3,
    applicableCategories: ['portatil', 'consola'],
    sortOrder: 18
  },
  {
    id: 'upgrade-ssd-ram',
    slug: 'upgrade-ssd-ram',
    name: { es: 'Ampliación de RAM o SSD', en: 'RAM / SSD upgrade', zh: '升级内存 / SSD' },
    description: {
      es: 'Más memoria y más espacio. Clonamos tu sistema operativo en el nuevo disco sin perder datos.',
      en: 'More memory and more storage. We clone your OS to the new drive — no data loss.',
      zh: '更多内存与存储空间。将系统克隆到新硬盘，数据不丢失。'
    },
    icon: 'hard-drive',
    averageDurationMinutes: 90,
    warrantyMonths: 3,
    applicableCategories: ['portatil'],
    sortOrder: 19
  },
  {
    id: 'joystick-drift',
    slug: 'joystick-drift',
    name: { es: 'Joystick / drift de mando', en: 'Joystick drift', zh: '摇杆漂移' },
    description: {
      es: 'El joystick se mueve solo en juegos. Sustitución del módulo del joystick — problema común en Switch y DualSense.',
      en: 'Joystick drifts on its own in games. Module replacement — common on Switch and DualSense.',
      zh: '游戏中摇杆自动漂移。更换摇杆模组——Switch 与 DualSense 常见问题。'
    },
    icon: 'gamepad',
    averageDurationMinutes: 45,
    warrantyMonths: 3,
    applicableCategories: ['consola'],
    sortOrder: 20
  },
  {
    id: 'rueda-patinete',
    slug: 'rueda-patinete',
    name: { es: 'Rueda / neumático', en: 'Wheel / tire', zh: '轮胎' },
    description: {
      es: 'Cambio de neumático tubeless o con cámara. Stock para los modelos Xiaomi más comunes.',
      en: 'Tubeless or inner-tube tire swap. We stock the most common Xiaomi models.',
      zh: '更换无内胎或有内胎的轮胎。常备小米常见型号。'
    },
    icon: 'circle',
    averageDurationMinutes: 30,
    warrantyMonths: 3,
    applicableCategories: ['patinete-electrico'],
    sortOrder: 21
  },
  {
    id: 'controlador-patinete',
    slug: 'controlador-patinete',
    name: { es: 'Controlador / centralita', en: 'Controller board', zh: '控制器主板' },
    description: {
      es: 'Si el patinete no enciende, no acelera o pierde potencia. Diagnóstico de la centralita.',
      en: 'If the scooter won\'t turn on, won\'t accelerate, or loses power. Controller board diagnostic.',
      zh: '滑板车无法开机、不加速或动力下降。诊断主板。'
    },
    icon: 'cpu',
    averageDurationMinutes: 90,
    warrantyMonths: 3,
    applicableCategories: ['patinete-electrico'],
    sortOrder: 22
  },
  {
    id: 'led-television',
    slug: 'led-television',
    name: { es: 'LEDs de retroiluminación (TV)', en: 'TV backlight LEDs', zh: '电视背光 LED' },
    description: {
      es: 'TV que se enciende pero pantalla negra: LEDs individuales fundidos. Sustitución de la tira de LEDs.',
      en: 'TV powers on but screen is dark: individual LEDs blown. LED strip replacement.',
      zh: '电视开机但屏幕全黑：背光 LED 烧毁。更换 LED 灯条。'
    },
    icon: 'tv',
    averageDurationMinutes: 180,
    warrantyMonths: 3,
    applicableCategories: ['television'],
    sortOrder: 23
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
