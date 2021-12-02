import { Story } from '@storybook/react';
import React from 'react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ProductVersion, { ProductVersionProps } from './ProductVersion';

export default {
    title: 'Layout/ProductVersion',
    component: ProductVersion,
    decorators: [LiveEditDecorator({ ProductVersion })]
};

export const basic: Story<Required<ProductVersionProps>> = () => <ProductVersion version="6.3.0-dev" />;
