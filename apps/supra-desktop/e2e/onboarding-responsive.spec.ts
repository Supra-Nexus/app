import { test, expect } from '@playwright/test';
import { join } from 'path';

// Define viewport sizes for testing
const viewports = [
  { name: 'mobile-small', width: 375, height: 667 },  // iPhone SE
  { name: 'mobile-large', width: 414, height: 896 },  // iPhone 11 Pro Max
  { name: 'tablet', width: 768, height: 1024 },       // iPad
  { name: 'desktop-small', width: 1366, height: 768 }, // Small laptop
  { name: 'desktop-large', width: 1920, height: 1080 }, // Full HD
  { name: 'desktop-xl', width: 2560, height: 1440 },   // 2K
];

// Pages to test in the onboarding flow
const onboardingPages = [
  { path: '/terms-conditions', name: 'terms-conditions' },
  { path: '/analytics', name: 'analytics' },
  { path: '/onboarding-checklist', name: 'onboarding-checklist' },
  { path: '/model-download', name: 'model-download' },
];

test.describe('Onboarding Flow - Responsive Testing', () => {
  viewports.forEach(viewport => {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      onboardingPages.forEach(page => {
        test(`${page.name} page`, async ({ page: playwrightPage }) => {
          // Navigate to the page
          await playwrightPage.goto(`http://localhost:1420${page.path}`);
          
          // Wait for the page to load
          await playwrightPage.waitForLoadState('networkidle');
          
          // Take a screenshot
          const screenshotPath = join(
            process.cwd(),
            'screenshots',
            `${viewport.name}-${page.name}.png`
          );
          
          await playwrightPage.screenshot({ 
            path: screenshotPath,
            fullPage: true 
          });

          // Specific checks for each page
          if (page.name === 'model-download') {
            // Check that model cards are visible
            const modelCards = await playwrightPage.locator('[class*="Card"]').all();
            expect(modelCards.length).toBeGreaterThan(0);
            
            // Check responsive grid layout
            const gridContainer = await playwrightPage.locator('[class*="grid"]').first();
            const gridClasses = await gridContainer.getAttribute('class');
            
            if (viewport.width < 768) {
              // Mobile: should be single column
              expect(gridClasses).toContain('grid-cols-1');
            } else if (viewport.width < 1280) {
              // Tablet/small desktop: should be 2 columns
              expect(gridClasses).toContain('md:grid-cols-2');
            } else {
              // Large desktop: should allow 3 columns
              expect(gridClasses).toContain('xl:grid-cols-3');
            }
            
            // Check that buttons are visible and properly sized
            const buttons = await playwrightPage.locator('button').all();
            for (const button of buttons) {
              const isVisible = await button.isVisible();
              expect(isVisible).toBeTruthy();
              
              // Check button has minimum touch target size on mobile
              if (viewport.width < 768) {
                const box = await button.boundingBox();
                if (box) {
                  expect(box.height).toBeGreaterThanOrEqual(44); // Minimum touch target
                }
              }
            }
          }
          
          if (page.name === 'onboarding-checklist') {
            // Check that checklist items are visible
            const checklistItems = await playwrightPage.locator('[class*="Card"]').all();
            expect(checklistItems.length).toBeGreaterThan(0);
            
            // Check that progress bar is visible
            const progressBar = await playwrightPage.locator('[class*="Progress"]').first();
            expect(await progressBar.isVisible()).toBeTruthy();
          }
          
          // Check for overflow issues
          const bodyElement = await playwrightPage.locator('body');
          const bodyBox = await bodyElement.boundingBox();
          const viewportSize = playwrightPage.viewportSize();
          
          if (bodyBox && viewportSize) {
            // Check horizontal overflow
            expect(bodyBox.width).toBeLessThanOrEqual(viewportSize.width + 20); // Allow small margin for scrollbar
          }
          
          // Check text readability
          const allText = await playwrightPage.locator('p, span, h1, h2, h3, h4, h5, h6').all();
          for (const textElement of allText.slice(0, 10)) { // Check first 10 text elements
            const fontSize = await textElement.evaluate(el => 
              window.getComputedStyle(el).fontSize
            );
            const fontSizeNum = parseFloat(fontSize);
            
            // Ensure minimum readable font size
            if (viewport.width < 768) {
              expect(fontSizeNum).toBeGreaterThanOrEqual(12);
            } else {
              expect(fontSizeNum).toBeGreaterThanOrEqual(14);
            }
          }
        });
      });
    });
  });
});

// Additional test for interaction flow
test.describe('Onboarding Interaction Flow', () => {
  test('Complete onboarding flow on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Start at terms page
    await page.goto('http://localhost:1420/terms-conditions');
    
    // Accept terms (if there's an accept button)
    const acceptButton = page.locator('button:has-text("Accept"), button:has-text("Continue")').first();
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
      await page.waitForURL('**/analytics');
    }
    
    // Analytics page
    const analyticsButton = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
    if (await analyticsButton.isVisible()) {
      await analyticsButton.click();
      await page.waitForURL('**/onboarding-checklist');
    }
    
    // Checklist page
    const checklistButton = page.locator('button:has-text("Continue Setup")').first();
    if (await checklistButton.isVisible()) {
      await checklistButton.click();
      await page.waitForURL('**/model-download');
    }
    
    // Model download page - check layout
    await page.waitForSelector('[class*="grid"]');
    const modelCards = await page.locator('[class*="Card"]').all();
    
    // On mobile, cards should stack vertically
    if (modelCards.length > 1) {
      const firstCardBox = await modelCards[0].boundingBox();
      const secondCardBox = await modelCards[1].boundingBox();
      
      if (firstCardBox && secondCardBox) {
        // Cards should be stacked (second card Y position > first card bottom)
        expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height);
      }
    }
  });
  
  test('Complete onboarding flow on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to model download page directly for testing
    await page.goto('http://localhost:1420/model-download');
    
    // Check that cards are in a row on desktop
    await page.waitForSelector('[class*="grid"]');
    const modelCards = await page.locator('[class*="Card"]').all();
    
    if (modelCards.length > 1) {
      const firstCardBox = await modelCards[0].boundingBox();
      const secondCardBox = await modelCards[1].boundingBox();
      
      if (firstCardBox && secondCardBox) {
        // Cards should be side by side (similar Y position)
        expect(Math.abs(secondCardBox.y - firstCardBox.y)).toBeLessThan(50);
      }
    }
  });
});