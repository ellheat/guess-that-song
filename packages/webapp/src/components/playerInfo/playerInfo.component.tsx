import React from 'react';

import { Container } from './playerInfo.styles';
import { PlayerType } from '../../types';
import { gray } from '../../theme/colors';

interface PlayerInfoProps {
    data?: PlayerType;
}

export const PlayerInfo = ({ data }: PlayerInfoProps) => {
    return <Container color={data?.color || gray}>{data?.name}</Container>;
};
