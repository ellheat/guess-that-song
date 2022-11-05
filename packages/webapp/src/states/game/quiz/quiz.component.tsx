import React, { useEffect, useState } from 'react';
import { socket } from '../../../utils/socket';
import { QuizEvents } from '../../../config/events';
import { Round } from './round';
import { PreRound } from './preRound';
import { QUIZ_STATES } from './constants';
import type { AnswerType } from './types';
import type { RoundDataType } from './round/types';

type QuizProps = {
    state?: QUIZ_STATES;
    quizRound?: number;
    quizPreRoundTime?: number;
    quizRoundTime?: number;
    quizAnswers?: AnswerType[];
    quizTrackUrl?: string;
};

export const Quiz = ({
    quizAnswers = [],
    quizPreRoundTime = 3,
    quizRound = 1,
    quizRoundTime = 10,
    quizTrackUrl = '',
    state = QUIZ_STATES.PreRound,
}: QuizProps) => {
    const [quizState, setQuizState] = useState<QUIZ_STATES>(state);
    const [roundNumber, setRoundNumber] = useState<number>(quizRound);
    const [preRoundTime, setPreRoundTime] = useState<number>(quizPreRoundTime);
    const [roundTime, setRoundTime] = useState<number>(quizRoundTime);
    const [answers, setAnswers] = useState<AnswerType[]>(quizAnswers);
    const [trackUrl, setTrackUrl] = useState<string>(quizTrackUrl);

    useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ round, answers }: RoundDataType) => {
            console.log('round', round);
            const correctAnswer = answers.find((answer: AnswerType) => answer.isCorrect);
            console.log('answers', answers, 'correctAnswer', correctAnswer);
            setRoundNumber(round);
            setAnswers(answers);
            setTrackUrl(correctAnswer?.previewUrl || correctAnswer?.url || '');
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
            {quizState === QUIZ_STATES.Round && (
                <Round answers={answers} roundNumber={roundNumber} time={roundTime} trackUrl={trackUrl} />
            )}
        </>
    );
};
