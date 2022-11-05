import styled from 'styled-components';
import { Timer as TimerComponent } from '../../../../components/timer';
import { white } from '../../../../theme/colors';

export const Container = styled.section`
    height: 100vh;
    width: 100%;
`;

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
    position: relative;
    padding: 64px;
    height: calc(100% - 192px);
`;

export const Timer = styled(TimerComponent)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;
