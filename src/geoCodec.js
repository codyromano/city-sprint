/**
 * Encodes geographic coordinates into a short alphanumeric code
 * and decodes them back to coordinates.
 * 
 * Format: encodes latitude and longitude with precision to ~11 meters
 * using base-36 encoding for compact representation.
 */

const BASE36_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Encodes a number to base36 string with fixed length
 */
function encodeBase36(num, length) {
  let result = Math.round(num).toString(36).toUpperCase();
  return result.padStart(length, '0');
}

/**
 * Decodes a base36 string back to a number
 */
function decodeBase36(str) {
  return parseInt(str, 36);
}

/**
 * Converts latitude/longitude to a short alphanumeric code
 * 
 * @param {number} lat - Latitude (-90 to 90)
 * @param {number} lng - Longitude (-180 to 180)
 * @returns {string} - Short alphanumeric code (e.g., "N4K2P-E8M5Q")
 */
export function coordinatesToCode(lat, lng) {
  // Normalize coordinates to positive integers
  // Lat: -90 to 90 -> 0 to 180 -> multiply by 100000 for precision
  const latNormalized = Math.round((lat + 90) * 100000);
  // Lng: -180 to 180 -> 0 to 360 -> multiply by 100000 for precision
  const lngNormalized = Math.round((lng + 180) * 100000);
  
  // Encode to base36 (6 chars each gives us enough range)
  const latCode = encodeBase36(latNormalized, 6);
  const lngCode = encodeBase36(lngNormalized, 6);
  
  // Add a simple checksum (sum of all values mod 36)
  const checksum = (latNormalized + lngNormalized) % 36;
  const checksumCode = BASE36_CHARS[checksum];
  
  return `${latCode}${lngCode}${checksumCode}`;
}

/**
 * Converts a short code back to latitude/longitude coordinates
 * 
 * @param {string} code - The geocode (e.g., "N4K2P-E8M5Q")
 * @returns {object} - Object with lat and lng properties, or null if invalid
 */
export function codeToCoordinates(code) {
  try {
    // Remove any separators (dashes, spaces)
    const cleanCode = code.replace(/[-\s]/g, '').toUpperCase();
    
    if (cleanCode.length !== 13) {
      console.error('Invalid code length');
      return null;
    }
    
    // Extract parts
    const latCode = cleanCode.substring(0, 6);
    const lngCode = cleanCode.substring(6, 12);
    const checksumCode = cleanCode.substring(12, 13);
    
    // Decode
    const latNormalized = decodeBase36(latCode);
    const lngNormalized = decodeBase36(lngCode);
    
    // Verify checksum
    const expectedChecksum = (latNormalized + lngNormalized) % 36;
    const actualChecksum = BASE36_CHARS.indexOf(checksumCode);
    
    if (expectedChecksum !== actualChecksum) {
      console.error('Invalid checksum');
      return null;
    }
    
    // Convert back to coordinates
    const lat = (latNormalized / 100000) - 90;
    const lng = (lngNormalized / 100000) - 180;
    
    return { lat, lng };
  } catch (error) {
    console.error('Error decoding geocode:', error);
    return null;
  }
}

/**
 * Formats a geocode with separator for readability
 * 
 * @param {string} code - The raw geocode
 * @returns {string} - Formatted code (e.g., "N4K2PE-8M5Q2C")
 */
export function formatCode(code) {
  const cleanCode = code.replace(/[-\s]/g, '');
  if (cleanCode.length !== 13) return code;
  
  return `${cleanCode.substring(0, 6)}-${cleanCode.substring(6, 13)}`;
}
