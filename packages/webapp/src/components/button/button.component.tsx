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
}: ButtonProps) => {
    const theme: ButtonTheme = { variant, size, disabled };

    return (
        <ThemeProvider theme={theme}>
            <Wrapper className={className} disabled={disabled} onClick={onClick}>
                <Container>{children}</Container>
            </Wrapper>
        </ThemeProvider>
    );
};
