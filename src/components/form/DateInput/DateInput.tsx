import React from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import { isEmpty, isEqual, noop } from 'lodash';

import { Button, Input } from 'semantic-ui-react';
import type { ButtonProps, InputProps } from 'semantic-ui-react';
import Popup from 'components/popups/Popup';
import type { DatePickerProps } from '../DatePicker/DatePicker';
import type { OnChangeInputData } from '../types';
import DatePicker from '../DatePicker';

type OnChangeEvent =
    | Parameters<Required<DatePickerProps>['onChange']>[0]
    | Parameters<Required<InputProps>['onChange']>[0]
    | Parameters<Required<ButtonProps>['onClick']>[0];

export interface DateInputProps {
    /**
     * name of the field
     */
    name: string;

    /**
     * string data value
     */
    value: string;

    /**
     * string data value to be set when Reset button is clicked
     */
    defaultValue?: string;

    /**
     * if set then the component renders initially open
     */
    defaultOpen?: boolean;

    /**
     * moment object for minimal date available in picker
     */
    minDate?: Moment;

    /**
     * moment object for maximal date available in picker
     */
    maxDate?: Moment;

    /**
     * function called on data picker change
     */
    onChange?: (event: OnChangeEvent, data: OnChangeInputData) => void;

    /**
     * input field placeholder
     */
    placeholder?: string;

    /**
     * time interval between available time options (in minutes)
     */
    timeIntervals?: number;
}

interface DateInputState {
    isOpen?: DateInputProps['defaultOpen'];
    dateValue?: null | Moment;
    dateError: boolean;
    dirty: boolean;
}

/**
 * `DateInput` is a component showing calendar input with datetime picker in popup.
 * All props supported by the `DatePicker` component are passed down to it.
 *
 * Accessible as `Form.Date`.
 */
export default class DateInput extends React.PureComponent<DateInputProps, DateInputState> {
    static TIME_FORMAT = 'HH:mm';

    static DATE_FORMAT = 'YYYY-MM-DD';

    static DATETIME_FORMAT = `${DateInput.DATE_FORMAT} ${DateInput.TIME_FORMAT}`;

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        defaultValue: '',
        defaultOpen: false,
        minDate: undefined,
        maxDate: undefined,
        onChange: noop,
        placeholder: DateInput.DATETIME_FORMAT,
        timeIntervals: 5
    };

    static initialState: DateInputState = {
        dateError: false,
        dateValue: null,
        dirty: false
    };

    constructor(props: DateInputProps) {
        super(props);
        this.state = { ...DateInput.initialState, isOpen: props.defaultOpen };
    }

    static getDateString(momentDate: Moment) {
        return moment(momentDate).format(DateInput.DATETIME_FORMAT);
    }

    static getDerivedStateFromProps(nextProps: DateInputProps, prevState: DateInputState) {
        if (nextProps.value !== DateInput.getDateString(prevState.dateValue as Moment)) {
            return DateInput.getDateState(nextProps.value, nextProps.defaultValue);
        }
        return null;
    }

    static getDateState(newStringDate: string, stringDefaultDate?: string) {
        if (isEmpty(newStringDate)) {
            return { dirty: !isEqual(stringDefaultDate, ''), dateError: false, dateValue: undefined };
        }

        const newMomentDate = moment(newStringDate);
        if (newMomentDate.isValid()) {
            return { dirty: !isEqual(stringDefaultDate, newStringDate), dateError: false, dateValue: newMomentDate };
        }

        return { dirty: true, dateError: true, dateValue: undefined };
    }

    handleDateChange(event: OnChangeEvent, newValue: string) {
        const { name, onChange } = this.props;
        onChange?.(event, { name, value: newValue });
    }

    handleDataPickerChange: DatePickerProps['onChange'] = (proxy, field) => {
        this.handleDateChange(proxy, DateInput.getDateString(field.value));
    };

    handleInputChange: InputProps['onChange'] = (proxy, field) => {
        this.handleDateChange(proxy, field.value);
    };

    handleResetButtonClick: ButtonProps['onClick'] = proxy => {
        const { defaultValue } = this.props;
        this.handleDateChange(proxy, defaultValue as string);
    };

    render() {
        const { value, placeholder, ...datePickerProps } = this.props;
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
                    name="dateValue"
                    value={dateValue}
                    onChange={this.handleDataPickerChange}
                />
            </Popup>
        );
    }
}
