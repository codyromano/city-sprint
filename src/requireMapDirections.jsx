import React, { useState, useEffect} from 'react';
import idx from 'idx';
import { Spinner, Text } from "@chakra-ui/core";
import { codeToCoordinates } from './geoCodec';

const requireMapDirections = (Component) => (props) => {  
  const { currentLocation, match: { params: { what3Id }} } = props;
  const [mapDirections, setMapDirections] = useState(null);
  const [coords, setCoords] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    try {
      const decodedCoords = codeToCoordinates(what3Id);
      if (decodedCoords) {
        setCoords(decodedCoords);
      } else {
        setErrorMessage('Invalid location code');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('There was a problem converting the location code into map coordinates');
    }
  }, [what3Id]);


  useEffect(() => {
    if (!coords) {
      return;
    }
    const { google } = window;
    const directionService = new google.maps.DirectionsService();
    
    const request = {
      travelMode: google.maps.TravelMode.WALKING,
      origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      destination: new google.maps.LatLng(coords.lat, coords.lng)
    };

    directionService.route(request, (response) => {
      const legs = idx(response, (_) => _.routes[0].legs);
      if (legs) {
        const steps = legs.reduce((allSteps, leg) => allSteps.concat(leg.steps || []), []);
        setMapDirections(steps);
      }
    });
  }, [coords, currentLocation.lat, currentLocation.lng]);

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }
  if (!coords) {
    return <>
      <Spinner size="xl" />
      <Text>Confirming destination</Text>
    </>
  }
  if (!mapDirections) {
    return <>
      <Spinner size="xl" />
      <Text>Planning route</Text>
    </>
  }
  return <Component
    {...props}
    mapDirections={mapDirections}
  />;
};

export default requireMapDirections;
