import React, { useState, useEffect } from 'react';
import { Heading, Spinner, Text, Image, Stack, Button, Box } from "@chakra-ui/core";
import { GRID_UNIT, COLOR_PRIMARY } from './constants';

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
    <Image src="/date.jpg" style={{maxHeight: '50vh'}} rounded="full" />

      <Box paddingBottom={`${GRID_UNIT * 2}px`}>
        <Heading size="md">Someone planned an adventure for you!</Heading>
      </Box>
      <Box paddingBottom={`${GRID_UNIT * 2}px`}>
        <Text>
          Your friend picked out a fun bar, restaurant or similar venue just for you. This website will lead you there through a series of video game-like checkpoints.
        </Text>
      </Box>

      <Box paddingBottom={`${GRID_UNIT * 2}px`}>
      <Text fontSize="sm" color="gray.500">
        <strong>Privacy</strong> We only use your location to create checkpoints. We won't save or share your information.
      </Text>
      </Box>

      <Box paddingBottom={`${GRID_UNIT * 2}px`}>
        <Button isLoading={userSharedLocation && !currentLocation} variantColor={COLOR_PRIMARY} onClick={() => setUserSharedLocation(true)}>Start navigating</Button>
      </Box>
    </>;
  }

  return <Component
    {...props}
    currentLocation={currentLocation}
  />;
};

export default requireUserCurrentLocation;
