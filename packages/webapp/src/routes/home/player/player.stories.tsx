import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Player } from './player.component';
import { GameStates } from '../../../machines';
import { GameStateContext } from '../../../context';

export default {
    title: 'Routes/Player',
    component: Player,
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = () => <Player />;

export const Lobby = Template.bind({});
Lobby.decorators = [
    (Story) => <GameStateContext.Provider value={{ state: GameStates.Lobby }}>{Story()}</GameStateContext.Provider>,
];

export const Quiz = Template.bind({});
Quiz.decorators = [
    (Story) => <GameStateContext.Provider value={{ state: GameStates.Quiz }}>{Story()}</GameStateContext.Provider>,
];

export const Score = Template.bind({});
Score.decorators = [
    (Story) => (
        <GameStateContext.Provider value={{ state: GameStates.Leaderboard }}>{Story()}</GameStateContext.Provider>
    ),
];
