import React from 'react';

import { Wrapper, Text, Button } from './playerLobby.styles';
import { socket } from '../../../utils/socket';
import { PlayerEvents } from '../../../config/events';

interface PlayerLobbyProps {
    isReady?: boolean;
}

export const PlayerLobby = ({ isReady }: PlayerLobbyProps) => {
    const handleClick = () => socket.emit(PlayerEvents.Ready);

    return (
        <Wrapper>
            <Text>When you're ready click the button below</Text>
            <Button onClick={handleClick} isClicked={isReady}>
                Ready
            </Button>
        </Wrapper>
    );
};
