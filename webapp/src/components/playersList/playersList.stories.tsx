import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlayersList } from './playersList.component';
import { player } from '../../mocks';

export default {
  title: 'Components/PlayersList',
  component: PlayersList,
} as ComponentMeta<typeof PlayersList>;

const Template: ComponentStory<typeof PlayersList> = (args) => <PlayersList {...args} />;

export const Default = Template.bind({});
Default.args = {
  players: [player(), player(), player()],
};
