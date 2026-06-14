/* Общий диагональный водяной знак (плиточный паттерн). */
const WM = 'Ю. ВАСИЛЬЕВА'

function watermarkSvg(w, h, opacity = 0.2) {
  const tileW = 200
  const tileH = 105
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wm" width="${tileW}" height="${tileH}" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <text x="6" y="${tileH / 2}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="0.5" fill="rgba(74,54,64,${opacity})">${WM}</text>
        </pattern>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#wm)"/>
    </svg>`,
  )
}

module.exports = { watermarkSvg, WM }
