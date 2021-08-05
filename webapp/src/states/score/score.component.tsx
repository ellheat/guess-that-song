import React from 'react';

import { Container } from './score.styles';

interface ScoreProps {}

export const Score = ({}: ScoreProps) => {
  return (
    <Container>
      Your score: 1
    </Container>
  );
}
