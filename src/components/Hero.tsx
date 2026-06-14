import { motion } from 'framer-motion'
import { Star, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-gradient relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* decorative soft blobs */}
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-blush/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-gold-soft/30 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-cream/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-rose-deep">
            <Star size={14} className="fill-gold text-gold" />
            Иркутск · стаж 11 лет
          </span>

          <h1 className="mt-6 text-balance font-serif text-5xl font-semibold leading-[1.05] text-plum md:text-6xl lg:text-7xl">
            Здоровая кожа <br />
            <span className="text-rose-deep">и уверенность</span> <br />
            в себе
            <span className="sr-only">
              {' '}
              — врач-косметолог и дерматолог в Иркутске Васильева Юлия Андреевна: лечение акне,
              омоложение, чистка лица, пилинги, биоревитализация, контурная пластика губ, лифтинг.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-plum-soft">
            Васильева Юлия Андреевна — врач-косметолог и дерматолог. Помогаю вернуть коже
            здоровье и сияние: от лечения акне до коррекции возрастных изменений.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-rose-deep px-8 py-3.5 text-sm font-medium text-cream shadow-[0_12px_28px_rgba(176,110,128,0.4)] transition-transform hover:scale-105"
            >
              Записаться на консультацию
            </a>
            <a
              href="#services"
              className="rounded-full border border-plum/15 px-8 py-3.5 text-sm font-medium text-plum transition-colors hover:border-rose-deep hover:text-rose-deep"
            >
              Направления работы
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-cream bg-gradient-to-b from-sand to-blush shadow-[0_30px_60px_rgba(74,54,64,0.18)]">
            <img
              src={`${import.meta.env.BASE_URL}yulia.webp`}
              alt="Васильева Юлия Андреевна — врач-косметолог и дерматолог"
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-plum/40 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-3 shadow-lg"
          >
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-gold" />
              ))}
            </div>
            <p className="mt-1 text-xs font-medium text-plum">4.5 · 28 отзывов</p>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-plum-soft md:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">листайте</span>
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  )
}
