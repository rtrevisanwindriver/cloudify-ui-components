import React from 'react';
import type { Moment } from 'moment';
import moment from 'moment';

import type { ReactDatePickerProps } from 'react-datepicker';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import { DateInput } from 'components';

export interface DatePickerOnChangeData {
    name: DatePickerProps['name'];
    value: Moment;
}

export interface DatePickerProps
    extends Omit<ReactDatePickerProps, 'value' | 'minDate' | 'maxDate' | 'startDate' | 'endDate' | 'onChange'> {
    /**
     * name of the field
     */
    name: string;
    /**
     * MomentJS object with date to be selected on the picker
     */
    value?: Moment | null;
    /**
     * MomentJS object with min allowed date on the picker
     */
    minDate?: Moment;
    /**
     * MomentJS object with max allowed date on the picker
     */
    maxDate?: Moment;

    /**
     * MomentJS object for start range date (used when two InputDate components are used to display date range)
     */
    startDate?: Moment;

    /**
     * MomentJS object for end range date (used when two InputDate components are used to display date range)
     */
    endDate?: Moment;
    /**
     * function called on data picker change
     */
    onChange?: (
        selectedDateMoment: Parameters<ReactDatePickerProps['onChange']>[1],
        data: DatePickerOnChangeData
    ) => void;
}

/**
 * `DatePicker` is a component showing calendar picker using [react-datepicker library](https://github.com/Hacker0x01/react-datepicker).
 * All props supported by the underlaying picker component are passed down to it.
 *
 * Accessible as `DatePicker` or `Form.DatePicker`.
 */
export function DatePickerWithoutMemo({
    name,
    value = null,
    onChange = () => {},
    minDate,
    maxDate,
    startDate,
    endDate,
    timeIntervals = 60,
    ...otherProps
}: DatePickerProps) {
    const handleSelectedDateChange: ReactDatePickerProps['onChange'] = (date, event) =>
        onChange(event, {
            name,
            value: moment(date)
        });

    const getMinMaxTime = (
        minMaxDate: DatePickerProps['minDate'] | DatePickerProps['maxDate'],
        defaultValue: Moment
    ) => {
        const selectedValue = value || moment();
        if (!!minMaxDate && minMaxDate.isSame(selectedValue, 'day')) {
            return minMaxDate;
        }
        return defaultValue;
    };
    const getMinTime = () => getMinMaxTime(minDate, moment().startOf('day'));
    const getMaxTime = () => getMinMaxTime(maxDate, moment().endOf('day'));

    return (
        <ReactDatePicker
            selected={value}
            onChange={handleSelectedDateChange}
            minDate={minDate}
            maxDate={maxDate}
            minTime={getMinTime()}
            maxTime={getMaxTime()}
            startDate={startDate}
            endDate={endDate}
            timeFormat={DateInput.TIME_FORMAT}
            showTimeSelect
            inline
            calendarClassName="input-time-filter"
            fixedHeight
            timeIntervals={timeIntervals}
            {...otherProps}
        />
    );
}

export const DatePicker = React.memo<DatePickerProps>(props => <DatePickerWithoutMemo {...props} />);
DatePicker.displayName = 'DatePicker';
export default DatePicker;
