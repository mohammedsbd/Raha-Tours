'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Clock, Tag, Check, X, ArrowRight, Sun, Moon, Coffee } from 'lucide-react';
import { Accordion, AccordionItem } from '@/components/Accordion';

const packages = [
  {
    id: 1,
    name: "HISTORIC NORTH CIRCUIT",
    duration: "10 Days / 9 Nights",
    type: "Cultural",
    image: "/lalibela.webp",
    badge: "BESTSELLER",
    route: ["Addis Ababa", "Gondar", "Simien Mountains", "Lalibela", "Axum", "Addis Ababa"],
    highlights: ["Lalibela Churches", "Royal Enclosure", "Ras Dashen Trek", "Axum Obelisks"],
    description: "The crown jewel of Ethiopian travel. This 10-day journey through the historic north visits every major UNESCO site in breathtaking succession. Stand inside Lalibela's rock churches at sunrise with monks chanting around you. Walk among Gondar's castles at golden hour. Trek to the summit of Ras Dashen."
  },
  {
    id: 2,
    name: "OMO VALLEY CULTURAL IMMERSION",
    duration: "7 Days / 6 Nights",
    type: "Cultural",
    image: "/omo.jpg",
    badge: "TOP RATED",
    route: ["Addis Ababa", "Arba Minch", "Jinka", "Turmi", "Omorate", "Addis Ababa"],
    highlights: ["Hamar Bull Jump", "Mursi Villages", "Karo Cliffs", "Mago National Park"],
    description: "An unflinching journey into the world's most extraordinary living cultures. Visit seven distinct tribal groups across 7 days, attending ceremonies and markets that have continued unchanged for centuries. This is not a performance — it is life as it has always been lived."
  },
  {
    id: 3,
    name: "DANAKIL & SIMIEN ADVENTURE",
    duration: "8 Days / 7 Nights",
    type: "Adventure",
    image: "/Erta_Ale.jpg",
    badge: "EXTREME",
    route: ["Addis Ababa", "Mekelle", "Danakil", "Erta Ale", "Debark", "Simien Mountains", "Gondar"],
    highlights: ["Erta Ale Lava Lake", "Dallol Sulfur Fields", "Gelada Trek", "Ethiopian Wolf"],
    description: "Earth's most extreme landscapes back-to-back. Descend to the Danakil Depression — the hottest place on earth — to witness an active lava lake at midnight, then ascend to the cloud-draped Simien Mountains to trek among gelada baboons. For those who want it all."
  },
  {
    id: 4,
    name: "ETHIOPIAN HIGHLANDS WILDLIFE SAFARI",
    duration: "9 Days / 8 Nights",
    type: "Wildlife",
    image: "/balejpg.jpg",
    badge: "RARE WILDLIFE",
    route: ["Addis Ababa", "Bale Mountains", "Yabelo", "Awash", "Addis Ababa"],
    highlights: ["Ethiopian Wolf", "Mountain Nyala", "African Wild Dog", "Grevy's Zebra"],
    description: "Ethiopia is one of Africa's most underrated wildlife destinations. This 9-day safari focuses on endemic species found nowhere else on earth — the Ethiopian wolf, mountain nyala, and Gelada baboon — across dramatically different ecosystems from Afro-alpine plateau to acacia savanna."
  },
  {
    id: 5,
    name: "LUXURY ETHIOPIA GRAND TOUR",
    duration: "14 Days / 13 Nights",
    type: "Luxury",
    image: "/monk.jpg",
    badge: "ULTRA-LUXURY",
    route: ["Addis Ababa", "Gondar", "Lalibela", "Axum", "Danakil", "Omo Valley", "Addis Ababa"],
    highlights: ["Private Church Access", "Chartered Helicopter", "Chef-curated Dining", "Exclusive Tribal ceremonies"],
    description: "Ethiopia experienced the way it deserves — without compromise. Private access to Lalibela's churches before dawn. A chartered helicopter over the Simien cliffs. Dinner prepared by Ethiopia's finest chef in a mountain lodge. Every detail curated. Every moment exceptional."
  },
  {
    id: 6,
    name: "ETHIOPIA FAMILY EXPLORER",
    duration: "8 Days / 7 Nights",
    type: "Family",
    image: "/lake.jpg",
    badge: "FAMILY PICK",
    route: ["Addis Ababa", "Lake Tana", "Blue Nile Falls", "Entoto", "Addis Ababa"],
    highlights: ["Boat rides on Lake Tana", "Blue Nile Falls hike", "Coffee ceremony", "National Museum"],
    description: "Designed for families who want to explore Ethiopia together. Discover Lucy at the National Museum, cruise Lake Tana to island monasteries, hike to the thundering Blue Nile Falls, and end with a traditional coffee ceremony the kids will talk about for years."
  }
];

