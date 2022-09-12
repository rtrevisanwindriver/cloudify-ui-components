import React from 'react';
import moment from 'moment';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import DateInput from './DateInput';

export default {
    title: 'Form/Date',
    component: DateInput,
    decorators: [LiveEditDecorator({ DateInput, Form, moment })]
};

export const basic = () => {
    const [date, setDate] = React.useState('');

    // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; onChange: (ev... Remove this comment to see the full error message
    return <Form.Date name="date" value={date} onChange={(event, { value }) => setDate(value)} />;
};

export const defaultValue = () => {
    const defaultDate = '2019-12-15 00:00';
    const [date, setDate] = React.useState(defaultDate);

    return (
        <Form.Date
            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; defaultValue:... Remove this comment to see the full error message
            name="date"
            value={date}
            defaultValue={defaultDate}
            // @ts-expect-error TS(6133) FIXME: 'event' is declared but its value is never read.
            onChange={(event, { value }) => setDate(value)}
        />
    );
};

export const minimalAndMaximalDate = () => {
    const [date, setDate] = React.useState('');

    return (
        <Form.Date
            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; minDate: Mome... Remove this comment to see the full error message
            name="date"
            value={date}
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            minDate={moment().subtract(1, 'W')}
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            maxDate={moment().add(1, 'W')}
            // @ts-expect-error TS(6133) FIXME: 'event' is declared but its value is never read.
            onChange={(event, { value }) => setDate(value)}
        />
    );
};

export const customTimeIntervals = () => {
    const [date, setDate] = React.useState('');

    // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; onChange: (ev... Remove this comment to see the full error message
    return <Form.Date name="date" value={date} onChange={(event, { value }) => setDate(value)} timeIntervals={30} />;
};

// @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; }' is not ass... Remove this comment to see the full error message
export const invalidValue = () => <Form.Date name="date" value="Invalid value" />;

export const initiallyOpen = () => {
    const [date, setDate] = React.useState('2019-11-15 00:00');

    return (
        <div style={{ paddingTop: 280 }}>
            {/* @ts-expect-error TS(2322) FIXME: Type '{ defaultOpen: true; name: string; value: st... Remove this comment to see the full error message */}
            <Form.Date defaultOpen name="date" value={date} onChange={(event, { value }) => setDate(value)} />
        </div>
    );
};
