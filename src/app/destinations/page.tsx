'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { MapPin, Calendar, CheckCircle2, Info, ChevronRight, X } from 'lucide-react';
import { Lightbox } from '@/components/Lightbox';

const destinations = [
  {
    id: 1,
    name: "ENTOTO MOUNTAIN",
    sub: "ADDIS ABABA",
    region: "Central",
    image: "/entoto.jpg",
    description: "Rising 3,200m above Addis Ababa, Entoto is both a historic highland retreat and the spiritual heart of the city. Hike through towering eucalyptus forests, visit the hilltop Maryam Church where Emperor Menelik II was crowned, and take in panoramic views over the sprawling capital below.",
    highlights: ["Maryam Church", "Menelik Palace", "Panoramic Views", "Forest Trails"],
    bestTime: "October – February"
  },
  {
    id: 2,
    name: "LALIBELA ROCK-HEWN CHURCHES",
    region: "North",
    image: "/lalibela.webp",
    description: "Carved entirely from living rock in the 12th century, Lalibela's 11 monolithic churches are a feat of human devotion that still defies explanation. Monks in white shammas pray in subterranean courtyards. Pilgrims travel weeks on foot to reach here. This is Ethiopia's Jerusalem.",
    highlights: ["Bete Giyorgis", "Bete Medhane Alem", "Timkat Festival", "Pilgrim Trails"],
    bestTime: "January (Timkat) | September – April"
  },
  {
    id: 3,
    name: "SIMIEN MOUNTAINS NATIONAL PARK",
    region: "North",
    image: "/semien2.jpg",
    description: "A UNESCO World Heritage Site and one of Africa's most dramatic highland landscapes. Trek along cliff edges that drop thousands of meters, spot gelada baboons grooming in meadows, and watch Ethiopian wolves prowl the moorlands at dawn. The Simiens are raw, wild, and unforgettable.",
    highlights: ["Ras Dashen (4,550m)", "Gelada Baboons", "Ethiopian Wolf", "Chenek Camp"],
    bestTime: "October – April"
  },
  {
    id: 4,
    name: "DANAKIL DEPRESSION",
    region: "East",
    image: "/afar.webp",
    description: "One of the hottest, lowest, and most geologically active places on earth. Neon-yellow sulfur vents, turquoise acid pools, active lava lakes at Erta Ale, and endless salt flats worked by the Afar people for millennia. This is another planet. On earth. In Ethiopia.",
    highlights: ["Erta Ale Volcano", "Dallol Sulfur Fields", "Salt Caravans", "Afar Culture"],
    bestTime: "November – February only"
  },
  {
    id: 5,
    name: "LAKE TANA & BLUE NILE FALLS",
    region: "North",
    image: "/lake.jpg",
    description: "Ethiopia's largest lake cradles 37 islands, 21 of which host medieval monasteries decorated with vivid murals of saints and kings. Just downstream, the Blue Nile thunders 45 meters over the Tis Abay Falls — the 'Smoke of Fire' — the same waters that built ancient Egypt.",
    highlights: ["Island Monasteries", "Tis Abay Falls", "Hippos", "Ancient Manuscripts"],
    bestTime: "September – January"
  },
  {
    id: 6,
    name: "OMO VALLEY TRIBES",
    region: "South",
    image: "/omo.jpg",
    description: "Home to over 40 distinct ethnic groups including the Hamar, Mursi, Karo, Dassanech, and Banna peoples, the Omo Valley is one of the last places on earth where ancient cultures survive entirely intact. Body painting, bull jumping ceremonies, and lip plates are daily life — not performance.",
    highlights: ["Hamar Bull Jump", "Mursi Lip Plates", "Karo Body Art", "Tribal Markets"],
    bestTime: "September – March"
  },
  {
    id: 7,
    name: "AXUM (AKSUM)",
    region: "North",
    image: "/axum.jpg",
    description: "Once the capital of one of the ancient world's four greatest empires, Axum ruled trade routes from Rome to India. Today its towering granite obelisks, underground royal tombs, and the legendary Church of Mary of Zion — said to hold the Ark of the Covenant — draw pilgrims and historians alike.",
    highlights: ["Obelisks", "St. Mary of Zion", "Queen of Sheba's Palace", "Royal Tombs"],
    bestTime: "October – March"
  },
  {
    id: 8,
    name: "GONDAR — AFRICA'S CAMELOT",
    region: "North",
    image: "/gonadrjpg.jpg",
    description: "The Camelot of Africa. Gondar's Royal Enclosure contains six medieval castles built between the 17th and 18th centuries, blending Portuguese, Indian, and Aksumite architecture into something entirely unique. The Debre Berhan Selassie church ceiling — covered with 80 painted angel faces — is Ethiopia's Sistine Chapel.",
    highlights: ["Royal Enclosure", "Debre Berhan Selassie", "Fasilides Bath", "Timkat"],
    bestTime: "October – April"
  },
  {
    id: 9,
    name: "BALE MOUNTAINS",
    region: "South",
    image: "/balejpg.jpg",
    description: "The Bale Mountains are the stronghold of the Ethiopian wolf — the world's rarest canid. Above the treeline, the Sanetti Plateau stretches at 4,000m, dotted with giant lobelia plants and roamed by mountain nyala. Below, the Harenna Forest is one of Africa's largest remaining cloud forests.",
    highlights: ["Ethiopian Wolf", "Mountain Nyala", "Sanetti Plateau", "Harenna Forest"],
    bestTime: "October – January"
  }
];