const itineraryDays = [
  { day: 1, title: "Arrival in Addis Ababa", image: "https://images.unsplash.com/photo-1612686635542-2244ed5d6df5?w=200&q=80", content: "Morning: Airport pickup by your Raha guide. Transfer to Sheraton Addis. Welcome briefing over Ethiopian coffee. Afternoon: Visit the National Museum (see Lucy). Stroll Piazza neighborhood. Visit Holy Trinity Cathedral. Evening: Welcome dinner at a traditional restaurant with live Tizita music. Ethiopian tej (honey wine) included." },
  { day: 2, title: "Entoto Mountain & Addis Markets", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=200&q=80", content: "Morning: Sunrise hike to Entoto Mountain. Visit Maryam Church. Panoramic city views. Afternoon: Explore Mercato — Africa's largest open-air market. Visit the Ethnological Museum. Evening: Farewell to Addis. Night flight to Gondar." },
  { day: 3, title: "Gondar — Africa's Camelot", image: "https://images.unsplash.com/photo-1541956064-732a5c6da1b9?w=200&q=80", content: "Morning: Explore the Royal Enclosure — six medieval castles in one walled compound. Afternoon: Visit Fasilides Bath. Drive to Debre Berhan Selassie Church — Ethiopia's Sistine Chapel. Evening: Dinner overlooking the Gondar valley. Overnight at Goha Hotel." },
  { day: 4, title: "Into the Simien Mountains", image: "https://images.unsplash.com/photo-1609136370347-6e8a8da3f71a?w=200&q=80", content: "Morning: Drive north to Debark (Simien gateway). Begin trek on the plateau edge. Afternoon: First gelada baboon encounter. Chenek viewpoint — 1,500m vertical drop below. Evening: Campfire at Chenek camp. Stars at 3,600m altitude with no light pollution." },
  { day: 5, title: "Ras Dashen Summit Attempt", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=200&q=80", content: "Morning: Pre-dawn start. Trek toward Ras Dashen (4,550m) — Africa's 4th highest peak. Afternoon: Summit (weather permitting). Panoramic views of Simien plateau and beyond. Evening: Descend to Ambiko camp. Celebrate with a traditional dinner cooked by camp team." },
  { day: 6, title: "Flight to Lalibela", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&q=80", content: "Morning: Morning flight from Gondar to Lalibela (45 min). Afternoon: First visit to the Northern Church Cluster — Bete Medhane Alem, Bete Maryam, Bete Golgotha. Evening: Sunset over Lalibela rooftops from Ben Abeba restaurant." },
  { day: 7, title: "Lalibela — Full Day", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&q=80", content: "Morning: Pre-dawn access to Bete Giyorgis — arrive before other tourists. Watch monks begin morning prayers. Afternoon: Explore Yemrehanna Kristos cave church (30min drive). Visit local weavers. Evening: Cultural dinner with Lalibela musicians. Tej and injera under the stars." },
  { day: 8, title: "Flight to Axum", image: "https://images.unsplash.com/photo-1541956064-732a5c6da1b9?w=200&q=80", content: "Morning: Flight to Axum (1h). Check in to Sabean Hotel. Afternoon: Stelae Park obelisks. Ezana Stone (Ethiopia's Rosetta Stone). Queen of Sheba's Palace ruins. Evening: Visit St. Mary of Zion Church — alleged home of the Ark of the Covenant." },
  { day: 9, title: "Axum Tombs & Return to Addis", image: "https://images.unsplash.com/photo-1612686635542-2244ed5d6df5?w=200&q=80", content: "Morning: Royal Tombs of Kaleb and Gebre Meskel. Axum Archaeological Museum. Afternoon: Flight back to Addis Ababa. Check in to hotel. Evening: Farewell dinner at Yod Abyssinia — Ethiopia's finest cultural restaurant." },
  { day: 10, title: "Departure", image: "https://images.unsplash.com/photo-1612686635542-2244ed5d6df5?w=200&q=80", content: "Morning: Final Ethiopian coffee ceremony breakfast. Last-minute shopping at Shiro Meda market. Afternoon: Airport transfer. Departure with a suitcase full of memories. Evening: Until next time, Ethiopia." },
];

const categories = ["All", "Cultural", "Adventure", "Wildlife", "Luxury", "Family"];

export default function Packages() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
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
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('pack_page.hero_badge')}</span>
          <h1 className="text-5xl md:text-8xl font-display text-white mb-6">
            {t('pack_page.hero_title')} <br/>
            <span className="italic text-gold">{t('pack_page.hero_title_italic')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto">
            {t('pack_page.hero_sub')}
          </p>
          <nav className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-gold transition-colors">{t('pack_page.breadcrumb_home')}</Link>
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="text-gold">{t('pack_page.breadcrumb_packages')}</span>
          </nav>
        </motion.div>
      </section>

      {/* Package List */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <AnimatePresence mode='popLayout'>
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-surface rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gold/10 group transition-colors duration-300"
              >
                {/* Image Section */}
                <div className="lg:w-[45%] relative h-[400px] lg:h-auto overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gold text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {pkg.badge}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-[55%] p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-bold text-gold uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>{pkg.type}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display mb-4 text-text">{pkg.name}</h2>
                    <p className="text-2xl font-display text-current mb-6 italic text-text">
                      <span className="text-gold font-bold">{t('pack_page.pricing')}</span>
                    </p>

                    {/* Route Timeline */}
                    <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-medium text-text-muted">
                      {pkg.route.map((city, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className={idx === 0 || idx === pkg.route.length - 1 ? "text-gold font-bold" : ""}>{city}</span>
                          {idx < pkg.route.length - 1 && <span className="text-gold/30">●</span>}
                        </div>
                      ))}
                    </div>

                    <p className="text-text-muted font-body leading-relaxed mb-8">
                      {pkg.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {pkg.highlights.map((h, idx) => (
                        <span key={idx} className="px-3 py-1 bg-bg border border-gold/10 text-[10px] font-bold uppercase text-text-muted rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Inclusions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
                      {[t('pack_page.included1'), t('pack_page.included2'), t('pack_page.included3'), t('pack_page.included4')].map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-text-muted font-body">
                          <Check className="w-4 h-4 text-forest" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Itinerary Accordion */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display mb-4 text-text">{t('pack_page.itinerary_title')}</h2>
            <p className="text-text-muted font-body">{t('pack_page.itinerary_sub')}</p>
          </div>

          <Accordion>
            {itineraryDays.map((day) => (
              <AccordionItem
                key={day.day}
                title={`Day ${day.day} — ${day.title}`}
                imageUrl={day.image}
                content={day.content}
              />
            ))}
          </Accordion>
        </div>
      </section>

      {/* What's Included Everywhere */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-display text-center mb-20 text-text">{t('pack_page.included_title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              {[t('pack_page.included1'), t('pack_page.included2'), t('pack_page.included3'), t('pack_page.included4'), t('pack_page.included5'), t('pack_page.included6'), t('pack_page.included7'), t('pack_page.included8'), t('pack_page.included9'), t('pack_page.included10')].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-surface rounded-2xl shadow-sm border border-gold/5 transition-colors duration-300">
                  <Check className="w-6 h-6 text-forest shrink-0" />
                  <span className="font-body text-text-muted">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {[t('pack_page.excluded1'), t('pack_page.excluded2'), t('pack_page.excluded3'), t('pack_page.excluded4'), t('pack_page.excluded5')].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-red-500/10 transition-colors duration-300">
                  <X className="w-6 h-6 text-red-500 shrink-0" />
                  <span className="font-body text-text-muted opacity-70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Modules */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4 text-text">{t('pack_page.experiences_title')}</h2>
            <p className="text-text-muted font-body">{t('pack_page.experiences_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('pack_page.exp_injera_title'), icon: <Coffee className="w-8 h-8 text-gold" />, text: t('pack_page.exp_injera_text') },
              { title: t('pack_page.exp_weaving_title'), icon: <Check className="w-8 h-8 text-gold" />, text: t('pack_page.exp_weaving_text') },
              { title: t('pack_page.exp_monastery_title'), icon: <Check className="w-8 h-8 text-gold" />, text: t('pack_page.exp_monastery_text') }
            ].map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-surface rounded-[40px] shadow-xl border border-gold/5 flex flex-col items-center text-center transition-colors duration-300"
              >
                <div className="mb-8">{mod.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4 text-text">{mod.title}</h3>
                <p className="text-text-muted font-body leading-relaxed">{mod.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wildlife Discovery */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 overflow-hidden border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-display mb-8 text-text">{t('pack_page.wildlife_title')}</h2>
              <p className="text-text-muted font-body text-lg leading-relaxed mb-8">
                {t('pack_page.wildlife_sub')}
              </p>
              <div className="grid gap-6">
                {[{ name: t('pack_page.animal1_name'), status: t('pack_page.animal1_status'), text: t('pack_page.animal1_text') }, { name: t('pack_page.animal2_name'), status: t('pack_page.animal2_status'), text: t('pack_page.animal2_text') }, { name: t('pack_page.animal3_name'), status: t('pack_page.animal3_status'), text: t('pack_page.animal3_text') }].map((animal, i) => (
                  <div key={i} className="p-6 bg-bg rounded-2xl shadow-md border border-gold/5 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-display font-bold text-gold">{animal.name}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gold/10 text-gold rounded-md">{animal.status}</span>
                    </div>
                    <p className="text-text-muted font-body text-sm">{animal.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
              <Image src="/fox2.jpg" alt="Ethiopian Wolf" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Customise Your Tour CTA */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto rounded-[60px] bg-gradient-to-br from-gold to-amber-700 p-12 md:p-24 relative overflow-hidden text-white">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display mb-6">{t('pack_page.cta_title')}</h2>
            <p className="text-xl opacity-90 font-body mb-12 max-w-2xl">{t('pack_page.cta_sub')}</p>
            
            <form className="flex flex-col lg:flex-row gap-4 mb-8">
              <input 
                type="text" 
                placeholder={t('pack_page.cta_placeholder_dest')} 
                className="flex-grow px-8 py-5 rounded-2xl bg-white/20 border border-white/30 placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-black transition-all"
              />
              <input 
                type="text" 
                placeholder={t('pack_page.cta_placeholder_duration')} 
                className="lg:w-48 px-8 py-5 rounded-2xl bg-white/20 border border-white/30 placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-black transition-all"
              />
              <button className="bg-white text-gold px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 group">
                <span>{t('pack_page.cta_button')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
            </form>
            <p className="text-sm opacity-80 italic">{t('pack_page.cta_note')}</p>
          </div>
          
          {/* Textile pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
      </section>
    </Layout>
  );
}
