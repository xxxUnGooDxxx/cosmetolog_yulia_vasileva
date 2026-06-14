import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { education, training } from '../data'

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Образование и квалификация
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Путь профессионала
          </h2>
        </div>

        <div className="relative mt-16">
          {/* central line */}
          <div className="absolute left-4 top-0 h-full w-px bg-blush md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-2">
            {education.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className={`relative flex md:w-1/2 ${
                  i % 2 === 0 ? 'md:ml-0 md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                {/* dot — sits on the central line (row edge on desktop) */}
                <div
                  className={`absolute left-4 top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-rose-deep ring-4 ring-cream ${
                    i % 2 === 0
                      ? 'md:left-auto md:right-0 md:translate-x-1/2'
                      : 'md:left-0 md:-translate-x-1/2'
                  }`}
                />

                <div className="ml-10 w-full rounded-2xl border border-blush/60 bg-cream p-6 shadow-[0_10px_30px_rgba(74,54,64,0.05)] md:ml-0">
                  <span className="font-serif text-2xl font-semibold text-gold">{item.year}</span>
                  <p className="mt-1 font-serif text-lg font-semibold text-plum">{item.title}</p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-rose-deep">
                    {item.type}
                  </p>
                  {item.institution && (
                    <p className="mt-2 text-sm leading-relaxed text-plum-soft">{item.institution}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* additional professional education */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
              Дополнительное обучение
            </span>
            <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-plum md:text-4xl">
              Курсы и повышение квалификации
            </h3>
            <p className="mt-3 text-sm text-plum-soft">
              Регулярно подтверждаю и расширяю квалификацию — в курсе современных протоколов и
              стандартов.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {training.map((item, i) => (
              <motion.div
                key={`${item.date}-${item.institution}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="flex flex-col rounded-2xl border border-blush/60 bg-cream p-6 shadow-[0_10px_30px_rgba(74,54,64,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-rose-deep">
                  <Award size={20} />
                </div>
                <span className="mt-4 text-xs font-medium uppercase tracking-wide text-gold">
                  {item.date}
                </span>
                <p className="mt-1 font-serif text-lg font-semibold leading-snug text-plum">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-plum-soft">{item.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
