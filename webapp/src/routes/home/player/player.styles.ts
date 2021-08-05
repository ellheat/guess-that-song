import styled from 'styled-components';
import { headerHeight } from '../../../components/playerInfo/playerInfo.styles';

export const Wrapper = styled.div``;

export const Container = styled.div`
  display: flex;
  height: calc(100vh - ${headerHeight}px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
