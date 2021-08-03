import React, { useContext, useEffect, useState } from 'react';

import { socket } from '../../../utils/socket';
import { Container } from './game.styles';
import { GameStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { Events } from '../../../config/events';
import { Wrapper } from '../player/player.styles';
import { Lobby } from '../../../states/lobby';
import { GameStateContext } from '../../../context';
import { Quiz } from '../../../states/quiz';


export const Game = () => {
  const { state } = useContext(GameStateContext);
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
        {state === GameStates.Lobby && <Lobby list={players} />}
        {state === GameStates.Quiz && <Quiz />}
      </Container>
    </Wrapper>
  );
}
