'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Check, ArrowRight, Home, Car, MessageCircle } from 'lucide-react';

export default function Packages() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const packages = [
    {
      id: 'std',
      name: t('pack_page.std_name'),
      houseImage: "/standard.webp",
      carImage: "/seaa.jpg",
      badge: t('pack_page.badge_value', 'VALUE'),
      house: t('pack_page.std_house'),
      car: t('pack_page.std_car'),
      description: t('pack_page.std_desc'),
      checklist: [
        t('pack_page.std_check1'),
        t('pack_page.std_check2'),
        t('pack_page.std_check3'),
        t('pack_page.std_check4'),
      ]
    },
    {
      id: 'gold',
      name: t('pack_page.gold_name'),
      houseImage: "/apartment.webp",
      carImage: "/bydu1.jpg",
      badge: t('pack_page.badge_popular', 'POPULAR'),
      house: t('pack_page.gold_house'),
      car: t('pack_page.gold_car'),
      description: t('pack_page.gold_desc'),
      checklist: [
        t('pack_page.gold_check1'),
        t('pack_page.gold_check2'),
        t('pack_page.gold_check3'),
        t('pack_page.gold_check4'),
        t('pack_page.gold_check5'),
      ]
    },
    {
      id: 'plat',
      name: t('pack_page.plat_name'),
      houseImage: "/villajpg.jpg",
      carImage: "/v8.jpg",
      badge: t('pack_page.badge_exclusive', 'EXCLUSIVE'),
      house: t('pack_page.plat_house'),
      car: t('pack_page.plat_car'),
      description: t('pack_page.plat_desc'),
      checklist: [
        t('pack_page.plat_check1'),
        t('pack_page.plat_check2'),
        t('pack_page.plat_check3'),
        t('pack_page.plat_check4'),
        t('pack_page.plat_check5'),
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/semien2.jpg"
          alt="Simien Mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Bottom Bleed Fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[220px] z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)' }}
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 px-4 max-w-4xl"
        >
          <span className="text-gold font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-xs mb-4 block">{t('pack_page.hero_badge')}</span>
          <h1 className="text-5xl md:text-7xl font-display text-white mb-6">
            {t('pack_page.hero_title')} <span className="italic text-gold">{t('pack_page.hero_title_italic')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto">
            {t('pack_page.hero_sub')}
          </p>
          <nav className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-gold transition-colors">{t('pack_page.breadcrumb_home')}</Link>
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="text-gold">{t('pack_page.breadcrumb_packages')}</span>
          </nav>
        </motion.div>
      </section>

      {/* Package List Header */}
      <section className="pt-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-display text-text">
              {t('pack_page.hero_title')}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Package List */}
      <section className="pb-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-24">
          <AnimatePresence mode='popLayout'>
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-surface rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gold/10 group transition-colors duration-300 min-h-[600px]"
              >
                {/* Visuals Column (Left in LTR, Right in RTL visually) */}
                <div className="lg:w-1/2 flex flex-col h-[500px] lg:h-auto relative">
                  <div className="relative flex-1 overflow-hidden group/house border-b border-gold/10">
                    <Image
                      src={pkg.houseImage}
                      alt={pkg.house}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/house:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover/house:bg-black/10 transition-colors" />
                    <div className="absolute bottom-6 ltr:left-6 rtl:right-6 flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20">
                      <Home className="w-5 h-5 text-gold" />
                      <span className="text-sm font-bold text-white uppercase tracking-widest rtl:tracking-normal">{pkg.house}</span>
                    </div>
                  </div>
                  <div className="relative flex-1 overflow-hidden group/car">
                    <Image
                      src={pkg.carImage}
                      alt={pkg.car}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/car:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover/car:bg-black/10 transition-colors" />
                    <div className="absolute bottom-6 ltr:left-6 rtl:right-6 flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20">
                      <Car className="w-5 h-5 text-gold" />
                      <span className="text-sm font-bold text-white uppercase tracking-widest rtl:tracking-normal">{pkg.car}</span>
                    </div>
                  </div>
                  <div className="absolute top-8 ltr:left-8 rtl:right-8 z-10">
                    <span className="px-6 py-2.5 bg-gold text-white text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal rounded-full shadow-2xl">
                      {pkg.badge}
                    </span>
                  </div>
                </div>

                {/* Content Column (Right in LTR, Left in RTL visually) */}
                <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-surface transition-colors duration-300">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl lg:text-6xl font-display mb-6 text-text leading-tight">{pkg.name}</h2>
                      <p className="text-lg lg:text-xl text-text-muted font-body leading-relaxed max-w-xl">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-gold flex items-center gap-3">
                        <Check className="w-5 h-5" />
                        {t('pack_page.inclusions_title')}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {pkg.checklist.map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 text-text-muted font-body"
                          >
                            <div className="w-6 h-6 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 text-gold" />
                            </div>
                            <span className="text-base">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-10 flex flex-col sm:flex-row items-center gap-8 border-t border-gold/10">
                      <a 
                        href={`https://wa.me/90701506322?text=I'm interested in the ${pkg.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-[#25D366] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3 group"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{t('pack_page.pricing')}</span>
                        <ArrowRight className="w-5 h-5 transition-transform ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:-scale-x-100" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Customise Your Tour CTA */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto rounded-[60px] bg-gradient-to-br from-gold to-amber-700 p-12 md:p-24 relative overflow-hidden text-white">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display mb-6">{t('pack_page.cta_title')}</h2>
            <p className="text-xl opacity-90 font-body mb-12 max-w-2xl">{t('pack_page.cta_sub')}</p>
            
            <div className="pt-8">
              <Link 
                href="/book" 
                className="bg-white text-gold px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2 group"
              >
                <span>{t('pack_page.cta_button')}</span>
                <ArrowRight className="w-5 h-5 transition-transform ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:-scale-x-100" />
              </Link>
            </div>
            <p className="text-sm opacity-80 italic mt-8">{t('pack_page.cta_note')}</p>
          </div>
          
          {/* Textile pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
      </section>
    </Layout>
  );
}
