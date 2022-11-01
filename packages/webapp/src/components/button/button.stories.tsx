import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from './button.component';
import { ButtonSize, ButtonVariant } from './button.types';

export default {
    title: 'Components/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Button {...args}>Button</Button>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    onClick: action('clicked'),
    disabled: false,
    variant: ButtonVariant.Primary,
    size: ButtonSize.Small,
};
