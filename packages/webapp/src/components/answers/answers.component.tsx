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
    isHide?: boolean;
};

export const Answers = ({ answers, onClick, disabled, isHide }: AnswersProps) => {
    return (
        <Container>
            {answers.map(({ title, id }, key) => (
                <Button
                    size={ButtonSize.Full}
                    key={title}
                    onClick={onClick ? () => onClick(id) : undefined}
                    disabled={disabled}
                >
                    {isHide ? key + 1 : `${key + 1}. ${title}`}
                </Button>
            ))}
        </Container>
    );
};
