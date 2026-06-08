'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  imageUrl?: string;
}

export const AccordionItem = ({ title, content, imageUrl }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gold/10 overflow-hidden transition-colors ${isOpen ? 'bg-gold/5' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-xl font-display font-bold group-hover:text-gold transition-colors">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-6 h-6 ${isOpen ? 'text-gold' : 'text-text-muted'}`} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 font-body text-text-muted leading-relaxed">
                {content}
              </div>
              {imageUrl && (
                <div className="w-full md:w-32 h-32 relative rounded-xl overflow-hidden shadow-lg border-2 border-gold/20 shrink-0">
                  <Image src={imageUrl} alt={title} fill className="object-cover" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-gold/10 rounded-2xl overflow-hidden bg-white dark:bg-surface shadow-xl">
      {children}
    </div>
  );
};