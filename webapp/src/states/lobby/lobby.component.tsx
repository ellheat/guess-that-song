import React from 'react';

import { Wrapper, Container } from './lobby.styles';
import { PlayersList } from '../../components/playersList';
import { PlayerType } from '../../types';

interface LobbyProps {
  list?: PlayerType[];
}

export const Lobby = ({ list }: LobbyProps) => {
  return (
    <Wrapper>
      <PlayersList players={list} />
      <Container>
        Waiting for the other players
      </Container>
    </Wrapper>
  );
}
