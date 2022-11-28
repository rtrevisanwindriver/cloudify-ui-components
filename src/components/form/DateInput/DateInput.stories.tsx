import React from 'react';
import moment from 'moment';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import DateInput from './DateInput';

export default {
    title: 'Form/Date',
    component: DateInput,
    decorators: [LiveEditDecorator({ DateInput, Form, moment })]
};

export type DateInputStory = ComponentStory<typeof DateInput>;

export const basic: DateInputStory = () => {
    const [date, setDate] = React.useState('');

    return <Form.Date name="date" value={date} onChange={(_event, { value }) => setDate(value)} />;
};

export const defaultValue: DateInputStory = () => {
    const defaultDate = '2019-12-15 00:00';
    const [date, setDate] = React.useState(defaultDate);

    return (
        <Form.Date
            name="date"
            value={date}
            defaultValue={defaultDate}
            onChange={(_event, { value }) => setDate(value)}
        />
    );
};

export const minimalAndMaximalDate: DateInputStory = () => {
    const [date, setDate] = React.useState('');
    const weeksOffset = 1;

    return (
        <Form.Date
            name="date"
            value={date}
            minDate={moment().subtract(weeksOffset, 'w')}
            maxDate={moment().add(weeksOffset, 'w')}
            onChange={(_event, { value }) => setDate(value)}
        />
    );
};

export const customTimeIntervals: DateInputStory = () => {
    const [date, setDate] = React.useState('');

    return <Form.Date name="date" value={date} onChange={(_event, { value }) => setDate(value)} timeIntervals={30} />;
};

export const invalidValue: DateInputStory = () => <Form.Date name="date" value="Invalid value" onChange={() => {}} />;

export const initiallyOpen: DateInputStory = () => {
    const [date, setDate] = React.useState('2019-11-15 00:00');

    return (
        <div style={{ paddingTop: 280 }}>
            <Form.Date defaultOpen name="date" value={date} onChange={(_event, { value }) => setDate(value)} />
        </div>
    );
};
