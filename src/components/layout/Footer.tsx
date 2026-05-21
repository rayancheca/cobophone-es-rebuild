import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = locale === 'es' ? '' : `/${locale}`;

  return (
    <footer className="bg-shadow-blue text-ink-100 dot-grid" data-surface="dark">
      <div className="container-fluid py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand block */}
          <div className="col-span-2">
            <Link href={`${prefix}/`} className="inline-flex items-center gap-2.5 font-display text-xl font-bold text-white" aria-label="CoboPhone — Inicio">
              <Image
                src="/brand/logo.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 brightness-0 invert"
              />
              CoboPhone
            </Link>
            <p className="mt-4 max-w-sm text-ink-300 text-balance">
              {t('tagline')}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ink-500" aria-hidden />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-ink-500" aria-hidden />
                <span>{t('hoursDetail')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-ink-500" aria-hidden />
                <a href="mailto:info@cobophone.es" className="hover:text-white transition-colors">info@cobophone.es</a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://wa.me/message/Y7WTOGB7WOXGP1" target="_blank" rel="noopener" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href="https://instagram.com/cobophonespain" target="_blank" rel="noopener" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com/cobophonespain" target="_blank" rel="noopener" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <FooterColumn title={t('services')}>
            <FooterLink href={`${prefix}/reparacion/movil`}>Móviles</FooterLink>
            <FooterLink href={`${prefix}/reparacion/tablet`}>Tablets</FooterLink>
            <FooterLink href={`${prefix}/reparacion/portatil`}>Portátiles</FooterLink>
            <FooterLink href={`${prefix}/reparacion/consola`}>Consolas</FooterLink>
            <FooterLink href={`${prefix}/reparacion/television`}>Televisores</FooterLink>
            <FooterLink href={`${prefix}/reparacion/patinete-electrico`}>Patinetes</FooterLink>
          </FooterColumn>

          {/* Empresa */}
          <FooterColumn title={t('company')}>
            <FooterLink href={`${prefix}/sobre-nosotros`}>Sobre nosotros</FooterLink>
            <FooterLink href={`${prefix}/garantia`}>Garantía</FooterLink>
            <FooterLink href={`${prefix}/recogida`}>Recogida</FooterLink>
            <FooterLink href={`${prefix}/zonas`}>Zonas</FooterLink>
            <FooterLink href={`${prefix}/blog`}>Blog</FooterLink>
            <FooterLink href={`${prefix}/contacto`}>Contacto</FooterLink>
          </FooterColumn>

          {/* Mayoristas */}
          <FooterColumn title={t('wholesale')}>
            <FooterLink href={`${prefix}/mayoristas`}>Portal mayoristas</FooterLink>
            <FooterLink href="https://tienda.cobophone.es" external>Catálogo de piezas</FooterLink>
            <FooterLink href={`${prefix}/mayoristas#contacto`}>Solicitar acceso</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <p className="text-sm text-ink-500">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4">
            <Link href={`${prefix}/legal/privacidad`} className="text-sm text-ink-500 hover:text-white transition-colors">Privacidad</Link>
            <Link href={`${prefix}/legal/aviso-legal`} className="text-sm text-ink-500 hover:text-white transition-colors">Aviso legal</Link>
            <Link href={`${prefix}/legal/cookies`} className="text-sm text-ink-500 hover:text-white transition-colors">Cookies</Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-ink-500 font-semibold mb-4">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener" className="text-sm text-ink-300 hover:text-white transition-colors">
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className="text-sm text-ink-300 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}
