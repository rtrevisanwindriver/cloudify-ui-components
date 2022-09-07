import React from 'react';
import type { Story } from '@storybook/react';
import type { ButtonProps } from 'semantic-ui-react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import CancelButton from './CancelButton';

export default {
    title: 'Buttons/CancelButton',
    component: CancelButton,
    decorators: [LiveEditDecorator({ CancelButton })]
};

export const basic: Story<Required<ButtonProps>> = () => <CancelButton />;
basic.storyName = 'Default';

export const custom = () => <CancelButton content="Stop" icon="stop" color="red" />;
custom.storyName = 'Custom content';
