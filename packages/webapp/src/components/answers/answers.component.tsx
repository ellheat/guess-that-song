import React from 'react';
import { Container } from './answers.styles';
import { Button } from '../button';
import { ButtonSize } from '../button/button.types';
import type { PlayerAnswer } from '../../states/player/playerAnswers/playerAnswers.type';
import type { AnswerType } from '../../states/game/quiz/types';

export type AnswersProps<
	T =
		| AnswerType
		| PlayerAnswer
> = {
    answers: T[];
    onClick?: () => void;
};

export const Answers = ({ answers, onClick }: AnswersProps) => {
    return (
        <Container>
            {answers.map(({ title }) => (
                <Button size={ButtonSize.Full} key={title} onClick={onClick}>{title}</Button>
            ))}
        </Container>
  );
}
