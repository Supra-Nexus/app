#!/usr/bin/env node

/**
 * WCAG Contrast Ratio Checker for Hanzo UI
 * Ensures all text and UI elements meet accessibility standards
 */

const fs = require('fs');
const path = require('path');

// WCAG 2.1 Contrast Requirements
const WCAG_AA = {
  normal: 4.5,
  large: 3.0,
  ui: 3.0
};

const WCAG_AAA = {
  normal: 7.0,
  large: 4.5,
  ui: 4.5
};

// Color definitions from the app
const colors = {
  // Brand colors
  brand: '#FFFFFF',
  brandForeground: '#000000',
  
  // Background colors
  background: '#000000',
  foreground: '#FFFFFF',
  
  // UI element colors
  primary: '#FFFFFF',
  primaryForeground: '#000000',
  
  // Text on various backgrounds
  textOnDark: '#FFFFFF',
  textOnLight: '#000000',
  
  // Button states
  buttonPrimary: '#FFFFFF',
  buttonPrimaryText: '#000000',
  buttonSecondary: '#1a1a1a',
  buttonSecondaryText: '#FFFFFF',
  
  // Form elements
  checkboxChecked: '#FFFFFF',
  checkboxCheckedText: '#000000',
  inputBackground: '#0a0a0a',
  inputText: '#FFFFFF',
  inputBorder: '#404040',
  
  // Status colors
  success: '#10B981',
  successText: '#000000',
  error: '#EF4444',
  errorText: '#FFFFFF',
  warning: '#F59E0B',
  warningText: '#000000',
  info: '#3B82F6',
  infoText: '#FFFFFF'
};

// Calculate relative luminance (WCAG formula)
function relativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

// Calculate contrast ratio
function contrastRatio(color1, color2) {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Test contrast combinations
function testContrast() {
  console.log('🎨 Hanzo UI Contrast Ratio Testing');
  console.log('===================================\\n');
  
  const tests = [
    // Primary UI combinations
    { name: 'Primary Button', fg: colors.buttonPrimaryText, bg: colors.buttonPrimary, type: 'ui' },
    { name: 'Secondary Button', fg: colors.buttonSecondaryText, bg: colors.buttonSecondary, type: 'ui' },
    { name: 'Main Text', fg: colors.foreground, bg: colors.background, type: 'normal' },
    { name: 'Brand Elements', fg: colors.brandForeground, bg: colors.brand, type: 'ui' },
    
    // Form elements
    { name: 'Input Field', fg: colors.inputText, bg: colors.inputBackground, type: 'normal' },
    { name: 'Checkbox (Checked)', fg: colors.checkboxCheckedText, bg: colors.checkboxChecked, type: 'ui' },
    
    // Status messages
    { name: 'Success Message', fg: colors.successText, bg: colors.success, type: 'normal' },
    { name: 'Error Message', fg: colors.errorText, bg: colors.error, type: 'normal' },
    { name: 'Warning Message', fg: colors.warningText, bg: colors.warning, type: 'normal' },
    { name: 'Info Message', fg: colors.infoText, bg: colors.info, type: 'normal' },
  ];
  
  let allPassed = true;
  const results = [];
  
  tests.forEach(test => {
    const ratio = contrastRatio(test.fg, test.bg);
    const required = WCAG_AA[test.type];
    const passed = ratio >= required;
    
    if (!passed) allPassed = false;
    
    results.push({
      name: test.name,
      ratio: ratio.toFixed(2),
      required: required.toFixed(1),
      passed,
      level: ratio >= WCAG_AAA[test.type] ? 'AAA' : ratio >= WCAG_AA[test.type] ? 'AA' : 'FAIL'
    });
  });
  
  // Display results
  console.log('Test Results:');
  console.log('-------------');
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    const badge = result.level === 'AAA' ? '🏆' : result.level === 'AA' ? '✓' : '✗';
    console.log(`${icon} ${result.name.padEnd(20)} ${badge} ${result.ratio}:1 (min: ${result.required}:1) - WCAG ${result.level}`);
  });
  
  console.log('\\n===================================');
  if (allPassed) {
    console.log('✅ All contrast ratios meet WCAG AA standards!');
    console.log('🎉 Hanzo UI is accessible!');
    process.exit(0);
  } else {
    console.log('❌ Some contrast ratios do not meet WCAG AA standards');
    console.log('Please review and fix the failing combinations.');
    process.exit(1);
  }
}

// Run the tests
testContrast();