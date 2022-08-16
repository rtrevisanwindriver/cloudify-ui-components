import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import React from 'react';
import type { LabelsListProps } from './LabelsList';
import LabelsList from './LabelsList';

export default {
    title: 'Cloudify/LabelsList',
    component: LabelsList,
    decorators: [LiveEditDecorator({ LabelsList })]
};

export const basic: Story<Required<LabelsListProps>> = () => (
    <LabelsList
        labels={[
            { key: 'key1', value: 'inSystem', isInSystem: true },
            { key: 'key2', value: 'notInSystem', isInSystem: false }
        ]}
        onChange={() => {}}
    />
);
basic.storyName = 'Default';
