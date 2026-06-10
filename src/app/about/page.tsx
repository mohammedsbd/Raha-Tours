'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { 
  ShieldCheck, 
  Check, 
  Users, 
  Gem, 
  MessageCircle, 
  Clock, 
  Globe, 
  Heart, 
  Compass,
  Briefcase,
  Headphones,
  ChevronRight
} from 'lucide-react';

export default function About() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const whyChooseItems = [
    { icon: <Globe className="w-8 h-8" />, title: t('about_page.why_item1_title'), text: t('about_page.why_item1_text') },
    { icon: <MessageCircle className="w-8 h-8" />, title: t('about_page.why_item2_title'), text: t('about_page.why_item2_text') },
    { icon: <ShieldCheck className="w-8 h-8" />, title: t('about_page.why_item3_title'), text: t('about_page.why_item3_text') },
    { icon: <Compass className="w-8 h-8" />, title: t('about_page.why_item4_title'), text: t('about_page.why_item4_text') },
    { icon: <Gem className="w-8 h-8" />, title: t('about_page.why_item5_title'), text: t('about_page.why_item5_text') },
    { icon: <Clock className="w-8 h-8" />, title: t('about_page.why_item6_title'), text: t('about_page.why_item6_text') },
  ];

  const teamCategories = [
    { icon: <Briefcase className="w-6 h-6" />, title: t('about_page.team_cat1_title'), text: t('about_page.team_cat1_text') },
    { icon: <Headphones className="w-6 h-6" />, title: t('about_page.team_cat2_title'), text: t('about_page.team_cat2_text') },
    { icon: <Users className="w-6 h-6" />, title: t('about_page.team_cat3_title'), text: t('about_page.team_cat3_text') },
    { icon: <ShieldCheck className="w-6 h-6" />, title: t('about_page.team_cat4_title'), text: t('about_page.team_cat4_text') },
  ];

  const approachSteps = [
    { step: "01", title: t('about_page.approach_step1_title'), text: t('about_page.approach_step1_text') },
    { step: "02", title: t('about_page.approach_step2_title'), text: t('about_page.approach_step2_text') },
    { step: "03", title: t('about_page.approach_step3_title'), text: t('about_page.approach_step3_text') },
    { step: "04", title: t('about_page.approach_step4_title'), text: t('about_page.approach_step4_text') },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/entoto.jpg"
          alt="About Raha Tour"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-display text-white mb-6">
              {t('about_page.hero_title')}
            </h1>
            <p className="text-xl md:text-2xl text-gold font-body mb-8 max-w-3xl mx-auto italic">
              {t('about_page.hero_sub')}
            </p>
            <p className="text-lg md:text-xl text-white/80 font-body max-w-3xl mx-auto leading-relaxed">
              {t('about_page.hero_text')}
            </p>
          </motion.div>
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-32 z-[2]"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
        />
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Mission */}
            <motion.div {...fadeIn} className="bg-surface p-10 md:p-12 rounded-[40px] border border-gold/10 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gold/10 rounded-2xl">
                  <Heart className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-text">{t('about_page.mission_title')}</h2>
              </div>
              <p className="text-lg text-text-muted font-body mb-10 leading-relaxed">
                {t('about_page.mission_text')}
              </p>
              <ul className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 p-1 bg-gold/20 rounded-full group-hover:bg-gold transition-colors duration-300">
                      <Check className="w-4 h-4 text-gold group-hover:text-white" />
                    </div>
                    <span className="text-text font-body text-lg leading-snug">
                      {t(`about_page.mission_h${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-surface p-10 md:p-12 rounded-[40px] border border-gold/10 shadow-xl lg:mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gold/10 rounded-2xl">
                  <Compass className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-text">{t('about_page.vision_title')}</h2>
              </div>
              <p className="text-lg text-text-muted font-body mb-10 leading-relaxed">
                {t('about_page.vision_text')}
              </p>
              <ul className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 p-1 bg-gold/20 rounded-full group-hover:bg-gold transition-colors duration-300">
                      <Check className="w-4 h-4 text-gold group-hover:text-white" />
                    </div>
                    <span className="text-text font-body text-lg leading-snug">
                      {t(`about_page.vision_g${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/lake.jpg"
            alt="Ethiopian Landscape"
            fill
            className="object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-6xl font-display mb-12 text-text">{t('about_page.story_title')}</h2>
            <div className="space-y-8 text-lg md:text-xl text-text-muted font-body leading-relaxed">
              <p>{t('about_page.story_p1')}</p>
              <p>{t('about_page.story_p2')}</p>
              <p>{t('about_page.story_p3')}</p>
              <p>{t('about_page.story_p4')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Raha Tour */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display text-text mb-6">{t('about_page.why_title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseItems.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-bg p-10 rounded-[40px] border border-gold/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="mb-6 text-gold group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display mb-4 text-text">{item.title}</h3>
                <p className="text-text-muted font-body leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-24 px-4 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display text-text mb-6">{t('about_page.team_title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamCategories.map((cat, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-surface border border-gold/5 shadow-md"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-2xl text-gold mb-6">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-text">{cat.title}</h3>
                <p className="text-sm text-text-muted font-body leading-relaxed">{cat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-32 px-4 bg-surface relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 ltr:right-0 rtl:left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 ltr:left-0 rtl:right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display text-text mb-6">{t('about_page.approach_title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {approachSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {/* Connector Line for Desktop */}
                {i < approachSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 ltr:left-full rtl:right-full w-full h-[2px] bg-gold/20 -z-10" />
                )}
                
                <div className="mb-6 flex flex-col items-center lg:ltr:items-start lg:rtl:items-end">
                  <span className="text-6xl font-display text-gold/20 group-hover:text-gold/40 transition-colors duration-300">
                    {step.step}
                  </span>
                  <div className="mt-[-2rem] bg-bg w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-gold/10">
                    <Check className="w-6 h-6 text-gold" />
                  </div>
                </div>
                
                <div className="text-center lg:ltr:text-left lg:rtl:text-right">
                  <h3 className="text-xl font-display font-bold mb-4 text-text">{step.title}</h3>
                  <p className="text-text-muted font-body text-sm leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-24 px-4 bg-bg">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="bg-surface rounded-[50px] overflow-hidden shadow-2xl border border-gold/10 flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image
                src="/axum.jpg"
                alt="Trust & Credibility"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gold/20 mix-blend-multiply" />
            </div>
            
            <div className="p-10 md:p-16 flex-1">
              <div className="flex items-center gap-4 mb-8">
                <ShieldCheck className="w-10 h-10 text-gold" />
                <h2 className="text-3xl md:text-4xl font-display text-text">{t('about_page.trust_title')}</h2>
              </div>
              <h3 className="text-xl font-body text-gold font-bold mb-8 uppercase tracking-widest rtl:tracking-normal">
                {t('about_page.trust_commitment_title')}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="p-1 bg-gold/10 rounded-full shrink-0 mt-1">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-text-muted font-body text-sm leading-relaxed">
                      {t(`about_page.trust_item${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="py-32 px-4 bg-forest relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-96 h-96 border-2 border-white rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6">
              {t('about_page.cta_title')}
            </h2>
            <p className="text-xl text-white/80 font-body mb-12 max-w-2xl mx-auto">
              {t('about_page.cta_text')}
            </p>
            <motion.a
              href="/book"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl transition-all duration-300"
            >
              <span>{t('about_page.cta_button')}</span>
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
