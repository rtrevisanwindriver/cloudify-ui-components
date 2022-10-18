import React from 'react';
import type { Story } from '@storybook/react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { TimeInputProps } from './TimeInput';

import Form from '../Form';

export default {
    title: 'Form/Time',
    component: Form.Time,
    decorators: [LiveEditDecorator({ Form, DivContainer })]
};

type TimeInputStory = Story<Required<TimeInputProps>>;

export const basic: TimeInputStory = () => {
    const [time, setTime] = React.useState('04:30');

    return (
        <DivContainer height={250}>
            <Form.Time name="time" value={time} onChange={(_e, { value }) => setTime(value)} />
        </DivContainer>
    );
};
