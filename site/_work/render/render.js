// Renders scene.html frame by frame to JPEGs: node render.js <outDir> [fps] [seconds] [onlyTimes...]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const out = process.argv[2] || 'frames';
  const fps = Number(process.argv[3] || 30);
  const secs = Number(process.argv[4] || 6);
  const only = process.argv.slice(5).map(Number);
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('console', m => console.log('page:', m.text()));
  page.on('pageerror', e => console.log('pageerror:', e.message));
  await page.goto('file://' + path.resolve(__dirname, 'scene.html'));
  const times = only.length ? only : Array.from({ length: Math.round(fps * secs) }, (_, i) => i / fps);
  for (let i = 0; i < times.length; i++) {
    const url = await page.evaluate(t => window.render(t), times[i]);
    const name = only.length ? `t${times[i]}.jpg` : `f${String(i).padStart(4, '0')}.jpg`;
    fs.writeFileSync(path.join(out, name), Buffer.from(url.split(',')[1], 'base64'));
  }
  await browser.close();
  console.log('rendered', times.length);
})();
