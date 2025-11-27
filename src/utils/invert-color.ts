/**
 * Inverts a hex color (e.g., black -> white, white -> black)
 * @param hex - Hex color string (with or without #)
 * @returns Inverted hex color string
 */
export function invertColor(hex: string): string {
    // Remove # if present
    const hexWithoutHash = hex.replace('#', '');

    // Handle 3-digit hex colors
    const fullHex = hexWithoutHash.length === 3
        ? hexWithoutHash.split('').map(char => char + char).join('')
        : hexWithoutHash;

    // Convert to RGB
    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    // Invert RGB values
    const invertedR = (255 - r).toString(16).padStart(2, '0');
    const invertedG = (255 - g).toString(16).padStart(2, '0');
    const invertedB = (255 - b).toString(16).padStart(2, '0');

    return `#${invertedR}${invertedG}${invertedB}`;
}

/**
 * Inverts a hex color with better contrast (ensures readable text)
 * Uses luminance to determine if color is light or dark
 * @param hex - Hex color string (with or without #)
 * @returns Inverted hex color string with better contrast
 */
export function invertColorWithContrast(hex: string): string {
    const hexWithoutHash = hex.replace('#', '');
    const fullHex = hexWithoutHash.length === 3
        ? hexWithoutHash.split('').map(char => char + char).join('')
        : hexWithoutHash;

    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    // Calculate luminance (perceived brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If color is light, return dark; if dark, return light
    if (luminance > 0.5) {
        return '#000000'; // Return black for light colors
    } else {
        return '#FFFFFF'; // Return white for dark colors
    }
}