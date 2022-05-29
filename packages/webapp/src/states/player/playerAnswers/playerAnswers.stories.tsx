import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlayerAnswers } from './playerAnswers.component';

export default {
  title: 'States/PlayerAnswers',
  component: PlayerAnswers,
} as ComponentMeta<typeof PlayerAnswers>;

const Template: ComponentStory<typeof PlayerAnswers> = () => <PlayerAnswers />;

export const Default = Template.bind({});
