import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 32px;
    width: 100%;
    height: -webkit-fill-available;
    min-height: 100%;
`;
