import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { Container } from './home.styles';
import { socket } from '../../utils/socket';


export const Home = () => {
  console.log('home');
  useEffect(() => {
    socket.on('connection', (message: Socket) => {
      console.log(message);
    });

    return () => {
      console.log('disconnect');
      socket.disconnect();
    };
  }, [])

  return (
    <Container>
      Guess That Song
    </Container>
  );
}
