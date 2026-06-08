'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Send, CheckCircle2, Phone, MessageSquare, Map, ShieldCheck, Plane, CreditCard, RefreshCw, Check } from 'lucide-react';
import { Accordion, AccordionItem } from '@/components/Accordion';

export default function BookNow() {
  const { t } = useTranslation('common');
  const [currentLeftSlide, setCurrentLeftSlide] = useState(0);

  const leftSlides = [
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=90",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=90"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLeftSlide((prev) => (prev + 1) % leftSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [leftSlides.length]);

  const faqs = [
    { q: t('book_page.faq1_q'), a: t('book_page.faq1_a') },
    { q: t('book_page.faq2_q'), a: t('book_page.faq2_a') },
    { q: t('book_page.faq3_q'), a: t('book_page.faq3_a') },
    { q: t('book_page.faq4_q'), a: t('book_page.faq4_a') },
    { q: t('book_page.faq5_q'), a: t('book_page.faq5_a') },
    { q: t('book_page.faq6_q'), a: t('book_page.faq6_a') },
    { q: t('book_page.faq7_q'), a: t('book_page.faq7_a') },
    { q: t('book_page.faq8_q'), a: t('book_page.faq8_a') },
    { q: t('book_page.faq9_q'), a: t('book_page.faq9_a') },
    { q: t('book_page.faq10_q'), a: t('book_page.faq10_a') },
  ];

  return (
    <Layout>
      <section className="min-h-screen flex flex-col lg:flex-row pt-20 transition-colors duration-300">
        {/* Left: Sticky Image Panel Slideshow */}
        <div className="lg:w-[45%] lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 hidden lg:block overflow-hidden relative">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentLeftSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={leftSlides[currentLeftSlide]}
                alt="Ethiopia"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30 z-[1]" />
          
          {/* Bottom Bleed Fade */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[220px] z-[2] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)' }}
          />

          <div className="absolute bottom-12 left-12 right-12 text-white z-[3]">
            <h2 className="text-4xl font-display mb-4">{t('book_page.left_title')}</h2>
            <p className="font-body text-white/80 leading-relaxed">
              {t('book_page.left_sub')}
            </p>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:w-[55%] p-8 lg:p-16 bg-bg transition-colors duration-300">
          <div className="max-w-xl mx-auto">
            <div>
              <h1 className="text-4xl font-display mb-2 text-text">{t('book.title')}</h1>
              <p className="text-text-muted font-body mb-12">
                {t('book.sub')}
              </p>

              <div className="mt-12 pt-12 border-t border-gold/10">
                <a href="https://wa.me/251938404186" target="_blank" className="flex items-center justify-center gap-2 p-4 bg-[#25D366] text-white rounded-xl font-bold transition-transform hover:scale-105 max-w-xs mx-auto">
                  <MessageSquare className="w-5 h-5" />
                  <span>{t('whatsapp.title')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-display text-center mb-20 text-text">{t('book.how_works')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Dotted Line connector */}
            <div className="absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dotted border-gold/30 hidden lg:block" />
            
            {[
              { id: 1, title: t('book.step1_title'), text: t('book.step1_text'), icon: <Send className="w-6 h-6" /> },
              { id: 2, title: t('book.step2_title'), text: t('book.step2_text'), icon: <Phone className="w-6 h-6" /> },
              { id: 3, title: t('book.step3_title'), text: t('book.step3_text'), icon: <Map className="w-6 h-6" /> },
              { id: 4, title: t('book.step4_title'), text: t('book.step4_text'), icon: <CheckCircle2 className="w-6 h-6" /> },
            ].map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-24 h-24 bg-bg border-4 border-gold rounded-full flex items-center justify-center text-gold shadow-xl">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-text">{t('book_page.step_label')} {step.id}: {step.title}</h3>
                  <p className="text-text-muted font-body text-sm leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment & Safety Info */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-10 h-10 text-gold" />, title: t('book_page.secure_title'), text: t('book_page.secure_text') },
            { icon: <RefreshCw className="w-10 h-10 text-gold" />, title: t('book_page.flexible_title'), text: t('book_page.flexible_text') },
            { icon: <CreditCard className="w-10 h-10 text-gold" />, title: t('book_page.iata_title'), text: t('book_page.iata_text') },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 bg-surface rounded-3xl shadow-xl border border-gold/10 text-center space-y-6 transition-colors duration-300"
            >
              <div className="flex justify-center">{card.icon}</div>
              <h3 className="text-2xl font-display font-bold text-text">{card.title}</h3>
              <p className="text-text-muted font-body leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Digital Travel Pack */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=85" alt="Digital Travel Pack" fill className="object-cover" />
            <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
                <span className="text-gold font-bold uppercase tracking-widest text-xs mb-2 block">{t('book_page.pack_include')}</span>
                <h4 className="text-3xl font-display text-black">{t('book_page.pack_title')}</h4>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-display mb-8 text-text">{t('book_page.prep_title')}</h2>
            <p className="text-text-muted font-body text-lg leading-relaxed mb-12">
              {t('book_page.prep_sub')}
            </p>
            <div className="space-y-6">
              {[
                { title: t('book_page.prep_item1_title'), desc: t('book_page.prep_item1_desc') },
                { title: t('book_page.prep_item2_title'), desc: t('book_page.prep_item2_desc') },
                { title: t('book_page.prep_item3_title'), desc: t('book_page.prep_item3_desc') },
                { title: t('book_page.prep_item4_title'), desc: t('book_page.prep_item4_desc') }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xl text-text">{item.title}</h5>
                    <p className="text-text-muted font-body text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-display text-center mb-20 text-text">{t('book.faq_title')}</h2>
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                title={faq.q}
                content={faq.a}
              />
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
