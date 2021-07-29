import React, { useEffect, useState } from 'react';
import { useMachine } from "@xstate/react";

import { socket } from '../../../utils/socket';
import { Wrapper, Container } from './player.styles';
import { playerMachine, PlayerStates } from '../../../machines';
import { PlayerType } from '../../../types';
import { PlayerEvents } from '../../../config/events';
import { PlayerInfo } from '../../../components/playerInfo';
import { Lobby } from '../../../states/lobby';


export const Player = () => {
  const [playerData, setPlayerData] = useState<PlayerType>();
  const [current, send] = useMachine(playerMachine);

  useEffect(() => {
    socket
      .emit(PlayerEvents.Add)
      .on(PlayerEvents.Added, (player: PlayerType) => setPlayerData(player));

    socket.on(PlayerEvents.Data, (player: PlayerType) => setPlayerData(player));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <PlayerInfo data={playerData} />
      <Container>
        {current.value === PlayerStates.Lobby && <Lobby isPlayerReady={playerData?.isReady} />}
      </Container>
    </Wrapper>
  );
}