const comparisonData = [
  { dest: "Lalibela", bestFor: "History & Faith", duration: "2-3 days", diff: "Easy", season: "Oct-Apr", unesco: true, wildlife: false },
  { dest: "Simien Mts", bestFor: "Trekking", duration: "3-5 days", diff: "Challenging", season: "Oct-Apr", unesco: true, wildlife: true },
  { dest: "Danakil", bestFor: "Extreme Adventure", duration: "3-4 days", diff: "Very Hard", season: "Nov-Feb", unesco: false, wildlife: false },
  { dest: "Omo Valley", bestFor: "Culture", duration: "5-7 days", diff: "Easy", season: "Sep-Mar", unesco: false, wildlife: true },
  { dest: "Axum", bestFor: "Archaeology", duration: "1-2 days", diff: "Easy", season: "Oct-Mar", unesco: true, wildlife: false },
  { dest: "Gondar", bestFor: "Architecture", duration: "1-2 days", diff: "Easy", season: "Oct-Apr", unesco: true, wildlife: false },
  { dest: "Bale Mts", bestFor: "Wildlife", duration: "3-4 days", diff: "Moderate", season: "Oct-Jan", unesco: true, wildlife: true },
  { dest: "Lake Tana", bestFor: "Nature & History", duration: "1-2 days", diff: "Easy", season: "Sep-Jan", unesco: true, wildlife: true },
];

const travelerPhotos = [
  "https://images.unsplash.com/photo-1574170609346-4f7e6ee8e46c?w=500&q=85",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=85",
  "https://images.unsplash.com/photo-1609136370347-6e8a8da3f71a?w=500&q=85",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=85",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=85",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=85",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=500&q=85",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=85",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=85",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=85",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=85",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&q=85"
];

