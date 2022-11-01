import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: calc((100vh / 2) - 32px) calc((100vh / 2) - 32px);
    grid-gap: 32px;
    width: 100%;
`;
