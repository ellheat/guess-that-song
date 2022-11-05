import { createGlobalStyle } from 'styled-components';
import * as colors from './colors';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: ${colors.primary};
    background: linear-gradient(rgb(40, 0, 69) 0%, rgb(8, 0, 54) 30% , rgb(8, 0, 54) 75%, rgb(0, 0, 0) 100%) no-repeat;
    color: ${colors.white};
    font-family: Open-Sans, Helvetica, Sans-Serif, serif;
  }
`;

export default GlobalStyle;
