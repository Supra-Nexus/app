# Hanzo Desktop Makefile - iOS & Android Support
.PHONY: help install dev build test clean ios android

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Platform detection
UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)

# iOS Simulator Device
IOS_SIMULATOR ?= iPhone 15 Pro

# Android Device/Emulator
ANDROID_DEVICE ?= Pixel_8_Pro_API_34

## Help
help:
	@echo "$(BLUE)🎯 Hanzo Desktop Build System$(NC)"
	@echo ""
	@echo "$(GREEN)Desktop Targets:$(NC)"
	@echo "  $(YELLOW)dev$(NC)             Start desktop development server"
	@echo "  $(YELLOW)build$(NC)           Build desktop app for current platform"
	@echo "  $(YELLOW)build-dmg$(NC)       Build macOS DMG installer"
	@echo ""
	@echo "$(GREEN)iOS Targets (5-star experience):$(NC)"
	@echo "  $(YELLOW)ios-init$(NC)        Initialize iOS project"
	@echo "  $(YELLOW)ios-dev$(NC)         Run iOS app in simulator"
	@echo "  $(YELLOW)ios-build$(NC)       Build iOS app for release"
	@echo "  $(YELLOW)ios-list$(NC)        List available iOS simulators"
	@echo "  $(YELLOW)ios-open$(NC)        Open in Xcode"
	@echo ""
	@echo "$(GREEN)Android Targets:$(NC)"
	@echo "  $(YELLOW)android-setup$(NC)   Setup Android SDK via Homebrew"
	@echo "  $(YELLOW)android-init$(NC)    Initialize Android project"
	@echo "  $(YELLOW)android-dev$(NC)     Run Android app in emulator"
	@echo "  $(YELLOW)android-build$(NC)   Build Android APK"
	@echo "  $(YELLOW)android-list$(NC)    List available Android devices"
	@echo ""
	@echo "$(GREEN)Utilities:$(NC)"
	@echo "  $(YELLOW)install$(NC)         Install all dependencies"
	@echo "  $(YELLOW)clean$(NC)           Clean build artifacts"
	@echo "  $(YELLOW)test$(NC)            Run all tests"
	@echo "  $(YELLOW)lint$(NC)            Run linters"
	@echo ""
	@echo "$(BLUE)Platform: $(UNAME_S) ($(UNAME_M))$(NC)"

## Install dependencies
install:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@command -v npm >/dev/null 2>&1 || { echo "$(RED)npm is required but not installed.$(NC)"; exit 1; }
	@command -v rustc >/dev/null 2>&1 || { echo "$(RED)Rust is required but not installed. Please install from https://rustup.rs/$(NC)"; exit 1; }
	npm install
	cd src-tauri && cargo fetch
	@echo "$(GREEN)✅ Dependencies installed successfully!$(NC)"

## Desktop Development
dev:
	@echo "$(BLUE)🚀 Starting desktop development server...$(NC)"
	npx nx serve hanzo-desktop

build:
	@echo "$(BLUE)🔨 Building desktop app...$(NC)"
	NODE_OPTIONS="--max-old-space-size=16384" npm run build
	cd src-tauri && cargo build --release

build-dmg:
	@echo "$(BLUE)📦 Building macOS DMG...$(NC)"
	NODE_OPTIONS="--max-old-space-size=16384" npx nx build hanzo-desktop --configuration=production

## iOS Development (5-star experience)
ios-check:
	@echo "$(BLUE)🔍 Checking iOS prerequisites...$(NC)"
	@command -v xcrun >/dev/null 2>&1 || { echo "$(RED)Xcode Command Line Tools not installed. Run: xcode-select --install$(NC)"; exit 1; }
	@xcrun simctl list devices | grep -q "iPhone" || { echo "$(RED)No iOS simulators found. Install via Xcode.$(NC)"; exit 1; }
	@echo "$(GREEN)✅ iOS development ready!$(NC)"

