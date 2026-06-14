import { motion } from 'framer-motion'
import { appointmentSteps } from '../data'

export default function Steps() {
  return (
    <section id="steps" className="bg-sand/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Как проходит приём
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Просто и понятно
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {appointmentSteps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative rounded-2xl border border-blush/60 bg-cream p-7 shadow-[0_10px_30px_rgba(74,54,64,0.05)]"
            >
              <span className="font-serif text-5xl font-semibold text-blush">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-plum">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-soft">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
