import React from 'react';

import { Container } from './playerInfo.styles';
import { PlayerType } from '../../types';

interface PlayerInfoProps {
  data?: PlayerType;
}

export const PlayerInfo = ({ data }: PlayerInfoProps) => {
  return (
    <Container color={data?.color}>
      {data?.name}
    </Container>
  );
}
