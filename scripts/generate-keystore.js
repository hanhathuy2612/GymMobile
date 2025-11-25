import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keystorePath = path.join(__dirname, '../keystore/gym-release.keystore');

if (fs.existsSync(keystorePath)) {
    console.log('⚠️  Keystore already exists!');
    process.exit(1);
}

const keystorePassword = process.env.KEYSTORE_PASSWORD || 'gym-release-store-password';
const keyPassword = process.env.KEY_PASSWORD || 'gym-release-key-password';
const alias = 'gym-release-key';
const dname = 'CN=Gym React Native, OU=Development, O=Anonymous, L=City, ST=State, C=VN';

const command = `keytool -genkeypair -v -storetype PKCS12 -keystore "${keystorePath}" -alias ${alias} -keyalg RSA -keysize 2048 -validity 10000 -storepass ${keystorePassword} -keypass ${keyPassword} -dname "${dname}"`;

try {
    execSync(command, { stdio: 'inherit' });
    console.log('✅ Keystore created successfully!');
    console.log(`📍 Location: ${keystorePath}`);
} catch (error) {
    console.error('❌ Error creating keystore:', error.message);
    process.exit(1);
}