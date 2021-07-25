import React, { useEffect, useState } from 'react';

import { Container } from './home.styles';
import { socket } from '../../utils/socket';
import { Events } from '../../config';

type PlayerType = {
  id: string;
  name: string;
  color: any;
  points: number;
  correctAnswers: number;
  roundsWon: number;
}

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

  console.log('playerInfo', playerInfo);

  return (
    <Container>
      <div>{playerInfo?.name}</div>
      Players list ({players.length}):
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </Container>
  );
}
