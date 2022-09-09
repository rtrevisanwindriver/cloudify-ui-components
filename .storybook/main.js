const _ = require('lodash');
const path = require('path');

module.exports = {
    stories: _.compact([
        process.env.NODE_ENV !== 'test' && '../src/**/*.stories.mdx',
        '../src/components/**/*.stories.{jsx,tsx}'
    ]),
    features: {
        // postcss loader deprecated: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
        postcss: false
    },
    addons: ['@storybook/addon-docs', '@storybook/preset-scss'],
    webpackFinal: async (config, { configType }) => {
        config.resolve.modules.push(path.resolve(__dirname, '../src'));
        return config;
    }
};
