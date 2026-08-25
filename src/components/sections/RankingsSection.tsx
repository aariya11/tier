import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Crown } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

type SortKey = 'totalPoints' | 'winRate' | 'kd' | 'mvpAwards' | 'tournamentsWon';

export const RankingsSection: React.FC = () => {
  const { players, openPlayerModal, setCursorLabel } = useEsports();
  const { playTick, playClick } = useSound();
  const [sortKey, setSortKey] = useState<SortKey>('totalPoints');

  const sortedPlayers = [...players].sort((a, b) => b[sortKey] - a[sortKey]);
  const leaderPlayer = sortedPlayers[0];

  const sortButtons: { label: string; key: SortKey }[] = [
    { label: 'RATING POINTS', key: 'totalPoints' },
    { label: 'WIN RATE', key: 'winRate' },
    { label: 'K/D RATIO', key: 'kd' },
    { label: 'MVP AWARDS', key: 'mvpAwards' },
    { label: 'TITLES', key: 'tournamentsWon' },
  ];

  const formatPoints = (pts: number) => {
    if (pts > 0) return `+${pts.toLocaleString()}`;
    return pts.toLocaleString();
  };

  return (
    <section id="rankings" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FAF7F0] border-b border-stone-300/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-stone-300/80 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>09 / INDIVIDUAL METRICS</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#161616]">
              THE<br />
              <span className="font-serif italic text-[#B89065]">RANKING.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 pt-2">
              The internal hierarchy of mechanical supremacy and high-pressure composure. Audited weekly.
            </p>
          </div>

          {/* Sort Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-sans tracking-widest uppercase">
            <span className="text-stone-400 mr-2">SORT BY:</span>
            {sortButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => {
                  playClick();
                  setSortKey(btn.key);
                }}
                className={`px-3 py-1 rounded-full border transition-all ${
                  sortKey === btn.key
                    ? 'bg-[#161616] text-[#FAF7F0] border-black font-semibold'
                    : 'bg-transparent text-stone-600 border-stone-300 hover:border-stone-500'
                }`}
                onMouseEnter={() => {
                  playTick();
                  setCursorLabel('SORT');
                }}
                onMouseLeave={() => setCursorLabel('')}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Dominant Leader Card for Rank 01 */}
        {leaderPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#161616] text-[#FAF7F0] p-8 md:p-10 border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden cursor-pointer group"
            onClick={() => {
              playClick();
              openPlayerModal(leaderPlayer);
            }}
            onMouseEnter={() => {
              playTick();
              setCursorLabel('LEADER');
            }}
            onMouseLeave={() => setCursorLabel('')}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
                {/* Crown & Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1 bg-stone-900">
                    <img
                      src={leaderPlayer.portraitUrl}
                      alt={leaderPlayer.gamerTag}
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -top-3 -right-2 bg-[#D4AF37] text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-sans tracking-widest text-[#D4AF37] uppercase">
                    <span>RANK 01 APEX OPERATIVE</span>
                    <span>•</span>
                    <span>{leaderPlayer.mainGame}</span>
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                    {leaderPlayer.gamerTag}
                  </h3>
                  <p className="text-xs font-sans text-stone-400 uppercase tracking-widest">
                    {leaderPlayer.realName} • {leaderPlayer.country} {leaderPlayer.flag}
                  </p>
                  <p className="text-xs font-serif italic text-stone-300 pt-1">
                    “{leaderPlayer.quote}”
                  </p>
                </div>
              </div>

              {/* Leader Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 w-full lg:w-auto">
                <div>
                  <span className="text-[10px] font-sans tracking-widest text-stone-400 block uppercase">POINTS</span>
                  <span className="font-display text-3xl font-bold text-[#D4AF37]">{formatPoints(leaderPlayer.totalPoints)}</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans tracking-widest text-stone-400 block uppercase">WIN RATE</span>
                  <span className="font-display text-3xl font-bold text-white">{leaderPlayer.winRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans tracking-widest text-stone-400 block uppercase">K/D</span>
                  <span className="font-display text-3xl font-bold text-white">{leaderPlayer.kd}</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans tracking-widest text-stone-400 block uppercase">MVPS</span>
                  <span className="font-display text-3xl font-bold text-white">{leaderPlayer.mvpAwards}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Complete Leaderboard Table */}
        <div className="bg-white border border-stone-300 overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-[10px] tracking-[0.2em] text-stone-500 uppercase">
                <th className="py-4 px-6">RANK</th>
                <th className="py-4 px-6">OPERATIVE</th>
                <th className="py-4 px-6">DISCIPLINE</th>
                <th className="py-4 px-6 text-center">WIN RATE</th>
                <th className="py-4 px-6 text-center">K/D</th>
                <th className="py-4 px-6 text-center">TITLES</th>
                <th className="py-4 px-6 text-center">MVPS</th>
                <th className="py-4 px-6 text-right">RATING</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {sortedPlayers.map((player, idx) => {
                const isNegative = player.totalPoints < 0;

                return (
                  <tr
                    key={player.id}
                    onClick={() => {
                      playClick();
                      openPlayerModal(player);
                    }}
                    className="hover:bg-stone-100/70 transition-colors cursor-pointer group"
                    onMouseEnter={() => {
                      playTick();
                      setCursorLabel('PROFILE');
                    }}
                    onMouseLeave={() => setCursorLabel('')}
                  >
                    {/* Rank */}
                    <td className="py-5 px-6 font-display text-xl font-bold text-stone-400 group-hover:text-[#B89065]">
                      {idx === 0 ? '01 👑' : `0${idx + 1}`}
                    </td>

                    {/* Operative */}
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 border border-stone-300">
                          <img src={player.portraitUrl} alt={player.gamerTag} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                        </div>
                        <div>
                          <div className="font-display text-lg font-bold text-[#161616] group-hover:text-[#B89065] transition-colors">
                            {player.gamerTag}
                          </div>
                          <div className="text-[10px] text-stone-500 uppercase tracking-widest">
                            {player.realName} {player.flag}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role / Game */}
                    <td className="py-5 px-6 uppercase tracking-wider text-stone-600">
                      <span className={`px-2 py-0.5 rounded-sm font-semibold text-[9px] ${
                        player.mainGame === 'FREE FIRE' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-stone-100 text-stone-800'
                      }`}>
                        {player.mainGame} • {player.role}
                      </span>
                    </td>

                    {/* Win Rate */}
                    <td className="py-5 px-6 text-center font-bold text-stone-800">
                      {player.winRate}%
                    </td>

                    {/* K/D */}
                    <td className="py-5 px-6 text-center font-medium text-stone-700">
                      {player.kd}
                    </td>

                    {/* Titles */}
                    <td className="py-5 px-6 text-center text-stone-700">
                      {player.tournamentsWon}
                    </td>

                    {/* MVPs */}
                    <td className="py-5 px-6 text-center text-stone-700">
                      {player.mvpAwards}
                    </td>

                    {/* Points (Formatted with negative representation) */}
                    <td className="py-5 px-6 text-right font-display text-lg font-bold">
                      <span className={isNegative ? 'text-red-500 font-mono tracking-tight' : 'text-[#B89065]'}>
                        {formatPoints(player.totalPoints)} PTS
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
