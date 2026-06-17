import { SwiperSlide } from 'swiper/react'
import { Quote, Star } from 'lucide-react'
import Carousel from './Carousel'
import { reviews } from '../data'

export default function Reviews() {
  return (
    <section id="reviews" className="bg-sand/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-deep">
            Отзывы
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-plum md:text-5xl">
            Что говорят пациенты
          </h2>
          <p className="mt-4 text-plum-soft">
            Реальные отзывы с портала ПроДокторов. Средняя оценка — 5 из 5.
          </p>
        </div>

        <div className="mt-14">
          <Carousel className="reviews-swiper">
            {reviews.map((r, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="flex h-full min-h-[360px] flex-col rounded-3xl border border-blush/60 bg-cream p-8 shadow-[0_14px_40px_rgba(74,54,64,0.05)]">
                  <Quote size={32} className="shrink-0 text-rose/40" />
                  <p className="mt-4 line-clamp-6 flex-1 text-sm leading-relaxed text-plum-soft">
                    {r.text}
                  </p>
                  <div className="mt-6 border-t border-blush/60 pt-4">
                    <div className="flex items-center gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={14} className="fill-gold" />
                      ))}
                    </div>
                    <p className="mt-2 font-serif text-lg font-semibold text-plum">{r.author}</p>
                    <p className="text-xs uppercase tracking-wide text-rose-deep">{r.topic}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://prodoctorov.ru/irkutsk/vrach/556654-vasileva/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-rose-deep underline-offset-4 hover:underline"
          >
            Все отзывы на ПроДокторов →
          </a>
        </div>
      </div>
    </section>
  )
}
