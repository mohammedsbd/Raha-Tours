'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const { t, i18n } = useTranslation('common');
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0,0,0,0)', theme === 'dark' ? 'rgba(15, 15, 15, 0.95)' : 'rgba(253, 250, 245, 0.95)']
  );

  const shadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)']
  );

  useEffect(() => {
    setMounted(true);
    // Set direction based on language
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (!mounted) return null;

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.destinations'), href: '/destinations' },
    { name: t('nav.packages'), href: '/packages' },
    { name: t('nav.luxury_stays'), href: '/luxury-stays' },
    { name: t('nav.stories'), href: '/ethiopian-stories' },
    { name: t('nav.about'), href: '/about' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, boxShadow: shadow }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="fixed top-0 w-full z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span className="text-2xl font-bold font-display text-gold leading-tight">ራሃ</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gold/80 -mt-1">{t('brand')}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-gold ${
                  pathname === link.href ? 'text-gold' : 'text-text'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-gold/30 hover:bg-gold/10 transition-colors text-xs font-semibold"
            >
              <Globe className="w-3 h-3 text-gold" />
              <span className="text-text">{i18n.language === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gold/10 transition-colors"
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-gold" />}
              </motion.div>
            </button>

            <Link href="/book" className="bg-gold hover:bg-gold/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
              {t('nav.book_now')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-gold" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gold"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden bg-bg/95 dark:bg-[#0F0F0F]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gold"
            >
              <X className="w-10 h-10" />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display text-text hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="text-text flex items-center gap-2 text-xl font-display"
            >
              <Globe className="w-5 h-5 text-gold" />
              {i18n.language === 'en' ? 'عربي' : 'English'}
            </button>
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="bg-gold text-white px-8 py-3 rounded-full text-lg font-semibold"
            >
              {t('nav.book_now')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};