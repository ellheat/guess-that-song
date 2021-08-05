import styled from 'styled-components';

export const headerHeight = 64;

export const Container = styled.header`
  position: relative;
  width: 100%;
  height: ${headerHeight}px;
  background-color: ${({ color }) => color};
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
