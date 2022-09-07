import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import CopyToClipboardButton from './CopyToClipboardButton';
import type { CopyToClipboardButtonProps } from './CopyToClipboardButton';

export default {
    title: 'Buttons/CopyToClipboardButton',
    component: CopyToClipboardButton,
    decorators: [LiveEditDecorator({ CopyToClipboardButton })]
};

export const basic: Story<Required<CopyToClipboardButtonProps>> = () => <CopyToClipboardButton />;
basic.storyName = 'Default';

export const custom = () => <CopyToClipboardButton text="Text to copy" content="Copy ID" />;
custom.storyName = 'Custom content';
