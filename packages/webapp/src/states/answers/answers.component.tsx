import React from 'react';

import { Container } from './answers.styles';
import { Button } from '../../components/button';
import { ButtonSize } from '../../components/button/button.types';

interface AnswersProps {}

export const Answers = ({}: AnswersProps) => {
  return (
    <Container>
      <Button size={ButtonSize.Full}>1</Button>
      <Button size={ButtonSize.Full}>2</Button>
      <Button size={ButtonSize.Full}>3</Button>
      <Button size={ButtonSize.Full}>4</Button>
    </Container>
  );
}
