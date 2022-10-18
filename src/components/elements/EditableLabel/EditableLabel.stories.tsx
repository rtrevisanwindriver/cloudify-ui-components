import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { EditableLabelProps } from './EditableLabel';
import EditableLabel from './EditableLabel';

export default {
    title: 'Elements/EditableLabel',
    component: EditableLabel,
    decorators: [LiveEditDecorator({ EditableLabel })]
};
type EditableLabelStory = Story<Required<EditableLabelProps>>;

export const basic: EditableLabelStory = () => <EditableLabel placeholder="Enter your text here..." />;
basic.storyName = 'Default';

export const readOnly: EditableLabelStory = () => <EditableLabel enabled={false} value="Sample Text" />;

export const externallyControlled: EditableLabelStory = () => <EditableLabel editing value="Sample Text" />;
