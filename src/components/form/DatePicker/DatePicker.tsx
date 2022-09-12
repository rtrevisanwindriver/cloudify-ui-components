import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

/**
 * `DatePicker` is a component showing calendar picker using [react-datepicker library](https://github.com/Hacker0x01/react-datepicker).
 * All props supported by the underlaying picker component are passed down to it.
 *
 * Accessible as `DatePicker` or `Form.DatePicker`.
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
export function DatePickerWithoutMemo({ name, value, onChange, minDate, maxDate, ...otherProps }) {
    // @ts-expect-error TS(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
    const handleSelectedDateChange = date => onChange(date, { name, value: date });

    // @ts-expect-error TS(7006) FIXME: Parameter 'minMaxDate' implicitly has an 'any' typ... Remove this comment to see the full error message
    const getMinMaxTime = (minMaxDate, defaultValue) => {
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
            timeFormat="HH:mm"
            showTimeSelect
            inline
            calendarClassName="input-time-filter"
            fixedHeight
            {...otherProps}
        />
    );
}

DatePickerWithoutMemo.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * MomentJS object with date to be selected on the picker
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    value: PropTypes.instanceOf(moment),

    /**
     * function (selectedDateMoment, {name, value}) called on calendar date change
     */
    onChange: PropTypes.func,

    /**
     * MomentJS object with min allowed date on the picker
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    minDate: PropTypes.instanceOf(moment),

    /**
     * MomentJS object with max allowed date on the picker
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    maxDate: PropTypes.instanceOf(moment),

    /**
     * MomentJS object for start range date (used when two InputDate components are used to display date range)
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    startDate: PropTypes.instanceOf(moment),

    /**
     * MomentJS object for end range date (used when two InputDate components are used to display date range)
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    endDate: PropTypes.instanceOf(moment),

    /**
     * interval (in minutes) between time options
     */
    timeIntervals: PropTypes.number
};

DatePickerWithoutMemo.defaultProps = {
    value: null,
    onChange: () => {},
    minDate: undefined,
    maxDate: undefined,
    startDate: undefined,
    endDate: undefined,
    timeIntervals: 60
};

// @ts-expect-error TS(2739) FIXME: Type '{ children?: ReactNode; }' is missing the fo... Remove this comment to see the full error message
// eslint-disable-next-line react/display-name
const DatePicker = React.memo(props => <DatePickerWithoutMemo {...props} />);
DatePicker.displayName = 'DatePicker';
export default DatePicker;
