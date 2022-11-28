import type { ComponentStory } from '@storybook/react';
import React from 'react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ProductVersion from './ProductVersion';

export default {
    title: 'Layout/ProductVersion',
    component: ProductVersion,
    decorators: [LiveEditDecorator({ ProductVersion })]
};

type ProductVersionStory = ComponentStory<typeof ProductVersion>;

export const basic: ProductVersionStory = () => <ProductVersion version="6.3.0-dev" />;
