import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Radio, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const MatchesSection: React.FC = () => {
  const { matches, setCursorLabel } = useEsports();
  const { playTick } = useSound();

  const upcomingMatches = matches.filter((m) => m.status === 'UPCOMING');
  const completedMatches = matches.filter((m) => m.status === 'COMPLETED');

  return (
    <section id="matches" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FDFBF7] border-b border-stone-300/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-stone-300/80 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>08 / BROADCAST CALENDAR</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#161616]">
              MATCH<br />
              <span className="font-serif italic text-[#B89065]">ARCHIVE.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 pt-2">
              Official competitive fixtures, live tournament broadcasts, and validated results history.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans tracking-widest uppercase text-stone-500">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>OFFICIAL SERVER BROADCAST</span>
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Upcoming vs Recent Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Upcoming Matches */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-300">
              <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#161616] uppercase flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#B89065]" />
                <span>UPCOMING FIXTURES</span>
              </span>
              <span className="text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                SEASON 2026
              </span>
            </div>

            <div className="space-y-6">
              {upcomingMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-[#FAF7F0] border border-stone-300/80 hover:border-black p-6 space-y-4 transition-all duration-300"
                  onMouseEnter={() => {
                    playTick();
                    setCursorLabel('BROADCAST');
                  }}
                  onMouseLeave={() => setCursorLabel('')}
                >
                  <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-500 uppercase pb-2 border-b border-stone-200">
                    <span className="text-[#B89065] font-semibold">{match.game} • {match.stage}</span>
                    <span>{new Date(match.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <div className="text-xs font-sans text-stone-400 tracking-wider uppercase">
                    {match.tournament}
                  </div>

                  {/* Team A vs Team B Clash */}
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-[#161616]">
                        {match.teamA}
                      </span>
                      <span className="text-[10px] font-sans tracking-widest text-stone-400 block uppercase">HOME SQUAD</span>
                    </div>

                    <span className="font-serif italic text-xl text-stone-400">VS</span>

                    <div className="space-y-0.5 text-right">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-[#161616]">
                        {match.teamB}
                      </span>
                      <span className="text-[10px] font-sans tracking-widest text-stone-400 block uppercase">OPPONENT</span>
                    </div>
                  </div>

                  {/* Bottom Action / Live countdown button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                      20:00 UTC / MAIN STAGE
                    </span>
                    <a
                      href={match.streamUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#161616] text-[#FAF7F0] text-[10px] font-sans tracking-widest uppercase rounded-full hover:bg-[#B89065] hover:text-black transition-colors"
                    >
                      <Radio className="w-3 h-3" />
                      <span>WATCH STREAM</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Recent Completed Results */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-300">
              <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#161616] uppercase flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>RECENT RESULTS</span>
              </span>
              <span className="text-[10px] font-sans tracking-widest text-emerald-700 uppercase font-semibold">
                ALL VICTORIES CONFIRMED
              </span>
            </div>

            <div className="space-y-4">
              {completedMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group bg-white border border-stone-300 p-5 hover:border-black transition-all space-y-3"
                  onMouseEnter={() => {
                    playTick();
                    setCursorLabel('RESULT');
                  }}
                  onMouseLeave={() => setCursorLabel('')}
                >
                  <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                    <span className="text-[#B89065] font-semibold">{match.game}</span>
                    <span>{match.tournament}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-xl sm:text-2xl font-bold text-[#161616]">
                        {match.teamA} <span className="font-serif italic text-stone-400 font-normal">vs</span> {match.teamB}
                      </div>
                      {match.resultSummary && (
                        <p className="text-xs font-serif italic text-stone-600 mt-0.5">
                          “{match.resultSummary}”
                        </p>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="inline-block px-3 py-1 bg-stone-900 text-[#FAF7F0] font-display text-lg font-bold tracking-widest">
                        {match.scoreA} — {match.scoreB}
                      </span>
                      <span className="block text-[9px] font-sans tracking-widest text-emerald-600 font-bold uppercase mt-1">
                        VICTORY
                      </span>
                    </div>
                  </div>

                  {match.mvp && (
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-500 uppercase">
                      <span>MATCH MVP: {match.mvp}</span>
                      <span className="text-stone-400">HLTV RATED</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
