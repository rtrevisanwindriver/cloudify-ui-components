import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import CancelButton from './CancelButton';

export default {
    title: 'Buttons/CancelButton',
    component: CancelButton,
    decorators: [LiveEditDecorator({ CancelButton })]
};

type CancelButtonStory = ComponentStory<typeof CancelButton>;

export const basic: CancelButtonStory = () => <CancelButton />;
basic.storyName = 'Default';

export const custom: CancelButtonStory = () => <CancelButton content="Stop" icon="stop" color="red" />;
custom.storyName = 'Custom content';
