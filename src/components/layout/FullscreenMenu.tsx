import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Shield, Award, Sparkles } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const FullscreenMenu: React.FC = () => {
  const {
    isFullscreenMenuOpen,
    setIsFullscreenMenuOpen,
    players,
    openPlayerModal,
    setIsAdminOpen,
    setCursorLabel,
  } = useEsports();
  const { playClick, playTick } = useSound();

  const menuItems = [
    { number: '01', title: 'THE ROSTER', subtitle: '6 Elite Competitors', href: '#roster' },
    { number: '02', title: 'THE LEGACY', subtitle: 'Championship Timeline', href: '#legacy' },
    { number: '03', title: 'TROPHY VAULT', subtitle: 'Global Silverware', href: '#trophies' },
    { number: '04', title: 'TROLL EDITION', subtitle: 'The Legendary Archive', href: '#trolls' },
    { number: '05', title: 'THE SQUAD', subtitle: 'Tactical Matrix', href: '#squad' },
    { number: '06', title: 'MATCH SCHEDULE', subtitle: 'Upcoming & Results', href: '#matches' },
    { number: '07', title: 'THE RANKINGS', subtitle: 'Server Leaderboard', href: '#rankings' },
    { number: '08', title: 'GALLERY', subtitle: 'Moments That Matter', href: '#gallery' },
    { number: '09', title: 'SERVER JOURNAL', subtitle: 'Editorial Essays', href: '#journal' },
  ];

  const featuredPlayer = players[0];

  const handleLinkClick = (href: string) => {
    playClick();
    setIsFullscreenMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isFullscreenMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-50 bg-[#0F0F10] text-[#FAF7F0] flex flex-col justify-between overflow-y-auto px-6 md:px-16 py-8 md:py-12"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center space-x-3">
              <span className="text-[10px] tracking-[0.3em] font-sans text-[#D4AF37] uppercase">
                DIRECTORY ARCHIVE
              </span>
              <span className="text-white/30 text-xs">/</span>
              <span className="text-[10px] tracking-[0.2em] font-sans text-stone-400 uppercase">
                EDITION 2026
              </span>
            </div>

            <button
              onClick={() => {
                playClick();
                setIsFullscreenMenuOpen(false);
              }}
              className="group flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all text-[11px] font-sans tracking-widest uppercase"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('CLOSE');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              <span>CLOSE</span>
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Main Grid: Nav Links on Left, Featured Spotlight on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-12">
            {/* Left Columns: Big Editorial Links */}
            <div className="lg:col-span-7 space-y-3">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 + 0.1, duration: 0.4 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-white/20 transition-colors"
                    onMouseEnter={() => {
                      playTick();
                      setCursorLabel('EXPLORE');
                    }}
                    onMouseLeave={() => setCursorLabel('')}
                  >
                    <div className="flex items-baseline space-x-4 md:space-x-8">
                      <span className="text-xs font-sans tracking-widest text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                        {item.number}
                      </span>
                      <span className="font-display text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-stone-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-200">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="hidden sm:inline text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                        {item.subtitle}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </a>
                </motion.div>
              ))}

              {/* Admin Portal Fast Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    playClick();
                    setIsFullscreenMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="flex items-center space-x-3 text-xs tracking-widest font-sans uppercase text-[#D4AF37] hover:text-white transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>OPEN ADMIN MANAGEMENT PORTAL →</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column: Featured Player & Lore Highlight */}
            {featuredPlayer && (
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-center border-l border-white/10 pl-12">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>FEATURED OPERATIVE</span>
                  </div>

                  <div
                    className="relative group overflow-hidden rounded-sm aspect-[4/5] bg-stone-900 border border-white/10 cursor-pointer"
                    onClick={() => {
                      playClick();
                      setIsFullscreenMenuOpen(false);
                      openPlayerModal(featuredPlayer);
                    }}
                    onMouseEnter={() => {
                      playTick();
                      setCursorLabel('PROFILE');
                    }}
                    onMouseLeave={() => setCursorLabel('')}
                  >
                    <img
                      src={featuredPlayer.portraitUrl}
                      alt={featuredPlayer.gamerTag}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <span className="text-xs text-[#D4AF37] font-sans tracking-widest uppercase">
                        {featuredPlayer.number} / {featuredPlayer.role}
                      </span>
                      <h4 className="font-display text-3xl text-white font-bold tracking-tight mt-1">
                        {featuredPlayer.gamerTag}
                      </h4>
                      <p className="text-xs text-stone-300 font-sans line-clamp-2 mt-2">
                        {featuredPlayer.bio}
                      </p>
                      <div className="mt-4 flex items-center space-x-2 text-[10px] font-sans tracking-widest text-[#D4AF37] uppercase">
                        <span>VIEW FULL DOSSIER</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-500 uppercase pt-2">
                    <span className="flex items-center space-x-1.5">
                      <Award className="w-3 h-3 text-[#D4AF37]" />
                      <span>{featuredPlayer.tournamentsWon} TOURNAMENTS WON</span>
                    </span>
                    <span>{featuredPlayer.winRate}% WIN RATE</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Locations, Live Status & Socials */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/10 text-[10px] font-sans tracking-[0.2em] text-stone-400 uppercase space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span>LOCATIONS: ZURICH / TOKYO / MUMBAI</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">GLOBAL STATUS: ACTIVE COMPETING</span>
            </div>

            <div className="flex items-center space-x-6 text-[#D4AF37]">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YOUTUBE</a>
              <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TWITCH</a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">DISCORD</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
