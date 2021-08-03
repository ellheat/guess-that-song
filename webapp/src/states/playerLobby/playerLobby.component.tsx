import React from 'react';

import { Container, Button } from './playerLobby.styles';
import { socket } from '../../utils/socket';
import { PlayerEvents } from '../../config/events';

interface PlayerLobbyProps {
  isReady?: boolean;
}

export const PlayerLobby = ({ isReady }: PlayerLobbyProps) => {
  const handleClick = () => socket.emit(PlayerEvents.Ready);

  return (
    <Container>
      Lobby screen
      <Button onClick={handleClick} disabled={isReady}>Ready!</Button>
    </Container>
  );
}
