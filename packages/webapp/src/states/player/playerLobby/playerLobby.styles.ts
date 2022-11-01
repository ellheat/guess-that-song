import styled from 'styled-components';

import { Button as ButtonComponent } from '../../../components/button';

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    text-align: center;
`;

export const Text = styled.p``;

export const Button = styled(ButtonComponent)`
    margin: 0 auto;
`;
