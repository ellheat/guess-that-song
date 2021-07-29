import React from 'react';

import { Container } from './home.styles';
import { Game } from './game';
import { Player } from './player';


export const Home = () => {
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  return (
    <Container>
      { isLocalhost && <Game /> }
      { !isLocalhost && <Player /> }
    </Container>
  );
}
