import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div``;

export const List = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  display: block;
  background-color: ${({ color }) => color};
`;
