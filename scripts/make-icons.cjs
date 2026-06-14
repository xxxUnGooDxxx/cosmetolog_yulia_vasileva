/* Генерирует PNG-иконки из favicon.svg.
   Запуск: node scripts/make-icons.cjs */
const sharp = require('sharp')
const path = require('path')

const PUB = path.join(__dirname, '..', 'public')
const svg = path.join(PUB, 'favicon.svg')

const sizes = [
  { size: 180, out: 'apple-touch-icon.png' },
  { size: 192, out: 'icon-192.png' },
  { size: 512, out: 'icon-512.png' },
  { size: 32, out: 'favicon-32.png' },
]

;(async () => {
  for (const { size, out } of sizes) {
    await sharp(svg, { density: 300 })
      .resize(size, size)
      .png()
      .toFile(path.join(PUB, out))
    console.log(`${out}  ${size}x${size}`)
  }
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
