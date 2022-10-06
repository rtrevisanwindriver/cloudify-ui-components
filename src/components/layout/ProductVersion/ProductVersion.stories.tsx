import type { Story } from '@storybook/react';
import React from 'react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { ProductVersionProps } from './ProductVersion';
import ProductVersion from './ProductVersion';

export default {
    title: 'Layout/ProductVersion',
    component: ProductVersion,
    decorators: [LiveEditDecorator({ ProductVersion })]
};

type ProductVersionStory = Story<Required<ProductVersionProps>>;

export const basic: ProductVersionStory = () => <ProductVersion version="6.3.0-dev" />;
