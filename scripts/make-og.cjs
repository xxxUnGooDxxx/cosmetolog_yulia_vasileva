/* Генерирует OG-превью 1200x630 (public/og.jpg) из фото врача.
   Запуск: node scripts/make-og.cjs */
const sharp = require('sharp')
const path = require('path')

const PUB = path.join(__dirname, '..', 'public')
const W = 1200
const H = 630
const PHOTO_W = 420

;(async () => {
  const photo = await sharp(path.join(PUB, 'yulia.webp'))
    .resize({ width: PHOTO_W, height: H, fit: 'cover', position: 'top' })
    .toBuffer()

  const text = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#fdf9f6"/>
      <rect x="0" y="0" width="14" height="${H}" fill="#b06e80"/>
      <text x="70" y="148" font-family="Georgia, serif" font-size="26" fill="#b06e80" letter-spacing="2">ВРАЧ-КОСМЕТОЛОГ · ДЕРМАТОЛОГ</text>
      <text x="68" y="232" font-family="Georgia, serif" font-size="64" font-weight="700" fill="#4a3640">Юлия Васильева</text>
      <text x="70" y="300" font-family="Arial, sans-serif" font-size="30" fill="#6e5560">Иркутск · стаж 11 лет</text>
      <text x="70" y="395" font-family="Arial, sans-serif" font-size="25" fill="#4a3640">Лечение акне · омоложение · чистка лица</text>
      <text x="70" y="435" font-family="Arial, sans-serif" font-size="25" fill="#4a3640">пилинги · биоревитализация · лифтинг</text>
      <text x="70" y="535" font-family="Georgia, serif" font-size="40" font-weight="700" fill="#b06e80">8 (908) 642-44-40</text>
    </svg>`,
  )

  await sharp(text)
    .composite([{ input: photo, left: W - PHOTO_W, top: 0 }])
    .jpeg({ quality: 88 })
    .toFile(path.join(PUB, 'og.jpg'))
  console.log('og.jpg готов')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
