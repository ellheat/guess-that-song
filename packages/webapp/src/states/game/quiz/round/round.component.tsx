import React, { useEffect, useState } from 'react';
import { socket } from '../../../../utils/socket';
import { QuizEvents } from '../../../../config/events';
import { Container, Bar, AudioPlayerWrapper } from './round.styles';
import { AnswerType } from './types';
import { Answers } from '../../../../components/answers';
import { AudioPlayer } from '../../../../components/audioPlayer';

type RoundProps = {
    answers: AnswerType[];
    roundNumber: number;
    trackUrl: string;
}

export const Round = ({ answers, roundNumber, trackUrl }: RoundProps) => {
    const [time, setTime] = useState<number>(30);

    useEffect(() => {
        socket.on(QuizEvents.RoundTimer, (time: number) => {
            setTime(time);
        });
    }, []);

return (
    <Container>
        <AudioPlayerWrapper>
            <AudioPlayer url={trackUrl} />
        </AudioPlayerWrapper>
        <Bar>Round: {roundNumber}</Bar>
        <Bar>Time: {time}</Bar>
        <Answers answers={answers} />
    </Container>
);
}
