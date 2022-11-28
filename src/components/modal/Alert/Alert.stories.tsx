import React from 'react';
import { Button } from 'semantic-ui-react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Alert from './Alert';

export default {
    title: 'Modal/Alert',
    component: Alert,
    decorators: [LiveEditDecorator({ Button, Alert })]
};

type AlertStory = ComponentStory<typeof Alert>;

export const basic: AlertStory = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Alert" />
            <Alert content="This is the message" open={open} onDismiss={() => setOpen(false)} />
        </div>
    );
};
