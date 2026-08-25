import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Shield } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';
import { gameCategories } from '../../data/initialData';

export const RosterSection: React.FC = () => {
  const {
    players,
    selectedGameFilter,
    setSelectedGameFilter,
    openPlayerModal,
    setCursorLabel,
  } = useEsports();
  const { playTick, playClick } = useSound();

  const filteredPlayers = players.filter((player) => {
    if (selectedGameFilter === 'ALL GAMES') return true;
    return (
      player.mainGame.toUpperCase().includes(selectedGameFilter.toUpperCase()) ||
      (player.secondaryGame && player.secondaryGame.toUpperCase().includes(selectedGameFilter.toUpperCase()))
    );
  });

  return (
    <section id="roster" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#0F0F10] text-[#FAF7F0] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#D4AF37] uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>02 / THE QUIET EDITION</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-white">
              THE<br />
              <span className="font-serif italic font-normal text-[#D4AF37]">ROSTER.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-400 max-w-md pt-2">
              Players who turned pressure into performance. An asymmetric archive of world champions, clutch artists, and psychological masterminds.
            </p>
          </div>

          {/* Minimal Game Filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] font-sans tracking-[0.2em] uppercase">
            {gameCategories.slice(0, 6).map((cat) => {
              const isActive = selectedGameFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedGameFilter(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                      : 'text-stone-400 hover:text-white hover:border-stone-500 border border-white/10'
                  }`}
                  onMouseEnter={() => {
                    playTick();
                    setCursorLabel('FILTER');
                  }}
                  onMouseLeave={() => setCursorLabel('')}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredPlayers.map((player, idx) => {
            const isTaller = idx % 3 === 0;

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className={`group relative flex flex-col justify-between bg-stone-900/60 border border-white/10 hover:border-[#D4AF37]/60 p-6 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer ${
                  isTaller ? 'lg:row-span-1' : ''
                }`}
                onClick={() => {
                  playClick();
                  openPlayerModal(player);
                }}
                onMouseEnter={() => {
                  playTick();
                  setCursorLabel('EXPLORE');
                }}
                onMouseLeave={() => setCursorLabel('')}
              >
                {/* Top Card Bar: Number & Country */}
                <div className="flex items-center justify-between text-xs font-sans tracking-widest text-stone-400 pb-4 border-b border-white/5">
                  <span className="text-[#D4AF37] font-semibold">{player.number}</span>
                  <span className="flex items-center space-x-1.5 text-stone-400">
                    <span>{player.country}</span>
                    <span>{player.flag}</span>
                  </span>
                </div>

                {/* Player Portrait with Zoom on Hover */}
                <div className="relative my-6 aspect-[4/5] bg-stone-950 overflow-hidden border border-white/5">
                  <img
                    src={player.portraitUrl}
                    alt={player.gamerTag}
                    className="w-full h-full object-cover grayscale contrast-115 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                  {/* Corner Game Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-white/15 text-[9px] font-sans tracking-widest text-stone-200 uppercase">
                    {player.mainGame}
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-[#D4AF37] group-hover:text-black text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Player Info Details */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-display text-3xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                        {player.gamerTag}
                      </h3>
                      <p className="text-xs font-sans text-stone-400 tracking-wider">
                        {player.realName}
                      </p>
                    </div>

                    <span className="text-[10px] font-sans tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/30 px-2 py-0.5 rounded-sm">
                      {player.role}
                    </span>
                  </div>

                  {/* Stats snippet */}
                  <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-sans tracking-widest text-stone-400 uppercase">
                    <div>
                      <span className="block text-stone-500 text-[9px]">WIN RATE</span>
                      <span className="text-stone-200 font-semibold text-xs">{player.winRate}%</span>
                    </div>
                    <div>
                      <span className="block text-stone-500 text-[9px]">RECORD</span>
                      <span className="text-stone-200 font-semibold text-xs">{player.wins} WINS</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Gold Line Hover Trace */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* View All Roster Summary Footnote */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-sans tracking-widest text-stone-400 uppercase gap-4">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>ALL OPERATIVES CONTRACTED UNDER ADVIK EWC GOVERNANCE</span>
          </div>
          <span className="text-stone-500">SHOWING {filteredPlayers.length} OF {players.length} TOTAL PLAYERS</span>
        </div>
      </div>
    </section>
  );
};
