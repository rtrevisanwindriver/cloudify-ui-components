import React from 'react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form';

export default {
    title: 'Form/Time',
    component: Form.Time,
    decorators: [LiveEditDecorator({ Form, DivContainer })]
};

export const basic = () => {
    const [time, setTime] = React.useState('04:30');

    return (
        <DivContainer height={250}>
            {/* @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read. */}
            <Form.Time name="time" value={time} onChange={(e, { value }) => setTime(value)} />
        </DivContainer>
    );
};
