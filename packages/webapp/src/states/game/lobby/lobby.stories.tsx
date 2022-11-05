import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Lobby } from './lobby.component';
import { player } from '../../../mocks';
import { primary } from '../../../theme/colors';
import { withGlobalStyles } from '../../../utils/storybook/decorators';

export default {
    title: 'States/Game/Lobby',
    component: Lobby,
    decorators: [withGlobalStyles],
} as ComponentMeta<typeof Lobby>;

const Template: ComponentStory<typeof Lobby> = (args) => (
    <div style={{ backgroundColor: primary }}>
        <Lobby {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    list: [player(), player(), player()],
};
