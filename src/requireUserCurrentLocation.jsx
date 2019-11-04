import React, { useState, useEffect } from 'react';
import { Spinner, Text, Stack, Button, Box } from "@chakra-ui/core";
import { GRID_UNIT_PX, COLOR_PRIMARY } from './constants';

const requireUserCurrentLocation = (Component) => (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userSharedLocation, setUserSharedLocation] = useState(false);

  useEffect(() => {
    let watchID;

    if (userSharedLocation === true) {
      watchID = navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
        setCurrentLocation({
          lat: latitude,
          lng: longitude
        });
      });
    }
    return () => navigator.geolocation.clearWatch(watchID);
  }, [userSharedLocation]);

  if (!currentLocation) {
    return <>
      <Box paddingBottom={GRID_UNIT_PX}>
        <Text>This game uses your current location to create a fun adventure. I'll never share or give away your location info.</Text>
      </Box>
      <Button isLoading={userSharedLocation && !currentLocation} variantColor={COLOR_PRIMARY} onClick={() => setUserSharedLocation(true)}>Share location</Button>
    </>;
  }

  return <Component
    {...props}
    currentLocation={currentLocation}
  />;
};

export default requireUserCurrentLocation;
