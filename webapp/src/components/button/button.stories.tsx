import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  onClick: action('clicked'),
}

