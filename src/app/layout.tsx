import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { Chatbot } from '@/components/chat/Chatbot';
import { localBusinessJsonLd } from '@/lib/seo';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
  weight: ['400', '500', '600', '700']
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cobophone.es'),
  title: {
    default: 'Reparación de móviles en 40 minutos · Madrid · CoboPhone',
    template: '%s · CoboPhone'
  },
  description:
    'Reparamos tu móvil, tablet, portátil y consola en 40 minutos en Madrid. Garantía de 3 meses. Desde 2005 en Cobo Calleja.',
  applicationName: 'CoboPhone',
  authors: [{ name: 'CoboPhone' }],
  generator: 'Next.js',
  keywords: [
    'reparación móviles Madrid',
    'cambiar pantalla móvil',
    'reparación iPhone Madrid',
    'reparación Samsung Madrid',
    'Cobo Calleja',
    'Fuenlabrada'
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png'
  },
  openGraph: {
    type: 'website',
    siteName: 'CoboPhone',
    locale: 'es_ES',
    url: 'https://cobophone.es'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#170A2E' }
  ]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-md"
          >
            Saltar al contenido
          </a>
          <NavBar />
          <main id="main" className="pb-20 lg:pb-0">{children}</main>
          <Footer />
          <MobileStickyBar />
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
