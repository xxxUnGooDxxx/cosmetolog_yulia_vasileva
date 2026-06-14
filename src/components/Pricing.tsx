import { motion } from 'framer-motion'
import { ExternalLink, Phone } from 'lucide-react'
import { priceGroups, priceUrl } from '../data'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Цены
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Ориентировочный прайс
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-plum-soft">
            Цены носят ознакомительный характер. Точная стоимость зависит от объёма работы и
            подбираемых препаратов — актуальные цены лучше уточнить по телефону клиники перед
            приёмом.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {priceGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-3xl border border-blush/60 bg-cream p-7 shadow-[0_8px_24px_rgba(74,54,64,0.04)] md:p-8"
            >
              <h3 className="font-serif text-xl font-semibold text-plum">{group.title}</h3>
              <ul className="mt-5 space-y-3.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-dashed border-blush/50 pb-3.5 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-plum-soft">{item.name}</span>
                    <span className="flex-none font-serif text-base font-semibold text-rose-deep">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={priceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-rose-deep/40 px-7 py-3.5 text-sm font-medium text-rose-deep transition-colors hover:bg-rose-deep hover:text-cream"
          >
            Полный прайс клиники <ExternalLink size={16} />
          </a>
          <a
            href="tel:+79086424440"
            className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-7 py-3.5 text-sm font-medium text-cream shadow-[0_8px_20px_rgba(176,110,128,0.35)] transition-transform hover:scale-105"
          >
            <Phone size={16} /> Уточнить стоимость
          </a>
        </div>
      </div>
    </section>
  )
}
