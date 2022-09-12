import React from 'react';
import moment from 'moment';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import DateRangeInput from './DateRangeInput';

export default {
    title: 'Form/DateRange',
    component: DateRangeInput,
    decorators: [LiveEditDecorator({ Form, moment })]
};

export const basic = () => {
    // @ts-expect-error TS(2339) FIXME: Property 'EMPTY_VALUE' does not exist on type 'typ... Remove this comment to see the full error message
    const [timeFilter, setTimeFilter] = React.useState(Form.DateRange.EMPTY_VALUE);

    // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: any; onChange: (e: an... Remove this comment to see the full error message
    return <Form.DateRange name="timeFilter" value={timeFilter} onChange={(e, { value }) => setTimeFilter(value)} />;
};

export const defaultValue = () => {
    const dV = {
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        start: moment().subtract(1, 'W').format(DateRangeInput.DATETIME_FORMAT),
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        end: moment().subtract(1, 'W').format(DateRangeInput.DATETIME_FORMAT),
        range: 'Custom default value range text'
    };
    const [timeFilter, setTimeFilter] = React.useState(dV);
    return (
        <Form.DateRange
            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; defaultValue: { start: strin... Remove this comment to see the full error message
            name="timeFilter"
            defaultValue={dV}
            value={timeFilter}
            // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
            onChange={(e, { value }) => setTimeFilter(value)}
        />
    );
};

export const customRanges = () => {
    // @ts-expect-error TS(2339) FIXME: Property 'EMPTY_VALUE' does not exist on type 'typ... Remove this comment to see the full error message
    const [timeFilter, setTimeFilter] = React.useState(Form.DateRange.EMPTY_VALUE);
    const ranges = {
        'Last 4 Hours': {
            // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
            start: moment().subtract(4, 'hours').format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        },
        'Last Month': {
            // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
            start: moment().subtract(1, 'month').format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        },
        'Last Year': {
            // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
            start: moment().subtract(1, 'year').format(DateRangeInput.DATETIME_FORMAT),
            end: ''
        }
    };
    return (
        <Form.DateRange
            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: any; ranges: { 'Last ... Remove this comment to see the full error message
            name="timeFilter"
            value={timeFilter}
            ranges={ranges}
            // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
            onChange={(e, { value }) => setTimeFilter(value)}
        />
    );
};

export const initiallyOpen = () => {
    return (
        <div style={{ paddingTop: 440 }}>
            <Form.DateRange
                // @ts-expect-error TS(2322) FIXME: Type '{ name: string; defaultOpen: true; value: { ... Remove this comment to see the full error message
                name="timeFilter"
                defaultOpen
                value={{ start: '2019-11-10 00:00', end: '2019-11-15 00:00', range: '' }}
            />
        </div>
    );
};
