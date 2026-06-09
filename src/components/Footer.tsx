'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-bg text-text py-20 px-4 sm:px-6 lg:px-8 border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Brand Section - Full Width & Centered */}
        <div className="flex flex-col items-center text-center mb-20 space-y-8">
          <Link href="/" className="relative w-72 h-72 block overflow-hidden">
            <Image 
              src="/logo_massive.png" 
              alt="Raha Logo" 
              fill 
              className="object-contain"
            />
          </Link>
          <p className="text-text-muted max-w-md text-base">
            {t('footer.tagline')}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="p-3 bg-surface rounded-full hover:bg-gold hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="p-3 bg-surface rounded-full hover:bg-gold hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="p-3 bg-surface rounded-full hover:bg-gold hover:text-white transition-colors">
              <Youtube className="w-6 h-6" />
            </Link>
            <Link href="#" className="p-3 bg-surface rounded-full hover:bg-gold hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-sm text-text-muted font-medium">
            {t('footer.proudly')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-border pt-20">
          {/* Explore */}
          <div>
            <h3 className="text-xl font-display text-gold mb-8">{t('footer.explore')}</h3>
            <ul className="space-y-4 text-base text-text-muted">
              <li><Link href="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">{t('nav.destinations')}</Link></li>
              <li><Link href="/packages" className="hover:text-gold transition-colors">{t('nav.packages')}</Link></li>
              <li><Link href="/luxury-stays" className="hover:text-gold transition-colors">{t('nav.luxury_stays')}</Link></li>
              <li><Link href="/ethiopian-stories" className="hover:text-gold transition-colors">{t('nav.stories')}</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-xl font-display text-gold mb-8">{t('nav.destinations')}</h3>
            <ul className="space-y-4 text-base text-text-muted grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Lalibela</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Simien Mountains</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Danakil Depression</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Omo Valley</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Gondar</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Lake Tana</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Axum</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Entoto</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Bale Mountains</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-display text-gold mb-8">{t('footer.contact')}</h3>
            <ul className="space-y-6 text-base text-text-muted">
              <li className="flex items-start gap-4">
                <span className="text-gold text-xl">📍</span>
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-gold text-xl">📞</span>
                <span>+251 93 840 4186</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-gold text-xl">📧</span>
                <span>hello@rahaethiopiatours.com</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-gold text-xl">💬</span>
                <span>WhatsApp: +251 93 840 4186</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gold transition-colors">{t('footer.privacy')}</Link>
            <Link href="#" className="hover:text-gold transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};