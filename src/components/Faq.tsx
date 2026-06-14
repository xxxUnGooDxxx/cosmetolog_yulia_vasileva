import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faq } from '../data'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Вопросы и ответы
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Частые вопросы
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-blush/60 bg-cream shadow-[0_8px_24px_rgba(74,54,64,0.04)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-semibold text-plum">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-none text-rose-deep transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-plum-soft">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
