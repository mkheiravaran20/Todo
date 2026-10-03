const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const p = await c.newPage();
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
  const ids = ['familiar','how','light','prices','questions','book'];
  for (const id of ids) {
    await p.evaluate(i => document.getElementById(i).scrollIntoView(), id);
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `_review/shots/ph-${id}.jpg`, quality: 70 });
  }
  // tap-hold on touch
  await p.evaluate(() => document.getElementById('light').scrollIntoView());
  await b.close();
})();
