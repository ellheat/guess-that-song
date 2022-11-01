import { createGlobalStyle } from 'styled-components';
import * as colors from './colors';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: ${colors.primary};
    color: ${colors.white};
    font-family: Open-Sans, Helvetica, Sans-Serif, serif;
  }
`;

export default GlobalStyle;
