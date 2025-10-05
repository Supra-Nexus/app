#!/usr/bin/env node

/**
 * Supra Logo Icon Generator
 * Generates all required icons for Supra app with the final perfect settings
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Final perfect logo settings with thicker monochrome for menu bar
const logoSettings = {
    color: {
        outerRadius: 270,
        outerX: 512,
        outerY: 511,
        circleRadius: 234,
        greenX: 513,
        greenY: 369,
        redX: 365,
        redY: 595,
        blueX: 643,
        blueY: 595
    },
    mono: {
        outerRadius: 283,
        outerX: 508,
        outerY: 510,
        strokeWidth: 33,  // Thicker for menu bar visibility
        outerStrokeWidth: 36
    }
};

function generateColorSVG() {
    const s = logoSettings.color;
    return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="blackGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#1a1a1a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
            </radialGradient>
            <clipPath id="outerCircleColor">
                <circle cx="${s.outerX}" cy="${s.outerY}" r="${s.outerRadius}"/>
            </clipPath>
            <clipPath id="greenClip">
                <circle cx="${s.greenX}" cy="${s.greenY}" r="${s.circleRadius}"/>
            </clipPath>
            <clipPath id="redClip">
                <circle cx="${s.redX}" cy="${s.redY}" r="${s.circleRadius}"/>
            </clipPath>
            <clipPath id="blueClip">
                <circle cx="${s.blueX}" cy="${s.blueY}" r="${s.circleRadius}"/>
            </clipPath>
        </defs>
        <rect x="0" y="0" width="1024" height="1024" fill="url(#blackGradient)"/>
        <g clip-path="url(#outerCircleColor)">
            <circle cx="${s.greenX}" cy="${s.greenY}" r="${s.circleRadius}" fill="#00A652"/>
            <circle cx="${s.redX}" cy="${s.redY}" r="${s.circleRadius}" fill="#ED1C24"/>
            <circle cx="${s.blueX}" cy="${s.blueY}" r="${s.circleRadius}" fill="#2E3192"/>
            <g clip-path="url(#greenClip)">
                <circle cx="${s.redX}" cy="${s.redY}" r="${s.circleRadius}" fill="#FCF006"/>
            </g>
            <g clip-path="url(#greenClip)">
                <circle cx="${s.blueX}" cy="${s.blueY}" r="${s.circleRadius}" fill="#01ACF1"/>
            </g>
            <g clip-path="url(#redClip)">
                <circle cx="${s.blueX}" cy="${s.blueY}" r="${s.circleRadius}" fill="#EA018E"/>
            </g>
            <g clip-path="url(#greenClip)">
                <g clip-path="url(#redClip)">
                    <circle cx="${s.blueX}" cy="${s.blueY}" r="${s.circleRadius}" fill="#FFFFFF"/>
                </g>
            </g>
        </g>
    </svg>`;
}

function generateMonoSVG() {
    const c = logoSettings.color;
    const m = logoSettings.mono;
    return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="outerCircleMono">
                <circle cx="${m.outerX}" cy="${m.outerY}" r="${m.outerRadius}"></circle>
            </clipPath>
        </defs>
        <g clip-path="url(#outerCircleMono)">
            <circle cx="${c.greenX}" cy="${c.greenY}" r="${c.circleRadius}" fill="none" stroke="black" stroke-width="${m.strokeWidth}"></circle>
            <circle cx="${c.redX}" cy="${c.redY}" r="${c.circleRadius}" fill="none" stroke="black" stroke-width="${m.strokeWidth}"></circle>
            <circle cx="${c.blueX}" cy="${c.blueY}" r="${c.circleRadius}" fill="none" stroke="black" stroke-width="${m.strokeWidth}"></circle>
            <circle cx="${m.outerX}" cy="${m.outerY}" r="${m.outerRadius - m.outerStrokeWidth/2}" fill="none" stroke="black" stroke-width="${m.outerStrokeWidth}"></circle>
        </g>
    </svg>`;
}

async function generateIcon(svgString, outputPath, size) {
    await sharp(Buffer.from(svgString))
        .resize(size, size)
        .png()
        .toFile(outputPath);
    console.log(`✓ ${path.basename(outputPath)} (${size}×${size})`);
}

async function generateAllIcons() {
    console.log('🎨 Supra Logo Icon Generator');
    console.log('========================\n');

    const colorSVG = generateColorSVG();
    const monoSVG = generateMonoSVG();

    // Icon configurations for different locations
    const iconConfigs = [
        // Main app assets
        { svg: colorSVG, path: 'assets/icon.png', size: 512 },
        { svg: colorSVG, path: 'supra-logo.png', size: 256 },

        // Tauri desktop icons
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_16x16.png', size: 16 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_16x16@2x.png', size: 32 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_32x32.png', size: 32 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_32x32@2x.png', size: 64 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_128x128.png', size: 128 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_128x128@2x.png', size: 256 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_256x256.png', size: 256 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_256x256@2x.png', size: 512 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_512x512.png', size: 512 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_512x512@2x.png', size: 1024 },
        { svg: colorSVG, path: 'apps/supra-desktop/src-tauri/icons/icon_1024x1024.png', size: 1024 },

        // Menu bar templates (monochrome)
        { svg: monoSVG, path: 'apps/supra-desktop/src-tauri/icons/iconTemplate.png', size: 16 },
        { svg: monoSVG, path: 'apps/supra-desktop/src-tauri/icons/iconTemplate@1.5x.png', size: 24 },
        { svg: monoSVG, path: 'apps/supra-desktop/src-tauri/icons/iconTemplate@2x.png', size: 32 },
        { svg: monoSVG, path: 'apps/supra-desktop/src-tauri/icons/iconTemplate@3x.png', size: 48 },

        // Public directory web icons
        { svg: colorSVG, path: 'apps/supra-desktop/public/favicon.png', size: 32 },
        { svg: colorSVG, path: 'apps/supra-desktop/public/supra-logo.png', size: 256 },
    ];

    // Save SVG sources
    const svgDir = 'apps/supra-desktop/src-tauri/icons';
    fs.writeFileSync(path.join(svgDir, 'icon.svg'), colorSVG);
    fs.writeFileSync(path.join(svgDir, 'supra-template-final.svg'), monoSVG);
    fs.writeFileSync('apps/supra-desktop/public/supra-logo.svg', colorSVG);
    console.log('✓ Saved SVG source files\n');

    // Generate all PNG icons
    console.log('Generating PNG icons:');
    for (const config of iconConfigs) {
        const fullPath = path.resolve(config.path);
        const dir = path.dirname(fullPath);

        // Ensure directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        await generateIcon(config.svg, fullPath, config.size);
    }

    console.log('\n✅ All icons generated successfully!');
    console.log('   Color logo: Perfect RGB overlaps with gradient background');
    console.log('   Monochrome: Thicker strokes (33/36) for menu bar visibility');
}

// Check if sharp is installed
const checkAndRun = async () => {
    try {
        require.resolve('sharp');
    } catch (e) {
        console.log('Installing sharp dependency...');
        const { execSync } = require('child_process');
        execSync('npm install sharp', { stdio: 'inherit' });
    }

    await generateAllIcons().catch(console.error);
};

checkAndRun();