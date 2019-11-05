import React, { useState, } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

import haversine from 'haversine';
import {
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber, Flex, Box, Text, Button, Progress, useToast, Heading } from "@chakra-ui/core";
import requireMapDirections from './requireMapDirections';
import requireUserCurrentLocation from './requireUserCurrentLocation';
import { MILES_THRESHOLD_WALKING, COLOR_PRIMARY, GRID_UNIT_PX } from './constants';
import withGoogleMapsLibrary from './withGoogleMapsLibrary';

const bootstrapURLKeys = {
  key: 'AIzaSyAZSu6vjcZb414zIVn1yMj6-tdGMPYjxCk', 
  language: 'en'
};

const currentLocationPinStyles = {
  backgroundColor: 'blue',
  display: 'block',
  height: '1rem',
  width: '1rem',
  borderRadius: '50%',
};

const destinationPinStyles = {
  height: '2rem',
  width: '2rem',
};

const CurrentLocationPin = () => <div style={currentLocationPinStyles}/>;
const DestinationPin = () => <img src="/flag.png" style={destinationPinStyles} />;

const Adventure = (props) => {
  const [ currentStepIndex, setCurrentStepIndex ] = useState(0);
  const toast = useToast();
  const { currentLocation } = props;

  if (currentStepIndex >= props.mapDirections.length) {
    return <Text>You've reached your destination!</Text>
  }

  const currentStep = props.mapDirections[currentStepIndex];
  const distance = haversine(
    {latitude: currentLocation.lat, longitude: currentLocation.lng},
    {latitude: currentStep.end_location.lat(), longitude: currentStep.end_location.lng()},
    {unit: 'miles'}
  );

  const destinationCoords = {
    lat: currentStep.end_location.lat(),
    lng: currentStep.end_location.lng(),
  };

  const checkpointsLeft = (props.mapDirections.length - (currentStepIndex + 1));

  const checkIn = () => {
    if (distance <= MILES_THRESHOLD_WALKING) {
      toast({
        title: `You reached Checkpoint ${currentStepIndex + 1}!`,
        description: `There are ${checkpointsLeft} checkpoints remaining.`,
        status: "success",
        duration: 4000,
        isClosable: false,
      });
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      toast({
        title: "You're too far away",
        description: `Get within ${MILES_THRESHOLD_WALKING} miles to check in.`,
        status: "warning",
        duration: 4000,
        isClosable: false,
      });
    }
  };

  return <>
    <Box paddingBottom={GRID_UNIT_PX}>
      <Flex>
        <div>
          <Heading size="md">
            Reach Checkpoint {currentStepIndex + 1}
          </Heading>
          <Text>Location code name: {props.match.params.what3Id}</Text>
        </div>
      </Flex>
    </Box>

    <Box width="100%" height="50vh" paddingBottom={GRID_UNIT_PX}>
        <GoogleMapReact
          bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={currentLocation}
          defaultZoom={12}
          zoom={15}
          center={currentLocation}
        >
          <CurrentLocationPin {...currentLocation} />
          <DestinationPin {...destinationCoords} />
        </GoogleMapReact>
    </Box>

    <Flex alignItems="center">
      <Stat>
        <StatLabel>checkpoints left</StatLabel>
        <StatNumber>{checkpointsLeft}</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>miles away</StatLabel>
        <StatNumber>{distance.toFixed(2)}</StatNumber>
      </Stat>

      <Button onClick={checkIn} variantColor={COLOR_PRIMARY}>Check In</Button>
    </Flex>
  </>;
};

const WithMaps = requireMapDirections(Adventure);
const WithRouter = withRouter(WithMaps);
const WithLocation = requireUserCurrentLocation(WithRouter);

export default withGoogleMapsLibrary(WithLocation);

