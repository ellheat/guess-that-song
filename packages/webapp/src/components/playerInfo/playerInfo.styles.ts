import styled from 'styled-components';

export const headerHeight = 64;

export const Container = styled.header`
    position: relative;
    width: 100%;
    height: ${headerHeight}px;
    background-image: linear-gradient(
        90deg,
        transparent 10%,
        ${({ color }) => color} 30%,
        ${({ color }) => color} 70%,
        transparent 90%
    );
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    color: #200341;
    display: flex;
    align-items: center;
    justify-content: center;
`;
