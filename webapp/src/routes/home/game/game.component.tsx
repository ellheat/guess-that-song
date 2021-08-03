import React, { useEffect, useState } from 'react';
import { useMachine } from "@xstate/react";

import { socket } from '../../../utils/socket';
import { Container } from './game.styles';
import { gameMachine, GameStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { Events } from '../../../config/events';
import { Wrapper } from '../player/player.styles';
import { Lobby } from '../../../states/lobby';


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
    <Wrapper>
      <Container>
        {current.value === GameStates.Lobby && <Lobby list={players} />}
      </Container>
    </Wrapper>
  );
}
