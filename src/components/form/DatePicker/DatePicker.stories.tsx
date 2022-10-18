import React from 'react';
import moment from 'moment';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import { DatePickerWithoutMemo } from './DatePicker';
import type { DatePickerProps } from './DatePicker';

export default {
    title: 'Form/DatePicker',
    component: DatePickerWithoutMemo,
    decorators: [LiveEditDecorator({ Form, moment })]
};

type DatePickerStory = Story<Required<DatePickerProps>>;

export const basic: DatePickerStory = () => {
    const [date, setDate] = React.useState(moment('20190101'));

    return <Form.DatePicker name="date" value={date} onChange={(_event, { value }) => setDate(value)} />;
};

export const minimalAndMaximalDate: DatePickerStory = () => {
    const [date, setDate] = React.useState(moment('20190110'));

    return (
        <Form.DatePicker
            name="date"
            minDate={moment('20190105')}
            maxDate={moment('20190115')}
            value={date}
            onChange={(_event, { value }) => setDate(value)}
        />
    );
};

export const customTimeIntervals: DatePickerStory = () => {
    const [date, setDate] = React.useState(moment('20190101'));

    return (
        <Form.DatePicker name="date" value={date} onChange={(_event, { value }) => setDate(value)} timeIntervals={1} />
    );
};
