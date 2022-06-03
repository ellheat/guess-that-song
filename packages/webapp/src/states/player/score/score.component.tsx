import React from 'react';

import { Container, Place, Points } from './score.styles';

interface ScoreProps {
  place?: number;
  points?: number;
}

export const Score = ({ place = 0, points = 0 }: ScoreProps) => {
  return (
    <Container>
      Thank you for participating
    </Container>
  );
}
