const { chromium } = require('@playwright/test');
const path = require('path');

const viewports = [
  { name: 'mobile-small', width: 375, height: 667 },
  { name: 'mobile-large', width: 414, height: 896 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-small', width: 1366, height: 768 },
  { name: 'desktop-large', width: 1920, height: 1080 },
];

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  
  for (const viewport of viewports) {
    console.log(`Capturing ${viewport.name} (${viewport.width}x${viewport.height})`);
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();
    
    try {
      // Go directly to model-download-test page (bypasses auth)
      await page.goto('http://localhost:1420/model-download-test', { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      // Wait a bit for any animations
      await page.waitForTimeout(1000);
      
      // Take screenshot
      await page.screenshot({
        path: path.join(__dirname, 'screenshots', `${viewport.name}-model-download.png`),
        fullPage: true,
      });
      
      console.log(`✓ Captured ${viewport.name}`);
      
      // Check grid layout
      const gridElement = await page.$('[class*="grid"]');
      if (gridElement) {
        const classes = await gridElement.getAttribute('class');
        console.log(`  Grid classes: ${classes}`);
      }
      
      // Count visible cards
      const cards = await page.$$('[class*="Card"]');
      console.log(`  Found ${cards.length} cards`);
      
      // Check if cards are stacked or side-by-side
      if (cards.length >= 2) {
        const box1 = await cards[0].boundingBox();
        const box2 = await cards[1].boundingBox();
        if (box1 && box2) {
          const isStacked = box2.y > (box1.y + box1.height);
          console.log(`  Cards are ${isStacked ? 'stacked (vertical)' : 'side-by-side (horizontal)'}`);
        }
      }
      
    } catch (error) {
      console.error(`✗ Failed to capture ${viewport.name}: ${error.message}`);
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('\nScreenshots saved to ./screenshots/');
}

captureScreenshots().catch(console.error);