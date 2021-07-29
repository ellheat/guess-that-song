import React, { useEffect, useState } from 'react';
import { useMachine } from "@xstate/react";

import { Container } from './quiz.styles';
import { socket } from '../../utils/socket';
import { Events } from '../../config';
import { PlayersList } from '../../components/playersList';
import { PlayerType } from '../../types';
import { PlayerInfo } from '../../components/playerInfo';
import { gameMachine } from '../../machines';


export const Quiz = () => {
  return (
    <Container>
      Quiz screen
    </Container>
  );
}
