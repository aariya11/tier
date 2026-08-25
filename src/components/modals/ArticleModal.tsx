import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Share2, BookOpen, ArrowRight } from 'lucide-react';
import { useEsports } from '../../context/EsportsContext';
import { useSound } from '../../context/SoundContext';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, closeArticleModal, articles, openArticleModal, setCursorLabel } = useEsports();
  const { playClick, playTick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeArticleModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeArticleModal]);

  if (!selectedArticle) return null;

  const otherArticles = articles.filter((a) => a.id !== selectedArticle.id).slice(0, 2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex items-start justify-center p-0 md:p-6 lg:p-12"
        onClick={closeArticleModal}
      >
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-4xl bg-[#FAF7F0] text-[#161616] border border-stone-300 shadow-2xl overflow-hidden min-h-screen md:min-h-0 md:my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-30 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-stone-300/80 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-widest text-[#B89065] uppercase">
              <BookOpen className="w-4 h-4" />
              <span>THE VANDAL JOURNAL • {selectedArticle.category}</span>
            </div>

            <button
              onClick={() => {
                playClick();
                closeArticleModal();
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-stone-300 hover:border-black text-xs font-sans tracking-widest uppercase transition-colors"
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

          {/* Article Header */}
          <div className="p-6 md:p-12 space-y-6">
            <div className="flex items-center space-x-3 text-xs font-sans tracking-widest text-stone-500 uppercase">
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-[#B89065]" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#161616]">
              {selectedArticle.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-stone-600 leading-relaxed border-l-2 border-[#D4AF37] pl-4">
              {selectedArticle.subtitle}
            </p>

            {/* Author Byline */}
            <div className="flex items-center justify-between py-4 border-y border-stone-300/70 text-xs font-sans">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-stone-300 flex items-center justify-center font-bold text-stone-700">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#161616] block">{selectedArticle.author}</span>
                  <span className="text-[10px] text-stone-500 tracking-wider uppercase">{selectedArticle.authorRole}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  playClick();
                  navigator.clipboard?.writeText(window.location.href);
                }}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-black text-[10px] font-sans tracking-widest uppercase"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE</span>
              </button>
            </div>
          </div>

          {/* Featured Full Image */}
          <div className="aspect-[16/9] bg-stone-900 overflow-hidden border-y border-stone-300">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-full object-cover grayscale contrast-110"
            />
          </div>

          {/* Article Editorial Content */}
          <div className="p-6 md:p-12 space-y-8 max-w-3xl mx-auto">
            {/* Pull quote */}
            {selectedArticle.pullQuote && (
              <blockquote className="my-8 py-6 border-y border-stone-300 text-center font-serif italic text-2xl sm:text-3xl text-[#161616] leading-snug">
                {selectedArticle.pullQuote}
              </blockquote>
            )}

            {/* Paragraphs with Drop Cap on first */}
            <div className="space-y-6 text-stone-800 font-sans text-sm sm:text-base leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#B89065]'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Related Articles Footer */}
            <div className="pt-12 border-t border-stone-300 space-y-6">
              <span className="text-xs font-sans tracking-[0.25em] text-stone-500 uppercase block">
                CONTINUE READING FROM THE ARCHIVE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      playClick();
                      openArticleModal(art);
                    }}
                    className="group bg-white border border-stone-300 p-4 space-y-2 cursor-pointer hover:border-black transition-all"
                  >
                    <span className="text-[9px] font-sans tracking-widest text-[#B89065] uppercase">
                      {art.category}
                    </span>
                    <h4 className="font-display text-lg font-bold group-hover:text-[#B89065] transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-[10px] font-sans tracking-widest uppercase font-semibold text-stone-600 group-hover:text-black">
                      <span>READ ESSAY</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
};
