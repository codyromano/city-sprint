import { codeToCoordinates } from './src/geoCodec.js';

const result = codeToCoordinates('garbage-minute-current');
console.log(JSON.stringify(result, null, 2));
