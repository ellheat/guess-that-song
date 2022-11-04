import React from 'react';
import { Container, Bar, AudioPlayerWrapper, AnswersWrapper } from './round.styles';
import { AnswerType } from './types';
import { Answers } from '../../../../components/answers';
import { AudioPlayer } from '../../../../components/audioPlayer';

type RoundProps = {
    answers: AnswerType[];
    roundNumber: number;
    time: number;
    trackUrl: string;
};

export const Round = ({ answers, roundNumber, time, trackUrl }: RoundProps) => {
    return (
        <Container>
            <AudioPlayerWrapper>
                <AudioPlayer url={trackUrl} />
            </AudioPlayerWrapper>
            <Bar>Round: {roundNumber}</Bar>
            <Bar>Time: {time}</Bar>
            <AnswersWrapper>
                <Answers answers={answers} />
            </AnswersWrapper>
        </Container>
    );
};
