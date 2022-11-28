import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import React from 'react';
import LabelsList from './LabelsList';

export default {
    title: 'Cloudify/LabelsList',
    component: LabelsList,
    decorators: [LiveEditDecorator({ LabelsList })]
};

type LabelsListStory = ComponentStory<typeof LabelsList>;

export const basic: LabelsListStory = () => (
    <LabelsList
        labels={[
            { key: 'key1', value: 'inSystem', isInSystem: true },
            { key: 'key2', value: 'notInSystem', isInSystem: false }
        ]}
        onChange={() => {}}
    />
);
basic.storyName = 'Default';
