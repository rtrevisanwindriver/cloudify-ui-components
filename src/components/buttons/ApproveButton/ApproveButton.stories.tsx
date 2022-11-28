import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ApproveButton from './ApproveButton';

export default {
    title: 'Buttons/ApproveButton',
    component: ApproveButton,
    decorators: [LiveEditDecorator({ ApproveButton })]
};

type ApproveButtonStory = ComponentStory<typeof ApproveButton>;

export const basic: ApproveButtonStory = () => <ApproveButton />;
basic.storyName = 'Default';

export const custom: ApproveButtonStory = () => <ApproveButton content="Add" icon="add user" />;
custom.storyName = 'Custom content';
