/* Обрезает поля сканов дипломов, ресайзит и наносит диагональный водяной знак.
   Запуск: node scripts/process-diplomas.cjs */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const { watermarkSvg } = require('./watermark.cjs')

const SRC = 'C:/Users/administrator/Desktop/косметология инста/образование'
const OUT = path.join(__dirname, '..', 'public', 'diplomas')
fs.mkdirSync(OUT, { recursive: true })

const files = [
  { in: '5294485651724115618.jpg', out: 'diplom-lechebnoe-delo-2014.webp' },
  { in: '5294485651724115622.jpg', out: 'ordinatura-dermatovenerologiya-2016.webp' },
  { in: '5294485651724115620.jpg', out: 'perepodgotovka-kosmetologiya-2017.webp' },
  { in: '5294485651724115617.jpg', out: 'sertifikat-dermatovenerologiya-2020.webp' },
  { in: '5294485651724115619.jpg', out: 'sertifikat-kosmetologiya-2020.webp' },
  { in: '5294485651724115621.jpg', out: 'udostoverenie-uzi-kozhi-2022.webp' },
]

;(async () => {
  for (const f of files) {
    const src = path.join(SRC, f.in)
    // 1. trim uniform grey/white borders
    let buf = await sharp(src).trim({ threshold: 130 }).toBuffer()
    // 2. resize to readable width
    let meta = await sharp(buf).metadata()
    const targetW = Math.min(1200, meta.width)
    buf = await sharp(buf).resize({ width: targetW }).toBuffer()
    meta = await sharp(buf).metadata()
    // 3. watermark + export
    await sharp(buf)
      .composite([{ input: watermarkSvg(meta.width, meta.height) }])
      .webp({ quality: 80 })
      .toFile(path.join(OUT, f.out))
    console.log(`${f.out}  ${meta.width}x${meta.height}`)
  }
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
