const sharedTailwindConfig = require('./src/supra-preset.js');
// this helps to have tailwind intellisense autocompletion working
module.exports = {
  presets: [sharedTailwindConfig],
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
};
