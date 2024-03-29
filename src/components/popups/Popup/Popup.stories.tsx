import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Popup from './Popup';

type PopupStory = ComponentStory<typeof Popup>;

export default {
    title: 'Popups/Popup',
    component: Popup,
    decorators: [LiveEditDecorator({ Popup })]
};

export const basic: PopupStory = () => (
    <Popup>
        <Popup.Trigger>
            <span>Hover over me to see popup</span>
        </Popup.Trigger>
        <Popup.Header>Popup header</Popup.Header>
        <Popup.Content>This is the popup content</Popup.Content>
    </Popup>
);
basic.storyName = 'Default';

export const forceOpen: PopupStory = () => (
    <div style={{ paddingTop: 100 }}>
        <Popup open>
            <Popup.Trigger>
                <span>Trigger</span>
            </Popup.Trigger>
            <Popup.Header>Popup header</Popup.Header>
            <Popup.Content>This is the popup content</Popup.Content>
        </Popup>
    </div>
);
