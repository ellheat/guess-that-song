import React, { useContext, useEffect, useState } from 'react';

import { socket } from '../../../utils/socket';
import { Wrapper, Container } from './player.styles';
import { GameStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { PlayerEvents } from '../../../config/events';
import { PlayerInfo } from '../../../components/playerInfo';
import { PlayerLobby } from '../../../states/playerLobby';
import { GameStateContext } from '../../../context';



export const Player = () => {
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
        {state === GameStates.Quiz && <div>Quiz State</div>}
      </Container>
    </Wrapper>
  );
}
