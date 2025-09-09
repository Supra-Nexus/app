# Apple Signing Setup for GitHub Actions

## Steps to Configure Apple Signing

1. Go to: https://github.com/zooai/app/settings/secrets/actions

2. Update or create these secrets:

### 1. APPLE_CERTIFICATE
Click "New repository secret" or "Update"
- Name: `APPLE_CERTIFICATE`
- Value: Copy the entire contents of `/tmp/apple-cert-base64.txt`

To get the value, run:
```bash
cat /tmp/apple-cert-base64.txt
```

### 2. APPLE_CERTIFICATE_PASSWORD
- Name: `APPLE_CERTIFICATE_PASSWORD`
- Value: [Enter the password for your apple-cert.p12 file]

### 3. APPLE_SIGNING_IDENTITY
- Name: `APPLE_SIGNING_IDENTITY`
- Value: Run this command to find it:
```bash
security find-identity -v -p codesigning
```
Look for something like "Developer ID Application: Your Name (TEAMID)"
Copy the full name in quotes, e.g., "Developer ID Application: Zoo AI Inc (ABC123DEF)"

### 4. APPLE_ID
- Name: `APPLE_ID`
- Value: Your Apple Developer account email address

### 5. APPLE_PASSWORD
- Name: `APPLE_PASSWORD`
- Value: App-specific password (NOT your regular Apple ID password)

To create an app-specific password:
1. Go to https://appleid.apple.com/account/manage
2. Sign in with your Apple ID
3. In the Security section, click "Generate Password..."
4. Give it a label like "Zoo Desktop CI"
5. Copy the generated password

### 6. APPLE_TEAM_ID (if needed)
- Name: `APPLE_TEAM_ID`
- Value: Your Apple Developer Team ID (found in Apple Developer account)

## Quick Commands to Get Values

```bash
# 1. Get base64 encoded certificate (already done)
cat /tmp/apple-cert-base64.txt

# 2. Find signing identity
security find-identity -v -p codesigning

# 3. Verify certificate details
openssl pkcs12 -in /Users/z/apple-cert.p12 -noout -info
```

## Testing the Certificate Locally

```bash
# Import to keychain for testing (optional)
security import /Users/z/apple-cert.p12 -P "YOUR_PASSWORD" -A

# List certificates
security find-identity -v -p codesigning
```

## Trigger a New Build

After updating the secrets, you can:

1. Go to https://github.com/zooai/app/actions
2. Click on "Release production" workflow
3. Click "Run workflow"
4. Select the tag `1.1.14`
5. Click "Run workflow"

Or create a new tag:
```bash
git tag -a 1.1.15 -m "Release v1.1.15 - Fixed Apple signing"
git push origin 1.1.15
```

## Notes

- The certificate must be a valid Apple Developer ID Application certificate
- The certificate must not be expired
- For notarization to work, you need a paid Apple Developer account
- The app-specific password is different from your Apple ID password