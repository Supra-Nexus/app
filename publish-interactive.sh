#!/bin/bash

# Interactive script to publish all @zooai packages to npm
# Will prompt for OTP code when needed

PACKAGES=(
  "zoo-message-ts"
  "zoo-artifacts"
  "zoo-i18n"
  "zoo-node-state"
  "zoo-ui"
)

echo "🚀 Publishing @zooai packages to npm"
echo "===================================="
echo ""
echo "Packages to publish:"
for package in "${PACKAGES[@]}"; do
  echo "  - @zooai/$package"
done
echo ""
echo "You will be prompted for your npm 2FA OTP code."
echo "Get your authenticator ready!"
echo ""
read -p "Press Enter to continue..."

for package in "${PACKAGES[@]}"; do
  echo ""
  echo "📦 Publishing @zooai/$package..."
  echo "--------------------------------"
  
  cd "/Users/z/work/zoo/app/dist/libs/$package"
  
  # Check if already published
  if npm view "@zooai/$package" version 2>/dev/null; then
    echo "⚠️  @zooai/$package is already published. Skipping..."
    continue
  fi
  
  echo "Enter your npm OTP code for @zooai/$package:"
  read -s OTP
  
  # Publish with OTP
  npm publish --access public --otp="$OTP"
  
  if [ $? -eq 0 ]; then
    echo "✅ Successfully published @zooai/$package"
  else
    echo "❌ Failed to publish @zooai/$package"
    echo "Would you like to retry? (y/n)"
    read RETRY
    if [ "$RETRY" = "y" ]; then
      echo "Enter your npm OTP code:"
      read -s OTP
      npm publish --access public --otp="$OTP"
    fi
  fi
done

echo ""
echo "===================================="
echo "🎉 Publishing complete!"
echo ""
echo "Checking published packages:"
for package in "${PACKAGES[@]}"; do
  VERSION=$(npm view "@zooai/$package" version 2>/dev/null || echo "Not published")
  echo "  @zooai/$package: $VERSION"
done