import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { CheckmarkProps } from './Checkmark';
import Checkmark from './Checkmark';

export default {
    title: 'Elements/Checkmark',
    component: Checkmark,
    decorators: [LiveEditDecorator({ Checkmark })]
};
type CheckmarkStory = Story<Required<CheckmarkProps>>;

export const basic: CheckmarkStory = () => <Checkmark />;
basic.storyName = 'Default';

export const checked: CheckmarkStory = () => <Checkmark value />;

export const unchecked: CheckmarkStory = () => <Checkmark value={false} />;
