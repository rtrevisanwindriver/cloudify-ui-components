import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupHelp from './PopupHelp';
import type { PopupHelpProps } from './PopupHelp';

export default {
    title: 'Popups/PopupHelp',
    component: PopupHelp,
    decorators: [LiveEditDecorator({ PopupHelp })]
};

type PopupHelpStory = Story<Required<PopupHelpProps>>;

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
