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

export const customColoringStrategy: LabelsListStory = () => (
    <LabelsList
        coloringStrategy={label => (label.key === 'key1' ? 'green' : 'red')}
        labels={[
            { key: 'key1', value: 'inSystem', isInSystem: true },
            { key: 'key2', value: 'notInSystem', isInSystem: false }
        ]}
        onChange={() => {}}
    />
);
customColoringStrategy.storyName = 'With custom coloring strategy';
