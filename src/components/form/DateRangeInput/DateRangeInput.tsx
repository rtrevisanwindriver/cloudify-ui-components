import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import { Button, Grid, Input, Label, List, Segment } from 'semantic-ui-react';
import ApproveButton from 'components/buttons/ApproveButton';
import CancelButton from 'components/buttons/CancelButton';
import Popup from 'components/popups/Popup';
import DateInput from '../DateInput';
import DatePicker from '../DatePicker';

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
export default class DateRangeInput extends React.PureComponent {
    // @ts-expect-error TS(7006) FIXME: Parameter 'dateTimeString' implicitly has an 'any'... Remove this comment to see the full error message
    static isValidDate(dateTimeString) {
        return moment(dateTimeString || {}).isValid();
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'start' implicitly has an 'any' type.
    static getStartDateState(start) {
        const startDate = { startError: false };
        if (DateRangeInput.isValidDate(start)) {
            const startMoment = moment(start || {});
            _.extend(startDate, { startDate: startMoment });
        }
        return startDate;
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'end' implicitly has an 'any' type.
    static getEndDateState(end) {
        const endDate = { endError: false };
        if (DateRangeInput.isValidDate(end)) {
            const endMoment = moment(end || {});
            _.extend(endDate, { endDate: endMoment });
        }
        return endDate;
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'startDate' implicitly has an 'any' type... Remove this comment to see the full error message
    static getStartState(startDate) {
        // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
        return { startError: false, start: moment(startDate).format(DateRangeInput.DATETIME_FORMAT) };
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'endDate' implicitly has an 'any' type.
    static getEndState(endDate) {
        // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
        return { endError: false, end: moment(endDate).format(DateRangeInput.DATETIME_FORMAT) };
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props, context) {
        super(props, context);

        // @ts-expect-error TS(2339) FIXME: Property 'initialState' does not exist on type 'ty... Remove this comment to see the full error message
        this.state = DateRangeInput.initialState(props);

        this.handleRangeButtonClick = this.handleRangeButtonClick.bind(this);
        this.handleCustomRangeButtonClick = this.handleCustomRangeButtonClick.bind(this);
        this.handleCustomInputChange = this.handleCustomInputChange.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    }

    componentDidMount() {
        // @ts-expect-error TS(2339) FIXME: Property 'initialState' does not exist on type 'ty... Remove this comment to see the full error message
        const state = DateRangeInput.initialState(this.props);
        this.setState(state);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    componentDidUpdate(prevProps, prevState) {
        // @ts-expect-error TS(2339) FIXME: Property 'defaultValue' does not exist on type 'Re... Remove this comment to see the full error message
        const { defaultValue } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'EMPTY_VALUE' does not exist on type 'typ... Remove this comment to see the full error message
        const dirty = !_.isEqual(_.pick(this.state, Object.keys(DateRangeInput.EMPTY_VALUE)), defaultValue);
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { value } = this.props;
        const newState = {};
        if (prevState.dirty !== dirty) {
            // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type '{}'.
            newState.dirty = dirty;
        }
        if (prevProps.value !== value) {
            _.extend(
                newState,
                { ...value },
                DateRangeInput.getStartDateState(value.start),
                DateRangeInput.getEndDateState(value.end)
            );
        }
        if (!_.isEmpty(newState)) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(newState);
        }
    }

    // @ts-expect-error TS(6133) FIXME: 'proxy' is declared but its value is never read.
    handleInputChange(proxy, field, onStateUpdate) {
        this.setState({ [field.name]: field.value }, onStateUpdate);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'proxy' implicitly has an 'any' type.
    handleCustomInputChange(proxy, field) {
        this.handleInputChange(proxy, field, () => {
            // @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message
            const newState = { range: DateRangeInput.CUSTOM_RANGE };
            if (_.isEqual(field.name, 'startDate')) {
                _.extend(newState, DateRangeInput.getStartState(field.value));
            } else if (_.isEqual(field.name, 'endDate')) {
                _.extend(newState, DateRangeInput.getEndState(field.value));
            } else if (_.isEqual(field.name, 'start')) {
                _.extend(newState, DateRangeInput.getStartDateState(field.value));
            } else if (_.isEqual(field.name, 'end')) {
                _.extend(newState, DateRangeInput.getEndDateState(field.value));
            }
            this.setState(newState);
        });
    }

    // @ts-expect-error TS(6133) FIXME: 'proxy' is declared but its value is never read.
    handleRangeButtonClick(proxy, field) {
        // @ts-expect-error TS(2339) FIXME: Property 'ranges' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { ranges } = this.props;
        const { start } = ranges[field.name];
        const { end } = ranges[field.name];
        const startDate = DateRangeInput.getStartDateState(start);
        const endDate = DateRangeInput.getEndDateState(end);

        this.setState({
            range: field.name,
            start,
            end,
            ...startDate,
            ...endDate
        });
    }

    // @ts-expect-error TS(6133) FIXME: 'proxy' is declared but its value is never read.
    handleCustomRangeButtonClick(proxy, field) {
        // @ts-expect-error TS(2339) FIXME: Property 'startDate' does not exist on type 'Reado... Remove this comment to see the full error message
        const { startDate, endDate } = this.state;
        const newState = { range: field.name };
        _.extend(newState, DateRangeInput.getStartState(startDate));
        _.extend(newState, DateRangeInput.getEndState(endDate));
        this.setState(newState);
    }

    handleResetButtonClick() {
        const resetState = this.getResetState(true);
        this.setState(resetState);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    handleApplyButtonClick(event) {
        // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { name, onChange } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
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
                onChange(event, { name, value: this.getTimeFilterObject() });
            }
        });
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    handleCancelButtonClick(event) {
        // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { name, onCancel } = this.props;
        const resetState = this.getResetState(false);
        this.setState({ ...resetState, isOpen: false }, () =>
            onCancel(event, { name, value: this.getTimeFilterObject() })
        );
    }

    getTimeFilterObject() {
        // @ts-expect-error TS(2339) FIXME: Property 'ranges' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { ranges } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { range, start, end } = this.state;

        const timeFilter = { range };

        // @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message
        if (_.isEqual(range, DateRangeInput.CUSTOM_RANGE)) {
            // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type '{ range: ... Remove this comment to see the full error message
            timeFilter.start = start;
            // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type '{ range: an... Remove this comment to see the full error message
            timeFilter.end = end;
        } else {
            // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type '{ range: ... Remove this comment to see the full error message
            timeFilter.start = _.get(ranges[range], 'start', '');
            // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type '{ range: an... Remove this comment to see the full error message
            timeFilter.end = _.get(ranges[range], 'end', '');
        }

        return timeFilter;
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'toDefaults' implicitly has an 'any' typ... Remove this comment to see the full error message
    getResetState(toDefaults) {
        // @ts-expect-error TS(2339) FIXME: Property 'defaultValue' does not exist on type 'Re... Remove this comment to see the full error message
        const { defaultValue, value } = this.props;
        const newValue = toDefaults ? defaultValue : value;
        const date = moment();

        return {
            ...newValue,
            startDate: date,
            endDate: date
        };
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'checkedRange' implicitly has an 'any' t... Remove this comment to see the full error message
    isRangeSelected(checkedRange) {
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { range } = this.state;
        return _.isEqual(range, checkedRange);
    }

    render() {
        // @ts-expect-error TS(2339) FIXME: Property 'placeholder' does not exist on type 'Rea... Remove this comment to see the full error message
        const { placeholder, ranges, className, style } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { dirty, range, start, end, isOpen, startDate, startError, endDate, endError } = this.state;
        const from = start ? `from [${start}] ` : '';
        const until = end ? ` until [${end}]` : '';
        // @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message
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
        if (!_.isEmpty(ranges)) gridStyle.width = 1090;

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
                    <Grid.Row columns={_.isEmpty(ranges) ? 2 : 3}>
                        {!_.isEmpty(ranges) && (
                            <Grid.Column width={4}>
                                <Segment padded>
                                    <Label attached="top">Range:</Label>
                                    <List>
                                        {/* @ts-expect-error TS(6133) FIXME: 'obj' is declared but its value is never read. */}
                                        {_.map(ranges, (obj, name) => (
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
                                                // @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message
                                                active={this.isRangeSelected(DateRangeInput.CUSTOM_RANGE)}
                                                // @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message
                                                name={DateRangeInput.CUSTOM_RANGE}
                                                fluid
                                                onClick={this.handleCustomRangeButtonClick}
                                            >
                                                {/* @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message */}
                                                {DateRangeInput.CUSTOM_RANGE}
                                            </Button>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Grid.Column>
                        )}
                        <Grid.Column width={_.isEmpty(ranges) ? 8 : 6}>
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
                                                    onChange={this.handleCustomInputChange}
                                                />
                                            </Popup.Trigger>
                                            {inputFieldHint}
                                        </Popup>
                                    </List.Item>
                                    <List.Item>
                                        <DatePicker
                                            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: any; onChange: (proxy... Remove this comment to see the full error message
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
                        <Grid.Column width={_.isEmpty(ranges) ? 8 : 6}>
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
                                                    onChange={this.handleCustomInputChange}
                                                />
                                            </Popup.Trigger>
                                            {inputFieldHint}
                                        </Popup>
                                    </List.Item>
                                    <List.Item>
                                        <DatePicker
                                            // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: any; onChange: (proxy... Remove this comment to see the full error message
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

// @ts-expect-error TS(2339) FIXME: Property 'EMPTY_VALUE' does not exist on type 'typ... Remove this comment to see the full error message
DateRangeInput.EMPTY_VALUE = {
    range: '',
    start: '',
    end: ''
};
// @ts-expect-error TS(2339) FIXME: Property 'TIME_FORMAT' does not exist on type 'typ... Remove this comment to see the full error message
DateRangeInput.TIME_FORMAT = DateInput.TIME_FORMAT;
// @ts-expect-error TS(2339) FIXME: Property 'DATE_FORMAT' does not exist on type 'typ... Remove this comment to see the full error message
DateRangeInput.DATE_FORMAT = DateInput.DATE_FORMAT;
// @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
DateRangeInput.DATETIME_FORMAT = DateInput.DATETIME_FORMAT;
// @ts-expect-error TS(2339) FIXME: Property 'CUSTOM_RANGE' does not exist on type 'ty... Remove this comment to see the full error message
DateRangeInput.CUSTOM_RANGE = 'Custom Range';

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DateRangeInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * timeFilter object ({range:'', start:'', end:''}) to be set when Reset button is clicked
     */
    defaultValue: PropTypes.shape({
        range: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    }),

    /**
     * timeFilter object ({range:'', start:'', end:''}) to set input values
     */
    value: PropTypes.shape({
        range: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    }),

    /**
     * if set then the component renders initially open
     */
    // eslint-disable-next-line react/no-unused-prop-types
    defaultOpen: PropTypes.bool,

    /**
     * text to be displayed in the input field when there's no range set
     */
    placeholder: PropTypes.string,

    /**
     * ranges object containing dict of named custom ranges with start/end string dates "YYYY-MM-DD HH:mm"
     */
    ranges: PropTypes.objectOf(
        PropTypes.shape({ start: PropTypes.string.isRequired, end: PropTypes.string.isRequired })
    ),

    /**
     * function (event, data) called on Apply button click, timeFilter object value is sent as data.value
     */
    onChange: PropTypes.func,

    /**
     * function (event, data) called on Cancel button click, timeFilter object value is sent as data.value
     */
    onCancel: PropTypes.func,

    /**
     * CSS class
     */
    className: PropTypes.string,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DateRangeInput.defaultProps = {
    className: undefined,
    style: {},
    // @ts-expect-error TS(2339) FIXME: Property 'EMPTY_VALUE' does not exist on type 'typ... Remove this comment to see the full error message
    defaultValue: DateRangeInput.EMPTY_VALUE,
    // @ts-expect-error TS(2339) FIXME: Property 'EMPTY_VALUE' does not exist on type 'typ... Remove this comment to see the full error message
    value: DateRangeInput.EMPTY_VALUE,
    defaultOpen: false,
    placeholder: '',
    ranges: {},
    onChange: () => {},
    onCancel: () => {}
};

// @ts-expect-error TS(2339) FIXME: Property 'initialState' does not exist on type 'ty... Remove this comment to see the full error message
DateRangeInput.initialState = props => ({
    ...props.defaultValue, // { range, start, end }
    ...props.value, // { range, start, end }
    ...DateRangeInput.getStartDateState(props.value.start), // { startError, startDate }
    ...DateRangeInput.getEndDateState(props.value.end), // { endError, endDate }
    isOpen: props.defaultOpen,
    dirty: false
});
