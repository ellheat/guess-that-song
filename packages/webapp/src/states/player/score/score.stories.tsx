import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Score } from './score.component';
import { player } from '../../../mocks';
import { withGlobalStyles } from '../../../utils/storybook/decorators';

const playerData = player();

export default {
    title: 'States/Score',
    component: Score,
    decorators: [withGlobalStyles],
} as ComponentMeta<typeof Score>;

const Template: ComponentStory<typeof Score> = (args) => <Score {...args} />;

export const Default = Template.bind({});
Default.args = {
    place: playerData.place,
    points: playerData.points,
};
