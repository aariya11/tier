import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useEsports } from '../../context/EsportsContext';

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, suffix = '', prefix = '', duration = 1.6 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const stepTime = 16; // ~60fps
    const totalSteps = (duration * 1000) / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const { stats } = useEsports();

  const statsItems = [
    {
      value: stats.tournamentsWon,
      suffix: '',
      label: 'TOURNAMENTS WON',
      detail: 'Across Global S-Tier, Majors & Invitationals',
    },
    {
      value: stats.championships,
      suffix: '',
      label: 'CHAMPIONSHIPS',
      detail: 'Undisputed 1st place world trophies',
    },
    {
      value: stats.winRate,
      suffix: '%',
      label: 'WIN RATE',
      detail: 'Match record in Grand Finals',
    },
    {
      value: stats.matchesPlayed,
      suffix: '',
      label: 'MATCHES RECORDED',
      detail: 'Official sanction competition history',
    },
    {
      value: stats.oneHpClutches,
      suffix: '',
      label: '1 HP CLUTCHES',
      detail: 'Unbroken composure under lethal damage',
    },
    {
      value: 285,
      prefix: '$',
      suffix: '0K+',
      label: 'PRIZE SILVER',
      detail: 'Total prize purse won by team',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#FDFBF7] border-b border-stone-300/60 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-300/60 pb-8 gap-4">
          <div>
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase block mb-2">
              03 / QUANTIFIABLE SUPREMACY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-[#161616]">
              STATISTICAL ARCHIVE
            </h2>
          </div>
          <p className="text-xs font-sans text-stone-500 uppercase tracking-widest">
            ALL DATA AUDITED PER HLTV & RIOT GAMES API
          </p>
        </div>

        {/* 6 Grid Editorial Big Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {statsItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="space-y-2 pb-6 border-b border-stone-200 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:pr-4"
            >
              {/* Huge Serif Number */}
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight">
                <StatCounter
                  end={item.value}
                  suffix={item.suffix}
                  prefix={item.prefix}
                />
              </div>

              {/* Tiny Uppercase Label */}
              <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#B89065] uppercase">
                {item.label}
              </div>

              {/* Secondary Details */}
              <p className="text-[11px] font-sans text-stone-500 leading-snug">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
