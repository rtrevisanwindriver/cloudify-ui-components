import type { ComponentStory } from '@storybook/react';
import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import KeyIndicator from './KeyIndicator';

export default {
    title: 'Data/KeyIndicator',
    component: KeyIndicator,
    decorators: [LiveEditDecorator({ KeyIndicator })]
};

type KeyIndicatorStory = ComponentStory<typeof KeyIndicator>;

export const iconWithLabelAndNumber: KeyIndicatorStory = () => (
    <KeyIndicator title="User Stars" icon="star" number={54} />
);

export const iconWithLabel: KeyIndicatorStory = () => <KeyIndicator title="Plugins" icon="plug" />;

export const externalImage: KeyIndicatorStory = () => (
    <KeyIndicator
        title="Team members"
        imageSrc="https://react.semantic-ui.com/images/avatar/small/matthew.png"
        number={3}
    />
);
