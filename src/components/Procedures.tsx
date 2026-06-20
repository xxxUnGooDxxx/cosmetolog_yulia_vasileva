import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { procedures } from '../data'

export default function Procedures() {
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
            Выберите процедуру, чтобы узнать, что это, кому подходит, как проходит и сколько стоит.
            Конкретный план подбираю на консультации после осмотра кожи.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((p, i) => (
            <motion.a
              key={p.name}
              href={`/uslugi/${p.slug}/`}
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
                <ArrowRight
                  size={18}
                  className="mt-1 text-rose-deep/50 transition-all group-hover:translate-x-1 group-hover:text-rose-deep"
                />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold leading-snug text-plum">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-soft">{p.short}</p>
              <span className="mt-4 text-xs font-medium uppercase tracking-wide text-rose-deep">
                Подробнее →
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/uslugi/"
            className="inline-flex items-center gap-2 rounded-full border border-rose-deep/40 px-7 py-3 text-sm font-medium text-rose-deep transition-colors hover:bg-rose-deep hover:text-cream"
          >
            Все услуги и цены <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
