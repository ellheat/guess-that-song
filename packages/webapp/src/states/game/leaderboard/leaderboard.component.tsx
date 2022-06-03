import React from 'react';
import { sortBy } from 'lodash';
import { PlayerType } from '../../../types';

import { Container, List, Item } from './leaderboard.styles';

type LeaderboardProps = {
	list?: PlayerType[];
}

export const Leaderboard = ({ list }: LeaderboardProps) => {
	return (
		<Container>
			Leaderboard screen:
			{sortBy(list, ['points'])?.map(({ name, points }) => (
				<List>
					<Item key={name}>{`${name} - ${points} points`}</Item>
				</List>
			))}
		</Container>
	);
}
