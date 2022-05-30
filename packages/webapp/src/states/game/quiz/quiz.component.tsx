import React, { useEffect, useState } from 'react';
import { socket } from '../../../utils/socket';
import { QuizEvents } from '../../../config/events';
import { AnswerType } from './types';
import { Round } from './round';
import { PreRound } from './preRound';

type RoundDataType = {
    round: number;
    answers: AnswerType[];
}

enum QUIZ_STATES {
    PreRound = 'preRound',
    Round = 'round',
}

export const Quiz = () => {
    const [quizState, setQuizState] = useState<QUIZ_STATES>(QUIZ_STATES.PreRound);
    const [roundNumber, setRoundNumber] = useState<number>(0);
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [trackUrl, setTrackUrl] = useState<string>('');

    useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ round, answers }: RoundDataType) => {
            setQuizState(QUIZ_STATES.PreRound);
            console.log('round', round);
            console.log('answers', answers);
            const correctAnswer = answers.find((answer: AnswerType) => answer.isCorrect);
            console.log('correctAnswer', correctAnswer);
            setRoundNumber(round);
            setAnswers(answers);
            setTrackUrl(correctAnswer?.previewUrl || '');
        });

        socket.on(QuizEvents.StartRound, () => {
            setQuizState(QUIZ_STATES.Round);
        });

        return () => {
            console.log('quiz end');
            socket.disconnect();
        };
    }, []);

    console.log('quizState', quizState);

    return (
        <>
            {quizState === QUIZ_STATES.PreRound && <PreRound />}
            {quizState === QUIZ_STATES.Round && <Round answers={answers} roundNumber={roundNumber} trackUrl={trackUrl} />}
        </>
    );
}
