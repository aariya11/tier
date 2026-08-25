import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const JournalSection: React.FC = () => {
  const { articles, openArticleModal, setCursorLabel } = useEsports();
  const { playClick, playTick } = useSound();

  return (
    <section id="journal" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FAF7F0] border-b border-stone-300/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-stone-300/80 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>11 / THE EDITORIAL MAGAZINE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#161616]">
              NOTES FROM<br />
              <span className="font-serif italic text-[#B89065]">THE SERVER.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 pt-2">
              Essays on neurochemistry in clutch situations, the geometry of smoke defuses, and the quiet philosophies of world champions.
            </p>
          </div>

          <span className="text-[10px] font-sans tracking-[0.25em] text-stone-500 uppercase">
            QUARTERLY PRINT & DIGITAL ARCHIVE
          </span>
        </div>

        {/* 3-Column Magazine Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col justify-between space-y-6 cursor-pointer"
              onClick={() => {
                playClick();
                openArticleModal(article);
              }}
              onMouseEnter={() => {
                playTick();
                setCursorLabel('READ');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              {/* Article Image with Zoom */}
              <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden border border-stone-300 shadow-sm">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm text-[9px] font-sans tracking-widest text-[#D4AF37] uppercase">
                  {article.category}
                </div>
              </div>

              {/* Text Body */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] font-sans tracking-widest text-stone-400 uppercase">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#161616] group-hover:text-[#B89065] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs font-sans text-stone-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-sans tracking-widest uppercase font-semibold text-[#161616] group-hover:text-[#B89065] transition-colors">
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
