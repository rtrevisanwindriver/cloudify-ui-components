import React from 'react';
import { Button } from 'semantic-ui-react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Confirm from './Confirm';

export default {
    title: 'Modal/Confirm',
    component: Confirm,
    decorators: [LiveEditDecorator({ Button, Confirm })]
};

type ConfirmStory = ComponentStory<typeof Confirm>;

export const basic: ConfirmStory = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Confirm" />
            <Confirm
                content="Are you sure you want to remove this blueprint?"
                open={open}
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </div>
    );
};
