import { motion } from 'framer-motion'
import { Stethoscope, GraduationCap, ShieldCheck } from 'lucide-react'
import { stats } from '../data'

const highlights = [
  {
    icon: Stethoscope,
    title: 'Врач, а не косметик',
    text: 'Дерматовенеролог и косметолог — работаю с причиной проблемы, а не маскирую симптомы.',
  },
  {
    icon: GraduationCap,
    title: 'Постоянное развитие',
    text: 'Дерматоскопия, УЗ-визуализация кожи, регулярное повышение квалификации.',
  },
  {
    icon: ShieldCheck,
    title: 'Доказательный подход',
    text: 'Только безопасные протоколы и методики с подтверждённой эффективностью.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
              О враче
            </span>
            <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
              Внимание к каждому пациенту
            </h2>
            <div className="mt-6 space-y-4 text-plum-soft">
              <p>
                Меня зовут Юлия Андреевна Васильева. Более 11 лет я помогаю людям сохранять
                здоровье и красоту кожи. Окончила Иркутский государственный медицинский
                университет, прошла ординатуру по дерматовенерологии.
              </p>
              <p>
                Сегодня я совмещаю дерматологию и косметологию — это позволяет видеть полную
                картину и подбирать лечение, которое действительно работает. Ко мне обращаются
                с акне, возрастными изменениями, куперозом, гиперпигментацией и другими
                состояниями кожи.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {highlights.map((h) => (
                <div key={h.title} className="flex gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-sand text-rose-deep">
                    <h.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-plum">{h.title}</h3>
                    <p className="text-sm text-plum-soft">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-3xl border border-blush/60 bg-cream p-7 text-center shadow-[0_14px_40px_rgba(74,54,64,0.06)] ${
                  i % 2 === 1 ? 'mt-8' : ''
                }`}
              >
                <p className="font-serif text-5xl font-semibold text-rose-deep">{s.value}</p>
                <p className="mt-2 text-sm text-plum-soft">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
