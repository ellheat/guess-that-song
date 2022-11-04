import styled from 'styled-components';
import * as colors from '../../theme/colors';

export const Wrapper = styled.div`
    height: 140px;
    width: 140px;
    display: flex;
    border-radius: 50%;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    border: 0;
    display: flex;
    padding: 8px;
`;

export const Content = styled.span`
    align-items: center;
    background-color: ${colors.primary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 40px;
    color: ${colors.white};
`;
