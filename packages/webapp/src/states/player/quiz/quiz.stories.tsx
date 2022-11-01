import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Quiz } from './quiz.component';
import { withGlobalStyles } from '../../../utils/storybook/decorators';

export default {
    title: 'States/Player/Quiz',
    component: Quiz,
    decorators: [withGlobalStyles],
} as ComponentMeta<typeof Quiz>;

const Template: ComponentStory<typeof Quiz> = () => <Quiz />;

export const Default = Template.bind({});
