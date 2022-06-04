import React, { useEffect, useState } from 'react';
import { socket } from '../../../utils/socket';
import { QuizEvents } from '../../../config/events';
import { Round } from './round';
import { PreRound } from './preRound';
import { QUIZ_STATES } from './constants';
import type { AnswerType } from './types';
import type { RoundDataType } from './round/types';


export const Quiz = () => {
    const [quizState, setQuizState] = useState<QUIZ_STATES>(QUIZ_STATES.PreRound);
    const [roundNumber, setRoundNumber] = useState<number>(0);
    const [preRoundTime, setPreRoundTime] = useState<number>(3);
    const [roundTime, setRoundTime] = useState<number>(30);
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [trackUrl, setTrackUrl] = useState<string>('');

    useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ round, answers }: RoundDataType) => {
            console.log('round', round);
            console.log('answers', answers);
            const correctAnswer = answers.find((answer: AnswerType) => answer.isCorrect);
            console.log('correctAnswer', correctAnswer);
            setRoundNumber(round);
            setAnswers(answers);
            setTrackUrl(correctAnswer?.previewUrl || '');
        });

        socket.on(QuizEvents.RoundTimer, (time: number) => {
            setQuizState(QUIZ_STATES.Round);
            setRoundTime(time);
        });

        socket.on(QuizEvents.PreRoundTimer, (time: number) => {
            setQuizState(QUIZ_STATES.PreRound);
            setPreRoundTime(time);
        });

        return () => {
            socket.off(QuizEvents.InitRound);
            socket.off(QuizEvents.RoundTimer);
            socket.off(QuizEvents.PreRoundTimer);
        };
    }, []);

    return (
        <>
            {quizState === QUIZ_STATES.PreRound && <PreRound time={preRoundTime} />}
            {quizState === QUIZ_STATES.Round && <Round answers={answers} roundNumber={roundNumber} time={roundTime} trackUrl={trackUrl} />}
        </>
    );
}
