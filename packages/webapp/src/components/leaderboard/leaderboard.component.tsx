import React from 'react';
import { orderBy } from 'lodash';
import { PlayerType } from '../../types';

import { List, Item } from './leaderboard.styles';

type LeaderboardProps = {
    list?: PlayerType[];
};

export const Leaderboard = ({ list }: LeaderboardProps) => {
    return (
        <List>
            {orderBy(list, ['points'], ['desc'])?.map(({ name, points, correctAnswers }) => (
                <Item key={name}>{`${name} - ${points} points  - ${correctAnswers} corrected`}</Item>
            ))}
        </List>
    );
};
