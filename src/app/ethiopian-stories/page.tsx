'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Clock, ArrowRight, Quote, Check, X } from 'lucide-react';

export default function EthiopianStories() {
  const { t } = useTranslation('common');
  
  // Dynamic stories data from translations
  const storyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const storyImages: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1625419610578-25a469e7a707?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    2: "/monk.jpg",
    3: "/jump.jpg",
    4: "/Erta_Ale.jpg", // Fixed image path if available, or stay with /afar.webp
    5: "/lucyjpg.jpg",
    6: "/injera.jpg",
    7: "/hayena.jpg",
    8: "/teff.jpg",
    9: "/runing.jpg",
    10: "/gambella.jpg"
  };

  const stories = storyIds.map(id => ({
    id,
    title: t(`stories_data.story${id}.title`),
    category: t(`stories_data.story${id}.category`),
    readTime: t(`stories_data.story${id}.readTime`),
    date: t(`stories_data.story${id}.date`),
    excerpt: t(`stories_data.story${id}.excerpt`),
    author: t(`stories_data.story${id}.author`, { defaultValue: "Raha Editorial Team" }),
    image: storyImages[id] || "/lake.jpg",
    featured: id === 1
  }));

  const categories = [
    { key: "All", label: t('stories_page.filter_all') },
    { key: "Culture", label: t('stories_page.filter_culture') },
    { key: "Adventure", label: t('stories_page.filter_adventure') },
    { key: "Faith & Tradition", label: t('stories_page.filter_faith') },
    { key: "Food & Drink", label: t('stories_page.filter_food') },
    { key: "History", label: t('stories_page.filter_history') },
    { key: "Wildlife", label: t('stories_page.filter_wildlife') },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const featuredStory = stories.find(s => s.featured);
  
  // Note: Filtering by translated category name might be tricky if keys differ. 
  // It's better to keep internal keys or use the 'Culture' etc. from the JSON keys.
  // We'll use the translated category for display and an internal key for filtering if needed.
  // But since the JSON 'category' is what we have, let's ensure it matches.
  
  const filteredStories = activeFilter === "All" 
    ? stories.filter(s => !s.featured) 
    : stories.filter(s => !s.featured && s.category === categories.find(c => c.key === activeFilter)?.label);

  return (
    <Layout>
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=90"
          alt="Coffee Forest"
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
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('stories_page.hero_badge')}</span>
          <h1 className="text-5xl md:text-8xl font-display text-white mb-6">
            {t('stories_page.hero_title')} <span className="italic text-gold">{t('stories_page.hero_title_italic')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto">
            {t('stories_page.hero_sub')}
          </p>
          <nav className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-gold transition-colors">{t('pack_page.breadcrumb_home')}</Link>
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="text-gold">{t('nav.stories')}</span>
          </nav>
        </motion.div>
      </section>

      {/* Featured Story */}
      {featuredStory && activeFilter === "All" && (
        <section className="py-24 px-4 bg-bg transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gold/10"
            >
              <div className="lg:w-1/2 relative h-[400px] lg:h-auto">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6 text-xs font-bold text-gold uppercase tracking-widest">
                  <span className="px-3 py-1 bg-gold/10 rounded-full">{featuredStory.category}</span>
                  <div className="flex items-center gap-1 text-text-muted">
                    <Clock className="w-3 h-3" />
                    <span>{featuredStory.readTime}</span>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-display mb-6 leading-tight text-text">
                  {featuredStory.title}
                </h2>
                <p className="text-text-muted font-body leading-relaxed mb-8 text-lg">
                  {featuredStory.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-sm font-medium">
                    <p className="text-text">{featuredStory.author}</p>
                    <p className="text-text-muted">{featuredStory.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-surface transition-colors duration-300 sticky top-20 z-30 shadow-sm border-y border-border">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar">
          <div className="flex justify-center gap-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === cat.key 
                    ? 'bg-gold text-white' 
                    : 'bg-bg border border-gold/20 text-current hover:border-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode='popLayout'>
              {filteredStories.map((story, i) => (
                <div key={story.id} className="contents">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                    <div className="relative h-72 rounded-3xl overflow-hidden mb-8 shadow-xl">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-surface/90 backdrop-blur-md text-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {story.category}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display mb-4 group-hover:text-gold transition-colors leading-tight text-text">
                      {story.title}
                    </h3>
                    <p className="text-text-muted font-body text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest border-t border-gold/10 pt-4 mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.readTime}</span>
                        </div>
                        <span>{story.date}</span>
                      </div>
                      <span className="text-gold group-hover:translate-x-1 transition-transform">{t('stories_page.read_story_arrow')}</span>
                    </div>
                  </motion.div>

                  {/* Pull Quote Insertion Logic */}
                  {i === 2 && activeFilter === "All" && (
                    <div className="col-span-full my-24 w-full">
                      <div className="bg-surface rounded-[40px] p-12 md:p-24 relative overflow-hidden text-center transition-colors duration-300">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C8922A 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                        <div className="relative z-10">
                          <Quote className="w-16 h-16 text-gold mx-auto mb-8 opacity-40" />
                          <p className="text-3xl md:text-5xl font-display italic text-text leading-tight max-w-4xl mx-auto mb-12">
                            {t('stories_page.pull_quote')}
                          </p>
                          <div className="w-20 h-1 bg-gold mx-auto mb-6" />
                          <p className="text-gold font-bold uppercase tracking-widest text-sm">{t('stories_page.pull_attribution')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* Khat Culture Section */}
      <section className="py-32 px-4 bg-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-5xl font-display mb-4 text-text">{t('stories_page.khat_section_title')}</h2>
              <p className="text-xl text-gold font-body italic">{t('stories_page.khat_section_sub')}</p>
            </div>
            
            <div className="space-y-6 text-text-muted font-body leading-relaxed text-lg">
              <p>{t('stories_page.khat_text_p1')}</p>
              <p>{t('stories_page.khat_text_p2')}</p>
            </div>

            <div className="p-8 bg-surface rounded-3xl border border-gold/10 shadow-xl">
              <h3 className="text-2xl font-display mb-4 text-text">{t('stories_page.khat_tourist_title')}</h3>
              <p className="text-text-muted font-body leading-relaxed">
                {t('stories_page.khat_tourist_text')}
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-gold/20 bg-surface group relative">
              <Image
                src="/chatgitl.png"
                alt={t('stories_page.khat_image_alt')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">{t('stories_page.featured_category')}</p>
                  <p className="text-gold text-lg font-display">Harar, Eastern Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethio Saudi Bond Section */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-5xl font-display mb-4 text-text">{t('stories_page.ethio_saudi_bond_title')}</h2>
              <p className="text-xl text-gold font-body italic">{t('stories_page.ethio_saudi_bond_sub')}</p>
            </div>
            
            <div className="space-y-6 text-text-muted font-body leading-relaxed text-lg">
              <p>{t('stories_page.ethio_saudi_bond_p1')}</p>
              <p>{t('stories_page.ethio_saudi_bond_p2')}</p>
            </div>

            <div className="p-8 bg-bg rounded-3xl border border-gold/10 shadow-xl">
              <h3 className="text-2xl font-display mb-4 text-text">{t('stories_page.ethio_saudi_bond_tourist_title')}</h3>
              <p className="text-text-muted font-body leading-relaxed">
                {t('stories_page.ethio_saudi_bond_tourist_text')}
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-gold/20 bg-bg group relative">
              <Image
                src="/ethiosaudi.jpg"
                alt={t('stories_page.ethio_saudi_bond_image_alt')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">{t('stories_page.featured_category')}</p>
                  <p className="text-gold text-lg font-display">Shared Heritage & Bonds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traveler's Wisdom */}
      <section className="py-32 px-4 bg-surface transition-colors duration-300 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display mb-4 text-text">{t('stories_page.wisdom_title')}</h2>
            <p className="text-text-muted font-body">{t('stories_page.wisdom_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* DO's */}
            <div className="space-y-8">
              <h3 className="text-2xl font-display text-forest flex items-center gap-3">
                <Check className="w-6 h-6" /> {t('stories_page.wisdom_dos_title')}
              </h3>
              <div className="grid gap-6">
                {[
                  { title: t('stories_page.tip1_title'), text: t('stories_page.tip1_text') },
                  { title: t('stories_page.tip2_title'), text: t('stories_page.tip2_text') }
                ].map((tip, i) => (
                  <div key={i} className="p-8 bg-bg border border-forest/10 rounded-3xl shadow-lg transition-colors duration-300">
                    <h4 className="text-xl font-display font-bold mb-2 text-text">{tip.title}</h4>
                    <p className="text-text-muted font-body text-sm leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts */}
            <div className="space-y-8">
              <h3 className="text-2xl font-display text-red-500 flex items-center gap-3">
                <X className="w-6 h-6" /> {t('stories_page.wisdom_donts_title')}
              </h3>
              <div className="grid gap-6">
                {[
                  { title: t('stories_page.tip3_title'), text: t('stories_page.tip3_text') },
                  { title: t('stories_page.tip4_title'), text: t('stories_page.tip4_text') }
                ].map((tip, i) => (
                  <div key={i} className="p-8 bg-bg border border-red-500/10 rounded-3xl shadow-lg transition-colors duration-300">
                    <h4 className="text-xl font-display font-bold mb-2 text-text">{tip.title}</h4>
                    <p className="text-text-muted font-body text-sm leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
