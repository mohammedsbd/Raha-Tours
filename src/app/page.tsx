'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Landmark, Mountain, Coffee, Star, Play, Check, Award, X, Gem, ShieldCheck, MessageCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { CountUp } from '@/components/CountUp';
import { Lightbox } from '@/components/Lightbox';

export default function Home() {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentCoffeeStep, setCurrentCoffeeStep] = useState(0);
  const [currentDest, setCurrentDest] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroImages = [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=90",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=90"
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85", alt: "Lalibela rock church interior" },
    { url: "https://images.unsplash.com/photo-1612686635542-2244ed5d6df5?w=800&q=85", alt: "Ethiopian highlands aerial" },
    { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=85", alt: "Danakil sulfur fields" },
    { url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=85", alt: "Omo Valley tribe" },
    { url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=85", alt: "Simien Mountains cliffs" },
    { url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85", alt: "Ethiopian coffee ceremony" },
    { url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=85", alt: "Lake Tana monastery" },
    { url: "https://images.unsplash.com/photo-1541956064-732a5c6da1b9?w=800&q=85", alt: "Axum obelisks" },
    { url: "https://images.unsplash.com/photo-1609136370347-6e8a8da3f71a?w=800&q=85", alt: "Gelada baboon Simien" },
    { url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=85", alt: "Injera Ethiopian food" },
    { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85", alt: "Ethiopian luxury lodge" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85", alt: "Awash National Park" }
  ];

  const coffeeSteps = [
    { id: 1, title: t('coffee.step1_title'), text: t('coffee.step1_text'), image: "https://images.unsplash.com/photo-1625419610578-25a469e7a707?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: t('coffee.step2_title'), text: t('coffee.step2_text'), image: "https://images.unsplash.com/photo-1736155341572-ad68c199eadf?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: t('coffee.step3_title'), text: t('coffee.step3_text'), image: "https://images.unsplash.com/photo-1571957156261-8c3265fe66c6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: t('coffee.step4_title'), text: t('coffee.step4_text'), image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=85" },
    { id: 5, title: t('coffee.step5_title'), text: t('coffee.step5_text'), image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=85" }
  ];

  const signatureExperiences = [
    { title: t('home.signature_hyena_title'), image: "/hayena.jpg", text: t('home.signature_hyena_text') },
    { title: t('home.signature_lalibela_title'), image: "/lalibela.webp", text: t('home.signature_lalibela_text') },
    { title: t('home.signature_salt_title'), image: "/afar.webp", text: t('home.signature_salt_text') },
    { title: t('home.signature_omo_title'), image: "/hammar.jpg", text: t('home.signature_omo_text') }
  ];

  const destinations = [
    {
      name: t('home.dest_lalibela_name'),
      image: "/lalibela.webp",
      tagline: t('home.dest_lalibela_tagline')
    },
    {
      name: t('home.dest_simien_name'),
      image: "/semien2.jpg",
      tagline: t('home.dest_simien_tagline')
    },
    {
      name: t('home.dest_omo_name'),
      image: "/omo.jpg",
      tagline: t('home.dest_omo_tagline')
    }
  ];

  const whyEthiopia = [
    { icon: <Landmark className="w-10 h-10 text-gold" />, title: t('why.ancient_title'), text: t('why.ancient_text') },
    { icon: <Mountain className="w-10 h-10 text-gold" />, title: t('why.landscapes_title'), text: t('why.landscapes_text') },
    { icon: <Coffee className="w-10 h-10 text-gold" />, title: t('why.coffee_title'), text: t('why.coffee_text') }
  ];

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mounted, heroImages.length]);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  if (!mounted) return <div className="h-screen bg-bg transition-colors duration-300" />;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentSlide}
            style={{ y: heroY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={heroImages[currentSlide]}
              alt="Raha Tours"
              fill
              className="object-cover"
              priority
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/70" />
          </motion.div>
        </AnimatePresence>

        {/* Bottom Bleed Fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[220px] z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)' }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 px-4 max-w-5xl"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-gold text-gold text-sm font-semibold mb-6">
            {t('hero.badge')}
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-display italic text-gold mb-8">
            {t('hero.title_italic')}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-body">
            {t('hero.subtext')}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/destinations" className="btn-gold w-full sm:w-auto">
              {t('hero.cta_explore')}
            </Link>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              {t('hero.cta_watch')}
            </button>
          </motion.div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {heroImages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${currentSlide === i ? 'bg-gold w-6' : 'bg-white/40 w-2'}`}
              layout
            />
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative z-20 -mt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white dark:bg-surface rounded-[2rem] shadow-2xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display mb-4 text-gold">{t('home.what_we_do_title')}</h2>
            <p className="text-lg text-text-muted font-body max-w-2xl mx-auto">
              {t('home.what_we_do_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="p-4 bg-gold/10 rounded-2xl text-gold transition-transform group-hover:scale-110">
                <Gem className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold">{t('home.what_we_do_item1_title')}</h3>
              <p className="text-text-muted font-body text-sm leading-relaxed">
                {t('home.what_we_do_item1_text')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="p-4 bg-gold/10 rounded-2xl text-gold transition-transform group-hover:scale-110">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold">{t('home.what_we_do_item2_title')}</h3>
              <p className="text-text-muted font-body text-sm leading-relaxed">
                {t('home.what_we_do_item2_text')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="p-4 bg-gold/10 rounded-2xl text-gold transition-transform group-hover:scale-110">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold">{t('home.what_we_do_item3_title')}</h3>
              <p className="text-text-muted font-body text-sm leading-relaxed">
                {t('home.what_we_do_item3_text')}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ethiopia by the Numbers */}
      <section className="py-32 px-4 bg-bg text-text border-y border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-display text-center text-gold mb-24"
          >
            {t('home.numbers_title')}
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {[
              { to: 3200000, label: t('stats.human_history'), suffix: "" },
              { to: 9, label: t('stats.unesco'), suffix: "" },
              { to: 80, label: t('stats.languages'), suffix: "+" },
              { to: 120, label: t('stats.below_sea'), suffix: "m" },
              { to: 4550, label: t('stats.summit'), suffix: "" },
              { to: 40, label: t('stats.ethnic_groups'), suffix: "+" },
              { to: 3000, label: t('stats.coffee_history'), suffix: "+" },
              { to: 1, label: t('stats.independent'), suffix: "st", isOrdinal: true }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-gold/20 pb-8 group"
              >
                <div className="text-5xl md:text-6xl font-display text-gold mb-4">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-body text-text-muted uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Teaser */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4">{t('destinations.where_go')}</h2>
            <p className="text-text-muted font-body">{t('destinations.regions_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: t('home.region1_name'), 
                image: "https://images.unsplash.com/flagged/photo-1572644973628-e9be84915d59?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
                text: t('home.region1_text') 
              },
              { 
                name: t('home.region2_name'), 
                image: "/tigray.webp", 
                text: t('home.region2_text') 
              },
              { 
                name: t('home.region3_name'), 
                image: "/oromia.jpg", 
                text: t('home.region3_text') 
              },
              { 
                name: t('home.region4_name'), 
                image: "/omo.jpg", 
                text: t('home.region4_text') 
              },
              { 
                name: t('home.region5_name'), 
                image: "/afar.webp", 
                text: t('home.region5_text') 
              },
              { 
                name: t('home.region6_name'), 
                image: "/somalia.jpg", 
                text: t('home.region6_text') 
              },
              { 
                name: t('home.region7_name'), 
                image: "/addis ababa.jpg", 
                text: t('home.region7_text') 
              },
              { 
                name: t('home.region8_name'), 
                image: "/gambella.jpg", 
                text: t('home.region8_text') 
              },
              { 
                name: t('home.region9_name'), 
                image: "/harar.jpg", 
                text: t('home.region9_text') 
              }
            ].map((region: any, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`relative h-64 rounded-3xl overflow-hidden ${region.image ? '' : `bg-gradient-to-br ${region.bg}`} p-8 flex flex-col justify-end group cursor-pointer shadow-lg`}
              >
                {region.image && (
                  <>
                    <Image 
                      src={region.image} 
                      alt={region.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                )}
                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <h3 className="text-3xl font-display text-white mb-2">{region.name}</h3>
                  <p className="text-white/80 text-sm font-body">{region.text}</p>
                </div>
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-8 right-8 btn-gold !py-2 !px-4 !text-xs opacity-0 group-hover:opacity-100"
                >
                   {t('home.explore_btn')}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Ceremony */}
      <section className="py-32 px-4 bg-surface overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-5xl font-display mb-4">{t('coffee.title')}</h2>
            <p className="text-text-muted font-body max-w-2xl">{t('coffee.subtitle')}</p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-12 min-h-[600px]">
            {/* Left Content Area (Text) */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCoffeeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-7xl font-display text-gold/20 font-bold">0{coffeeSteps[currentCoffeeStep].id}</span>
                    <div className="h-0.5 w-12 bg-gold" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{t('coffee.step' + coffeeSteps[currentCoffeeStep].id + '_title')}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-display leading-tight">
                    {coffeeSteps[currentCoffeeStep].title}
                  </h3>
                  
                  <p className="text-lg text-text-muted font-body leading-relaxed max-w-xl">
                    {coffeeSteps[currentCoffeeStep].text}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setCurrentCoffeeStep((prev) => (prev - 1 + coffeeSteps.length) % coffeeSteps.length)}
                      className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-white transition-all group"
                    >
                      <motion.div whileHover={{ x: -2 }}>←</motion.div>
                    </button>
                    <button 
                      onClick={() => setCurrentCoffeeStep((prev) => (prev + 1) % coffeeSteps.length)}
                      className="w-14 h-14 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-dark shadow-xl hover:shadow-gold/20 transition-all group"
                    >
                      <motion.div whileHover={{ x: 2 }}>→</motion.div>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Image Area (Visuals) */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={currentCoffeeStep}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={coffeeSteps[currentCoffeeStep].image} 
                      alt={coffeeSteps[currentCoffeeStep].title} 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Step Indicators */}
                <div className="absolute bottom-10 left-10 right-10 flex gap-2">
                  {coffeeSteps.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${currentCoffeeStep === idx ? 'bg-gold' : 'bg-white/20'}`}
                      animate={{ scaleY: currentCoffeeStep === idx ? 2 : 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ethiopia Strip */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-center mb-20"
          >
            {t('why.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyEthiopia.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center space-y-6 group"
              >
                <div className="p-6 bg-white dark:bg-surface rounded-3xl shadow-lg transition-transform group-hover:-translate-y-2 duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display">{item.title}</h3>
                <p className="text-text-muted leading-relaxed font-body">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-32 px-4 bg-surface overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-5xl font-display mb-4">{t('home.curated_title')}</h2>
              <p className="text-text-muted font-body">{t('home.curated_sub')}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentDest((prev) => (prev - 1 + destinations.length) % destinations.length)}
                className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-white transition-all"
              >
                ←
              </button>
              <button 
                onClick={() => setCurrentDest((prev) => (prev + 1) % destinations.length)}
                className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-dark transition-all"
              >
                →
              </button>
            </div>
          </div>

          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDest}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col lg:flex-row bg-white dark:bg-bg rounded-[40px] overflow-hidden shadow-2xl"
              >
                <div className="lg:w-1/2 relative h-full">
                  <Image src={destinations[currentDest].image} alt={destinations[currentDest].name} fill className="object-cover" />
                </div>
                <div className="lg:w-1/2 p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-display mb-4">{destinations[currentDest].name}</h3>
                  <p className="text-gold font-bold text-sm tracking-[0.2em] mb-6 uppercase">{destinations[currentDest].tagline}</p>
                  <p className="text-text-muted font-body leading-relaxed mb-8">
                    {t('home.destination_discover')}
                  </p>
                  <Link href="/destinations" className="text-gold font-bold flex items-center gap-2 group">
                    <span>{t('home.destination_view')}</span>
                    <motion.span whileHover={{ x: 5 }}>→</motion.span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Signature Experiences */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4">{t('home.signature_title')}</h2>
            <p className="text-text-muted font-body">{t('home.signature_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureExperiences.map((exp, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative h-[450px] rounded-3xl overflow-hidden group cursor-pointer"
              >
                <Image src={exp.image} alt={exp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-display text-white mb-4 transition-transform duration-500 group-hover:-translate-y-2">{exp.title}</h3>
                  <p className="text-white/70 text-sm font-body opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {exp.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the Road */}
      <section className="py-32 px-4 bg-surface overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-5xl font-display">{t('Some of our stories')}</h2>
            <Link href="/ethiopian-stories" className="text-gold font-bold hover:underline">{t('Check Out Some Stories')}</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { title: t('home.story1_title'), image: "https://images.unsplash.com/photo-1571957156261-8c3265fe66c6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", cat: t('home.story1_cat') },
              { title: t('home.story2_title'), image: "/monk.jpg", cat: t('home.story2_cat') },
              { title: t('home.story3_title'), image: "/Erta_Ale.jpg", cat: t('home.story3_cat') }
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <Image src={story.image} alt={story.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest">{story.cat}</div>
                </div>
                <h3 className="text-2xl font-display group-hover:text-gold transition-colors">{story.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavors of Abyssinia */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-5xl font-display mb-8">{t('home.flavors_title')}</h2>
            <p className="text-text-muted font-body text-lg leading-relaxed mb-8">
              {t('home.flavors_sub')}
            </p>
            <div className="space-y-4">
              {[t('home.feature_organic'), t('home.feature_grains'), t('home.feature_spices'), t('home.feature_communal')].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">{feat}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: t('home.food_injera_name'), image: "/injera.jpg", text: t('home.food_injera_text') },
              { name: t('home.food_doro_name'), image: "/dorowat.webp", text: t('home.food_doro_text') },
              { name: t('home.food_tibs_name'), image: "/tibs.jpg", text: t('home.food_tibs_text') }
            ].map((flavor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-surface rounded-3xl overflow-hidden shadow-xl group cursor-pointer border border-gold/5"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image src={flavor.image} alt={flavor.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gold mb-2">{flavor.name}</h3>
                  <p className="text-sm text-text-muted font-body leading-relaxed">{flavor.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Video Banner */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden border-y border-gold/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=85"
            alt="Cinematic Ethiopia"
            fill
            className="object-cover blur-sm opacity-30"
          />
          <div className="absolute inset-0 bg-bg transition-colors duration-300" />
        </div>

        <div className="relative z-10 px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoModalOpen(true)}
            className="w-24 h-24 bg-gold rounded-full flex items-center justify-center shadow-2xl mb-8 mx-auto"
          >
            <Play className="w-10 h-10 text-white fill-white ml-1" />
          </motion.button>
          <h2 className="text-4xl md:text-6xl font-display text-gold mb-4">{t('home.video_title')}</h2>
          <p className="text-xl text-text-muted font-body">{t('home.video_sub')}</p>
        </div>
      </section>



      {/* Trust Badges */}
      <section className="py-16 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-text-muted mb-12">{t('home.trust_title')}</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            {[
              { icon: <Award className="w-5 h-5 text-gold" />, text: t('home.badge_operator') },
              { icon: <Star className="w-5 h-5 text-gold" />, text: t('home.badge_tripadvisor') },
              { icon: <Check className="w-5 h-5 text-gold" />, text: t('home.badge_gstc') },
              { icon: <Check className="w-5 h-5 text-gold" />, text: t('home.badge_iata') },
              { icon: <Check className="w-5 h-5 text-gold" />, text: t('home.badge_ethiopian') }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Lightbox & Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white hover:text-gold z-10"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/1YSoJwXQTiU?autoplay=1"
                title="Raha Tours Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={galleryImages}
            index={activeImageIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
            onPrev={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
