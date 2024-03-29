import React, { useEffect, useState } from 'react';
import { Spinner, Text, Button, Box } from "@chakra-ui/core";
import credentials from './credentials.json';

export default function withGoogleMapsAPI(Component) {
  return (props) => {
    const [mapsLoaded, setMapsLoaded] = useState(false);
    useEffect(() => {
      // Hack to include G-maps library exactly once
      if (!document.getElementById('google-maps')) {
        const script = document.createElement('script');
        script.id = 'google-maps';
        script.onload = () => {
          setMapsLoaded(true);
        };
        script.src = `https://maps.googleapis.com/maps/api/js?key=${credentials.googleMaps}&libraries=places`;
        document.body.appendChild(script);
      }
    }, [mapsLoaded]);

    const mapsLoadedGlobally = window.google && window.google.maps;

    if (!mapsLoadedGlobally) {
      return <Box>
        <Spinner />
        <Text>Loading Google Maps</Text>
      </Box>
    }

    return <Component {...props} />
  };
}