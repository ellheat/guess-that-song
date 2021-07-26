import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlayerInfo } from './playerInfo.component';
import { player } from '../../mocks';

export default {
  title: 'Components/PlayerInfo',
  component: PlayerInfo,
} as ComponentMeta<typeof PlayerInfo>;

const Template: ComponentStory<typeof PlayerInfo> = (args) => <PlayerInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: player(),
};
