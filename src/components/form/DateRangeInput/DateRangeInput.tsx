import React from 'react';
import type { CSSProperties } from 'react';
import { isEmpty, isEqual, get, map, extend, pick } from 'lodash';
import moment from 'moment';
import type { Moment } from 'moment';

import { Button, Grid, Input, Label, List, Segment } from 'semantic-ui-react';
import type { ButtonProps, InputProps } from 'semantic-ui-react';
import ApproveButton from 'components/buttons/ApproveButton';
import CancelButton from 'components/buttons/CancelButton';
import Popup from 'components/popups/Popup';
import type { ApproveButtonProps } from 'components/buttons/ApproveButton/ApproveButton';
import DateInput from '../DateInput';
import DatePicker from '../DatePicker';
import type { DatePickerProps } from '../DatePicker/DatePicker';

interface Range {
    start: string;
    end: string;
}

export interface DateRange extends Range {
    range: string;
}

export type Ranges = Record<string, Range>;

interface StartDate {
    startError: boolean;
    startDate?: Moment;
}

interface EndDate {
    endError: boolean;
    endDate?: Moment;
}

export interface DateRangeInputOnChangeData {
    name: string;
    value: DateRange;
}

export interface DateRangeInputProps {
    /**
     * name of the field
     */
    name: string;

    /**
     * timeFilter object ({range:'', start:'', end:''}) to be set when Reset button is clicked
     */
    defaultValue?: DateRange;

    /**
     * timeFilter object ({range:'', start:'', end:''}) to set input values
     */
    value?: DateRange;

    /**
     * if set then the component renders initially open
     */
    defaultOpen?: boolean;

    /**
     * text to be displayed in the input field when there's no range set
     */
    placeholder?: string;

    /**
     * ranges object containing dict of named custom ranges with start/end string dates "YYYY-MM-DD HH:mm"
     */
    ranges?: Ranges;

    /**
     * function (event, data) called on Apply button click, timeFilter object value is sent as data.value
     */
    onChange?: (
        event: Parameters<Required<ApproveButtonProps>['onClick']>[0],
        data: DateRangeInputOnChangeData
    ) => void;

    /**
     * function (event, data) called on Cancel button click, timeFilter object value is sent as data.value
     */
    onCancel?: (event: Parameters<Required<ButtonProps>['onClick']>[0], data: DateRangeInputOnChangeData) => void;

    /**
     * CSS class
     */
    className?: string;

    /**
     * CSS style
     */
    style?: CSSProperties;
}

export interface DateRangeInputState
    extends Pick<DateRangeInputProps, 'defaultValue' | 'value'>,
        StartDate,
        EndDate,
        Range {
    isOpen?: boolean;
    dirty: boolean;
    range?: string;
}

const emptyRange: Range = {
    start: '',
    end: ''
};

/**
 * `DateRangeInput` is a component showing time range
 *
 * Both props: `value` and `defaultValue` are timeFilter objects:
 *
 * ```
 * {
 *   range:'',      // time range label
 *   start:'',      // datetime string representing time range start, eg. '2017-08-06 16:00'
 *   end:''         // datetime string representing time range end, eg. '2017-08-06 18:00'
 * }
 * ```
 *
 * Accessible as `Form.DateRange`.
 */
class DateRangeInput extends React.PureComponent<DateRangeInputProps, DateRangeInputState, unknown> {
    static EMPTY_VALUE: DateRange = {
        range: '',
        start: '',
        end: ''
    };

    static TIME_FORMAT = DateInput.TIME_FORMAT;

    static DATE_FORMAT = DateInput.DATE_FORMAT;

    static DATETIME_FORMAT = DateInput.DATETIME_FORMAT;

    static CUSTOM_RANGE = 'Custom Range';

    static isValidDate(dateTimeString?: string) {
        return moment(dateTimeString || {}).isValid();
    }

    static getStartDateState(start: DateRange['start']): StartDate {
        const startDate = { startError: false };
        if (DateRangeInput.isValidDate(start)) {
            const startMoment = moment(start || {});
            extend(startDate, { startDate: startMoment });
        }
        return startDate;
    }

    static getEndDateState(end: DateRange['end']): EndDate {
        const endDate = { endError: false };
        if (DateRangeInput.isValidDate(end)) {
            const endMoment = moment(end || {});
            extend(endDate, { endDate: endMoment });
        }
        return endDate;
    }

    static getStartState(startDate: DateRange['start']) {
        return { startError: false, start: moment(startDate).format(DateRangeInput.DATETIME_FORMAT) };
    }

