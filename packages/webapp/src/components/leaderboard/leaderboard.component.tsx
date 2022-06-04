import React from 'react';
import { orderBy } from 'lodash';
import { PlayerType } from '../../types';

import { List, Item } from './leaderboard.styles';

type LeaderboardProps = {
	list?: PlayerType[];
}

export const Leaderboard = ({ list }: LeaderboardProps) => {
	return (
		<List>
			{orderBy(list, ['points'], ['desc'])?.map(({ name, points }) => (
				<Item key={name}>{`${name} - ${points} points`}</Item>
			))}
		</List>
	);
}
