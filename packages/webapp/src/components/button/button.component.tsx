import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Container } from './button.styles';
import { ButtonColor, ButtonProps, ButtonSize, ButtonTheme, ButtonVariant } from './button.types';

export const Button = ({
    children,
    onClick,
    variant = ButtonVariant.Primary,
    size = ButtonSize.Small,
    color = ButtonColor.Primary,
    disabled = false,
}: ButtonProps) => {
    const theme: ButtonTheme = { variant, size, color, disabled };

    return (
        <ThemeProvider theme={theme}>
            <Container disabled={disabled} onClick={onClick}>
                {children}
            </Container>
        </ThemeProvider>
    );
};
