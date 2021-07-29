import React from 'react';

import { Container, Button } from './lobby.styles';
import { socket } from '../../utils/socket';
import { PlayerEvents } from '../../config/events';

interface LobbyProps {
  isPlayerReady?: boolean;
}

export const Lobby = ({ isPlayerReady }: LobbyProps) => {
  const handleClick = () => socket.emit(PlayerEvents.Ready);

  return (
    <Container>
      Lobby screen
      <Button onClick={handleClick} disabled={isPlayerReady}>Ready!</Button>
    </Container>
  );
}
