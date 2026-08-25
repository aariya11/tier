import React from 'react';
import { motion } from 'framer-motion';
import { Trophy as TrophyIcon, Sparkles, MapPin } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const TrophyShowcase: React.FC = () => {
  const { trophies, setCursorLabel } = useEsports();
  const { playTrophyChime, playTick } = useSound();

  return (
    <section id="trophies" className="py-24 md:py-32 bg-[#0F0F10] text-[#FAF7F0] overflow-hidden border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#D4AF37] uppercase flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 / SILVERWARE VAULT</span>
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              TROPHIES & AWARDS
            </h2>
          </div>
          <p className="text-xs font-sans text-stone-400 uppercase tracking-widest max-w-xs">
            Forged in metal. Earned in overtime. Sealed in the global vault.
          </p>
        </div>

        {/* 4-Column Luxury Trophy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trophies.map((trophy, idx) => (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-stone-900/80 border border-white/10 hover:border-[#D4AF37]/80 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer relative"
              onClick={() => {
                playTrophyChime();
              }}
              onMouseEnter={() => {
                playTick();
                setCursorLabel('TROPHY');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              {/* Top Seal & Year */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <TrophyIcon className="w-4 h-4" />
                </div>
                <span className="font-display text-xl font-medium text-[#D4AF37]">
                  {trophy.year}
                </span>
              </div>

              {/* Trophy Imagery */}
              <div className="my-6 aspect-square bg-stone-950 overflow-hidden relative border border-white/5">
                <img
                  src={trophy.image}
                  alt={trophy.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-[9px] font-sans tracking-widest text-stone-300 uppercase truncate">
                  {trophy.edition}
                </div>
              </div>

              {/* Info Description */}
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {trophy.title}
                </h3>
                <p className="text-[10px] font-sans tracking-widest text-stone-400 uppercase">
                  {trophy.league}
                </p>
                <div className="pt-2 flex items-center space-x-1 text-[10px] font-sans text-stone-500">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>{trophy.location}</span>
                </div>
              </div>

              {/* Hover bottom bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
