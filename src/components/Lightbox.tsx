import { useCallback, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export type LightboxItem = { src: string; caption?: string }

type Props = {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onChange: (i: number) => void
}

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const touchX = useRef<number | null>(null)

  const prev = useCallback(
    () => onChange((index - 1 + items.length) % items.length),
    [index, items.length, onChange],
  )
  const next = useCallback(
    () => onChange((index + 1) % items.length),
    [index, items.length, onChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const item = items[index]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-plum/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (dx > 50) prev()
        else if (dx < -50) next()
        touchX.current = null
      }}
    >
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25"
      >
        <X size={22} />
      </button>

      <button
        aria-label="Предыдущее"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25 md:left-6"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        aria-label="Следующее"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25 md:right-6"
      >
        <ChevronRight size={26} />
      </button>

      <figure className="flex max-h-[90vh] flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.caption ?? ''}
          className="max-h-[80vh] w-auto max-w-[92vw] rounded-lg object-contain shadow-2xl"
        />
        {item.caption && (
          <figcaption className="mt-4 max-w-2xl text-center text-sm text-cream/90">
            {item.caption}
          </figcaption>
        )}
        <span className="mt-2 text-xs text-cream/50">
          {index + 1} / {items.length}
        </span>
      </figure>
    </div>
  )
}
