/* Пререндер: прогоняет собранный сайт через headless-браузер и сохраняет
   готовый HTML в dist/index.html (для поисковиков, особенно Яндекса).
   Безопасно: при любой ошибке оставляет исходный SPA index.html.
   Запуск: node scripts/prerender.cjs */
const http = require('http')
const fs = require('fs')
const path = require('path')

const DIST = path.join(__dirname, '..', 'dist')
const PORT = 4178

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
}

function serve() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0])
    let file = path.join(DIST, urlPath)
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const idx = path.join(file, 'index.html')
      file = fs.existsSync(idx) ? idx : path.join(DIST, 'index.html')
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.end()
        return
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
      res.end(data)
    })
  })
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0
      const step = 400
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        total += step
        if (total >= document.body.scrollHeight) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, 60)
    })
  })
}

;(async () => {
  let puppeteer
  try {
    puppeteer = require('puppeteer')
  } catch {
    console.warn('[prerender] puppeteer не установлен — пропускаю, остаётся SPA')
    return
  }

  const server = serve()
  await new Promise((r) => server.listen(PORT, r))

  let browser
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('#root > *', { timeout: 30000 })
    await autoScroll(page)
    await new Promise((r) => setTimeout(r, 1200))

    let html = await page.content()
    html = '<!doctype html>\n' + html.replace(/^<!doctype html>/i, '')
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8')
    console.log('[prerender] dist/index.html обновлён (статический HTML)')
  } catch (e) {
    console.warn('[prerender] не удалось — остаётся SPA:', e.message)
  } finally {
    if (browser) await browser.close()
    server.close()
  }
})()