ios-init: ios-check
	@echo "$(BLUE)📱 Initializing iOS project...$(NC)"
	@if [ ! -d "src-tauri/gen/apple" ]; then \
		npx tauri ios init; \
		echo "$(GREEN)✅ iOS project initialized!$(NC)"; \
	else \
		echo "$(YELLOW)iOS project already initialized$(NC)"; \
	fi

ios-icons:
	@echo "$(BLUE)🎨 Generating iOS icons...$(NC)"
	python3 generate_ios_icons.py
	@echo "$(GREEN)✅ iOS icons generated!$(NC)"

ios-list:
	@echo "$(BLUE)📱 Available iOS simulators:$(NC)"
	@xcrun simctl list devices | grep -E "iPhone|iPad" | grep -v unavailable

ios-dev: ios-init
	@echo "$(BLUE)🚀 Starting iOS development build...$(NC)"
	@echo "$(YELLOW)Using simulator: $(IOS_SIMULATOR)$(NC)"
	# Start simulator
	@xcrun simctl boot "$(IOS_SIMULATOR)" 2>/dev/null || true
	@open -a Simulator
	# Build and run
	npx tauri ios dev --open

ios-build: ios-init
	@echo "$(BLUE)📦 Building iOS app for release...$(NC)"
	NODE_OPTIONS="--max-old-space-size=16384" npm run build
	npx tauri ios build --ci --export-method debugging

ios-build-release: ios-init
	@echo "$(BLUE)📦 Building iOS app for App Store...$(NC)"
	NODE_OPTIONS="--max-old-space-size=16384" npm run build
	npx tauri ios build --ci --export-method app-store-connect

ios-open:
	@echo "$(BLUE)🔧 Opening in Xcode...$(NC)"
	open src-tauri/gen/apple/hanzo-desktop.xcodeproj

ios-clean:
	@echo "$(BLUE)🧹 Cleaning iOS build artifacts...$(NC)"
	rm -rf src-tauri/gen/apple/build
	rm -rf src-tauri/gen/apple/DerivedData
	@echo "$(GREEN)✅ iOS artifacts cleaned!$(NC)"

## Android Development
android-check:
	@echo "$(BLUE)🔍 Checking Android prerequisites...$(NC)"
	@if [ -z "$$ANDROID_HOME" ]; then \
		echo "$(YELLOW)ANDROID_HOME not set. Setting up via Homebrew...$(NC)"; \
		$(MAKE) android-setup; \
	fi
	@command -v adb >/dev/null 2>&1 || { echo "$(RED)ADB not found. Run: make android-setup$(NC)"; exit 1; }
	@echo "$(GREEN)✅ Android development ready!$(NC)"

android-setup:
	@echo "$(BLUE)📦 Setting up Android SDK via Homebrew...$(NC)"
	@command -v brew >/dev/null 2>&1 || { echo "$(RED)Homebrew not installed. Visit https://brew.sh$(NC)"; exit 1; }
	# Install Android SDK via Homebrew
	brew install --cask android-commandlinetools
	brew install --cask android-platform-tools
	# Set environment variables
	@echo "$(YELLOW)Add these to your ~/.zshrc or ~/.bashrc:$(NC)"
	@echo 'export ANDROID_HOME="$$HOME/Library/Android/sdk"'
	@echo 'export PATH="$$PATH:$$ANDROID_HOME/emulator"'
	@echo 'export PATH="$$PATH:$$ANDROID_HOME/platform-tools"'
	@echo 'export PATH="$$PATH:$$ANDROID_HOME/cmdline-tools/latest/bin"'
	# Accept licenses
	yes | sdkmanager --licenses 2>/dev/null || true
	# Install required SDK components
	sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" "ndk;26.1.10909125"
	@echo "$(GREEN)✅ Android SDK setup complete!$(NC)"

android-init: android-check
	@echo "$(BLUE)🤖 Initializing Android project...$(NC)"
	@if [ ! -d "src-tauri/gen/android" ]; then \
		export ANDROID_HOME="$$HOME/Library/Android/sdk" && \
		npx tauri android init; \
		echo "$(GREEN)✅ Android project initialized!$(NC)"; \
	else \
		echo "$(YELLOW)Android project already initialized$(NC)"; \
	fi

