import { useState, type ReactNode } from 'react'
import { Swiper } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'

type Props = {
  children: ReactNode
  className?: string
  autoplayDelay?: number
}

export default function Carousel({ children, className, autoplayDelay = 5000 }: Props) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  const arrow =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-rose-deep shadow-[0_8px_24px_rgba(74,54,64,0.14)] transition-transform hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 md:flex'

  return (
    <div className="relative md:px-14">
      <button
        ref={setPrevEl}
        aria-label="Назад"
        className={`${arrow} left-0`}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        ref={setNextEl}
        aria-label="Вперёд"
        className={`${arrow} right-0`}
      >
        <ChevronRight size={22} />
      </button>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        className={className}
        spaceBetween={24}
        slidesPerView={1}
        grabCursor
        navigation={{ prevEl, nextEl }}
        pagination={{ clickable: true }}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {children}
      </Swiper>
    </div>
  )
}
