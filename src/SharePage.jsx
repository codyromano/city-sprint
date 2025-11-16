import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {  useToast, Box, Input, Spinner, Heading, Button, Grid } from "@chakra-ui/core";
import { GRID_UNIT_PX } from './constants';
import copy from 'copy-to-clipboard';
import { coordinatesToCode } from './geoCodec';

const { protocol, hostname, port } = window.location;
const portString = (!!port && port !== 80) ? `:${port}` : '';
const pageURL = `${protocol}//${hostname}${portString}/index.html`;

const SharePage = ({
  match: {
    params: {
      dest_lat: lat,
      dest_lon: lng
    }
  }
}) => {
  const toast = useToast();
  const [geoCode, setGeoCode] = useState(null);

  useEffect(() => {
    try {
      const code = coordinatesToCode(parseFloat(lat), parseFloat(lng));
      setGeoCode(code);
    } catch (error) {
      throw new Error(`Problem converting lat/lng to geocode: ${JSON.stringify(error)}`);
    }
  }, [lat, lng]);

  const copyShareLink = () => {
    const link = document.getElementById('share-link');
    const toastParams = {
      title: "Text copied!",
      description: "Now go ahead and share the link",
      status: "success",
      duration: 5000,
      isClosable: true,
    };

    if (copy(link.value)) {
      toast(toastParams);
    } else {
      toast({
        ...toastParams,
        title: `Can't access your clipboard`,
        status: 'error',
        description: `But you can still copy/paste the link yourself.`
      });
    }
  };

  return (
    <>
      <Box paddingBottom={GRID_UNIT_PX}>
        <Heading size="md">
          Share this link with your partner
        </Heading>
      </Box>

      <Box paddingBottom={GRID_UNIT_PX}>
        It will lead them on a scavenger hunt that ends at your chosen date location.
      </Box>

      <Box paddingBottom={GRID_UNIT_PX}>
        {!!geoCode && <Grid>
          <Input size="lg" id="share-link" value={`${pageURL}#/adventure/${geoCode}`} />
          <Button onClick={copyShareLink}>Copy</Button>
        </Grid>}
        {!geoCode && <Spinner/> }
      </Box>
    </>
  );
};

export default withRouter(SharePage);

