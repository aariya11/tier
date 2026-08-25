import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Cpu } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const PlayerProfileModal: React.FC = () => {
  const { selectedPlayer, closePlayerModal, setCursorLabel } = useEsports();
  const { playClick, playTick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePlayerModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closePlayerModal]);

  if (!selectedPlayer) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex items-start justify-center p-0 md:p-6 lg:p-10"
        onClick={closePlayerModal}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-5xl bg-[#FAF7F0] text-[#161616] border border-stone-300 shadow-2xl overflow-hidden min-h-screen md:min-h-0 md:my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-30 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-stone-300/80 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-widest text-[#B89065] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>PLAYER DOSSIER N° {selectedPlayer.number}</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-600">{selectedPlayer.team}</span>
            </div>

            <button
              onClick={() => {
                playClick();
                closePlayerModal();
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-stone-300 hover:border-black text-xs font-sans tracking-widest uppercase transition-colors"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('CLOSE');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Profile Banner with Full-bleed Photography */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-stone-900 overflow-hidden">
            <img
              src={selectedPlayer.coverUrl || selectedPlayer.portraitUrl}
              alt={selectedPlayer.gamerTag}
              className="w-full h-full object-cover grayscale contrast-125 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Overlay Headline */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-sans tracking-[0.3em] text-[#D4AF37] uppercase">
                  OPERATIVE {selectedPlayer.number} / {selectedPlayer.role}
                </div>
                <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
                  {selectedPlayer.gamerTag}
                </h2>
                <p className="text-sm font-serif italic text-stone-300 mt-1">
                  “The Playmaker” • {selectedPlayer.realName}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] font-sans tracking-widest uppercase text-stone-200">
                  {selectedPlayer.country} {selectedPlayer.flag}
                </span>
                <span className="px-3 py-1 bg-[#D4AF37] text-black font-sans text-[10px] tracking-widest font-bold uppercase">
                  {selectedPlayer.mainGame}
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-10 space-y-12">
            
            {/* Quick Metadata Spec Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-6 border-y border-stone-300/80 text-xs font-sans tracking-widest uppercase">
              <div>
                <span className="block text-stone-400 text-[10px]">REAL NAME</span>
                <span className="text-[#161616] font-semibold">{selectedPlayer.realName}</span>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">TEAM</span>
                <span className="text-[#161616] font-semibold">{selectedPlayer.team}</span>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">COUNTRY</span>
                <span className="text-[#161616] font-semibold">{selectedPlayer.country} {selectedPlayer.flag}</span>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">AGE</span>
                <span className="text-[#161616] font-semibold">{selectedPlayer.age} YEARS</span>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">ROLE</span>
                <span className="text-[#161616] font-semibold">{selectedPlayer.role}</span>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">MAIN DISCIPLINE</span>
                <span className="text-[#161616] font-semibold">{selectedPlayer.mainGame}</span>
              </div>
            </div>

            {/* Bio & Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#B89065] uppercase block">
                  BIOGRAPHICAL STATEMENT
                </span>
                <p className="text-sm font-sans text-stone-700 leading-relaxed">
                  {selectedPlayer.bio}
                </p>
                <div className="p-5 bg-stone-100/80 border-l-2 border-[#D4AF37] space-y-1">
                  <span className="text-[10px] font-sans tracking-widest text-stone-500 uppercase block">OPERATIVE MOTTO</span>
                  <p className="font-serif italic text-base text-stone-900">
                    “{selectedPlayer.quote}”
                  </p>
                </div>
              </div>

              {/* Statistics Showcase */}
              <div className="lg:col-span-5 bg-white border border-stone-300 p-6 space-y-4 shadow-sm">
                <span className="text-[10px] font-sans tracking-[0.25em] text-stone-500 uppercase block pb-2 border-b border-stone-200">
                  CAREER METRICS
                </span>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] font-sans text-stone-400 block uppercase">WIN RATE</span>
                    <span className="font-display text-2xl font-bold text-[#B89065]">{selectedPlayer.winRate}%</span>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] font-sans text-stone-400 block uppercase">K/D RATIO</span>
                    <span className="font-display text-2xl font-bold text-stone-900">{selectedPlayer.kd}</span>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] font-sans text-stone-400 block uppercase">TOURNAMENT TITLES</span>
                    <span className="font-display text-2xl font-bold text-stone-900">{selectedPlayer.tournamentsWon}</span>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200">
                    <span className="text-[9px] font-sans text-stone-400 block uppercase">MVP AWARDS</span>
                    <span className="font-display text-2xl font-bold text-stone-900">{selectedPlayer.mvpAwards}</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-sans text-stone-500 tracking-wider uppercase text-center">
                  OVERALL RATING: <strong className={selectedPlayer.totalPoints < 0 ? 'text-red-500 font-mono text-xs' : 'text-stone-900'}>{selectedPlayer.totalPoints > 0 ? `+${selectedPlayer.totalPoints.toLocaleString()}` : selectedPlayer.totalPoints.toLocaleString()} PTS</strong>
                </div>
              </div>
            </div>

            {/* Career Achievements Timeline */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-300">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#161616] uppercase flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-[#B89065]" />
                  <span>CAREER ACHIEVEMENTS TIMELINE</span>
                </span>
                <span className="text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                  VERIFIED ACCREDITATION
                </span>
              </div>

              <div className="divide-y divide-stone-200">
                {selectedPlayer.achievements.map((ach, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                    <div className="flex items-baseline space-x-4">
                      <span className="font-display text-xl font-bold text-[#B89065]">{ach.year}</span>
                      <div>
                        <span className="font-semibold text-stone-900 block">{ach.title}</span>
                        <span className="text-stone-500 text-[11px]">{ach.event}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] font-sans tracking-widest uppercase">
                      <span className="px-2.5 py-1 bg-stone-200 text-stone-800 rounded-sm font-semibold">
                        {ach.place}
                      </span>
                      {ach.mvp && (
                        <span className="px-2.5 py-1 bg-[#D4AF37] text-black font-bold rounded-sm">
                          MVP
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware & Peripherals Setup */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-300">
                <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#161616] uppercase flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-[#B89065]" />
                  <span>HARDWARE & SENSITIVITY CONFIGURATION</span>
                </span>
                <span className="text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                  TOURNAMENT RIG SPECS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                <div className="p-4 bg-white border border-stone-300 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block">MOUSE</span>
                  <span className="font-semibold text-stone-900">{selectedPlayer.gear.mouse}</span>
                </div>
                <div className="p-4 bg-white border border-stone-300 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block">KEYBOARD</span>
                  <span className="font-semibold text-stone-900">{selectedPlayer.gear.keyboard}</span>
                </div>
                <div className="p-4 bg-white border border-stone-300 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block">HEADSET / IEMS</span>
                  <span className="font-semibold text-stone-900">{selectedPlayer.gear.headset}</span>
                </div>
                <div className="p-4 bg-white border border-stone-300 space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block">SENSITIVITY & DPI</span>
                  <span className="font-semibold text-stone-900">{selectedPlayer.gear.dpi} DPI • {selectedPlayer.gear.sens} SENS</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Socials */}
            <div className="pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans tracking-widest uppercase">
              <div className="flex items-center space-x-4 text-[#B89065]">
                {selectedPlayer.socials.x && <a href={selectedPlayer.socials.x} target="_blank" rel="noreferrer" className="hover:text-black">X (TWITTER)</a>}
                {selectedPlayer.socials.twitch && <a href={selectedPlayer.socials.twitch} target="_blank" rel="noreferrer" className="hover:text-black">TWITCH</a>}
                {selectedPlayer.socials.youtube && <a href={selectedPlayer.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-black">YOUTUBE</a>}
                {selectedPlayer.socials.instagram && <a href={selectedPlayer.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-black">INSTAGRAM</a>}
              </div>

              <button
                onClick={closePlayerModal}
                className="px-6 py-2.5 bg-[#161616] text-[#FAF7F0] hover:bg-black rounded-none transition-colors"
              >
                RETURN TO ARCHIVE
              </button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
