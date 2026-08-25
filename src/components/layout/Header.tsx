import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings, Plus, Menu } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const Header: React.FC = () => {
  const { isFullscreenMenuOpen, setIsFullscreenMenuOpen, setIsAdminOpen, setCursorLabel } = useEsports();
  const { isMuted, toggleMute, playTick, playClick } = useSound();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PLAYERS', href: '#roster' },
    { label: 'LEGACY', href: '#legacy' },
    { label: 'TROLL ARCHIVE', href: '#trolls' },
    { label: 'THE SQUAD', href: '#squad' },
    { label: 'MATCHES', href: '#matches' },
    { label: 'RANKINGS', href: '#rankings' },
    { label: 'JOURNAL', href: '#journal' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md py-3.5 border-b border-stone-300/60 shadow-sm'
          : 'bg-transparent py-6 border-b border-stone-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#"
          className="group flex flex-col items-start focus:outline-none"
          onMouseEnter={() => {
            playTick();
            setCursorLabel('HOME');
          }}
          onMouseLeave={() => setCursorLabel('')}
        >
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#161616] group-hover:text-[#B89065] transition-colors">
            ADVIK EWC
          </span>
          <span className="text-[9px] tracking-[0.28em] text-stone-500 font-sans uppercase -mt-0.5">
            EST. 2026 / ESPORTS
          </span>
        </a>

        {/* Center: Minimal Editorial Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-sans font-medium tracking-[0.2em] text-stone-700 uppercase">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 transition-colors hover:text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('GO');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Sound, Admin, Menu trigger */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Audio toggle */}
          <button
            onClick={() => {
              toggleMute();
              playClick();
            }}
            className="p-2 text-stone-600 hover:text-stone-950 transition-colors border border-stone-300/60 rounded-full hover:border-stone-400 bg-stone-100/50"
            title={isMuted ? 'Unmute luxury sound effects' : 'Mute sound effects'}
            onMouseEnter={() => {
              playTick();
              setCursorLabel(isMuted ? 'UNMUTE' : 'MUTE');
            }}
            onMouseLeave={() => setCursorLabel('')}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#B89065]" />}
          </button>

          {/* Admin CMS Modal Trigger */}
          <button
            onClick={() => {
              playClick();
              setIsAdminOpen(true);
            }}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-[10px] tracking-widest font-sans uppercase border border-stone-300/80 rounded-full text-stone-700 hover:text-stone-950 hover:border-stone-900 bg-white/70 transition-all hover:scale-[1.02] active:scale-[0.98]"
            onMouseEnter={() => {
              playTick();
              setCursorLabel('ADMIN');
            }}
            onMouseLeave={() => setCursorLabel('')}
          >
            <Settings className="w-3 h-3 text-[#B89065]" />
            <span>ADMIN CMS</span>
          </button>

          {/* Minimal Fullscreen Menu Trigger */}
          <button
            onClick={() => {
              playClick();
              setIsFullscreenMenuOpen(!isFullscreenMenuOpen);
            }}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-100 hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] text-[10px] font-sans tracking-[0.2em] uppercase"
            onMouseEnter={() => {
              playTick();
              setCursorLabel(isFullscreenMenuOpen ? 'CLOSE' : 'INDEX');
            }}
            onMouseLeave={() => setCursorLabel('')}
          >
            <span className="hidden md:inline">{isFullscreenMenuOpen ? 'CLOSE' : 'INDEX'}</span>
            {isFullscreenMenuOpen ? <Plus className="w-3.5 h-3.5 rotate-45 transition-transform" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
