/* Наносит водяной знак на фото работ и сохраняет в WebP.
   Запуск: node scripts/process-works.cjs */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const { watermarkSvg } = require('./watermark.cjs')

const SRC = 'C:/Users/administrator/Desktop/косметология инста/работы'
const OUT = path.join(__dirname, '..', 'public', 'works')
fs.mkdirSync(OUT, { recursive: true })

const files = [
  { in: 'SMASS-лифтинг.jpg', out: 'smas-lifting.webp' },
  { in: 'лечение акне 1.jpg', out: 'acne-1.webp' },
  { in: 'Лечение акне 2.jpg', out: 'acne-2.webp' },
  { in: 'Микроигольчатый РФ Лифтинг.jpg', out: 'microneedle-rf.webp' },
  { in: 'аугутментация губ гк 1.jpg', out: 'lips-1.webp' },
  { in: 'аугутментация губ гк 2.jpg', out: 'lips-2.webp' },
  { in: 'аугутментация губ гк 3.jpg', out: 'lips-3.webp' },
]

;(async () => {
  for (const f of files) {
    let buf = await sharp(path.join(SRC, f.in)).resize({ width: 1080, withoutEnlargement: true }).toBuffer()
    const meta = await sharp(buf).metadata()
    await sharp(buf)
      .composite([{ input: watermarkSvg(meta.width, meta.height, 0.22) }])
      .webp({ quality: 80 })
      .toFile(path.join(OUT, f.out))
    console.log(`${f.out}  ${meta.width}x${meta.height}`)
  }
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
