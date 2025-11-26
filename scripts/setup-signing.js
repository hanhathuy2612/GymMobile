import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');

if (!fs.existsSync(buildGradlePath)) {
    console.log('⚠️  build.gradle not found. Run prebuild first.');
    process.exit(1);
}

let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

// 1. Add the release signing config to the signingConfigs block
const releaseSigningConfig = `        release {
            def keystorePath = file('../../keystore/gym-release.keystore')
            if (keystorePath.exists()) {
                storeFile keystorePath
                storePassword 'gym-release-store-password'
                keyAlias 'gym-release-key'
                keyPassword 'gym-release-key-password'
            } else {
                storeFile file('debug.keystore')
                storePassword 'android'
                keyAlias 'androiddebugkey'
                keyPassword 'android'
            }
        }`;

// Check if the release signing config already exists
const hasReleaseSigningConfig = /signingConfigs\s*\{[\s\S]*?release\s*\{/.test(buildGradle);

if (!hasReleaseSigningConfig) {
    // Add the release config after the debug config
    buildGradle = buildGradle.replace(
        /(signingConfigs\s*\{[\s\S]*?debug\s*\{[\s\S]*?\}\s*)(\})/,
        `$1${releaseSigningConfig}\n    $2`
    );
    console.log('✅ Added release signing config');
} else {
    console.log('ℹ️  Release signing config already exists');
}

// 2. Update buildTypes.release to use the release signing config
// Find and replace signingConfig signingConfigs.debug with signingConfig signingConfigs.release in the release buildType
buildGradle = buildGradle.replace(
    /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig signingConfigs\.debug/,
    '$1signingConfig signingConfigs.release'
);

fs.writeFileSync(buildGradlePath, buildGradle, 'utf8');
console.log('✅ Signing config updated in build.gradle');
