/* Конвертирует все JPG/PNG в public/ в WebP и удаляет исходники.
   Запуск: node scripts/convert-to-webp.cjs */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', 'public')

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    return e.isDirectory() ? walk(full) : [full]
  })
}

;(async () => {
  const targets = walk(ROOT).filter((f) => /\.(jpe?g|png)$/i.test(f))
  for (const src of targets) {
    const out = src.replace(/\.(jpe?g|png)$/i, '.webp')
    await sharp(src).webp({ quality: 80 }).toFile(out)
    fs.unlinkSync(src)
    console.log(`${path.relative(ROOT, src)} -> ${path.basename(out)}`)
  }
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
