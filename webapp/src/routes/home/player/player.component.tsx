import React, { useEffect, useState } from 'react';
import { useMachine } from "@xstate/react";

import { socket } from '../../../utils/socket';
import { Container } from './player.styles';
import { playerMachine } from '../../../machines';
import { PlayerType } from '../../../types';
import { Events } from '../../../config';
import { PlayerInfo } from '../../../components/playerInfo';


export const Player = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerType>();
  const [current, send] = useMachine(playerMachine);

  useEffect(() => {
    socket
      .emit(Events.AddPlayer)
      .on(Events.PlayerAdded, (player: PlayerType) => {
        setPlayerInfo(player);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <PlayerInfo data={playerInfo} />
    </Container>
  );
}
