import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {  useToast, Box, Input, Spinner, Heading, Button, Grid } from "@chakra-ui/core";
import { COLOR_PRIMARY, GRID_UNIT_PX } from './constants';
import copy from 'copy-to-clipboard';

const { protocol, hostname, port } = window.location;
const portString = (!!port && port !== 80) ? `:${port}` : '';
const pageURL = `${protocol}//${hostname}${portString}/index.html`;

const BASE_WHAT3_URL = 'https://api.what3words.com/v3/convert-to-3wa';

const SharePage = ({
  match: {
    params: {
      dest_lat: lat,
      dest_lon: lng
    }
  }
}) => {
  const toast = useToast();
  const [what3WordId, setWhat3WordId] = useState(null);

  useEffect(() => {
    try {
      window.fetch(`${BASE_WHAT3_URL}?coordinates=${lat},${lng}&language=en&key=M7ZS4GN5`)
        .then(resp => resp.json())
        .then(json => setWhat3WordId(json.words));
      
    } catch (error) {
      throw new Error(`Problem converting lat/lng to What-3: ${JSON.stringify(error)}`);
    }
  }, []);

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
        {!!what3WordId && <Grid>
          <Input size="lg" id="share-link" value={`${pageURL}#/adventure/${what3WordId}`} />
          <Button onClick={copyShareLink}>Copy</Button>
        </Grid>}
        {!what3WordId && <Spinner/> }
      </Box>
    </>
  );
};

export default withRouter(SharePage);