    static getEndState(endDate: DateRange['end']) {
        return { endError: false, end: moment(endDate).format(DateRangeInput.DATETIME_FORMAT) };
    }

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        defaultValue: DateRangeInput.EMPTY_VALUE,
        value: DateRangeInput.EMPTY_VALUE,
        defaultOpen: false,
        ranges: {},
        onChange: () => {},
        onCancel: () => {}
    };

    static initialState = (props: DateRangeInputProps): DateRangeInputState => ({
        ...emptyRange,
        ...props.defaultValue,
        ...props.value,
        ...DateRangeInput.getStartDateState(props.value!.start),
        ...DateRangeInput.getEndDateState(props.value!.end),
        isOpen: props.defaultOpen,
        dirty: false
    });

    constructor(props: DateRangeInputProps) {
        super(props);
        this.state = DateRangeInput.initialState(props);
    }

    componentDidMount() {
        const state = DateRangeInput.initialState(this.props);
        this.setState(state);
    }

    componentDidUpdate(prevProps: DateRangeInputProps, prevState: DateRangeInputState) {
        const { defaultValue } = this.props;
        const dirty = !isEqual(pick(this.state, Object.keys(DateRangeInput.EMPTY_VALUE)), defaultValue);
        const { value } = this.props;
        const newState: Partial<DateRangeInputState> = {};
        if (prevState.dirty !== dirty) {
            newState.dirty = dirty;
        }
        if (prevProps.value !== value) {
            extend(
                newState,
                { ...value },
                DateRangeInput.getStartDateState(value?.start || ''),
                DateRangeInput.getEndDateState(value?.end || '')
            );
        }
        if (!isEmpty(newState)) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(newState as DateRangeInputState);
        }
    }

    handleInputChange = (field: Parameters<Required<DatePickerProps>['onChange']>[1], onStateUpdate: () => void) => {
        this.setState(prevState => ({ ...prevState, [field.name]: field.value }), onStateUpdate);
    };

    handleCustomInputChange: DatePickerProps['onChange'] = (_proxy, field) => {
        this.handleInputChange(field, () => {
            const newState = { range: DateRangeInput.CUSTOM_RANGE };
            if (isEqual(field.name, 'startDate')) {
                extend(newState, DateRangeInput.getStartState(field.value.toString()));
            } else if (isEqual(field.name, 'endDate')) {
                extend(newState, DateRangeInput.getEndState(field.value.toString()));
            } else if (isEqual(field.name, 'start')) {
                extend(newState, DateRangeInput.getStartDateState(field.value.toString()));
            } else if (isEqual(field.name, 'end')) {
                extend(newState, DateRangeInput.getEndDateState(field.value.toString()));
            }
            this.setState(newState);
        });
    };

    handleRangeButtonClick: ButtonProps['onClick'] = (_proxy, field) => {
        const { ranges } = this.props;
        const { start, end } = ranges?.[field.name] || emptyRange;
        const startDate = DateRangeInput.getStartDateState(start);
        const endDate = DateRangeInput.getEndDateState(end);

        this.setState({
            range: field.name,
            start,
            end,
            ...startDate,
            ...endDate
        });
    };

    handleCustomRangeButtonClick: ButtonProps['onClick'] = (_proxy, field) => {
        const { startDate = '', endDate = '' } = this.state;
        const newState = { range: field.name };
        extend(newState, DateRangeInput.getStartState(startDate.toString()));
        extend(newState, DateRangeInput.getEndState(endDate.toString()));
        this.setState(newState);
    };

    handleResetButtonClick = () => {
        const resetState = this.getResetState(true);
        this.setState(resetState);
    };

    handleApplyButtonClick: ApproveButtonProps['onClick'] = event => {
        const { name, onChange } = this.props;
        const { start, end } = this.state;
        const isStartValidDate = DateRangeInput.isValidDate(start);
        const isEndValidDate = DateRangeInput.isValidDate(end);
        const isValid = isStartValidDate && isEndValidDate;

        const newState = {
            startError: !isStartValidDate,
            endError: !isEndValidDate,
            isOpen: !isValid
        };

        this.setState(newState, () => {
            if (isValid) {
                onChange?.(event, { name, value: this.getTimeFilterObject() });
            }
        });
    };

    handleCancelButtonClick: ButtonProps['onClick'] = event => {
        const { name, onCancel } = this.props;
        const resetState = this.getResetState(false);
        this.setState({ ...resetState, isOpen: false }, () =>
            onCancel?.(event, { name, value: this.getTimeFilterObject() })
        );
    };

    getTimeFilterObject = (): DateRange => {
        const { ranges } = this.props;
        const { range = '', start, end } = this.state;

        const timeFilter: Partial<DateRange> = { range };

        if (isEqual(range, DateRangeInput.CUSTOM_RANGE)) {
            timeFilter.start = start;
            timeFilter.end = end;
        } else {
            timeFilter.start = get(ranges?.[range], 'start', '');
            timeFilter.end = get(ranges?.[range], 'end', '');
        }

        return timeFilter as DateRange;
    };

    getResetState = (toDefaults: boolean): DateRangeInputState => {
        const { defaultValue, value } = this.props;
        const newValue = toDefaults ? defaultValue : value;
        const date = moment();

        return {
            ...emptyRange,
            ...newValue,
            startDate: date,
            endDate: date,
            startError: false,
            endError: false,
            dirty: false
        };
    };

    isRangeSelected = (checkedRange: string) => {
        const { range } = this.state;
        return isEqual(range, checkedRange);
    };

    render() {
        const { placeholder, ranges, className, style } = this.props;
        const { dirty, range, start, end, isOpen, startDate, startError, endDate, endError } = this.state;
        const from = start ? `from [${start}] ` : '';
        const until = end ? ` until [${end}]` : '';
        const inputValue = this.isRangeSelected(DateRangeInput.CUSTOM_RANGE) ? `${from}${until}` : range;
        const inputFieldHint = (
            <div>
                ISO-8601-compatible date/time expected
                <br />
                Example:
                <br />
                2017-09-21 10:10
            </div>
        );
        const gridStyle = { ...style };
        if (!isEmpty(ranges)) gridStyle.width = 1090;

        return (
            <Popup basic hoverable={false} flowing open={isOpen}>
                <Popup.Trigger>
                    <Input
                        value={inputValue}
                        placeholder={placeholder}
                        icon="dropdown"
                        fluid
                        onChange={() => {}}
                        onFocus={() => this.setState({ isOpen: true, startError: false, endError: false })}
                    />
                </Popup.Trigger>
                <Grid style={gridStyle} className={className}>
                    <Grid.Row columns={isEmpty(ranges) ? 2 : 3}>
                        {!isEmpty(ranges) && (
                            <Grid.Column width={4}>
                                <Segment padded>
                                    <Label attached="top">Range:</Label>
                                    <List>
                                        {map(ranges, (_obj, name) => (
                                            <List.Item key={name}>
                                                <Button
                                                    active={this.isRangeSelected(name)}
                                                    key={name}
                                                    name={name}
                                                    fluid
                                                    onClick={this.handleRangeButtonClick}
                                                >
                                                    {name}
                                                </Button>
                                            </List.Item>
                                        ))}
                                        <List.Item>
                                            <Button
                                                active={this.isRangeSelected(DateRangeInput.CUSTOM_RANGE)}
                                                name={DateRangeInput.CUSTOM_RANGE}
                                                fluid
                                                onClick={this.handleCustomRangeButtonClick}
                                            >
                                                {DateRangeInput.CUSTOM_RANGE}
                                            </Button>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                        )}
                        <Grid.Column width={isEmpty(ranges) ? 8 : 6}>
                            <Segment padded className="start-date">
                                <Label attached="top">From:</Label>

                                <List>
                                    <List.Item>
                                        <Popup wide>
                                            <Popup.Trigger>
                                                <Input
                                                    fluid
                                                    name="start"
                                                    type="text"
                                                    value={start}
                                                    placeholder="Start date/time"
                                                    error={startError}
                                                    onChange={this.handleCustomInputChange as InputProps['onChange']}
                                                />
                                            </Popup.Trigger>
                                            {inputFieldHint}
                                        </Popup>
                                    </List.Item>
                                    <List.Item>
                                        <DatePicker
                                            name="startDate"
                                            value={startDate}
                                            onChange={this.handleCustomInputChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            maxDate={moment()}
                                        />
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={isEmpty(ranges) ? 8 : 6}>
                            <Segment padded className="end-date">
                                <Label attached="top">To:</Label>

                                <List>
                                    <List.Item>
                                        <Popup wide>
                                            <Popup.Trigger>
                                                <Input
                                                    fluid
                                                    name="end"
                                                    type="text"
                                                    value={end}
                                                    placeholder="End date/time"
                                                    error={endError}
                                                    onChange={this.handleCustomInputChange as InputProps['onChange']}
                                                />
                                            </Popup.Trigger>
                                            {inputFieldHint}
                                        </Popup>
                                    </List.Item>
                                    <List.Item>
                                        <DatePicker
                                            name="endDate"
                                            value={endDate}
                                            onChange={this.handleCustomInputChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            maxDate={moment()}
                                        />
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div style={{ textAlign: 'right', marginTop: 10 }}>
                    <Button onClick={this.handleResetButtonClick} content="Reset" icon="undo" disabled={!dirty} />
                    <CancelButton onClick={this.handleCancelButtonClick} className="cancel" />
                    <ApproveButton onClick={this.handleApplyButtonClick} content="Apply" />
                </div>
            </Popup>
        );
    }
}

export default DateRangeInput;
