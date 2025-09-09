#!/bin/bash

# Script to publish all @zooai packages to npm
# Usage: ./publish-zoo-packages.sh <OTP_CODE>

if [ -z "$1" ]; then
  echo "Usage: ./publish-zoo-packages.sh <OTP_CODE>"
  echo "Please provide your npm 2FA OTP code"
  exit 1
fi

OTP=$1
PACKAGES=(
  "zoo-message-ts"
  "zoo-artifacts"
  "zoo-i18n"
  "zoo-node-state"
  "zoo-ui"
)

echo "Publishing @zooai packages with OTP: $OTP"
echo "================================="

for package in "${PACKAGES[@]}"; do
  echo ""
  echo "Publishing @zooai/$package..."
  cd "/Users/z/work/zoo/app/dist/libs/$package"
  
  # Publish with OTP
  npm publish --access public --otp="$OTP"
  
  if [ $? -eq 0 ]; then
    echo "✅ Successfully published @zooai/$package"
  else
    echo "❌ Failed to publish @zooai/$package"
  fi
done

echo ""
echo "================================="
echo "Publishing complete!"