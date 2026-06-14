import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { procedures } from '../data'

export default function Procedures() {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const active = open !== null ? procedures[open] : null

  return (
    <section id="procedures" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Процедуры
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Что я делаю
          </h2>
          <p className="mt-4 text-plum-soft">
            Нажмите на процедуру, чтобы узнать, что это и для чего. Конкретный план подбираю на
            консультации после осмотра кожи.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((p, i) => (
            <motion.button
              key={p.name}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="group flex flex-col rounded-2xl border border-blush/60 bg-cream p-6 text-left shadow-[0_10px_30px_rgba(74,54,64,0.05)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blush to-sand text-rose-deep transition-colors group-hover:from-rose group-hover:to-rose-deep group-hover:text-cream">
                  <p.icon size={22} />
                </div>
                <Plus
                  size={18}
                  className="mt-1 text-rose-deep/50 transition-colors group-hover:text-rose-deep"
                />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold leading-snug text-plum">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-soft">{p.short}</p>
              <span className="mt-4 text-xs font-medium uppercase tracking-wide text-rose-deep">
                Подробнее →
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-plum/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-cream p-8 shadow-2xl md:p-10"
            >
              <button
                aria-label="Закрыть"
                onClick={() => setOpen(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-sand text-plum-soft transition-colors hover:bg-blush hover:text-rose-deep"
              >
                <X size={18} />
              </button>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-cream">
                <active.icon size={26} />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-plum">
                {active.name}
              </h3>
              <p className="mt-4 leading-relaxed text-plum-soft">{active.detail}</p>

              <a
                href="#contact"
                onClick={() => setOpen(null)}
                className="mt-8 inline-flex rounded-full bg-rose-deep px-7 py-3 text-sm font-medium text-cream shadow-[0_10px_24px_rgba(176,110,128,0.35)] transition-transform hover:scale-105"
              >
                Записаться на консультацию
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
