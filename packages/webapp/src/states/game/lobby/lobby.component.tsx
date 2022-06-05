import React from 'react';

import { PlayersList } from '../../../components/playersList';
import { PlayerType } from '../../../types';
import { Leaderboard } from '../../../components/leaderboard';
import { Wrapper, Container, Column, Title } from './lobby.styles';

type LobbyProps = {
	list?: PlayerType[];
}

export const Lobby = ({ list }: LobbyProps) => {
	const isLeaderboardVisible = list?.some(player => player.points > 0);

	const renderLeaderboard = () => isLeaderboardVisible && (
		<Container>
			<Title>Last game results:</Title>
			<Leaderboard list={list} />
		</Container>
	);

	return (
		<Wrapper>
			<Column>
				<Title>Waiting for players..</Title>
				<PlayersList players={list} />
			</Column>
			<Column>
				{renderLeaderboard()}
			</Column>
		</Wrapper>
	);
}
