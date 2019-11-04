import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Box, Text, Button, Stack, Heading , Spinner} from "@chakra-ui/core";
import { GRID_UNIT_PX, COLOR_PRIMARY } from './constants';
import GameContext from './GameContext';

function ShareOrigin() {
  const [context, setContext] = useContext(GameContext);
  const setConsent = () => setContext({
    ...context,
    userDidConsentToLocationSharing: true
  });

  if (!context.destination) {
    return (
      <Redirect to="/destination" />
    );
  }

  let adventureURI = null;
  if (context.origin && context.destination) {
    adventureURI = [
      '/adventure',
      context.destination.lat,
      context.destination.lng
    ].join('/');
  }

 const didShareLocation = context.userDidConsentToLocationSharing;

  return (
    <>
      <Stack>
        <Heading>Awesome! Looks like a fun location</Heading>
        <Text>Now we just need to ask for your location to plan the best route.</Text>
        <Box paddingBottom={GRID_UNIT_PX} />
      </Stack>

      {!didShareLocation && <Button variantColor={COLOR_PRIMARY} onClick={setConsent}>Share location</Button>}
      {didShareLocation && !context.origin && <Spinner />}
      {context.origin &&
        <Redirect to={adventureURI} />
      }
    </>
  );
}

export default ShareOrigin;
