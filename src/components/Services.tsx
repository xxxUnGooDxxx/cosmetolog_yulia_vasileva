import { motion } from 'framer-motion'
import { services } from '../data'

export default function Services() {
  return (
    <section id="services" className="bg-sand/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Направления работы
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            С чем я помогаю
          </h2>
          <p className="mt-4 text-plum-soft">
            Каждая программа подбирается индивидуально после очной консультации и осмотра кожи.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href={`/uslugi/${s.slug}/`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group block rounded-3xl border border-blush/60 bg-cream p-8 shadow-[0_14px_40px_rgba(74,54,64,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(176,110,128,0.18)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-sand text-rose-deep transition-colors group-hover:from-rose group-hover:to-rose-deep group-hover:text-cream">
                <s.icon size={26} />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-plum">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-plum-soft">{s.description}</p>
              <span className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-rose-deep">
                Подробнее →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
