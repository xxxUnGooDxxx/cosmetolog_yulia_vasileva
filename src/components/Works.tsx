import { useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import Carousel from './Carousel'
import Lightbox from './Lightbox'
import { works } from '../data'

const base = import.meta.env.BASE_URL

export default function Works() {
  const [open, setOpen] = useState<number | null>(null)
  const items = works.map((w) => ({ src: `${base}${w.image}`, caption: `${w.title}. ${w.description}` }))

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

        <div className="mt-14">
          <Carousel className="works-swiper">
            {works.map((work, i) => (
              <SwiperSlide key={work.image} className="h-auto">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-blush/60 bg-cream text-left shadow-[0_14px_40px_rgba(74,54,64,0.06)]"
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
                  <div className="flex min-h-[116px] flex-1 flex-col p-6">
                    <h3 className="line-clamp-1 font-serif text-lg font-semibold text-plum">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-plum-soft">
                      {work.description}
                    </p>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-plum-soft">
          Имеются противопоказания. Перед процедурами необходима очная консультация специалиста.
        </p>
      </div>

      {open !== null && (
        <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
      )}
    </section>
  )
}
