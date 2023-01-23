import React from 'react';
import type { ComponentStory } from '@storybook/react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';

import { Form } from 'components';

export default {
    title: 'Form/Time',
    component: Form.Time,
    decorators: [LiveEditDecorator({ Form, DivContainer })]
};

type TimeInputStory = ComponentStory<typeof Form.Time>;

export const basic: TimeInputStory = () => {
    const [time, setTime] = React.useState('04:30');

    return (
        <DivContainer height={250}>
            <Form.Time name="time" value={time} onChange={(_e, { value }) => setTime(value)} />
        </DivContainer>
    );
};
