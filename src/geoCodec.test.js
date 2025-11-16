import { coordinatesToCode, codeToCoordinates } from './geoCodec';

describe('geoCodec', () => {
  describe('coordinatesToCode and codeToCoordinates', () => {
    it.each([
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
      { lat: 40.7128, lng: -74.0060, name: 'New York' },
      { lat: 51.5074, lng: -0.1278, name: 'London' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    ])('should encode and decode $name coordinates', ({ lat, lng, name }) => {
      const code = coordinatesToCode(lat, lng);
      const decoded = codeToCoordinates(code);

      expect(decoded).not.toBeNull();
      expect(decoded.lat).toBeCloseTo(lat, 1);
      expect(decoded.lng).toBeCloseTo(lng, 1);
      
      // Verify it returns three words
      const words = code.split('-');
      expect(words).toHaveLength(3);
    });
  });
});
