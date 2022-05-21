import React, { useContext, useEffect, useState } from 'react';

import { socket } from '../../../utils/socket';
import { Wrapper, Container } from './player.styles';
import { GameStateContext } from '../../../context';
import { GameStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { PlayerEvents } from '../../../config/events';
import { PlayerInfo } from '../../../components/playerInfo';
import { PlayerLobby } from '../../../states/playerLobby';
import { Answers } from '../../../states/answers';
import { Score } from '../../../states/score';

interface PlayerProps {}

export const Player = ({}: PlayerProps) => {
  const { state } = useContext(GameStateContext);
  const [playerData, setPlayerData] = useState<PlayerType>();

  useEffect(() => {
    socket
      .emit(PlayerEvents.Add)
      .on(PlayerEvents.Added, (player: PlayerType) => setPlayerData(player));

    socket.on(PlayerEvents.Data, (player: PlayerType) => setPlayerData(player));
  }, []);

  return (
    <Wrapper>
      <PlayerInfo data={playerData} />
      <Container>
        {state === GameStates.Lobby && <PlayerLobby isReady={playerData?.isReady} />}
        {state === GameStates.Quiz && <Answers />}
        {state === GameStates.Leaderboard && <Score place={playerData?.place} points={playerData?.points} />}
      </Container>
    </Wrapper>
  );
}
