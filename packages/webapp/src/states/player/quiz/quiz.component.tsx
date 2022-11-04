import React, { useEffect, useState } from 'react';
import { Answers } from '../../../components/answers';
import { QUIZ_STATES } from './quiz.constants';
import { socket } from '../../../utils/socket';
import { PlayerEvents, QuizEvents } from '../../../config/events';
import { RoundDataType } from '../../game/quiz/round/types';
import { AnswerType } from '../../game/quiz/types';

type QuizProps = {
    state?: QUIZ_STATES;
    quizAnswers?: AnswerType[];
    areTitlesHidden?: boolean;
};

export const Quiz = ({ state = QUIZ_STATES.PreRound, quizAnswers = [], areTitlesHidden = true }: QuizProps) => {
    const [quizState, setQuizState] = useState<QUIZ_STATES>(state);
    const [answers, setAnswers] = useState<AnswerType[]>(quizAnswers);
    const [areAnswersBlocked, setAreAnswersBlocked] = useState<boolean>(false);

    const handleAnswer = (id: string) => {
        socket.emit(PlayerEvents.Answer, id);
        setAreAnswersBlocked(true);
    };

    useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ answers }: RoundDataType) => {
            setAreAnswersBlocked(true);
            setAnswers(answers);
        });

        socket.on(QuizEvents.StartRound, () => {
            setAreAnswersBlocked(false);
        });

        socket.on(QuizEvents.RoundTimer, () => {
            setQuizState(QUIZ_STATES.Round);
        });

        socket.on(QuizEvents.PreRoundTimer, () => {
            setQuizState(QUIZ_STATES.PreRound);
        });

        return () => {
            socket.off(QuizEvents.InitRound);
            socket.off(QuizEvents.StartRound);
            socket.off(QuizEvents.RoundTimer);
            socket.off(QuizEvents.PreRoundTimer);
        };
    }, []);

    return (
        <>
            {quizState === QUIZ_STATES.PreRound && <div>be ready!</div>}
            {quizState === QUIZ_STATES.Round && (
                <Answers
                    answers={answers}
                    onClick={handleAnswer}
                    disabled={areAnswersBlocked}
                    areTitlesHidden={areTitlesHidden}
                />
            )}
        </>
    );
};
