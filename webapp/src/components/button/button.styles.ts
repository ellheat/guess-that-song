import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';
import { ButtonSize, ButtonTheme, ButtonVariant } from './button.types';

type ButtonThemeProps = ThemeProps<ButtonTheme>;


const smallSizeButtonStyle = css`
  padding: 8px 24px;
  font-size: 12px;
`;

const mediumSizeButtonStyle = css`
  padding: 16px 40px;
  font-size: 14px;
`;

const largeSizeButtonStyle = css`
  padding: 24px 56px;
  font-size: 16px;
`;

const fullSizeButtonStyle = css`
  width: 100%;
  height: 100%;
  font-size: 32px;
`;

const primaryBaseButtonStyle = css``;

const baseButtonStyle = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: white;
  background-color: blue;
  border-color: blue;
  border-width: 1px;
  border-style: solid;
  
  ${(props: ButtonThemeProps) => props.theme.disabled && css`
    color: white;
    background-color: gray;
    border-color: gray;
  `}

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

export const Container = styled.button<ButtonThemeProps>`
  ${baseButtonStyle}
`;
