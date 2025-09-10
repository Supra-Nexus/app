# Zoo App CI/CD Workflows

## Workflow Overview

### 🖥️ Desktop Releases
- **`release-desktop.yml`** - Releases Zoo Desktop app for macOS, Windows, Linux
  - Triggered by version tags: `1.2.3`
  - Builds and signs apps for all platforms
  - Uploads to GitHub releases

### 📱 Mobile Releases  
- **`release-mobile.yml`** - Releases Zoo Mobile app for iOS and Android
  - Triggered by mobile tags: `mobile-1.2.3`
  - Builds iOS (.ipa) and Android (.apk/.aab)
  - Uploads to respective app stores

### ✅ Continuous Integration
- **`ci-main.yml`** - Main branch CI checks
  - Runs on every push to main
  - Tests, lints, type checks
  - Validates builds for all platforms
  
- **`build-all-platforms.yml`** - Platform build verification
  - Tests that app builds on all target platforms
  - Does not create releases

### 🔍 Code Quality
- **`audit.yml`** - Security and dependency audits
- **`pr-ci-healchecks.yml`** - Pull request validations

### 🔧 Utilities
- **`rollout-version.yml`** - Version management across monorepo

## Tag Format

- Desktop releases: `1.2.3` (standard semver)
- Mobile releases: `mobile-1.2.3` (prefixed with mobile-)

## Quick Commands

```bash
# Create desktop release
git tag 1.2.3 && git push origin 1.2.3

# Create mobile release  
git tag mobile-1.2.3 && git push origin mobile-1.2.3

# Run CI locally
npm test
npm run lint
npm run typecheck
```