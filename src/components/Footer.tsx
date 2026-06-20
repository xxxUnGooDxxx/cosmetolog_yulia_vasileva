export default function Footer() {
  return (
    <footer className="border-t border-blush/60 bg-cream py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-serif text-2xl font-semibold text-plum">Юлия Васильева</p>
          <p className="text-xs uppercase tracking-[0.28em] text-rose-deep">
            косметолог · дерматолог · Иркутск
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-plum-soft">
          <a href="#about" className="hover:text-rose-deep">О враче</a>
          <a href="/uslugi/" className="hover:text-rose-deep">Услуги</a>
          <a href="/blog/" className="hover:text-rose-deep">Блог</a>
          <a href="#pricing" className="hover:text-rose-deep">Цены</a>
          <a href="#reviews" className="hover:text-rose-deep">Отзывы</a>
          <a href="#contact" className="hover:text-rose-deep">Запись</a>
        </nav>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-blush/40 px-6 pt-6">
        <p className="text-center text-xs text-plum-soft/70">
          © {new Date().getFullYear()} Васильева Юлия Андреевна. Информация на сайте не является
          публичной офертой. Имеются противопоказания, необходима консультация специалиста.
        </p>
      </div>
    </footer>
  )
}
