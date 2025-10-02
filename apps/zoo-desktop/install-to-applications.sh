#!/bin/bash

# Script to install Zoo.app to /Applications

BUILD_PATH="/Users/z/work/zoo/app/apps/zoo-desktop/src-tauri/target/release/bundle/macos/Zoo.app"
DEST_PATH="/Applications/Zoo.app"
OLD_PATH="/Applications/Zoo AI.app"

# Check if the built app exists
if [ ! -d "$BUILD_PATH" ]; then
    echo "Error: Zoo.app not found in build directory"
    echo "Please run 'npm run tauri build' first"
    exit 1
fi

# Remove old Zoo AI.app if it exists
if [ -d "$OLD_PATH" ]; then
    echo "Removing old Zoo AI.app..."
    rm -rf "$OLD_PATH"
fi

# Remove existing Zoo.app if it exists
if [ -d "$DEST_PATH" ]; then
    echo "Removing existing Zoo.app..."
    rm -rf "$DEST_PATH"
fi

# Copy the new app to Applications
echo "Installing Zoo.app to /Applications..."
cp -R "$BUILD_PATH" "$DEST_PATH"

# Touch the app to refresh Finder
touch "$DEST_PATH"

# Refresh the dock
echo "Refreshing dock..."
killall Dock

echo "✅ Zoo.app has been installed to /Applications"
echo "The dock icon has been refreshed with the high-resolution version."