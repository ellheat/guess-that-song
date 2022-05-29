import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 3px;
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: black
`;
