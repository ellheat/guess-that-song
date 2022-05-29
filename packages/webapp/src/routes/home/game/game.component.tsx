import React, { useContext, useEffect, useState } from 'react';
import { Events } from '../../../config/events';
import { Lobby } from '../../../states/game/lobby';
import { Quiz } from '../../../states/game/quiz';
import { socket } from '../../../utils/socket';
import { GameStateContext } from '../../../context';
import { GameStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { Wrapper, Container } from './game.styles';


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
