import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Checkmark from './Checkmark';

export default {
    title: 'Elements/Checkmark',
    component: Checkmark,
    decorators: [LiveEditDecorator({ Checkmark })]
};
type CheckmarkStory = ComponentStory<typeof Checkmark>;

export const basic: CheckmarkStory = () => <Checkmark />;
basic.storyName = 'Default';

export const checked: CheckmarkStory = () => <Checkmark value />;

export const unchecked: CheckmarkStory = () => <Checkmark value={false} />;