export default function Destinations() {
  const { t } = useTranslation('common');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/addis ababa.jpg"
          alt="Addis Ababa Skyline"
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
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('dest_page.hero_badge')}</span>
          <h1 className="text-5xl md:text-8xl font-display text-white mb-6">{t('dest_page.hero_title')} <br/><span className="italic text-gold">{t('dest_page.hero_title_italic')}</span></h1>
          <p className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto">
            {t('dest_page.hero_sub')}
          </p>
          <nav className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-gold transition-colors">{t('dest_page.breadcrumb_home')}</Link>
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="text-gold">{t('dest_page.breadcrumb_destinations')}</span>
          </nav>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {destinations.map((dest) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface rounded-3xl overflow-hidden shadow-xl border border-gold/10 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden group">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {dest.region}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-display mb-2 text-text">{dest.name}</h2>
                    {dest.sub && <p className="text-gold text-xs font-bold mb-4 tracking-widest">{dest.sub}</p>}
                    <p className="text-text-muted text-sm mb-6 font-body line-clamp-4">
                      {dest.description}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-1 bg-bg border border-gold/10 text-[10px] font-medium text-text-muted rounded-md">
                            {h}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-text-muted font-medium py-4 border-t border-gold/5">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span>{t('dest_page.best_time')}{dest.bestTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lalibela Spotlight */}
      <section className="relative bg-bg text-text py-32 overflow-hidden transition-colors duration-300 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/5 space-y-32">
            <div>
              <h2 className="text-gold font-bold uppercase tracking-[0.2em] mb-4">{t('dest_page.deep_dive_label')}</h2>
              <h3 className="text-5xl md:text-7xl font-display mb-12">{t('dest_page.deep_dive_title')}</h3>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="border-l-4 border-gold pl-8">
                  <h4 className="text-2xl font-display mb-4">{t('dest_page.deep_dive_history_title')}</h4>
                  <p className="text-text-muted font-body leading-relaxed">
                    {t('dest_page.deep_dive_history_text')}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-l-4 border-gold pl-8"
            >
              <h4 className="text-2xl font-display mb-4">{t('dest_page.deep_dive_arch_title')}</h4>
              <p className="text-text-muted font-body leading-relaxed">
                {t('dest_page.deep_dive_arch_text')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-l-4 border-gold pl-8"
            >
              <h4 className="text-2xl font-display mb-4">{t('dest_page.deep_dive_exp_title')}</h4>
              <p className="text-text-muted font-body leading-relaxed">
                {t('dest_page.deep_dive_exp_text')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-l-4 border-gold pl-8 pb-12"
            >
              <h4 className="text-2xl font-display mb-4">{t('dest_page.deep_dive_getting_title')}</h4>
              <p className="text-text-muted font-body leading-relaxed">
                {t('dest_page.deep_dive_getting_text')}
              </p>
            </motion.div>
          </div>

          <div className="lg:w-2/5 relative">
            <div className="lg:sticky lg:top-32 h-[400px] lg:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl border border-gold/20">
              <Image
                src="/lalibela.webp"
                alt="Bete Giyorgis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t('dest_page.iconic_view')}</p>
                <p className="text-xl font-display">{t('dest_page.deep_dive_church')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasons Guide */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4 text-text">{t('dest_page.seasons_title')}</h2>
            <p className="text-text-muted font-body">{t('dest_page.seasons_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface p-12 rounded-[40px] border-2 border-gold/20 shadow-xl"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-8">
                <Calendar className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-3xl font-display mb-6 text-text">{t('dest_page.dry_title')}</h3>
              <p className="text-text-muted font-body leading-relaxed mb-6">
                {t('dest_page.dry_text')}
              </p>
              <div className="p-4 bg-gold/5 rounded-xl border border-gold/10">
                <p className="text-sm font-bold text-gold">{t('dest_page.dry_peak')}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface p-12 rounded-[40px] border-2 border-forest/20 shadow-xl"
            >
              <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mb-8">
                <Info className="w-8 h-8 text-forest" />
              </div>
              <h3 className="text-3xl font-display mb-6 text-text">{t('dest_page.green_title')}</h3>
              <p className="text-text-muted font-body leading-relaxed mb-6">
                {t('dest_page.green_text')}
              </p>
              <div className="p-4 bg-forest/5 rounded-xl border border-forest/10">
                <p className="text-sm font-bold text-forest">{t('dest_page.green_peak')}</p>
              </div>
            </motion.div>
          </div>

          {/* Calendar Bar */}
          <div className="bg-surface p-8 rounded-3xl shadow-lg border border-gold/10">
            <div className="flex flex-wrap md:flex-nowrap gap-1">
              {[
                { m: "Jan", type: "gold", info: t('dest_page.jan_info') },
                { m: "Feb", type: "gold", info: t('dest_page.feb_info') },
                { m: "Mar", type: "gold", info: t('dest_page.mar_info') },
                { m: "Apr", type: "gold", info: t('dest_page.apr_info') },
                { m: "May", type: "mix", info: t('dest_page.may_info') },
                { m: "Jun", type: "green", info: t('dest_page.jun_info') },
                { m: "Jul", type: "green", info: t('dest_page.jul_info') },
                { m: "Aug", type: "green", info: t('dest_page.aug_info') },
                { m: "Sep", type: "green", info: t('dest_page.sep_info') },
                { m: "Oct", type: "gold", info: t('dest_page.oct_info') },
                { m: "Nov", type: "gold", info: t('dest_page.nov_info') },
                { m: "Dec", type: "gold", info: t('dest_page.dec_info') },
              ].map((month, i) => (
                <div key={i} className="flex-1 min-w-[80px] group relative">
                  <div className={`h-16 flex items-center justify-center text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                    month.type === 'gold' ? 'bg-gold/20 text-gold' : 
                    month.type === 'green' ? 'bg-forest/20 text-forest' : 
                    'bg-amber-100 dark:bg-amber-900/30 text-amber-700'
                  }`}>
                    {month.m}
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-black text-white text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap">
                      Best for: {month.info}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section className="py-32 px-4 bg-bg overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4 text-text">{t('dest_page.festival_title')}</h2>
            <p className="text-text-muted font-body">{t('dest_page.festival_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: t('dest_page.festival1_name'), date: t('dest_page.festival1_date'), loc: t('dest_page.festival1_loc'), text: t('dest_page.festival1_text') },
              { name: t('dest_page.festival2_name'), date: t('dest_page.festival2_date'), loc: t('dest_page.festival2_loc'), text: t('dest_page.festival2_text') },
              { name: t('dest_page.festival3_name'), date: t('dest_page.festival3_date'), loc: t('dest_page.festival3_loc'), text: t('dest_page.festival3_text') },
              { name: t('dest_page.festival4_name'), date: t('dest_page.festival4_date'), loc: t('dest_page.festival4_loc'), text: t('dest_page.festival4_text') }
            ].map((fest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-surface rounded-3xl shadow-xl border border-gold/10 group hover:bg-gold transition-colors duration-500"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gold group-hover:text-white mb-4 transition-colors">{fest.date}</p>
                <h3 className="text-2xl font-display mb-2 group-hover:text-white transition-colors">{fest.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-white/70 mb-6 transition-colors">{fest.loc}</p>
                <p className="text-sm text-text-muted group-hover:text-white/80 leading-relaxed font-body transition-colors">
                  {fest.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-display text-center mb-20 text-text">{t('destinations.compare_title')}</h2>
          
          <div className="overflow-x-auto rounded-2xl shadow-2xl border border-gold/10">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gold text-white font-display text-lg">
                  <th className="p-6">{t('dest_page.compare_destination')}</th>
                  <th className="p-6">{t('dest_page.compare_best_for')}</th>
                  <th className="p-6">{t('dest_page.compare_duration')}</th>
                  <th className="p-6">{t('dest_page.compare_difficulty')}</th>
                  <th className="p-6">{t('dest_page.compare_season')}</th>
                  <th className="p-6 text-center">{t('dest_page.compare_unesco')}</th>
                  <th className="p-6 text-center">{t('dest_page.compare_wildlife')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={`font-body text-sm ${i % 2 === 0 ? 'bg-bg' : 'bg-surface'} hover:bg-gold/5 transition-colors`}>
                    <td className="p-6 font-bold text-text">{row.dest}</td>
                    <td className="p-6 text-text-muted">{row.bestFor}</td>
                    <td className="p-6 text-text-muted">{row.duration}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        row.diff === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        row.diff === 'Moderate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        row.diff === 'Challenging' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {row.diff}
                      </span>
                    </td>
                    <td className="p-6 text-text-muted">{row.season}</td>
                    <td className="p-6 text-center">{row.unesco ? '✅' : '❌'}</td>
                    <td className="p-6 text-center">{row.wildlife ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}