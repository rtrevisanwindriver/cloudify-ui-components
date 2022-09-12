import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupHelp from './PopupHelp';

export default {
    title: 'Popups/PopupHelp',
    component: PopupHelp,
    decorators: [LiveEditDecorator({ PopupHelp })]
};

export const basic = () => <PopupHelp content="Help information" />;
basic.storyName = 'Default';

export const customHeader = () => <PopupHelp header="Types" content="We recognize string, integer and object types." />;

export const customTrigger = () => (
    <PopupHelp trigger={<span>Show Help</span>} content="Select the color from the list." />
);

export const forceOpen = () => (
    <div style={{ paddingTop: 50 }}>
        <PopupHelp open content="Help information" />
    </div>
);
