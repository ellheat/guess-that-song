import React from 'react';
import { Container } from './answers.styles';
import { Button } from '../button';
import { ButtonSize } from '../button/button.types';
import type { PlayerAnswer } from '../../states/player/quiz/quiz.type';
import type { AnswerType } from '../../states/game/quiz/types';

export type AnswersProps<T = AnswerType | PlayerAnswer> = {
    answers: T[];
    onClick?: (id: string) => void;
    disabled?: boolean;
    areTitlesHidden?: boolean;
    isAnswered?: string;
};

export const Answers = ({ answers, onClick, isAnswered, disabled, areTitlesHidden }: AnswersProps) => {
    return (
        <Container>
            {answers.map(({ title, id }, key) => (
                <Button
                    size={ButtonSize.Full}
                    key={title}
                    onClick={onClick ? () => onClick(id) : undefined}
                    disabled={disabled}
                    isClicked={isAnswered === id}
                >
                    {areTitlesHidden ? key + 1 : `${key + 1}. ${title}`}
                </Button>
            ))}
        </Container>
    );
};
