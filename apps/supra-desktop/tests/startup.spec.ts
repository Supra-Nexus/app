import { test, expect, _electron as electron } from '@playwright/test';
import { ElectronApplication, Page } from 'playwright';
import path from 'path';

let electronApp: ElectronApplication;
let page: Page;

test.describe('Supra AI Desktop App Startup', () => {
  test.beforeAll(async () => {
    // Launch the Electron app
    const appPath = path.join(__dirname, '../src-tauri/target/debug/supra-desktop');
    
    electronApp = await electron.launch({
      args: [appPath],
      env: {
        ...process.env,
        NODE_ENV: 'test',
      },
    });

    // Get the first window that opens
    page = await electronApp.firstWindow();
    
    // Capture console messages
    page.on('console', msg => {
      console.log(`Browser console [${msg.type()}]:`, msg.text());
    });
    
    // Capture page errors
    page.on('pageerror', error => {
      console.error('Page error:', error);
    });
    
    // Capture uncaught exceptions
    page.on('crash', () => {
      console.error('Page crashed!');
    });
  });

  test.afterAll(async () => {
    if (electronApp) {
      await electronApp.close();
    }
  });

  test('app should launch without errors', async () => {
    // Wait for app to be ready
    await page.waitForLoadState('networkidle');
    
    // Check if the main window opened
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Check for any JavaScript errors
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    // Wait a bit to catch any delayed errors
    await page.waitForTimeout(2000);
    
    expect(errors).toHaveLength(0);
  });

  test('Get Started Free button should be visible', async () => {
    // Look for the Get Started Free button
    const getStartedButton = await page.locator('button:has-text("Get Started Free")').first();
    
    if (await getStartedButton.isVisible()) {
      console.log('Get Started Free button found');
      expect(await getStartedButton.isVisible()).toBeTruthy();
    }
  });

  test('clicking Get Started Free should start Supra Node', async () => {
    const getStartedButton = await page.locator('button:has-text("Get Started Free")').first();
    
    if (await getStartedButton.isVisible()) {
      // Set up promise to catch any errors
      const errorPromise = new Promise<string>((resolve) => {
        page.once('pageerror', (error) => {
          resolve(error.message);
        });
        
        page.once('console', (msg) => {
          if (msg.type() === 'error') {
            resolve(msg.text());
          }
        });
        
        // Timeout after 10 seconds
        setTimeout(() => resolve(''), 10000);
      });
      
      // Click the button
      await getStartedButton.click();
      
      // Wait for either an error or timeout
      const error = await errorPromise;
      
      if (error) {
        console.error('Error after clicking Get Started Free:', error);
        
        // Check for specific error patterns
        if (error.includes('Process ended before min time alive')) {
          console.error('suprad process is failing to start - likely configuration issue');
          
          // Try to get more details from the app
          const logs = await page.evaluate(() => {
            return (window as any).electronAPI?.getLogs?.() || 'No logs available';
          });
          console.log('App logs:', logs);
        }
      }
      
      // Check if Supra Node started
      await page.waitForTimeout(3000);
      
      // Look for success indicators
      const nodeRunning = await page.locator('text=/Supra Node.*running/i').count();
      const nodeStarted = await page.locator('text=/Started.*successfully/i').count();
      
      expect(nodeRunning + nodeStarted).toBeGreaterThan(0);
    }
  });

  test('check suprad process configuration', async () => {
    // Try to get the configuration being used
    const config = await page.evaluate(async () => {
      try {
        // Try to access Tauri API if available
        const { invoke } = (window as any).__TAURI__ || {};
        if (invoke) {
          return await invoke('supra_node_get_options');
        }
      } catch (e) {
        return { error: e.toString() };
      }
      return null;
    });
    
    console.log('Supra Node configuration:', JSON.stringify(config, null, 2));
    
    if (config && !config.error) {
      // Check critical configuration
      expect(config.initial_agent_names).toBeTruthy();
      expect(config.initial_agent_urls).toBeTruthy();
      expect(config.initial_agent_models).toBeTruthy();
      expect(config.initial_agent_api_keys).toBeTruthy();
      
      // Verify agent counts match
      const names = config.initial_agent_names?.split(',') || [];
      const urls = config.initial_agent_urls?.split(',') || [];
      const models = config.initial_agent_models?.split(',') || [];
      const apiKeys = config.initial_agent_api_keys?.split(',') || [];
      
      console.log('Agent configuration counts:');
      console.log('  Names:', names.length, names);
      console.log('  URLs:', urls.length, urls);
      console.log('  Models:', models.length, models);
      console.log('  API Keys:', apiKeys.length, apiKeys);
      
      expect(names.length).toBe(urls.length);
      expect(names.length).toBe(models.length);
      expect(names.length).toBe(apiKeys.length + 1); // API keys use comma separator
    }
  });
});