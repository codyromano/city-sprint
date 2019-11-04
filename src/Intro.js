import React from 'react';
import { Flex, Text, Button, Box, Stack, Heading, List, ListItem } from "@chakra-ui/core";
import { Link } from 'react-router-dom';
import { GRID_UNIT, GRID_UNIT_PX, COLOR_PRIMARY } from './constants';

function Intro() {
  return (
    <Stack>
      <Box paddingBottom={GRID_UNIT_PX}>
        <Heading>Surprise your partner with a fun date night.</Heading>
      </Box>

      <Box paddingBottom={`${GRID_UNIT * 2}px`}>
        <Text>
          Tell us where you'd like to go on a date, and we'll create a suspenseful game with the goal of navigating there.
        </Text>
      </Box>

      <Link to="/destination">
        <Button variantColor={COLOR_PRIMARY}>Get started</Button>
      </Link>
    </Stack>
  );
}

export default Intro;
