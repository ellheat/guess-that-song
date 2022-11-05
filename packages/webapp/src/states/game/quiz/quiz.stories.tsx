import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Quiz } from './quiz.component';
import { withGlobalStyles } from '../../../utils/storybook/decorators';
import { QUIZ_STATES } from './constants';
import { ANSWERS } from '../../../components/answers/mocks/answers';
import { Container } from '../../../routes/home/game/game.styles';

export default {
    title: 'States/Game/Quiz',
    component: Quiz,
    decorators: [withGlobalStyles],
} as ComponentMeta<typeof Quiz>;

const Template: ComponentStory<typeof Quiz> = (args) => (
    <Container>
        <Quiz {...args} />
    </Container>
);

export const PreRound = Template.bind({});
PreRound.args = {
    state: QUIZ_STATES.PreRound,
};

export const Round = Template.bind({});
Round.args = {
    quizAnswers: ANSWERS,
    state: QUIZ_STATES.Round,
    quizTrackUrl: ANSWERS[0].previewUrl,
};
