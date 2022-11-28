import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupConfirm from './PopupConfirm';

export default {
    title: 'Popups/PopupConfirm',
    component: PopupConfirm,
    decorators: [LiveEditDecorator({ PopupConfirm })]
};

type PopupConfirmStory = ComponentStory<typeof PopupConfirm>;

export const basic: PopupConfirmStory = () => (
    <PopupConfirm trigger={<button type="button">Delete</button>} content="Delete this file?" />
);
basic.storyName = 'Default';

export const noCancelButton: PopupConfirmStory = () => (
    <PopupConfirm trigger={<button type="button">Delete</button>} onCanConfirm={() => 'Delete this file?'} />
);

export const initiallyOpen: PopupConfirmStory = () => (
    <div style={{ paddingTop: 80 }}>
        <PopupConfirm trigger={<button type="button">Delete</button>} defaultOpen content="Delete this file?" />
    </div>
);
