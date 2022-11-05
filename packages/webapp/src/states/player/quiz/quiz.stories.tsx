import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Quiz } from './quiz.component';
import { withGlobalStyles } from '../../../utils/storybook/decorators';
import { QUIZ_STATES } from './quiz.constants';
import { ANSWERS } from '../../../components/answers/mocks/answers';

export default {
    title: 'States/Player/Quiz',
    component: Quiz,
    decorators: [withGlobalStyles],
} as ComponentMeta<typeof Quiz>;

const Template: ComponentStory<typeof Quiz> = (args) => <Quiz {...args} />;

export const PreRound = Template.bind({});
PreRound.args = {
    state: QUIZ_STATES.PreRound,
};

export const Round = Template.bind({});
Round.args = {
    quizAnswers: ANSWERS,
    state: QUIZ_STATES.Round,
};
