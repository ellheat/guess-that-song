import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Player } from './player.component';
import { GameStates } from '../../../machines';
import { withGameStateProvider, withGlobalStyles } from '../../../utils/storybook/decorators';

export default {
    title: 'Routes/Player',
    component: Player,
    decorators: [withGameStateProvider, withGlobalStyles],
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = () => <Player />;

export const Lobby = Template.bind({});
Lobby.args = {
    state: GameStates.Lobby,
};

export const Quiz = Template.bind({});
Quiz.args = {
    state: GameStates.Quiz,
};

export const Score = Template.bind({});
Score.args = {
    state: GameStates.Leaderboard,
};
