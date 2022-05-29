import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AudioPlayer } from './audioPlayer.component';
import { ANSWERS } from '../../states/answers/mocks/answers';

export default {
  title: 'Components/AudioPlayer',
  component: AudioPlayer,
} as ComponentMeta<typeof AudioPlayer>;

const Template: ComponentStory<typeof AudioPlayer> = (args) => <AudioPlayer {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: ANSWERS[0].previewUrl,
};
