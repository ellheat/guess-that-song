import React from 'react';
import { Container } from './answers.styles';
import { Button } from '../../components/button';
import { ButtonSize } from '../../components/button/button.types';
import type { AnswerType } from '../quiz/types';

type AnswersProps = {
    answers: AnswerType[];
}

export const Answers = ({ answers }: AnswersProps) => {
    return (
        <Container>
            {answers.map(({ title }: AnswerType) => (
                <Button size={ButtonSize.Full}>{title}</Button>
            ))}
        </Container>
  );
}
