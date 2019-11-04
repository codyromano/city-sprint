import React, { useState } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import GameContext, { initialContext } from './GameContext';

const styles = {
  maxWidth: '40rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.5rem',
};

export default function PageContainer({ children }) {
  const [state, setState] = useState(initialContext);
  return (
    <ThemeProvider>
      <CSSReset />
      <GameContext.Provider value={[state, setState]}>
        <div style={styles}>
          {children}
        </div>
      </GameContext.Provider>
    </ThemeProvider>
  );
}