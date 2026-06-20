/* Генерация статических SEO-страниц услуг в dist/uslugi/<slug>/index.html,
   страницы-хаба dist/uslugi/index.html и обновление dist/sitemap.xml.
   Страницы самодостаточны (свой инлайн-CSS), не зависят от Vite-сборки —
   чистый HTML, который без проблем индексирует Яндекс.
   Запуск: node scripts/build-services.cjs (в составе postbuild). */
const fs = require('fs')
const path = require('path')
const { SITE, services, problems, serviceLike, articles } = require('./services-data.cjs')

const DIST = path.join(__dirname, '..', 'dist')
const O = SITE.origin

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const byId = Object.fromEntries(serviceLike.map((s) => [s.slug, s]))

// ---------- общий <head> / стили / шапка / подвал ----------

function head({ title, description, keywords, canonical, ogImage, jsonld }) {
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="keywords" content="${esc(keywords)}" />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="index, follow" />
<meta name="geo.region" content="RU-IRK" />
<meta name="geo.placename" content="Иркутск" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#b06e80" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="ru_RU" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:site_name" content="${esc(SITE.brand)} — косметолог в Иркутске" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
${jsonld.map((j) => `<script type="application/ld+json">\n${JSON.stringify(j, null, 2)}\n</script>`).join('\n')}
<style>
:root{--cream:#fdf9f6;--sand:#f6ece5;--blush:#f3dcd5;--rose:#c98b9b;--rose-deep:#b06e80;--gold:#c4a572;--plum:#4a3640;--plum-soft:#6e5560}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:'Montserrat',system-ui,sans-serif;background:var(--cream);color:var(--plum);-webkit-font-smoothing:antialiased;line-height:1.6}
h1,h2,h3{font-family:'Cormorant Garamond',Georgia,serif;letter-spacing:-.01em;line-height:1.15;color:var(--plum)}
a{color:inherit}
.wrap{max-width:60rem;margin:0 auto;padding:0 1.5rem}
header.site{position:sticky;top:0;z-index:50;background:rgba(253,249,246,.82);backdrop-filter:blur(14px);border-bottom:1px solid rgba(243,220,213,.7)}
header.site .row{max-width:72rem;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.85rem 1.5rem}
.brand{display:flex;flex-direction:column;line-height:1;text-decoration:none}
.brand b{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--plum)}
.brand span{font-size:.66rem;letter-spacing:.28em;text-transform:uppercase;color:var(--rose-deep);margin-top:.25rem}
.hnav{display:none;gap:1.4rem}
.hnav a{font-size:.85rem;font-weight:500;color:var(--plum-soft);text-decoration:none}
.hnav a:hover{color:var(--rose-deep)}
.btn{display:inline-block;background:var(--rose-deep);color:var(--cream);text-decoration:none;border-radius:999px;padding:.7rem 1.5rem;font-size:.85rem;font-weight:500;box-shadow:0 10px 24px rgba(176,110,128,.32);transition:transform .2s}
.btn:hover{transform:scale(1.04)}
.btn-call{white-space:nowrap}
.crumbs{font-size:.8rem;color:var(--plum-soft);padding:1.5rem 0 0}
.crumbs a{color:var(--rose-deep);text-decoration:none}
.crumbs a:hover{text-decoration:underline}
.hero{padding:1.5rem 0 1rem}
.kicker{font-size:.72rem;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--rose-deep)}
h1{font-size:2.3rem;font-weight:600;margin:.6rem 0 0}
.lead{font-size:1.12rem;color:var(--plum-soft);margin:1rem 0 0;max-width:44rem}
.hero-img{width:100%;max-height:380px;object-fit:cover;border-radius:1.5rem;margin-top:1.75rem;box-shadow:0 20px 50px rgba(74,54,64,.12)}
section.block{padding:2.2rem 0 0}
h2{font-size:1.7rem;font-weight:600;margin:0 0 .9rem}
p{margin:.6rem 0}
ul.ticks{list-style:none;padding:0;margin:.5rem 0;display:grid;gap:.55rem}
ul.ticks li{position:relative;padding-left:1.6rem;color:var(--plum-soft)}
ul.ticks li::before{content:'';position:absolute;left:0;top:.55em;width:.5rem;height:.5rem;border-radius:50%;background:var(--rose-deep)}
ol.steps{counter-reset:s;list-style:none;padding:0;margin:.5rem 0;display:grid;gap:.7rem}
ol.steps li{position:relative;padding-left:2.6rem;color:var(--plum-soft)}
ol.steps li::before{counter-increment:s;content:counter(s);position:absolute;left:0;top:-.1rem;width:1.8rem;height:1.8rem;display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--blush);color:var(--rose-deep);font-weight:600;font-size:.85rem}
.price{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1rem;background:var(--sand);border:1px solid var(--blush);border-radius:1rem;padding:1.1rem 1.3rem;margin-top:.5rem}
.price b{font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:var(--rose-deep)}
.price small{color:var(--plum-soft);font-size:.8rem}
.faq{margin-top:.6rem}
.faq details{border-bottom:1px solid var(--blush);padding:.9rem 0}
.faq summary{cursor:pointer;font-weight:600;color:var(--plum);list-style:none}
.faq summary::-webkit-details-marker{display:none}
.faq summary::before{content:'+';color:var(--rose-deep);font-weight:700;margin-right:.6rem}
.faq details[open] summary::before{content:'–'}
.faq p{color:var(--plum-soft);margin:.6rem 0 0}
.cta{margin:2.6rem 0 0;background:linear-gradient(135deg,var(--plum),var(--rose-deep));border-radius:1.8rem;padding:2.2rem;color:var(--cream);text-align:center;box-shadow:0 30px 60px rgba(74,54,64,.22)}
.cta h2{color:var(--cream);margin:0}
.cta p{color:rgba(253,249,246,.85);max-width:34rem;margin:.7rem auto 1.4rem}
.cta .phone{display:inline-block;font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:600;color:var(--cream);text-decoration:none;margin-top:.3rem}
.cta .btn{background:var(--cream);color:var(--plum)}
.related{margin-top:2.6rem}
.cards{display:grid;gap:1rem;grid-template-columns:1fr}
.card{display:block;text-decoration:none;background:var(--cream);border:1px solid rgba(243,220,213,.7);border-radius:1.1rem;padding:1.2rem 1.3rem;box-shadow:0 10px 30px rgba(74,54,64,.05);transition:transform .25s,box-shadow .25s}
.card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(74,54,64,.1)}
.card h3{font-size:1.18rem;font-weight:600;margin:0}
.card p{color:var(--plum-soft);font-size:.9rem;margin:.4rem 0 0}
.card .more{display:inline-block;margin-top:.7rem;font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--rose-deep)}
footer.site{margin-top:3rem;border-top:1px solid var(--blush);background:var(--cream);padding:2.2rem 0}
footer.site nav{display:flex;flex-wrap:wrap;gap:.6rem 1.4rem;font-size:.85rem;margin-top:.8rem}
footer.site nav a{color:var(--plum-soft);text-decoration:none}
footer.site nav a:hover{color:var(--rose-deep)}
footer.site .fine{color:rgba(110,85,96,.7);font-size:.75rem;margin-top:1.4rem;border-top:1px solid rgba(243,220,213,.5);padding-top:1.1rem}
@media(min-width:768px){.hnav{display:flex}h1{font-size:2.9rem}.cards{grid-template-columns:repeat(3,1fr)}}
</style>
</head>`
}

function siteHeader() {
  return `<header class="site"><div class="row">
