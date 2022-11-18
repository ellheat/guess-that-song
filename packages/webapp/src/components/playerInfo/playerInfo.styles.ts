import styled from 'styled-components';

export const headerHeight = 64;

export const Wrapper = styled.header`
    position: relative;
    width: 100%;
    height: ${headerHeight}px;
    color: #200341;
`;

export const Title = styled.div`
    width: 100%;
    height: ${headerHeight - 24}px;
    background-image: linear-gradient(
        90deg,
        transparent 10%,
        ${({ color }) => color} 30%,
        ${({ color }) => color} 70%,
        transparent 90%
    );
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SubTitle = styled.div`
    height: 24px;
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-image: linear-gradient(
        90deg,
        transparent 10%,
        ${({ color }) => color} 30%,
        ${({ color }) => color} 70%,
        transparent 90%
    );
`;
