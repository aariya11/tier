import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Check, Send } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const Footer: React.FC = () => {
  const { setCursorLabel, setIsAdminOpen } = useEsports();
  const { playClick, playTick, playChime } = useSound();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playChime();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0F0F10] text-[#FAF7F0] pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/10">
      {/* Background Subtle Gradient & Watermark */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Top: Massive Editorial Statement */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#D4AF37] uppercase">
              ADVIK EWC / COLLECTIVE STATEMENT
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-stone-100">
              PLAY LOUD.<br />
              <span className="italic font-serif text-[#D4AF37]">LIVE QUIET.</span>
            </h2>
          </div>

          {/* Newsletter / Journal Dispatch */}
          <div className="w-full lg:w-96 space-y-3">
            <p className="text-xs font-sans text-stone-400 tracking-wide">
              Receive confidential tactical dispatches, match breakdowns, and limited edition drops.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL..."
                className="w-full bg-stone-900/90 border border-white/15 px-4 py-3 text-xs tracking-widest uppercase font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-2 text-[#D4AF37] hover:text-white transition-colors"
                onMouseEnter={() => {
                  playTick();
                  setCursorLabel('SUBMIT');
                }}
                onMouseLeave={() => setCursorLabel('')}
              >
                {isSubscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-[11px] font-sans text-[#D4AF37] tracking-wider uppercase">
                ✓ Dispatch confirmed. Welcome to the archive.
              </p>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 text-xs font-sans">
          {/* Col 1: Roster */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">
              THE ROSTER
            </span>
            <ul className="space-y-2 text-stone-400 tracking-wider">
              <li><a href="#roster" className="hover:text-white transition-colors">01 ANIMESH (Duelist & IGL)</a></li>
              <li><a href="#roster" className="hover:text-white transition-colors">02 SATYA (Free Fire Rusher)</a></li>
              <li><a href="#roster" className="hover:text-white transition-colors">03 SURYAKANT (Free Fire Skincare)</a></li>
              <li><a href="#roster" className="hover:text-white transition-colors">04 RUDRA (Free Fire Sniper)</a></li>
              <li><a href="#roster" className="hover:text-white transition-colors">05 RAHESH (Free Fire Dancer)</a></li>
              <li><a href="#roster" className="hover:text-white transition-colors">06 ADVIK (Free Fire Gentleman)</a></li>
            </ul>
          </div>

          {/* Col 2: Architecture */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">
              COLLECTIVE
            </span>
            <ul className="space-y-2 text-stone-400 tracking-wider">
              <li><a href="#legacy" className="hover:text-white transition-colors">The Legacy Timeline</a></li>
              <li><a href="#trophies" className="hover:text-white transition-colors">Trophy Showcase</a></li>
              <li><a href="#trolls" className="hover:text-white transition-colors">Troll Edition Vault</a></li>
              <li><a href="#squad" className="hover:text-white transition-colors">Squad Tactical Matrix</a></li>
              <li><a href="#matches" className="hover:text-white transition-colors">Match Schedule</a></li>
              <li><a href="#rankings" className="hover:text-white transition-colors">Server Leaderboard</a></li>
            </ul>
          </div>

          {/* Col 3: Journal */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">
              JOURNAL
            </span>
            <ul className="space-y-2 text-stone-400 tracking-wider">
              <li><a href="#journal" className="hover:text-white transition-colors">Tactical Essays</a></li>
              <li><a href="#journal" className="hover:text-white transition-colors">Player Interviews</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Moments Gallery</a></li>
              <li><a href="#journal" className="hover:text-white transition-colors">Gear & Peripheral Specs</a></li>
            </ul>
          </div>

          {/* Col 4: Channels */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">
              DISPATCH
            </span>
            <ul className="space-y-2 text-stone-400 tracking-wider">
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>X (TWITTER)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>YOUTUBE</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>TWITCH</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>DISCORD</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>INSTAGRAM</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & System */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">
              GOVERNANCE
            </span>
            <ul className="space-y-2 text-stone-400 tracking-wider">
              <li><span className="text-stone-500">Privacy Protocol</span></li>
              <li><span className="text-stone-500">Terms of Competition</span></li>
              <li><span className="text-stone-500">Anti-Cheat Compliance</span></li>
              <li>
                <button
                  onClick={() => {
                    playClick();
                    setIsAdminOpen(true);
                  }}
                  className="text-[#D4AF37] hover:underline text-left"
                >
                  Admin Management Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-sans tracking-[0.25em] text-stone-500 uppercase">
          <div className="flex items-center space-x-4">
            <span>© 2026 ADVIK EWC ESPORTS</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>SERVER TIME: {utcTime}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-stone-300 hover:text-[#D4AF37] transition-colors"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('TOP');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              <span>BACK TO SUMMIT</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
