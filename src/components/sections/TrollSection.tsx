import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Flame, MessageSquare } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const TrollSection: React.FC = () => {
  const { trollMoments, openTrollModal, setCursorLabel } = useEsports();
  const { playTick, playTrollBuzz } = useSound();

  return (
    <section id="trolls" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#0A0A0B] text-[#FAF7F0] relative overflow-hidden border-b border-white/10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#D4AF37] uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>06 / THE PSYCHOLOGICAL WARFARE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-white">
              THE TROLL<br />
              <span className="font-serif italic text-[#D4AF37]">EDITION.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-400 pt-2">
              The iconic archives of 1 HP knife plays, 0.01-second espresso defuses, and tactical disrespect executed on the biggest global stages.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-sans tracking-widest text-stone-400 uppercase block">
              VAULT INTEGRITY: 100% UNEDITED BROADCAST CLIPS
            </span>
            <span className="text-[10px] font-sans text-[#D4AF37] tracking-[0.2em] uppercase">
              CLICK ANY CLIP TO SIMULATE PLAYBACK
            </span>
          </div>
        </div>

        {/* 2x2 or 4-Card Editorial Grid for Legendary Troll Moments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {trollMoments.map((moment, idx) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-stone-900/60 border border-white/10 hover:border-[#D4AF37]/80 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 cursor-pointer relative"
              onClick={() => {
                playTrollBuzz();
                openTrollModal(moment);
              }}
              onMouseEnter={() => {
                playTick();
                setCursorLabel('PLAY');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 text-[10px] font-sans tracking-widest text-stone-400 uppercase">
                <span className="text-[#D4AF37] font-semibold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>{moment.clutchHp} CLUTCH</span>
                </span>
                <span>{moment.game} • {moment.date}</span>
              </div>

              {/* Video Thumbnail with Play Button Hover */}
              <div className="relative my-4 aspect-video bg-stone-950 overflow-hidden border border-white/5">
                <img
                  src={moment.thumbnailUrl}
                  alt={moment.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Center Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="w-6 h-6 ml-1 fill-current" />
                  </div>
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-[10px] font-sans tracking-widest text-white">
                  {moment.duration}
                </div>

                {/* Views Tag */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-[10px] font-sans tracking-widest text-stone-300">
                  <Eye className="w-3 h-3 text-[#D4AF37]" />
                  <span>{moment.views}</span>
                </div>
              </div>

              {/* Info & Description */}
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {moment.title}
                </h3>
                <p className="text-xs font-sans text-stone-400 tracking-wide line-clamp-2">
                  {moment.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                  <span>OPERATIVE: {moment.player} ({moment.playerRole})</span>
                  <span className="flex items-center space-x-1 text-[#D4AF37]">
                    <MessageSquare className="w-3 h-3" />
                    <span>{moment.chatReactions.length} REACTIONS</span>
                  </span>
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
