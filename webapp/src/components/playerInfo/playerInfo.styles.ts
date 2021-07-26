import styled from 'styled-components';

export const Container = styled.header`
  position: relative;
  width: 100%;
  height: 64px;
  background-color: ${({ color }) => color};
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
