import React from 'react';

import { Wrapper, Title, SubTitle } from './playerInfo.styles';
import { PlayerType } from '../../types';
import { gray } from '../../theme/colors';

interface PlayerInfoProps {
    data?: PlayerType;
}

export const PlayerInfo = ({ data }: PlayerInfoProps) => {
    return (
        <Wrapper>
            <Title color={data?.color || gray}>{data?.name}</Title>
            <SubTitle color={data?.color || gray}>
                points: {data?.points} | correct: {data?.correctAnswers}
            </SubTitle>
        </Wrapper>
    );
};
