import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'О враче' },
  { href: '#services', label: 'Услуги' },
  { href: '#education', label: 'Образование' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contact', label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_8px_30px_rgba(74,54,64,0.08)]' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold text-plum">Юлия Васильева</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-rose-deep">
            косметолог · дерматолог
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-plum-soft transition-colors hover:text-rose-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-rose-deep px-6 py-2.5 text-sm font-medium text-cream shadow-[0_8px_20px_rgba(176,110,128,0.35)] transition-transform hover:scale-105 md:inline-block"
        >
          Записаться
        </a>

        <button
          className="text-plum md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="glass overflow-hidden md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-plum-soft transition-colors hover:bg-sand hover:text-rose-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-rose-deep px-6 py-3 text-center font-medium text-cream"
              >
                Записаться
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
