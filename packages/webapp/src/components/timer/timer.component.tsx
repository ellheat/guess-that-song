import React from 'react';

import { Wrapper, Content } from './timer.styles';

type TimerProps = {
    className?: string;
    time: number;
};

export const Timer = ({ className, time }: TimerProps) => {
    return (
        <Wrapper className={className}>
            <Content>{time}</Content>
        </Wrapper>
    );
};
