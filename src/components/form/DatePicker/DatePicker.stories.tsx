import React from 'react';
import moment from 'moment';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import { DatePickerWithoutMemo } from './DatePicker';

export default {
    title: 'Form/DatePicker',
    component: DatePickerWithoutMemo,
    decorators: [LiveEditDecorator({ Form, moment })]
};

export const basic = () => {
    const [date, setDate] = React.useState(moment('20190101'));

    // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: Moment; onChange: (e:... Remove this comment to see the full error message
    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} />;
};

export const minimalAndMaximalDate = () => {
    const [date, setDate] = React.useState(moment('20190110'));

    return (
        <Form.DatePicker
            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; minDate: Moment; maxDate: Mo... Remove this comment to see the full error message
            name="date"
            minDate={moment('20190105')}
            maxDate={moment('20190115')}
            value={date}
            // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
            onChange={(e, { value }) => setDate(value)}
        />
    );
};

export const customTimeIntervals = () => {
    const [date, setDate] = React.useState(moment('20190101'));

    // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: Moment; onChange: (e:... Remove this comment to see the full error message
    return <Form.DatePicker name="date" value={date} onChange={(e, { value }) => setDate(value)} timeIntervals={1} />;
};
