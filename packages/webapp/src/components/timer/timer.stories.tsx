import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Timer } from './timer.component';

export default {
    title: 'Components/Timer',
    component: Timer,
} as ComponentMeta<typeof Timer>;

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args}>Button</Timer>;

export const Default = Template.bind({});
Default.args = {
    time: 20,
};
