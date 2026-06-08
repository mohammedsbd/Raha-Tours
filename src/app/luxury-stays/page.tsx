'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { MapPin, Star, Wifi, Coffee, Wind, Waves, Trees, Check, X, Camera, ShieldCheck } from 'lucide-react';
import { Lightbox } from '@/components/Lightbox';

const properties = [
  {
    id: 1,
    name: "SHERATON ADDIS",
    location: "Addis Ababa",
    rating: 5,
    tag: "City Luxury",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85",
    description: "Addis Ababa's most iconic hotel. Set on 23 hectares of manicured gardens, the Sheraton Addis combines Aksumite architectural details with world-class amenities. The rooftop pool overlooking the capital skyline at sunset is simply unmatched.",
    amenities: ["Rooftop Pool", "8 Restaurants", "Spa", "Business Centre", "Garden"],
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85"
    ]
  },
  {
    id: 2,
    name: "BALE MOUNTAIN LODGE",
    location: "Bale Mountains",
    rating: 5,
    tag: "Eco Luxury",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=85",
    description: "Perched at 2,380m on the edge of the Harenna Forest, Bale Mountain Lodge is Africa's highest eco-lodge. Solar powered, community owned, and breathtakingly beautiful. Ethiopian wolves pass through the property at dawn. Spend evenings beside a roaring log fire.",
    amenities: ["Solar Power", "Forest Trails", "Wildlife Guides", "Log Fires", "Organic Meals"],
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85",
      "https://images.unsplash.com/photo-1609136370347-6e8a8da3f71a?w=900&q=85",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=85"
    ]
  },
  {
    id: 3,
    name: "GHERALTA LODGE, TIGRAY",
    location: "Tigray Region",
    rating: 4,
    tag: "Heritage Stay",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85",
    description: "Built into the dramatic sandstone cliffs of Tigray, Gheralta Lodge sits beneath towering rock-hewn churches accessible only by rope. Stone bungalows blend into the escarpment. The silence here is total. The stars at night are impossible.",
    amenities: ["Cliff-top Terrace", "Church Excursions", "Stone Bungalows", "Pool", "Stargazing"],
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85",
      "https://images.unsplash.com/photo-1541956064-732a5c6da1b9?w=900&q=85",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85"
    ]
  },
  {
    id: 4,
    name: "KURIFTU RESORT, LAKE TANA",
    location: "Bahir Dar",
    rating: 5,
    tag: "Lakeside Luxury",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85",
    description: "Floating at the edge of Africa's largest highland lake, Kuriftu combines modern Ethiopian design with lakeside serenity. Thatched infinity villas extend over the water. Watch fishermen in papyrus tankwas at dawn from your private deck.",
    amenities: ["Infinity Pool", "Lake View Villas", "Spa", "Boat Excursions", "Sundeck Bar"],
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85"
    ]
  },
  {
    id: 5,
    name: "LIMALIMO LODGE, SIMIEN MOUNTAINS",
    location: "Simien Mountains",
    rating: 5,
    tag: "Mountain Retreat",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=85",
    description: "Arguably Ethiopia's most dramatic lodge, Limalimo sits on the very edge of a 1,500m escarpment in the Simien Mountains. Glass-fronted chalets face directly into a valley so vast it feels like the edge of the world. Gelada baboons visit the terrace before breakfast.",
    amenities: ["Glass-front Chalets", "Escarpment Views", "Trekking", "Fireplace", "Fine Dining"],
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85",
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=85",
      "https://images.unsplash.com/photo-1609136370347-6e8a8da3f71a?w=900&q=85"
    ]
  },
  {
    id: 6,
    name: "AWASH FALLS LODGE",
    location: "Awash National Park",
    rating: 4,
    tag: "Safari Lodge",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=85",
    description: "Perched above the roaring Awash Falls in Ethiopia's oldest national park, this tented lodge combines safari adventure with genuine comfort. Lions, oryx, and hartebeest roam nearby plains. Sundowners on the deck above the falls are a life event.",
    amenities: ["Safari Tents", "Game Drives", "Falls View Deck", "Bar", "Guided Walks"],
    gallery: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=85",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=85"
    ]
  }
];

