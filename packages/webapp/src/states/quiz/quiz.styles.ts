import styled from 'styled-components';
import { black, white } from '../../theme/colors';

export const Container = styled.div``;

export const Bar = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  color: ${white};
  background-color: ${black};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const AudioPlayerWrapper = styled.div`
    display: none;
`;