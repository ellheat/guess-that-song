import React, { useEffect, useState } from 'react';
import { Answers } from '../../../components/answers';
import { QUIZ_STATES } from './quiz.constants';
import { socket } from '../../../utils/socket';
import { PlayerEvents, QuizEvents } from '../../../config/events';
import { RoundDataType } from '../../game/quiz/round/types';
import { AnswerType } from '../../game/quiz/types';

export const Quiz = () => {
	const [quizState, setQuizState] = useState<QUIZ_STATES>(QUIZ_STATES.PreRound);
	const [answers, setAnswers] = useState<AnswerType[]>([]);
	const [areAnswersBlocked, setAreAnswersBlocked] = useState<boolean>(false);

	const handleAnswer = (id: string) => {
		socket.emit(PlayerEvents.Answer, id);
		setAreAnswersBlocked(true);
	};

	useEffect(() => {
        socket.on(QuizEvents.InitRound, ({ answers }: RoundDataType) => {
			console.log('answers', answers);
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
    }, []);

	return (
		<>
            {quizState === QUIZ_STATES.PreRound && <div>be ready!</div>}
            {quizState === QUIZ_STATES.Round && <Answers answers={answers} onClick={handleAnswer} disabled={areAnswersBlocked} isHide />}
        </>
	);
}
