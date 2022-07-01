import React from 'react';

import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { ApproveButtonProps } from './ApproveButton';
import ApproveButton from './ApproveButton';

export default {
    title: 'Buttons/ApproveButton',
    component: ApproveButton,
    decorators: [LiveEditDecorator({ ApproveButton })]
};

export const basic: Story<Required<ApproveButtonProps>> = () => <ApproveButton />;
basic.storyName = 'Default';

export const custom = () => <ApproveButton content="Add" icon="add user" />;
custom.storyName = 'Custom content';
