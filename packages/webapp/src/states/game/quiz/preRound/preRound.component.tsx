import React, { useEffect, useState } from 'react';
import { socket } from '../../../../utils/socket';
import { QuizEvents } from '../../../../config/events';
import { Container } from './preRound.styles';


export const PreRound = () => {
    const [time, setTime] = useState<number>(3);

    useEffect(() => {
        socket.on(QuizEvents.PreRoundTimer, (time: number) => {
            setTime(time);
        });
    }, []);

return (
    <Container>
        Start will start in: {time}
    </Container>
);
}
