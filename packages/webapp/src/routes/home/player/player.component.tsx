import React, { useContext, useEffect, useState } from 'react';

import { socket } from '../../../utils/socket';
import { Wrapper, Container } from './player.styles';
import { GameStateContext } from '../../../context';
import { GameStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { PlayerEvents } from '../../../config/events';
import { PlayerInfo } from '../../../components/playerInfo';
import { PlayerLobby } from '../../../states/player/playerLobby';
import { Score } from '../../../states/player/score';
import { PLAYER_DEFAULT_STATE } from './player.constants';
import { PlayerAnswers } from '../../../states/player/playerAnswers';


export const Player = () => {
  const { state } = useContext(GameStateContext);
  const [playerData, setPlayerData] = useState<PlayerType>(PLAYER_DEFAULT_STATE);

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
        {state === GameStates.Lobby && <PlayerLobby isReady={playerData.isReady} />}
        {state === GameStates.Quiz && <PlayerAnswers />}
        {state === GameStates.Leaderboard && <Score place={playerData?.place} points={playerData.points} />}
      </Container>
    </Wrapper>
  );
}
