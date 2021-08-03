import React, { ReactNode } from 'react';

import { Container } from './button.styles';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <Container onClick={onClick}>
      {children}
    </Container>
  );
}
