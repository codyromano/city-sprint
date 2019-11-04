import React, { useState, useEffect} from 'react';
import { Redirect, withRouter} from 'react-router-dom';
import idx from 'idx';
import { Spinner, Text, Button, Box } from "@chakra-ui/core";

const requireMapDirections = (Component) => (props) => {  
  const { currentLocation } = props;
  const [mapDirections, setMapDirections] = useState(null);
  const destination = {
    lat: idx(props, (_) => _.match.params.dest_lat),
    lng: idx(props, (_) => _.match.params.dest_lon)
  };

  useEffect(() => {
    const { google } = window;
    const directionService = new google.maps.DirectionsService();
    
    const request = {
      travelMode: google.maps.TravelMode.WALKING,
      origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng)
    };

    directionService.route(request, (response) => {
      const legs = idx(response, (_) => _.routes[0].legs);
      if (legs) {
        const steps = legs.reduce((allSteps, leg) => allSteps.concat(leg.steps || []), []);
        setMapDirections(steps);
      }
    });
  }, [mapDirections === null]);

  if (!destination.lat || !destination.lng) {
    return <Redirect to="/" />;
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
