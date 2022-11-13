import { ButtonHTMLAttributes, ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    disabled?: boolean;
    isClicked?: boolean;
    onClick?: () => void;
    size?: ButtonSize;
    variant?: ButtonVariant;
};

export interface ButtonTheme extends DefaultTheme {
    disabled?: boolean;
    isClicked?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

export enum ButtonVariant {
    Primary = 'Primary',
}

export enum ButtonSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    Full = 'Full',
}
