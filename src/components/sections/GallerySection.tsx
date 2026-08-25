import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';
import type { GalleryItem } from '../../types';

export const GallerySection: React.FC = () => {
  const { gallery, setCursorLabel } = useEsports();
  const { playClick, playTick } = useSound();
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FDFBF7] border-b border-stone-300/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-stone-300/80 pb-10 gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.3em] text-[#B89065] uppercase">
              <Camera className="w-3.5 h-3.5" />
              <span>10 / PHOTOGRAPHIC ARCHIVE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#161616]">
              MOMENTS<br />
              <span className="font-serif italic text-[#B89065]">THAT MATTER.</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 pt-2">
              Championship stages, backstage rehearsals, setup ergonomics, and the unscripted serenity of victory.
            </p>
          </div>

          <span className="text-[10px] font-sans tracking-[0.25em] text-stone-500 uppercase">
            35MM FILM & DIGITAL HIGH SENSITIVITY PHOTOGRAPHY
          </span>
        </div>

        {/* Asymmetric Overlapping Editorial Photo Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {gallery.map((item, idx) => {
            const colSpan =
              idx === 0
                ? 'md:col-span-8'
                : idx === 1
                ? 'md:col-span-4'
                : idx === 2
                ? 'md:col-span-4'
                : idx === 3
                ? 'md:col-span-4'
                : 'md:col-span-4';

            const aspectClass =
              item.aspectRatio === 'tall'
                ? 'aspect-[3/4]'
                : item.aspectRatio === 'square'
                ? 'aspect-square'
                : 'aspect-[16/10]';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`${colSpan} group cursor-pointer space-y-3`}
                onClick={() => {
                  playClick();
                  setActiveImage(item);
                }}
                onMouseEnter={() => {
                  playTick();
                  setCursorLabel('VIEW');
                }}
                onMouseLeave={() => setCursorLabel('')}
              >
                <div className={`relative ${aspectClass} bg-stone-900 overflow-hidden border border-stone-300 shadow-md`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                  {/* Corner Zoom Button */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Category Stamp */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm text-[9px] font-sans tracking-widest text-[#D4AF37] uppercase">
                    {item.category}
                  </div>
                </div>

                {/* Caption & Title */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-stone-400 uppercase">
                    <span className="text-[#161616] font-semibold">{item.title}</span>
                    <span>{item.year}</span>
                  </div>
                  <p className="text-xs font-serif italic text-stone-600 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-5xl max-h-[90vh] bg-stone-950 border border-white/20 p-4 md:p-6 space-y-4 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-white hover:text-[#D4AF37] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-sans tracking-widest text-[#D4AF37] uppercase">
                  <span>{activeImage.category} • {activeImage.year}</span>
                  <span className="text-stone-400">ARCHIVE RECORD</span>
                </div>
                <h4 className="font-display text-2xl font-bold tracking-tight">
                  {activeImage.title}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-stone-300">
                  {activeImage.caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
