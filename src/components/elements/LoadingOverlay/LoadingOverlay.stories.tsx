import React from 'react';
import { Segment } from 'semantic-ui-react';

import type { ComponentStory } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import LoadingOverlay from './LoadingOverlay';

export default {
    title: 'Elements/LoadingOverlay',
    component: LoadingOverlay,
    decorators: [LiveEditDecorator({ Segment })]
};
type LoadingOverlayStory = ComponentStory<typeof LoadingOverlay>;

export const basic: LoadingOverlayStory = () => (
    <Segment>
        Covered text
        <LoadingOverlay />
    </Segment>
);
basic.storyName = 'Default';

export const customMessage: LoadingOverlayStory = () => (
    <Segment style={{ height: 80 }}>
        Covered text
        <LoadingOverlay message="Loading files" />
    </Segment>
);
