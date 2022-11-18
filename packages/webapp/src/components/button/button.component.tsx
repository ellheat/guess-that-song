import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Wrapper, Container } from './button.styles';
import { ButtonProps, ButtonSize, ButtonTheme, ButtonVariant } from './button.types';

export const Button = ({
    className,
    children,
    onClick,
    variant = ButtonVariant.Primary,
    size = ButtonSize.Small,
    disabled = false,
    isClicked = false,
}: ButtonProps) => {
    const theme: ButtonTheme = { variant, size, disabled, isClicked };

    return (
        <ThemeProvider theme={theme}>
            <Wrapper className={className} isClicked={isClicked} disabled={disabled} onClick={onClick}>
                <Container>{children}</Container>
            </Wrapper>
        </ThemeProvider>
    );
};