export default function LuxuryStays() {
  const { t } = useTranslation('common');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<{url: string, alt: string}[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (gallery: string[]) => {
    setActiveGallery(gallery.map(url => ({ url, alt: "Property View" })));
    setActiveImageIndex(0);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hotel2webp.webp"
          alt="Luxury Resort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
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
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('luxury_page.hero_badge')}</span>
          <h1 className="text-5xl md:text-8xl font-display text-white mb-6">
            {t('luxury_page.hero_title')} <br/>
            <span className="italic text-gold">{t('luxury_page.hero_title_italic')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto">
            {t('luxury_page.hero_sub')}
          </p>
          <nav className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-gold transition-colors">{t('pack_page.breadcrumb_home')}</Link>
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="text-gold">{t('nav.luxury_stays')}</span>
          </nav>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-text-muted font-body leading-relaxed italic">
            {t('luxury_page.intro_quote')}
          </p>
        </div>
      </section>

      {/* Property Grid */}
      <section className="pb-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {properties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-surface rounded-3xl overflow-hidden shadow-2xl group flex flex-col border border-gold/5"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={prop.image}
                    alt={prop.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-md text-gold text-xs font-bold uppercase tracking-widest rounded-full">
                      {prop.tag}
                    </span>
                  </div>
                  <button 
                    onClick={() => openGallery(prop.gallery)}
                    className="absolute bottom-6 right-6 bg-gold text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 px-6"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">{t('luxury_page.view_gallery')}</span>
                  </button>
                </div>

                <div className="p-8 lg:p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-3xl font-display mb-2 text-text">{prop.name}</h2>
                      <div className="flex items-center gap-2 text-gold">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{prop.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-4 h-4 ${idx < prop.rating ? 'fill-gold text-gold' : 'text-gold/20'}`} />
                      ))}
                    </div>
                  </div>

                  <p className="text-text-muted font-body text-sm leading-relaxed mb-8 flex-grow">
                    {prop.description}
                  </p>

                  <div className="space-y-8">
                    <div className="flex flex-wrap gap-2">
                      {prop.amenities.map((amenity, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-bg text-[10px] font-bold uppercase text-text-muted rounded-lg border border-gold/5">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-gold/10">
                      <div>
                        <span className="text-2xl font-display font-bold text-gold">{t('pack_page.pricing')}</span>
                      </div>
                      <Link href="/book" className="btn-gold !py-3 !px-10 !text-sm">
                        {t('luxury_page.enquire_now')}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Philosophy */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 border-y border-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-12">
            <h2 className="text-5xl font-display leading-tight text-text">{t('luxury_page.philosophy_title')}</h2>
            <div className="space-y-8 text-text-muted font-body leading-relaxed text-lg">
              <p>
                {t('luxury_page.philosophy_p1')}
              </p>
              <p>
                {t('luxury_page.philosophy_p2')}
              </p>
              <p>
                {t('luxury_page.philosophy_p3')}
              </p>
              <p>
                {t('luxury_page.philosophy_p4')}
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=85"
              alt="Lodge Philosophy"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Concierge Services */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4 text-text">{t('luxury_page.concierge_title')}</h2>
            <p className="text-text-muted font-body">{t('luxury_page.concierge_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: t('luxury_page.concierge1_title'), icon: <Coffee className="w-8 h-8 text-gold" />, text: t('luxury_page.concierge1_text') },
              { title: t('luxury_page.concierge2_title'), icon: <Wind className="w-8 h-8 text-gold" />, text: t('luxury_page.concierge2_text') },
              { title: t('luxury_page.concierge3_title'), icon: <ShieldCheck className="w-8 h-8 text-gold" />, text: t('luxury_page.concierge3_text') }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-12 bg-surface rounded-[40px] shadow-xl border border-gold/10 transition-colors duration-300"
              >
                <div className="mb-8 flex justify-center">{item.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4 text-text">{item.title}</h3>
                <p className="text-text-muted font-body leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-display text-center mb-20 text-text">{t('luxury_page.compare_title')}</h2>
          
          <div className="overflow-x-auto rounded-3xl shadow-2xl border border-gold/10">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gold text-white font-display text-lg">
                  <th className="p-6">{t('luxury_page.compare_lodge')}</th>
                  <th className="p-6">{t('luxury_page.compare_location')}</th>
                  <th className="p-6">{t('luxury_page.compare_stars')}</th>
                  <th className="p-6 text-center">{t('luxury_page.compare_pool')}</th>
                  <th className="p-6 text-center">{t('luxury_page.compare_wildlife')}</th>
                  <th className="p-6">{t('luxury_page.compare_best_for')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Sheraton Addis", loc: "Addis Ababa", stars: 5, pool: true, wild: false, for: "City base, business" },
                  { name: "Bale Mountain Lodge", loc: "Bale Mts", stars: 5, pool: false, wild: true, for: "Eco, wildlife" },
                  { name: "Gheralta Lodge", loc: "Tigray", stars: 4, pool: true, wild: false, for: "Heritage, history" },
                  { name: "Kuriftu Lake Tana", loc: "Bahir Dar", stars: 5, pool: true, wild: true, for: "Lakeside romance" },
                  { name: "Limalimo Lodge", loc: "Simien Mts", stars: 5, pool: false, wild: true, for: "Drama, views" },
                  { name: "Awash Falls Lodge", loc: "Awash NP", stars: 4, pool: false, wild: true, for: "Safari, adventure" },
                ].map((row, i) => (
                  <tr key={i} className={`font-body text-sm ${i % 2 === 0 ? 'bg-bg' : 'bg-surface'} hover:bg-gold/5 transition-colors`}>
                    <td className="p-6 font-bold text-text">{row.name}</td>
                    <td className="p-6 text-text-muted">{row.loc}</td>
                    <td className="p-6">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < row.stars ? 'fill-gold text-gold' : 'text-gold/20'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="p-6 text-center">{row.pool ? '✅' : '❌'}</td>
                    <td className="p-6 text-center">{row.wild ? '✅' : '❌'}</td>
                    <td className="p-6 text-text-muted">{row.for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={activeGallery}
            index={activeImageIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={() => setActiveImageIndex(prev => (prev + 1) % activeGallery.length)}
            onPrev={() => setActiveImageIndex(prev => (prev - 1 + activeGallery.length) % activeGallery.length)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
