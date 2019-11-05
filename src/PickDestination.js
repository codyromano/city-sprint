import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from "@chakra-ui/core";
import { COLOR_PRIMARY } from './constants';
import LocationSearchInput from './LocationSearchInput';
import GameContext from './GameContext';
import withGoogleMapsLibrary from './withGoogleMapsLibrary';

function PickDestination() {
  const [ destinationCoords, setDestinationCoords ] = useState(null);

  const [ context, setContext ] = useContext(GameContext);
  
  const saveCoordsSelection = () => setContext({
      ...context,
      destination: destinationCoords
    });

  if (context.destination) {
    return <Redirect to={`/share/${destinationCoords.lat}/${destinationCoords.lng}`} />;
  }

  return (
    <header>
      <LocationSearchInput onCoordsReady={(coords) => setDestinationCoords(coords)} />
      {destinationCoords && <Button variantColor={COLOR_PRIMARY} onClick={saveCoordsSelection}>Continue</Button>}
    </header>
  );
}

export default withGoogleMapsLibrary(PickDestination);
