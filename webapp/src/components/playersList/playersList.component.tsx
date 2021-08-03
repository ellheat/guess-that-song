import React from 'react';

import { Container, Header, List, Item } from './playersList.styles';
import { PlayerType } from '../../types';

interface PlayersListProps {
  players?: PlayerType[],
}

export const PlayersList = ({ players }: PlayersListProps) => {
  return (
    <Container>
      <Header>Players list ({players?.length}):</Header>
      <List>
        {players?.map((player: PlayerType) => (
          <Item key={player.id} color={player.color}>{player.name} - {player.isReady ? 'Ready' : 'Not ready'}</Item>
        ))}
      </List>
    </Container>
  );
}
