module.exports = {
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
    core: {
        builder: 'webpack5',
    },
    stories: ['../src/**/*.stories.@(ts|tsx)'],
};
