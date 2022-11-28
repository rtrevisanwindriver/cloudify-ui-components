import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import CopyToClipboardButton from './CopyToClipboardButton';

export default {
    title: 'Buttons/CopyToClipboardButton',
    component: CopyToClipboardButton,
    decorators: [LiveEditDecorator({ CopyToClipboardButton })]
};

type CopyToClipboardButtonStory = ComponentStory<typeof CopyToClipboardButton>;

export const basic: CopyToClipboardButtonStory = () => <CopyToClipboardButton />;
basic.storyName = 'Default';

export const custom: CopyToClipboardButtonStory = () => <CopyToClipboardButton text="Text to copy" content="Copy ID" />;
custom.storyName = 'Custom content';