android-list:
	@echo "$(BLUE)🤖 Available Android devices:$(NC)"
	@adb devices -l || echo "$(YELLOW)No devices found. Start an emulator or connect a device.$(NC)"

android-emulator:
	@echo "$(BLUE)🤖 Starting Android emulator...$(NC)"
	@command -v emulator >/dev/null 2>&1 || { echo "$(RED)Emulator not found. Run: make android-setup$(NC)"; exit 1; }
	emulator -avd $(ANDROID_DEVICE) &

android-dev: android-init
	@echo "$(BLUE)🚀 Starting Android development build...$(NC)"
	export ANDROID_HOME="$$HOME/Library/Android/sdk" && \
	npx tauri android dev --open

android-build: android-init
	@echo "$(BLUE)📦 Building Android APK...$(NC)"
	NODE_OPTIONS="--max-old-space-size=16384" npm run build
	export ANDROID_HOME="$$HOME/Library/Android/sdk" && \
	npx tauri android build --ci

android-clean:
	@echo "$(BLUE)🧹 Cleaning Android build artifacts...$(NC)"
	rm -rf src-tauri/gen/android/app/build
	rm -rf src-tauri/gen/android/.gradle
	@echo "$(GREEN)✅ Android artifacts cleaned!$(NC)"

## Testing
test:
	@echo "$(BLUE)🧪 Running tests...$(NC)"
	npm run test:contrast
	cd src-tauri && cargo test
	@echo "$(GREEN)✅ All tests passed!$(NC)"

test-contrast:
	@echo "$(BLUE)🎨 Running contrast tests...$(NC)"
	npm run test:contrast

## Linting
lint:
	@echo "$(BLUE)🔍 Running linters...$(NC)"
	npx eslint src --ext ts,tsx
	cd src-tauri && cargo clippy -- -D warnings
	@echo "$(GREEN)✅ Linting complete!$(NC)"

## Cleaning
clean: ios-clean android-clean
	@echo "$(BLUE)🧹 Cleaning build artifacts...$(NC)"
	rm -rf dist
	rm -rf src-tauri/target/release/bundle
	rm -rf node_modules/.vite
	@echo "$(GREEN)✅ Clean complete!$(NC)"

clean-all: clean
	@echo "$(BLUE)🧹 Deep cleaning...$(NC)"
	rm -rf node_modules
	rm -rf src-tauri/target
	@echo "$(GREEN)✅ Deep clean complete!$(NC)"

## Quick commands
ios: ios-dev  # Alias for iOS development
android: android-dev  # Alias for Android development

# Combined mobile setup
mobile-setup: ios-init android-init
	@echo "$(GREEN)✅ Mobile platforms ready!$(NC)"

# Check all dependencies
check-deps:
	@echo "$(BLUE)🔍 Checking dependencies...$(NC)"
	@command -v node >/dev/null 2>&1 && echo "$(GREEN)✓ node$(NC)" || echo "$(RED)✗ node$(NC)"
	@command -v npm >/dev/null 2>&1 && echo "$(GREEN)✓ npm$(NC)" || echo "$(RED)✗ npm$(NC)"
	@command -v rustc >/dev/null 2>&1 && echo "$(GREEN)✓ rust$(NC)" || echo "$(RED)✗ rust$(NC)"
	@command -v cargo >/dev/null 2>&1 && echo "$(GREEN)✓ cargo$(NC)" || echo "$(RED)✗ cargo$(NC)"
	@command -v xcrun >/dev/null 2>&1 && echo "$(GREEN)✓ xcode$(NC)" || echo "$(RED)✗ xcode$(NC)"
	@[ -n "$$ANDROID_HOME" ] && echo "$(GREEN)✓ android sdk$(NC)" || echo "$(RED)✗ android sdk$(NC)"