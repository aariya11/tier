import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles, Filter } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const LegacySection: React.FC = () => {
  const { achievements, setCursorLabel } = useEsports();
  const { playTick, playClick } = useSound();
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  const years = ['ALL', '2026', '2025', '2024'];

  const filteredAchievements = achievements.filter((ach) => {
    if (selectedYear === 'ALL') return true;
    return ach.year === selectedYear;
  });

  return (
    <section id="legacy" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-stone-300/80 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>04 / THE CHRONICLES</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#161616]">
              THE<br />
              <span className="font-serif italic text-[#B89065]">LEGACY.</span>
            </h2>
            <p className="text-sm font-serif italic text-stone-600 pt-2">
              “Every victory leaves a mark on the server.”
            </p>
          </div>

          {/* Year Filter Buttons */}
          <div className="flex items-center space-x-2 text-[10px] font-sans tracking-widest uppercase">
            <span className="text-stone-400 mr-2 flex items-center space-x-1">
              <Filter className="w-3 h-3" />
              <span>ERA:</span>
            </span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  playClick();
                  setSelectedYear(year);
                }}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  selectedYear === year
                    ? 'bg-[#161616] text-[#FAF7F0] border-[#161616] font-semibold'
                    : 'bg-transparent text-stone-600 border-stone-300 hover:border-stone-500'
                }`}
                onMouseEnter={() => {
                  playTick();
                  setCursorLabel('ERA');
                }}
                onMouseLeave={() => setCursorLabel('')}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Editorial Timeline */}
        <div className="space-y-0 divide-y divide-stone-300/70">
          {filteredAchievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-stone-200/40 px-4 -mx-4 transition-colors"
              onMouseEnter={() => {
                playTick();
                setCursorLabel('VICTORY');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              {/* Year & Tier */}
              <div className="flex items-baseline space-x-4 lg:w-48 flex-shrink-0">
                <span className="font-display text-3xl font-medium text-[#161616] group-hover:text-[#B89065] transition-colors">
                  {item.year}
                </span>
                <span className="text-[9px] font-sans tracking-[0.2em] px-2 py-0.5 rounded-sm bg-stone-200 text-stone-700 uppercase">
                  {item.tier}
                </span>
              </div>

              {/* Tournament Title & Highlight */}
              <div className="lg:flex-1 space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#161616] group-hover:translate-x-1 transition-transform">
                  {item.tournament}
                </h3>
                <p className="text-xs font-sans text-stone-600 leading-relaxed max-w-2xl">
                  {item.highlight}
                </p>
                <div className="pt-1 flex items-center space-x-4 text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                  <span className="flex items-center space-x-1">
                    <Award className="w-3 h-3 text-[#B89065]" />
                    <span>HONORS: {item.player}</span>
                  </span>
                </div>
              </div>

              {/* Result & Prize */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-stone-300 lg:w-48 flex-shrink-0">
                <span className="text-xs font-sans font-bold tracking-widest text-[#B89065] uppercase flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{item.result}</span>
                </span>
                <span className="text-xs font-serif italic text-stone-700 font-medium">
                  {item.prize} Prize Purse
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
