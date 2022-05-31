import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Quiz } from './quiz.component';

export default {
  title: 'States/Player/Quiz',
  component: Quiz,
} as ComponentMeta<typeof Quiz>;

const Template: ComponentStory<typeof Quiz> = () => <Quiz />;

export const Default = Template.bind({});
