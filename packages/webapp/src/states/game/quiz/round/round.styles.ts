import styled from 'styled-components';
import { Timer as TimerComponent } from '../../../../components/timer';
import { white } from '../../../../theme/colors';

export const Container = styled.div``;

export const Bar = styled.div`
    padding-top: 16px;
    padding-bottom: 16px;
    color: ${white};
    background-image: linear-gradient(145deg, #af40ff, #5b42f3 50%, #00ddeb);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 32px;
`;

export const AudioPlayerWrapper = styled.div`
    display: none;
`;

export const AnswersWrapper = styled.div`
    padding: 64px;
`;

export const Timer = styled(TimerComponent)`
    position: absolute;
    left: 50%;
    top: calc(50% + 50px);
    transform: translate(-50%, calc(-50% + 50px));
    z-index: 1;
`;
