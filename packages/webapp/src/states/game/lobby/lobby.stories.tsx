import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Lobby } from './lobby.component';
import { player } from '../../../mocks';


export default {
	title: 'States/Game/Lobby',
	component: Lobby,
} as ComponentMeta<typeof Lobby>;

const Template: ComponentStory<typeof Lobby> = (args) => <Lobby {...args} />;

export const Default = Template.bind({});
Default.args = {
	list: [player(), player(), player()]
}
