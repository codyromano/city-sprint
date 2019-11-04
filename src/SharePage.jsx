import React from 'react';
import { withRouter } from 'react-router-dom';
import { Flex, Box, Input, Text, Button, Progress, useToast, Heading } from "@chakra-ui/core";
import { COLOR_PRIMARY, GRID_UNIT_PX } from './constants';

const { protocol, hostname } = window.location;
const pageURL = `${protocol}//${hostname}/index.html`;

const SharePage = ({
  match: {
    params: {
      dest_lat: lat,
      dest_lon: lng
    }
  }
}) => (
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
      <Input size="lg" value={`${pageURL}#/adventure/${lat}/${lng}`} />
    </Box>
  </>
);

export default withRouter(SharePage);

