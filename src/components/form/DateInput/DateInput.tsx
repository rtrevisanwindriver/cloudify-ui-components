import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import { Button, Input } from 'semantic-ui-react';
import Popup from 'components/popups/Popup';
import DatePicker from '../DatePicker';

/**
 * `DateInput` is a component showing calendar input with datetime picker in popup.
 * All props supported by the `DatePicker` component are passed down to it.
 *
 * Accessible as `Form.Date`.
 */
export default class DateInput extends React.PureComponent {
    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props, context) {
        super(props, context);

        // @ts-expect-error TS(2339) FIXME: Property 'initialState' does not exist on type 'ty... Remove this comment to see the full error message
        this.state = { ...DateInput.initialState, isOpen: props.defaultOpen };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.handleDataPickerChange = this.handleDataPickerChange.bind(this);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'momentDate' implicitly has an 'any' typ... Remove this comment to see the full error message
    static getDateString(momentDate) {
        // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
        return moment(momentDate).format(DateInput.DATETIME_FORMAT);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== DateInput.getDateString(prevState.dateValue)) {
            return DateInput.getDateState(nextProps.value, nextProps.defaultValue);
        }
        return null;
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'newStringDate' implicitly has an 'any' ... Remove this comment to see the full error message
    static getDateState(newStringDate, stringDefaultDate) {
        if (_.isEmpty(newStringDate)) {
            return { dirty: !_.isEqual(stringDefaultDate, ''), dateError: false, dateValue: undefined };
        }

        const newMomentDate = moment(newStringDate);
        if (newMomentDate.isValid()) {
            return { dirty: !_.isEqual(stringDefaultDate, newStringDate), dateError: false, dateValue: newMomentDate };
        }

        return { dirty: true, dateError: true, dateValue: undefined };
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    handleDateChange(event, newValue) {
        // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { name, onChange } = this.props;
        onChange(event, { name, value: newValue });
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'proxy' implicitly has an 'any' type.
    handleDataPickerChange(proxy, field) {
        this.handleDateChange(proxy, DateInput.getDateString(field.value));
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'proxy' implicitly has an 'any' type.
    handleInputChange(proxy, field) {
        this.handleDateChange(proxy, field.value);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'proxy' implicitly has an 'any' type.
    handleResetButtonClick(proxy) {
        // @ts-expect-error TS(2339) FIXME: Property 'defaultValue' does not exist on type 'Re... Remove this comment to see the full error message
        const { defaultValue } = this.props;
        this.handleDateChange(proxy, defaultValue);
    }

    render() {
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { value, placeholder, ...datePickerProps } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'dateError' does not exist on type 'Reado... Remove this comment to see the full error message
        const { dateError, dateValue, dirty, isOpen } = this.state;

        return (
            <Popup
                hoverable
                flowing
                onClose={() => this.setState({ isOpen: false })}
                open={isOpen}
                position="top right"
            >
                <Popup.Trigger>
                    <Input
                        name="value"
                        value={value}
                        placeholder={placeholder}
                        fluid
                        action
                        error={dateError}
                        onChange={this.handleInputChange}
                        onClick={() => this.setState({ isOpen: false })}
                    >
                        <input />
                        <Button onClick={() => this.setState({ isOpen: true })} icon="calendar" />
                        <Button onClick={this.handleResetButtonClick} icon="cancel" disabled={!dirty} />
                    </Input>
                </Popup.Trigger>

                <DatePicker
                    {...datePickerProps}
                    // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: any; onChange: (proxy... Remove this comment to see the full error message
                    name="dateValue"
                    value={dateValue}
                    onChange={this.handleDataPickerChange}
                />
            </Popup>
        );
    }
}

// @ts-expect-error TS(2339) FIXME: Property 'TIME_FORMAT' does not exist on type 'typ... Remove this comment to see the full error message
DateInput.TIME_FORMAT = 'HH:mm';
// @ts-expect-error TS(2339) FIXME: Property 'DATE_FORMAT' does not exist on type 'typ... Remove this comment to see the full error message
DateInput.DATE_FORMAT = 'YYYY-MM-DD';
// @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
DateInput.DATETIME_FORMAT = `${DateInput.DATE_FORMAT} ${DateInput.TIME_FORMAT}`;

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DateInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * string data value
     */
    value: PropTypes.string.isRequired,

    /**
     * string data value to be set when Reset button is clicked
     */
    defaultValue: PropTypes.string,

    /**
     * if set then the component renders initially open
     */
    defaultOpen: PropTypes.bool,

    /**
     * moment object for minimal date available in picker
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    minDate: PropTypes.instanceOf(moment),

    /**
     * moment object for maximal date available in picker
     */
    // @ts-expect-error TS(2345) FIXME: Argument of type 'typeof moment' is not assignable... Remove this comment to see the full error message
    maxDate: PropTypes.instanceOf(moment),

    /**
     * function called on data picker change
     */
    onChange: PropTypes.func,

    /**
     * input field placeholder
     */
    placeholder: PropTypes.string,

    /**
     * time interval between available time options (in minutes)
     */
    timeIntervals: PropTypes.number
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DateInput.defaultProps = {
    defaultValue: '',
    defaultOpen: false,
    minDate: undefined,
    maxDate: undefined,
    onChange: _.noop,
    // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
    placeholder: DateInput.DATETIME_FORMAT,
    timeIntervals: 5
};

// @ts-expect-error TS(2339) FIXME: Property 'initialState' does not exist on type 'ty... Remove this comment to see the full error message
DateInput.initialState = {
    dateError: false,
    dateValue: null,
    dirty: false
};
