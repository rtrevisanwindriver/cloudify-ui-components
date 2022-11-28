import React from 'react';
import moment from 'moment';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import DateRangeInput from './DateRangeInput';

export default {
    title: 'Form/DateRange',
    component: DateRangeInput,
    decorators: [LiveEditDecorator({ Form, moment })]
};

type DateRangeInputStory = ComponentStory<typeof DateRangeInput>;

export const basic: DateRangeInputStory = () => {
    const [timeFilter, setTimeFilter] = React.useState(Form.DateRange.EMPTY_VALUE);

    return (
        <Form.DateRange name="timeFilter" value={timeFilter} onChange={(_event, { value }) => setTimeFilter(value)} />
    );
};

export const defaultValue: DateRangeInputStory = () => {
    const dV = {
        start: moment().subtract(1, 'w').format(DateRangeInput.DATETIME_FORMAT),
        end: moment().subtract(1, 'w').format(DateRangeInput.DATETIME_FORMAT),
        range: 'Custom default value range text'
    };
    const [timeFilter, setTimeFilter] = React.useState(dV);
    return (
        <Form.DateRange
            name="timeFilter"
            defaultValue={dV}
            value={timeFilter}
            onChange={(_event, { value }) => setTimeFilter(value)}
        />
    );
};

export const customRanges: DateRangeInputStory = () => {
    const [timeFilter, setTimeFilter] = React.useState(Form.DateRange.EMPTY_VALUE);
    const ranges = {
        'Last 4 Hours': {
            start: moment().subtract(4, 'hours').format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        },
        'Last Month': {
            start: moment().subtract(1, 'month').format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        },
        'Last Year': {
            start: moment().subtract(1, 'year').format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        }
    };
    return (
        <Form.DateRange
            name="timeFilter"
            value={timeFilter}
            ranges={ranges}
            onChange={(_event, { value }) => setTimeFilter(value)}
        />
    );
};

export const initiallyOpen: DateRangeInputStory = () => {
    return (
        <div style={{ paddingTop: 440 }}>
            <Form.DateRange
                name="timeFilter"
                defaultOpen
                value={{ start: '2019-11-10 00:00', end: '2019-11-15 00:00', range: '' }}
            />
        </div>
    );
};