<a class="brand" href="/"><b>${esc(SITE.brand)}</b><span>косметолог · дерматолог</span></a>
<nav class="hnav">
<a href="/uslugi/">Услуги</a>
<a href="/blog/">Блог</a>
<a href="/#pricing">Цены</a>
<a href="/#works">Работы</a>
<a href="/#reviews">Отзывы</a>
<a href="/#contact">Контакты</a>
</nav>
<a class="btn btn-call" href="${SITE.phoneHref}">${esc(SITE.phone)}</a>
</div></header>`
}

function siteFooter() {
  const links = serviceLike
    .map((s) => `<a href="/uslugi/${s.slug}/">${esc(s.name)}</a>`)
    .join('\n')
  return `<footer class="site"><div class="wrap">
<a class="brand" href="/"><b>${esc(SITE.brand)}</b><span>косметолог · дерматолог · ${esc(SITE.city)}</span></a>
<nav>
<a href="/">Главная</a>
<a href="/uslugi/">Все услуги</a>
<a href="/blog/">Блог</a>
${links}
</nav>
<p class="fine">© ${new Date().getFullYear()} ${esc(SITE.doctor)}. ${esc(SITE.address)}. Тел.: ${esc(SITE.phone)}. Информация на сайте не является публичной офертой. Имеются противопоказания, необходима консультация специалиста.</p>
</div></footer>`
}

function ctaBlock(name) {
  return `<div class="cta">
