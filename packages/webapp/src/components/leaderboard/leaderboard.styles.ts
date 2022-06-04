import styled from 'styled-components';

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
