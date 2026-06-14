import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, ExternalLink } from 'lucide-react'

const CLINIC_URL = 'https://xn---2-7kcajdbn2armkzcbf7ahjm2a5x.xn--p1ai/'

const details = [
  {
    icon: MapPin,
    title: 'Адрес',
    lines: ['г. Иркутск, пер. Гусарова, 2', '2 этаж'],
  },
  {
    icon: Phone,
    title: 'Телефон',
    lines: ['8 (908) 642-44-40'],
    href: 'tel:+79086424440',
  },
  {
    icon: Mail,
    title: 'Почта',
    lines: ['kosmetologia38@mail.ru'],
    href: 'mailto:kosmetologia38@mail.ru',
  },
  {
    icon: Clock,
    title: 'Часы работы',
    lines: ['Пн–Пт: 8:00–20:00', 'Сб: 10:00–18:00', 'Вс: выходной'],
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-plum to-rose-deep shadow-[0_30px_70px_rgba(74,54,64,0.25)]">
          <div className="grid gap-0 md:grid-cols-2">
            {/* left intro */}
            <div className="relative p-10 text-cream md:p-14">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cream/10 blur-2xl" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-blush">
                Где я принимаю
              </span>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Отделение лечебной косметологии
              </h2>
              <p className="mt-4 max-w-sm text-sm text-cream/80">
                Веду приём в отделении лечебной косметологии ГБУЗ «ОКВД» — «Косметология на
                Гусарова» в Иркутске. Запись на консультацию — по телефону клиники.
              </p>

              <a
                href={CLINIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-plum shadow-lg transition-transform hover:scale-105"
              >
                Сайт клиники <ExternalLink size={16} />
              </a>

              <a
                href="tel:+79086424440"
                className="mt-4 block font-serif text-3xl font-semibold text-cream md:text-4xl"
              >
                8 (908) 642-44-40
              </a>
            </div>

            {/* right details */}
            <div className="bg-cream p-10 md:p-14">
              <div className="grid gap-7 sm:grid-cols-2">
                {details.map((d, i) => (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-rose-deep">
                      <d.icon size={20} />
                    </div>
                    <p className="mt-4 font-serif text-lg font-semibold text-plum">{d.title}</p>
                    <div className="mt-1 space-y-0.5 text-sm text-plum-soft">
                      {d.lines.map((line) =>
                        d.href ? (
                          <a
                            key={line}
                            href={d.href}
                            className="block transition-colors hover:text-rose-deep"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line}>{line}</p>
                        ),
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-10 rounded-2xl bg-sand/50 px-5 py-4 text-xs leading-relaxed text-plum-soft">
                Имеются противопоказания. Перед процедурами необходима очная консультация
                специалиста.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
