import React from 'react';

import { Container, Place, Points } from './score.styles';

interface ScoreProps {
  place: number;
  points: number;
}

export const Score = ({ place, points }: ScoreProps) => {
  return (
    <Container>
      <Place>Your place: {place}</Place>
      <Points>Your points: {points}</Points>
    </Container>
  );
}