<h2>Записаться на приём</h2>
<p>${esc(name)} в Иркутске — у врача-косметолога и дерматолога ${esc(SITE.doctor)}. Приём по адресу: ${esc(SITE.address)}.</p>
<a class="phone" href="${SITE.phoneHref}">${esc(SITE.phone)}</a>
<div><a class="btn" href="${SITE.phoneHref}">Позвонить и записаться</a></div>
</div>`
}

// ---------- JSON-LD ----------

function breadcrumbLd(name, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: O + '/' },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: O + '/uslugi/' },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  }
}

function procedureLd(s, url) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: s.name,
    description: s.metaDescription,
    url,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    howPerformed: s.what,
    provider: {
      '@type': 'Physician',
      name: SITE.doctor,
      url: O + '/',
      telephone: '+79086424440',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'пер. Гусарова, 2',
        addressLocality: 'Иркутск',
        addressRegion: 'Иркутская область',
        addressCountry: 'RU',
      },
    },
  }
  if (s.priceMin) {
    ld.offers = {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: s.priceMin, priceCurrency: 'RUB' },
      url,
    }
  }
  return ld
}

function faqLd(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// ---------- страница услуги ----------

function servicePage(s) {
  const url = `${O}/uslugi/${s.slug}/`
  const ogImage = s.image ? `${O}/${s.image}` : `${O}/og.jpg`
  const related = (s.related || [])
    .map((id) => byId[id])
    .filter(Boolean)

  const html =
    head({
      title: s.metaTitle,
      description: s.metaDescription,
      keywords: s.keywords,
      canonical: url,
      ogImage,
      jsonld: [breadcrumbLd(s.name, url), procedureLd(s, url), faqLd(s)],
    }) +
    `\n<body>
${siteHeader()}
<div class="wrap">
<nav class="crumbs" aria-label="Хлебные крошки">
<a href="/">Главная</a> → <a href="/uslugi/">Услуги</a> → ${esc(s.name)}
</nav>

<div class="hero">
<span class="kicker">Услуга · ${esc(SITE.city)}</span>
<h1>${esc(s.h1)}</h1>
<p class="lead">${esc(s.lead)}</p>
${s.image ? `<img class="hero-img" src="/${s.image}" alt="${esc(s.imageAlt || s.name)}" loading="lazy" width="960" height="380" />` : ''}
</div>

<section class="block">
<h2>Что это и для чего</h2>
<p>${esc(s.what)}</p>
</section>

<section class="block">
<h2>Когда подходит</h2>
<ul class="ticks">
${s.indications.map((i) => `<li>${esc(i)}</li>`).join('\n')}
</ul>
</section>

<section class="block">
<h2>Как проходит</h2>
<ol class="steps">
${s.how.map((i) => `<li>${esc(i)}</li>`).join('\n')}
</ol>
${s.effect ? `<p>${esc(s.effect)}</p>` : ''}
</section>

<section class="block">
<h2>Цена</h2>
<div class="price"><b>${esc(s.price)}</b><small>Точная стоимость рассчитывается на консультации после осмотра. Ориентировочные цены — в разделе <a href="/#pricing" style="color:var(--rose-deep)">«Цены»</a>.</small></div>
</section>

