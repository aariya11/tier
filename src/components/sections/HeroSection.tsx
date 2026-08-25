import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const HeroSection: React.FC = () => {
  const { players, openPlayerModal, setCursorLabel } = useEsports();
  const { playTick, playClick } = useSound();
  const heroPlayer = players[0]; // Nova

  const scrollToRoster = () => {
    playClick();
    const element = document.querySelector('#roster');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 px-6 md:px-12 lg:px-20 flex items-center bg-[#FDFBF7] overflow-hidden">
      {/* Decorative fine-line grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Massive Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-7 space-y-8 z-10"
        >
          {/* Metadata pill */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F2EFE8] border border-stone-300/80 rounded-full text-[10px] tracking-[0.25em] font-sans text-stone-700 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>EST. 2026 / ESPORTS ARCHIVE</span>
            </span>
            <span className="text-stone-400 text-xs hidden sm:inline">•</span>
            <span className="text-[10px] tracking-[0.2em] font-sans text-stone-500 uppercase hidden sm:inline">
              EDITION N° 01
            </span>
          </div>

          {/* Huge Editorial Headline */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-[#161616]">
            THE ART<br />
            OF THE<br />
            <span className="font-serif italic font-medium text-[#B89065] relative inline-block">
              TROLL.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="absolute -bottom-1 left-0 h-[2px] bg-[#D4AF37]/50"
              />
            </span>
          </h1>

          {/* Description */}
          <div className="space-y-4 max-w-lg">
            <p className="text-base sm:text-lg font-serif italic text-stone-700 leading-relaxed">
              “A new generation of players. A different way to compete.”
            </p>
            <p className="text-xs sm:text-sm font-sans text-stone-600 leading-relaxed">
              We present competitive gaming through the lens of quiet luxury, psychological mastery, and calculated audacity. Turning 1 HP clutches into timeless performance art.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            {/* Minimal Circular / Pill CTA */}
            <button
              onClick={scrollToRoster}
              className="group flex items-center space-x-4 pl-6 pr-4 py-3.5 rounded-full bg-[#161616] text-[#FDFBF7] hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('EXPLORE');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold">
                EXPLORE PLAYERS
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            {/* View Spotlight Profile */}
            {heroPlayer && (
              <button
                onClick={() => {
                  playClick();
                  openPlayerModal(heroPlayer);
                }}
                className="group flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-stone-700 hover:text-black transition-colors"
                onMouseEnter={() => {
                  playTick();
                  setCursorLabel('PROFILE');
                }}
                onMouseLeave={() => setCursorLabel('')}
              >
                <span className="border-b border-stone-400 group-hover:border-black transition-colors pb-0.5">
                  OPERATIVE 01 DOSSIER
                </span>
                <span className="text-[#D4AF37]">→</span>
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-6 max-w-lg text-stone-800">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-medium text-stone-900">89%</div>
              <div className="text-[9px] tracking-[0.2em] font-sans text-stone-500 uppercase mt-0.5">FINALS WIN RATE</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-medium text-stone-900">17</div>
              <div className="text-[9px] tracking-[0.2em] font-sans text-stone-500 uppercase mt-0.5">WORLD TITLES</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-medium text-stone-900">$2.85M</div>
              <div className="text-[9px] tracking-[0.2em] font-sans text-stone-500 uppercase mt-0.5">PRIZE SILVER</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: High-Fashion Editorial Hero Portrait */}
        {heroPlayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Background luxury frame accent */}
            <div className="absolute -inset-3 border border-[#D4AF37]/30 rounded-sm pointer-events-none hidden sm:block" />
            
            {/* Main Portrait Container */}
            <div
              className="relative aspect-[3/4] sm:aspect-[4/5] bg-stone-900 overflow-hidden shadow-2xl group cursor-pointer"
              onClick={() => {
                playClick();
                openPlayerModal(heroPlayer);
              }}
              onMouseEnter={() => {
                playTick();
                setCursorLabel('DOSSIER');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              <img
                src={heroPlayer.portraitUrl}
                alt={heroPlayer.gamerTag}
                className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

              {/* Top Right Stamp */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/20 text-[9px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase">
                WORLD MVP 2026
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase">
                  <span>{heroPlayer.number}</span>
                  <span>/</span>
                  <span>{heroPlayer.role}</span>
                  <span>/</span>
                  <span>{heroPlayer.mainGame}</span>
                </div>
                <h3 className="font-display text-3xl font-bold tracking-tight">
                  {heroPlayer.gamerTag}
                </h3>
                <p className="text-xs font-sans text-stone-300 tracking-wider uppercase">
                  {heroPlayer.realName} • {heroPlayer.country}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-white/15 text-[10px] font-sans text-stone-400">
                  <span className="italic font-serif text-stone-200">“The Playmaker”</span>
                  <span className="text-[#D4AF37] tracking-widest uppercase flex items-center space-x-1">
                    <span>VIEW DOSSIER</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Luxury Editorial Tag */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#FAF7F0] border border-stone-300 p-4 shadow-xl max-w-xs items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#161616] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[9px] font-sans tracking-[0.2em] text-stone-500 uppercase">SIGNATURE TACTIC</div>
                <div className="text-xs font-serif italic text-stone-900 font-semibold">{heroPlayer.signatureTrollMove}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
