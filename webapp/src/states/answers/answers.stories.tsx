import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Answers } from './answers.component';

export default {
  title: 'States/Answers',
  component: Answers,
} as ComponentMeta<typeof Answers>;

const Template: ComponentStory<typeof Answers> = (args) => <Answers {...args} />;

export const Default = Template.bind({});
