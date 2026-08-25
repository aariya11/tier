import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const SocialSection: React.FC = () => {
  const { setCursorLabel } = useEsports();
  const { playTick } = useSound();

  const socialChannels = [
    { name: 'INSTAGRAM', handle: '@vandalarchive', url: 'https://instagram.com' },
    { name: 'YOUTUBE', handle: 'Vandal Esports Archive', url: 'https://youtube.com' },
    { name: 'TWITCH', handle: 'vandal_live', url: 'https://twitch.tv' },
    { name: 'X / TWITTER', handle: '@vandal_gg', url: 'https://x.com' },
    { name: 'DISCORD', handle: 'discord.gg/vandal', url: 'https://discord.com' },
    { name: 'TIKTOK', handle: '@vandal_moments', url: 'https://tiktok.com' },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#FDFBF7] border-b border-stone-300/60 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-300/80 pb-6 gap-4">
          <span className="text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
            12 / DIRECT DISPATCH
          </span>
          <span className="text-xs font-sans tracking-widest text-stone-500 uppercase">
            COMMUNICATIONS NETWORK
          </span>
        </div>

        {/* Minimal Editorial Links List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialChannels.map((channel, idx) => (
            <motion.a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group py-6 px-6 bg-[#FAF7F0] border border-stone-300/80 hover:border-black flex items-center justify-between transition-all duration-300"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('VISIT');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              <div className="space-y-1">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#161616] group-hover:text-[#B89065] transition-colors block">
                  {channel.name}
                </span>
                <span className="text-[11px] font-sans text-stone-500 tracking-wider uppercase">
                  {channel.handle}
                </span>
              </div>

              <div className="w-8 h-8 rounded-full border border-stone-300 group-hover:border-black group-hover:bg-[#161616] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
