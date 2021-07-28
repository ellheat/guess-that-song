import React, { useEffect, useState } from 'react';

import { Container } from './home.styles';
import { socket } from '../../utils/socket';
import { Events } from '../../config';
import { PlayersList } from '../../components/playersList';
import { PlayerType } from '../../types';
import { PlayerInfo } from '../../components/playerInfo';

export const Home = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerType>();
  const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    socket.on(Events.Connection, (player: PlayerType) => {
      setPlayerInfo(player);
    });

    socket.on(Events.PlayersList, (list: PlayerType[]) => {
      setPlayers(list);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <PlayerInfo data={playerInfo} />
      <PlayersList players={players} />
    </Container>
  );
}
