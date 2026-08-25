import React from 'react';
import { motion } from 'framer-motion';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FAF7F0] border-y border-stone-300/60 relative overflow-hidden">
      {/* Editorial Grain */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Section Index */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center space-x-3"
        >
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
          <span className="text-[10px] tracking-[0.3em] font-sans font-medium text-[#B89065] uppercase">
            01 / THE PHILOSOPHY
          </span>
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
        </motion.div>

        {/* Large Centered Editorial Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-[#161616]"
        >
          “We believe the most memorable players never{' '}
          <span className="font-serif italic text-[#B89065] font-normal">
            ask
          </span>{' '}
          for attention.”
        </motion.h2>

        {/* Storytelling paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-4 pt-4 text-stone-600 font-sans text-xs sm:text-sm leading-relaxed"
        >
          <p>
            VANDAL ARCHIVE exists at the intersection of supreme mechanical excellence and psychological nonchalance. While the industry normalized screaming into webcams and frantic theatrics, we cultivated the icy stillness of high-fashion editorial rigor.
          </p>
          <p className="text-stone-500 font-serif italic text-base">
            Every fake defuse, knife duel in overtime, and nonchalant clutch is calculated down to the millisecond — delivered with absolute poise.
          </p>
        </motion.div>

        {/* Triple micro tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 flex flex-wrap justify-center items-center gap-8 text-[9px] font-sans tracking-[0.25em] text-stone-500 uppercase"
        >
          <span>PRECISION TACTICS</span>
          <span>•</span>
          <span>CALCULATED AUDACITY</span>
          <span>•</span>
          <span>QUIET SUPREMACY</span>
        </motion.div>
      </div>
    </section>
  );
};
