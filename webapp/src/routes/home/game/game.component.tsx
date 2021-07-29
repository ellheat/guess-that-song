import React, { useEffect, useState } from 'react';
import { useMachine } from "@xstate/react";

import { socket } from '../../../utils/socket';
import { Container } from './game.styles';
import { gameMachine } from '../../../machines';
import { PlayerType } from '../../../types';
import { Events } from '../../../config/events';
import { PlayersList } from '../../../components/playersList';


export const Game = () => {
  const [current, send] = useMachine(gameMachine);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    socket.on(Events.PlayersList, (list: PlayerType[]) => {
      setPlayers(list);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <PlayersList players={players} />
    </Container>
  );
}
