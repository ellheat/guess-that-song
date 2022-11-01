import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Answers } from './answers.component';
import { ANSWERS } from './mocks/answers';

export default {
    title: 'Components/Answers',
    component: Answers,
} as ComponentMeta<typeof Answers>;

const Template: ComponentStory<typeof Answers> = (args) => <Answers {...args} />;

export const Default = Template.bind({});
Default.args = {
    answers: ANSWERS,
};
export const HiddenTitles = Template.bind({});
HiddenTitles.args = {
    answers: ANSWERS,
    areTitleHidden: true,
};
