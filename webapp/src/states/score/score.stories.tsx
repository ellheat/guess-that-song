import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Score } from './score.component';

export default {
  title: 'States/Score',
  component: Score,
} as ComponentMeta<typeof Score>;

const Template: ComponentStory<typeof Score> = (args) => <Score {...args} />;

export const Default = Template.bind({});