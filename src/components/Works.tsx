import { motion } from 'framer-motion'
import { works } from '../data'

const base = import.meta.env.BASE_URL

export default function Works() {
  return (
    <section id="works" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Примеры работ
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Результаты «до и после»
          </h2>
          <p className="mt-4 text-plum-soft">
            Реальные фотографии пациентов, опубликованы с их согласия. Результат индивидуален и
            зависит от исходного состояния кожи.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <motion.figure
              key={work.image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-blush/60 bg-cream shadow-[0_14px_40px_rgba(74,54,64,0.06)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${base}${work.image}`}
                  alt={`${work.title} — фото до и после`}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-plum/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cream backdrop-blur-sm">
                  До / После
                </span>
              </div>
              <figcaption className="p-6">
                <h3 className="font-serif text-lg font-semibold text-plum">{work.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-plum-soft">{work.description}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-plum-soft">
          Имеются противопоказания. Перед процедурами необходима очная консультация специалиста.
        </p>
      </div>
    </section>
  )
}
