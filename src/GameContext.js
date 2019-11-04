import { createContext } from 'react';

export const initialContext = {
  userDidConsentToLocationSharing: false,
  currentLocation: {
    latitude: null,
    longitude: null,
  },
  destination: null,
  origin: null,
};

const GameContext = createContext(initialContext);
export default GameContext;