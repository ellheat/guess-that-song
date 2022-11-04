import React from 'react';
import { Container } from './preRound.styles';

type PreRoundProps = {
    time: number;
};

export const PreRound = ({ time }: PreRoundProps) => {
    return <Container>The round will start in: {time}</Container>;
};
