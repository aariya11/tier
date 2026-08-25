import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const SquadSection: React.FC = () => {
  const { players, openPlayerModal, setCursorLabel } = useEsports();
  const { playTick, playClick } = useSound();

  return (
    <section id="squad" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FAF7F0] border-b border-stone-300/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-stone-300/80 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>07 / TACTICAL FORMATION</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#161616]">
              THE<br />
              <span className="font-serif italic text-[#B89065]">SQUAD.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 pt-2">
              The full 6-player active competitive roster. Each operative engineered for maximum cognitive resilience and tactical execution.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-sans tracking-[0.25em] text-stone-500 uppercase block">
              HEAD COACH: SOREN LINDQVIST
            </span>
            <span className="text-xs font-sans tracking-widest text-[#B89065] font-semibold uppercase">
              FORMATION: 2 DUELIST • 1 CONTROLLER • 1 SNIPER • 1 INITIATOR • 1 FLEX
            </span>
          </div>
        </div>

        {/* Editorial Table / Lineup List */}
        <div className="divide-y divide-stone-300/70">
          {players.map((player, idx) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-stone-200/50 px-4 -mx-4 transition-all duration-300 cursor-pointer"
              onClick={() => {
                playClick();
                openPlayerModal(player);
              }}
              onMouseEnter={() => {
                playTick();
                setCursorLabel('PROFILE');
              }}
              onMouseLeave={() => setCursorLabel('')}
            >
              {/* Left: Number & Portrait Avatar & Name */}
              <div className="flex items-center space-x-6 md:w-80">
                <span className="font-display text-2xl font-semibold text-stone-400 group-hover:text-[#B89065] transition-colors w-8">
                  {player.number}
                </span>

                <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-300 border border-stone-400/40 flex-shrink-0">
                  <img
                    src={player.portraitUrl}
                    alt={player.gamerTag}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#161616] group-hover:text-[#B89065] transition-colors">
                    {player.gamerTag}
                  </h3>
                  <p className="text-xs font-sans text-stone-500 uppercase tracking-wider">
                    {player.realName}
                  </p>
                </div>
              </div>

              {/* Center: Role & Game */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans tracking-widest text-stone-700 uppercase md:w-64">
                <span className="px-2.5 py-1 bg-stone-200 rounded-sm font-medium">
                  {player.role}
                </span>
                <span className="text-stone-500">
                  {player.mainGame}
                </span>
              </div>

              {/* Right: Signature Move & Country */}
              <div className="flex items-center justify-between md:justify-end space-x-6 md:w-96 text-xs font-sans">
                <div className="text-right hidden sm:block">
                  <span className="text-[9px] text-stone-400 block tracking-widest uppercase">SIGNATURE TACTIC</span>
                  <span className="font-serif italic text-stone-800 text-sm">{player.signatureTrollMove}</span>
                </div>

                <span className="flex items-center space-x-1.5 text-stone-600 uppercase tracking-widest">
                  <span>{player.country}</span>
                  <span>{player.flag}</span>
                </span>

                <div className="w-8 h-8 rounded-full border border-stone-300 group-hover:border-black group-hover:bg-[#161616] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
