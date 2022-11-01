import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';
import * as colors from '../../theme/colors';
import { ButtonSize, ButtonTheme, ButtonVariant } from './button.types';

type ButtonThemeProps = ThemeProps<ButtonTheme>;

export const Container = styled.span``;

const smallSizeButtonStyle = css`
    ${Container} {
        padding: 16px 24px;
        font-size: 16px;
        line-height: 24px;
    }
`;

const mediumSizeButtonStyle = css`
    ${Container} {
        padding: 24px 40px;
        font-size: 24px;
        line-height: 32px;
    }
`;

const largeSizeButtonStyle = css`
    ${Container} {
        padding: 32px 56px;
        font-size: 32px;
        line-height: 40px;
    }
`;

const fullSizeButtonStyle = css`
    ${Container} {
        width: 100%;
        height: 100%;
        font-size: 40px;
        line-height: 48px;
    }
`;

const primaryBaseButtonStyle = css`
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    border-radius: 8px;
    border: 0;
    color: #ffffff;
    display: flex;
    padding: 4px;
    position: relative;

    &:before {
        background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
        content: '';
        filter: blur(20px);
        height: 100%;
        left: 0;
        opacity: 1;
        position: absolute;
        top: 0;
        transition: opacity 0.3s;
        width: 100%;
        z-index: -1;
    }

    &:active,
    &:hover {
        outline: 0;
    }

    ${Container} {
        align-items: center;
        background-color: ${colors.primary};
        border-radius: 6px;
        display: flex;
        justify-content: center;
        width: 100%;
        transition: 0.3s;
    }

    &:active,
    &:hover {
        ${Container} {
            background: none;
        }
    }
`;

const baseButtonStyle = css`
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: none;
    touch-action: manipulation;
    user-select: none;

    ${theme('variant', {
        [ButtonVariant.Primary]: primaryBaseButtonStyle,
    })};

    ${theme('size', {
        [ButtonSize.Small]: smallSizeButtonStyle,
        [ButtonSize.Medium]: mediumSizeButtonStyle,
        [ButtonSize.Large]: largeSizeButtonStyle,
        [ButtonSize.Full]: fullSizeButtonStyle,
    })};
`;

export const Wrapper = styled.button<ButtonThemeProps>`
    ${baseButtonStyle}
`;