<section class="block">
<h2>Частые вопросы</h2>
<div class="faq">
${s.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
</div>
</section>

${ctaBlock(s.name)}

${
  related.length
    ? `<section class="related">
<h2>Другие услуги</h2>
<div class="cards">
${related
  .map(
    (r) => `<a class="card" href="/uslugi/${r.slug}/"><h3>${esc(r.name)}</h3><p>${esc(r.lead.slice(0, 95))}…</p><span class="more">Подробнее →</span></a>`,
  )
  .join('\n')}
</div>
</section>`
    : ''
}
</div>
${siteFooter()}
${metrika()}
</body>
</html>`

  return html
}

// ---------- страница-хаб /uslugi/ ----------

function serviceCards(list) {
  return list
    .map(
      (s) =>
        `<a class="card" href="/uslugi/${s.slug}/"><h3>${esc(s.name)}</h3><p>${esc(s.lead.slice(0, 100))}…</p><span class="more">Подробнее →</span></a>`,
    )
    .join('\n')
}

function hubPage() {
  const url = `${O}/uslugi/`
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: serviceLike.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: `${O}/uslugi/${s.slug}/`,
    })),
  }
  const crumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: O + '/' },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: url },
    ],
  }

  return (
    head({
      title: 'Услуги врача-косметолога в Иркутске — цены | Юлия Васильева',
      description:
        'Услуги врача-косметолога и дерматолога Юлии Васильевой в Иркутске: ботулинотерапия, контурная пластика, биоревитализация, SMAS- и RF-лифтинг, лазеротерапия FOTONA, лечение акне, купероз, пигментация. Запись: 8 (908) 642-44-40.',
      keywords:
        'услуги косметолога Иркутск, косметолог Иркутск цены, процедуры косметолога Иркутск, врач косметолог дерматолог Иркутск',
      canonical: url,
      ogImage: `${O}/og.jpg`,
      jsonld: [crumb, itemList],
    }) +
    `\n<body>
${siteHeader()}
<div class="wrap">
<nav class="crumbs" aria-label="Хлебные крошки"><a href="/">Главная</a> → Услуги</nav>
<div class="hero">
<span class="kicker">Услуги · ${esc(SITE.city)}</span>
<h1>Услуги врача-косметолога и дерматолога</h1>
<p class="lead">Процедуры и направления лечения, которые я провожу в Иркутске. Выберите услугу, чтобы узнать, что это, кому подходит, как проходит и сколько стоит. Конкретный план подбираю на консультации после осмотра.</p>
</div>
<section class="block">
<h2>Процедуры</h2>
<div class="cards">
${serviceCards(services)}
</div>
</section>
<section class="block">
<h2>Решение проблем кожи</h2>
<div class="cards">
${serviceCards(problems)}
</div>
</section>
${ctaBlock('Консультация и процедуры')}
</div>
${siteFooter()}
${metrika()}
</body>
</html>`
  )
}

// ---------- статья блога /blog/<slug>/ ----------

function articleLd(a, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.metaDescription,
    inLanguage: 'ru',
    datePublished: a.date,
    dateModified: a.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Physician', name: SITE.doctor, url: O + '/' },
    publisher: {
      '@type': 'Organization',
      name: `${SITE.brand} — косметолог в Иркутске`,
      url: O + '/',
    },
  }
}

function blogCrumbLd(title, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: O + '/' },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: O + '/blog/' },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }
}

function articleSection(s) {
  const body = (s.p || []).map((p) => `<p>${esc(p)}</p>`).join('\n')
  const list = s.list
    ? `<ul class="ticks">\n${s.list.map((i) => `<li>${esc(i)}</li>`).join('\n')}\n</ul>`
    : ''
  return `<section class="block">\n<h2>${esc(s.h)}</h2>\n${list}\n${body}\n</section>`
}

function articlePage(a) {
  const url = `${O}/blog/${a.slug}/`
  const related = (a.related || []).map((id) => byId[id]).filter(Boolean)
  const ld = [blogCrumbLd(a.title, url), articleLd(a, url)]
  if (a.faqs && a.faqs.length) ld.push(faqLd(a))

  return (
    head({
      title: a.metaTitle,
      description: a.metaDescription,
      keywords: a.keywords,
      canonical: url,
      ogImage: `${O}/og.jpg`,
      jsonld: ld,
    }) +
    `\n<body>
${siteHeader()}
<div class="wrap">
<nav class="crumbs" aria-label="Хлебные крошки"><a href="/">Главная</a> → <a href="/blog/">Блог</a> → ${esc(a.title)}</nav>
<div class="hero">
<span class="kicker">Статья · Блог</span>
<h1>${esc(a.title)}</h1>
<p class="lead">${esc(a.intro)}</p>
</div>
${a.sections.map(articleSection).join('\n')}
${
  a.faqs && a.faqs.length
    ? `<section class="block">
<h2>Частые вопросы</h2>
<div class="faq">
${a.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
</div>
</section>`
    : ''
}
${ctaBlock('Консультация врача-косметолога')}
${
  related.length
    ? `<section class="related">
<h2>Связанные услуги</h2>
<div class="cards">
${related
  .map(
    (r) => `<a class="card" href="/uslugi/${r.slug}/"><h3>${esc(r.name)}</h3><p>${esc(r.lead.slice(0, 95))}…</p><span class="more">Подробнее →</span></a>`,
  )
  .join('\n')}
</div>
</section>`
    : ''
}
</div>
${siteFooter()}
${metrika()}
</body>
</html>`
  )
}

// ---------- хаб блога /blog/ ----------

function blogHub() {
  const url = `${O}/blog/`
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.title,
      url: `${O}/blog/${a.slug}/`,
    })),
  }
  const crumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: O + '/' },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: url },
    ],
  }

  return (
    head({
      title: 'Блог врача-косметолога — статьи о косметологии | Юлия Васильева',
      description:
        'Статьи врача-косметолога и дерматолога из Иркутска: чем отличаются процедуры, что выбрать, что можно и нельзя после инъекций, со скольки лет к косметологу и другие частые вопросы.',
      keywords:
        'блог косметолога, статьи о косметологии, вопросы косметологу, что лучше процедуры косметология',
      canonical: url,
      ogImage: `${O}/og.jpg`,
      jsonld: [crumb, itemList],
    }) +
    `\n<body>
${siteHeader()}
<div class="wrap">
<nav class="crumbs" aria-label="Хлебные крошки"><a href="/">Главная</a> → Блог</nav>
<div class="hero">
<span class="kicker">Блог · ${esc(SITE.city)}</span>
<h1>Статьи о косметологии</h1>
<p class="lead">Отвечаю на частые вопросы пациентов простым языком: чем отличаются похожие процедуры, что выбрать, как вести себя после инъекций и когда вообще пора к косметологу.</p>
</div>
<section class="block related">
<div class="cards">
${articles
  .map(
    (a) => `<a class="card" href="/blog/${a.slug}/"><h3>${esc(a.title)}</h3><p>${esc(a.intro.slice(0, 110))}…</p><span class="more">Читать →</span></a>`,
  )
  .join('\n')}
</div>
</section>
${ctaBlock('Консультация врача-косметолога')}
</div>
${siteFooter()}
${metrika()}
</body>
</html>`
  )
}

// ---------- Яндекс.Метрика ----------

function metrika() {
  return `<script type="text/javascript">
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${SITE.metrikaId}','ym');
ym(${SITE.metrikaId},'init',{ssr:true,webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${SITE.metrikaId}" style="position:absolute;left:-9999px;" alt="" /></div></noscript>`
}

// ---------- sitemap ----------

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${O}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${O}/uslugi/`, priority: '0.9', changefreq: 'monthly' },
    ...serviceLike.map((s) => ({ loc: `${O}/uslugi/${s.slug}/`, priority: '0.8', changefreq: 'monthly' })),
    { loc: `${O}/blog/`, priority: '0.7', changefreq: 'monthly' },
    ...articles.map((a) => ({ loc: `${O}/blog/${a.slug}/`, priority: '0.6', changefreq: 'monthly' })),
  ]
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

// ---------- запись ----------

function writeFile(rel, content) {
  const file = path.join(DIST, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content, 'utf8')
}

;(function run() {
  if (!fs.existsSync(DIST)) {
    console.warn('[services] dist/ не найден — пропускаю (запускать после сборки)')
    return
  }
  writeFile('uslugi/index.html', hubPage())
  for (const s of serviceLike) {
    writeFile(`uslugi/${s.slug}/index.html`, servicePage(s))
  }
  writeFile('blog/index.html', blogHub())
  for (const a of articles) {
    writeFile(`blog/${a.slug}/index.html`, articlePage(a))
  }
  writeFile('sitemap.xml', buildSitemap())
  const total = serviceLike.length + 1 + articles.length + 1
  console.log(`[services] сгенерировано страниц: ${total} (услуги+проблемы+блог) + sitemap.xml`)
})()
