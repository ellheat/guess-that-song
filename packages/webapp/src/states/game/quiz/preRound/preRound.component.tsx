import React from 'react';
import { Container } from './preRound.styles';


export const PreRound = ({ time }: { time: number }) => {
    return (
        <Container>
            Start will start in: {time}
        </Container>
    );
}
