const _ = require('lodash');

module.exports = {
    stories: _.compact([
        process.env.NODE_ENV !== 'test' && '../src/**/*.stories.mdx',
        '../src/components/**/*.stories.{jsx,tsx}'
    ]),
    features: {
        // postcss loader deprecated: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
        postcss: false
    },
    addons: ['@storybook/addon-docs', '@storybook/preset-scss']
};
