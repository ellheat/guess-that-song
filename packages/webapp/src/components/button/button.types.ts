import { ButtonHTMLAttributes, ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
};

export interface ButtonTheme extends DefaultTheme {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
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
