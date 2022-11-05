import React, { useEffect, useState } from 'react';

import { Container } from './home.styles';
import { Game } from './game';
import { Player } from './player';
import { GameStateProvider } from '../../context';
import { socket } from '../../utils/socket';

export const Home = () => {
    const [isConnected, setConnected] = useState<boolean>(false);
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    useEffect(() => {
        if (socket) {
            setConnected(true);
        }
        return () => {
            if (isConnected) socket.disconnect();
        };
    }, [isConnected, setConnected]);

    return (
        <Container>
            <GameStateProvider>
                {isLocalhost && <Game />}
                {!isLocalhost && <Player />}
            </GameStateProvider>
        </Container>
    );
};
