import React from 'react';
import { Segment } from 'semantic-ui-react';

import LoadingOverlay from './LoadingOverlay';
import LiveEditDecorator from '../../../decorators/LiveEditDecorator';

export default {
    title: 'Elements/LoadingOverlay',
    component: LoadingOverlay,
    decorators: [LiveEditDecorator({ Segment })]
};

export const basic = () => (
    <Segment>
        Covered text
        <LoadingOverlay />
    </Segment>
);
basic.story = {
    name: 'Default'
};
export const customMessage = () => (
    <Segment style={{ height: 80 }}>
        Covered text
        <LoadingOverlay message="Loading files" />
    </Segment>
);
