import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Leaderboard } from './leaderboard.component';
import { player } from '../../mocks';


export default {
	title: 'Components/Leaderboard',
	component: Leaderboard,
} as ComponentMeta<typeof Leaderboard>;

const Template: ComponentStory<typeof Leaderboard> = (args) => <Leaderboard {...args} />;

export const Default = Template.bind({});
Default.args = {
	list: [player(), player(), player()]
}
