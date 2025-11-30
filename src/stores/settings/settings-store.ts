import { storage } from "../config";

type Settings = {
    theme: 'light' | 'dark';
}

const KEY_SETTINGS = 'app.settings';

export class SettingsStore {
    getSettings(): Settings | null {
        const settings = storage.getString(KEY_SETTINGS);
        if (settings) {
            return JSON.parse(settings);
        }
        return null;
    }

    setSettings(settings: Settings): void {
        storage.set(KEY_SETTINGS, JSON.stringify(settings));
    }
}

export const settingsStore = new SettingsStore();