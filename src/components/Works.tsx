import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
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

        <div className="mt-14">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            className="works-swiper"
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {works.map((work) => (
              <SwiperSlide key={work.image} className="h-auto">
                <a
                  href={`${base}${work.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-blush/60 bg-cream shadow-[0_14px_40px_rgba(74,54,64,0.06)]"
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
                    <h3 className="font-serif text-lg font-semibold text-plum line-clamp-1">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-plum-soft line-clamp-2">
                      {work.description}
                    </p>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-plum-soft">
          Имеются противопоказания. Перед процедурами необходима очная консультация специалиста.
        </p>
      </div>
    </section>
  )
}
