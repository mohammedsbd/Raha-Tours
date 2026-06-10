'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: { url: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox = ({ images, index, onClose, onNext, onPrev }: LightboxProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white/70 hover:text-white z-10 p-2 bg-white/10 rounded-full transition-colors"
        onClick={onClose}
      >
        <X className="w-8 h-8" />
      </button>

      <button 
        className="absolute left-6 text-white/70 hover:text-white z-10 p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all hidden md:block"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button 
        className="absolute right-6 text-white/70 hover:text-white z-10 p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all hidden md:block"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full max-w-6xl max-vh-80"
          >
            <Image
              src={images[index].url}
              alt={images[index].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest rtl:tracking-normal uppercase">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
};