import React, { useEffect, useState } from 'react';
import { Answers } from '../../../components/answers';
import { QUIZ_STATES } from './quiz.constants';
import { socket } from '../../../utils/socket';
import { PlayerEvents, QuizEvents } from '../../../config/events';
import { RoundDataType } from '../../game/quiz/round/types';
import { AnswerType } from '../../game/quiz/types';
import { RoundWrapper, AnswersWrapper, Content } from './quiz.styles';

type QuizProps = {
    state?: QUIZ_STATES;
    quizAnswers?: AnswerType[];
    areTitlesHidden?: boolean;
};

export const Quiz = ({ state = QUIZ_STATES.PreRound, quizAnswers = [], areTitlesHidden = true }: QuizProps) => {
    const [quizState, setQuizState] = useState<QUIZ_STATES>(state);
    const [answers, setAnswers] = useState<AnswerType[]>(quizAnswers);
    const [areAnswersBlocked, setAreAnswersBlocked] = useState<boolean>(false);
    const [isAnswered, setIsAnswered] = useState<string>('');

    const handleAnswer = (id: string) => {
        setAreAnswersBlocked(true);
        setIsAnswered(id);
        socket.emit(PlayerEvents.Answer, id);
    };

    useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ answers }: RoundDataType) => {
            setAreAnswersBlocked(true);
            setIsAnswered('');
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
            {quizState === QUIZ_STATES.PreRound && (
                <RoundWrapper>
                    <Content>be ready!</Content>
                </RoundWrapper>
            )}
            {quizState === QUIZ_STATES.Round && (
                <RoundWrapper>
                    <AnswersWrapper>
                        <Answers
                            answers={answers}
                            isAnswered={isAnswered}
                            onClick={handleAnswer}
                            disabled={areAnswersBlocked}
                            areTitlesHidden={areTitlesHidden}
                        />
                    </AnswersWrapper>
                </RoundWrapper>
            )}
        </>
    );
};
