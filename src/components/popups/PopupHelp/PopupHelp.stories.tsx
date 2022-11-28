import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupHelp from './PopupHelp';

export default {
    title: 'Popups/PopupHelp',
    component: PopupHelp,
    decorators: [LiveEditDecorator({ PopupHelp })]
};

type PopupHelpStory = ComponentStory<typeof PopupHelp>;

export const basic: PopupHelpStory = () => <PopupHelp content="Help information" />;
basic.storyName = 'Default';

export const customHeader: PopupHelpStory = () => (
    <PopupHelp header="Types" content="We recognize string, integer and object types." />
);

export const customTrigger: PopupHelpStory = () => (
    <PopupHelp trigger={<span>Show Help</span>} content="Select the color from the list." />
);

export const forceOpen: PopupHelpStory = () => (
    <div style={{ paddingTop: 50 }}>
        <PopupHelp open content="Help information" />
    </div>
);
