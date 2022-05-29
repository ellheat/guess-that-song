import React, { useEffect, useState } from 'react';
import { socket } from '../../utils/socket';
import { QuizEvents } from '../../config/events';
import { Container, Bar, AudioPlayerWrapper } from './quiz.styles';
import { AnswerType } from './types';
import { Answers } from '../answers';
import { AudioPlayer } from '../../components/audioPlayer';

type RoundDataType = {
    round: number;
    answers: AnswerType[];
}

export const Quiz = () => {
const [roundNumber, setRoundNumber] = useState<number>(0);
const [answers, setAnswers] = useState<AnswerType[]>([]);
const [trackUrl, setTrackUrl] = useState<string>('');
const [time, setTime] = useState<number>(30);

useEffect(() => {
    socket.on(QuizEvents.Round, ({ round, answers }: RoundDataType) => {
        console.log('round', round);
        console.log('answers', answers);
        const correctAnswer = answers.find((answer: AnswerType) => answer.isCorrect);
        console.log('correctAnswer', correctAnswer);
        setRoundNumber(round);
        setAnswers(answers);
        setTrackUrl(correctAnswer?.previewUrl || '');
    });

    socket.on(QuizEvents.RoundTimer, (time: number) => {
        setTime(time);
    });

    return () => {
        socket.disconnect();
    };
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
