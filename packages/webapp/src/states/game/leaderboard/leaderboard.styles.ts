import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;

export const List = styled.ul`
    list-style: decimal;
    padding-left: 24px;
`;

export const Item = styled.li`
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`;
