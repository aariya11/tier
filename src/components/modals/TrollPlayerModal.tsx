import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Volume2, Flame, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const TrollPlayerModal: React.FC = () => {
  const { selectedTroll, closeTrollModal, setCursorLabel } = useEsports();
  const { playClick, playTick, playTrollBuzz } = useSound();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (!hasCelebrated) {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
              setHasCelebrated(true);
            }
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, hasCelebrated]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTrollModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeTrollModal]);

  if (!selectedTroll) return null;

  const handlePlayToggle = () => {
    if (progress >= 100) {
      setProgress(0);
      setHasCelebrated(false);
    }
    playClick();
    if (!isPlaying) {
      playTrollBuzz();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    playTick();
    setIsPlaying(false);
    setProgress(0);
    setHasCelebrated(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 md:p-8"
        onClick={closeTrollModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#0F0F10] text-[#FAF7F0] border border-white/20 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="bg-stone-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-widest text-[#D4AF37] uppercase">
              <Flame className="w-4 h-4" />
              <span>THE TROLL EDITION VAULT • {selectedTroll.game}</span>
            </div>

            <button
              onClick={() => {
                playClick();
                closeTrollModal();
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#D4AF37] text-xs font-sans tracking-widest uppercase transition-colors"
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

          {/* Interactive Player Screen */}
          <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
            <img
              src={selectedTroll.thumbnailUrl}
              alt={selectedTroll.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? 'scale-105 contrast-125 filter-none' : 'grayscale contrast-115 opacity-80'
              }`}
            />

            {/* Broadcast HUD overlay simulation */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
              {/* Top HUD */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>RECORDED BROADCAST // 1080P 240FPS</span>
                </div>

                <div className="px-3 py-1 bg-red-950/80 border border-red-500/50 text-red-400 font-bold tracking-widest">
                  HEALTH: {selectedTroll.clutchHp}
                </div>
              </div>

              {/* Center Play Button Overlay if paused */}
              {!isPlaying && (
                <div className="self-center pointer-events-auto">
                  <button
                    onClick={handlePlayToggle}
                    className="w-16 h-16 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </button>
                </div>
              )}

              {/* Bottom HUD Match Score */}
              <div className="flex items-center justify-between text-[11px] font-sans tracking-widest uppercase bg-black/75 backdrop-blur-md p-3 border border-white/10">
                <span className="text-stone-300">{selectedTroll.match}</span>
                <span className="text-[#D4AF37] font-bold">OPERATIVE: {selectedTroll.player}</span>
              </div>
            </div>

            {/* Simulated Video Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
              <div
                className="h-full bg-[#D4AF37] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-stone-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayToggle}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-stone-400">
                {Math.floor((progress / 100) * 48)}s / 48s
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-sans tracking-widest text-[#D4AF37]">
              <Volume2 className="w-4 h-4" />
              <span>SIMULATED STEREO AUDIO ACTIVE</span>
            </div>
          </div>

          {/* Tactical Breakdown & Spectator Chat Reactions */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block">
                TACTICAL INCIDENT REPORT
              </span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {selectedTroll.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed">
                {selectedTroll.description}
              </p>
              <div className="p-4 bg-stone-900/80 border-l-2 border-[#D4AF37] text-xs font-sans text-stone-400 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-200 block">TACTICAL SIGNIFICANCE</span>
                <p>
                  Demonstrated that psychological stillness and non-standard decision trees completely dismantle conventional opponent crosshair placement.
                </p>
              </div>
            </div>

            {/* Spectator Chat Feed */}
            <div className="md:col-span-5 bg-black border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-400 uppercase pb-2 border-b border-white/10">
                <span className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-[#D4AF37]" />
                  <span>BROADCAST CHAT LOG</span>
                </span>
                <span className="text-emerald-400">LIVE SYNC</span>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto font-sans text-xs">
                {selectedTroll.chatReactions.map((msg, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex items-center space-x-1.5 text-[10px]">
                      {msg.isMod && (
                        <span className="px-1 py-0.2 bg-[#D4AF37] text-black font-bold text-[8px] rounded-sm">
                          VERIFIED
                        </span>
                      )}
                      <span className="font-bold text-stone-300">{msg.user}</span>
                      <span className="text-stone-600 font-mono text-[9px]">{msg.time}</span>
                    </div>
                    <p className="text-stone-300 text-[11px] leading-tight">
                      {msg.msg}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
