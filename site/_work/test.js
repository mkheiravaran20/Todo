const { chromium } = require('playwright');
const OUT = '/home/user/Todo/site/_review/shots/';
const URL = 'http://localhost:8765/index.html';
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  // desktop scrub
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push('desktop: ' + m.text()); });
  page.on('pageerror', e => errors.push('desktop pageerror: ' + e.message));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const ready = await page.evaluate(() => document.getElementById('stage').classList.contains('video-ready'));
  console.log('video-ready', ready);
  const range = await page.evaluate(() => document.getElementById('top').offsetHeight - innerHeight);
  for (const p of [0, .12, .38, .65, .92, 1]) {
    await page.evaluate(y => scrollTo(0, y), Math.round(p * range));
    await page.waitForTimeout(1200);
    const t = await page.evaluate(() => document.getElementById('hero').currentTime.toFixed(2));
    console.log('p', p, 'videoTime', t);
    await page.screenshot({ path: `${OUT}hero-${p}.jpg`, quality: 70 });
  }
  // flick test
  for (const step of [120, 240, 360]) {
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600);
    const log = [];
    for (let i = 0; i < Math.ceil(range / step) + 1; i++) {
      await page.mouse.wheel(0, step); await page.waitForTimeout(350);
      log.push(await page.evaluate(() => [...document.querySelectorAll('.band')].map(b => +getComputedStyle(b).opacity)));
    }
    const res = [0,1,2,3].map(b => { let best = 0, run = 0; for (const r of log) { if (r[b] > .98) { run++; best = Math.max(best, run); } else run = 0; } return best; });
    console.log('flick', step, 'full-opacity consecutive steps per band', res.join(','));
  }
  // full page sections
  await page.evaluate(() => scrollTo(0, 0));
  for (const id of ['familiar', 'how', 'light', 'prices', 'words', 'questions', 'book']) {
    await page.evaluate(i => document.getElementById(i).scrollIntoView(), id);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}sec-${id}.jpg`, quality: 70 });
  }
  // hold interaction
  await page.evaluate(() => document.getElementById('light').scrollIntoView());
  await page.waitForTimeout(800);
  const lan = page.locator('.lan').nth(1);
  const box = await lan.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + 50);
  await page.mouse.down(); await page.waitForTimeout(500); await page.mouse.up(); await page.waitForTimeout(300);
  console.log('early release p', await lan.evaluate(e => getComputedStyle(e).getPropertyValue('--p')));
  await page.waitForTimeout(1200);
  console.log('after ease back p', await lan.evaluate(e => getComputedStyle(e).getPropertyValue('--p')));
  await page.mouse.down(); await page.waitForTimeout(1400); await page.mouse.up(); await page.waitForTimeout(700);
  console.log('tip shown', await page.evaluate(() => document.getElementById('t2').classList.contains('show')));
  await page.screenshot({ path: `${OUT}light-done.jpg`, quality: 70 });
  // form
  await page.evaluate(() => document.getElementById('book').scrollIntoView());
  await page.click('button[type=submit]');
  console.log('empty submit blocked', await page.evaluate(() => !document.querySelector('.book').classList.contains('sent')));
  await page.fill('input[name=name]', 'Sam'); await page.fill('input[name=business]', 'Sam Shop'); await page.fill('input[name=email]', 'sam@example.com');
  await page.click('button[type=submit]'); await page.waitForTimeout(800);
  console.log('sent', await page.evaluate(() => document.querySelector('.book').classList.contains('sent')));
  await page.screenshot({ path: `${OUT}form-sent.jpg`, quality: 70 });
  // sideways overflow
  console.log('sideways', await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  // reduced motion flip live
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(400);
  console.log('rm string pinned', await page.evaluate(() => getComputedStyle(document.getElementById('stringFill')).transform));
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(400);
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(800);
  console.log('rm flip back: band1 opacity', await page.evaluate(() => getComputedStyle(document.querySelector('.b1')).opacity));
  await ctx.close();

  // video missing
  const c2 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p2 = await c2.newPage();
  p2.on('pageerror', e => errors.push('novideo pageerror: ' + e.message));
  await p2.route('**/hero-scrub.*', r => r.abort());
  await p2.goto(URL); await p2.waitForTimeout(2500);
  console.log('novideo failed class', await p2.evaluate(() => document.getElementById('stage').classList.contains('video-failed')));
  await p2.evaluate(() => scrollTo(0, document.getElementById('top').offsetHeight - innerHeight)); await p2.waitForTimeout(1200);
  await p2.screenshot({ path: `${OUT}novideo-end.jpg`, quality: 70 });
  await c2.close();

  // phones and reduced motion: no video request
  for (const [name, opts] of [['phone375', { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true }], ['phone375x667', { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true }], ['rm1280', { viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' }]]) {
    const c = await browser.newContext(opts);
    const pg = await c.newPage();
    let vidReq = false;
    pg.on('request', r => { if (r.url().includes('hero-scrub') || r.url().includes('hero-poster')) vidReq = true; });
    pg.on('console', m => { if (m.type() === 'error') errors.push(name + ': ' + m.text()); });
    pg.on('pageerror', e => errors.push(name + ' pageerror: ' + e.message));
    await pg.goto(URL, { waitUntil: 'networkidle' }); await pg.waitForTimeout(1200);
    console.log(name, 'video/poster requested:', vidReq, 'sideways:', await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth));
    await pg.screenshot({ path: `${OUT}${name}-top.jpg`, quality: 70 });
    await pg.screenshot({ path: `${OUT}${name}-full.jpg`, quality: 50, fullPage: true });
    await c.close();
  }
  console.log('ERRORS:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
})();
