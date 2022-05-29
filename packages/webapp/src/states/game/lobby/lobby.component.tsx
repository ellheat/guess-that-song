import React from 'react';

import { Wrapper, Container } from './lobby.styles';
import { PlayersList } from '../../../components/playersList';
import { PlayerType } from '../../../types';

type LobbyProps = {
	list?: PlayerType[];
}

export const Lobby = ({ list }: LobbyProps) => {
	return (
		<Wrapper>
			<PlayersList players={list} />
			<Container>
				Waiting for players..
			</Container>
		</Wrapper>
	);
}
