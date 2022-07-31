import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Quiz } from './quiz.component';
import { player } from '../../../mocks';


export default {
	title: 'States/Game/Quiz',
	component: Quiz,
} as ComponentMeta<typeof Quiz>;

const Template: ComponentStory<typeof Quiz> = () => <Quiz />;

export const Default = Template.bind({});
