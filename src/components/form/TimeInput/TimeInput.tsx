import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Table, Dropdown } from 'semantic-ui-react';

// @ts-expect-error TS(7006) FIXME: Parameter 'start' implicitly has an 'any' type.
const generateOptions = (start, end, step, padding) => {
    return _.range(start, end, step).map(num => {
        // @ts-expect-error TS(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        const value = _.padStart(num, padding, '0');
        return { key: value, text: value, value };
    });
};
const hoursOptions = generateOptions(0, 24, 1, 2);
const minutesOptions = generateOptions(0, 60, 1, 2);

/**
 * InputTime is a component showing time picker in form of hours/minutes input field. It uses `Table` component for
 * layout - all props supported by the `Table` component are passed down to it.
 *
 * Accessible as `Form.Time`.
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
export default function TimeInput({ name, value, onChange, ...tableProps }) {
    const [hours, minutes] = _.split(value, ':');

    // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleMinutesChange = (event, { value: minutesValue }) => {
        onChange(event, {
            name,
            value: `${hours}:${minutesValue}`
        });
    };

    // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    const handleHoursChange = (event, { value: hoursValue }) => {
        onChange(event, {
            name,
            value: `${hoursValue}:${minutes}`
        });
    };

    return (
        <Table compact basic="very" {...tableProps}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell textAlign="left">
                        <Dropdown
                            selection
                            options={hoursOptions}
                            name="hours"
                            fluid
                            value={hours}
                            // @ts-expect-error TS(2322) FIXME: Type '(event: any, { value: hoursValue }: { value:... Remove this comment to see the full error message
                            onChange={handleHoursChange}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign="center">:</Table.Cell>
                    <Table.Cell textAlign="right">
                        <Dropdown
                            selection
                            options={minutesOptions}
                            name="minutes"
                            fluid
                            value={minutes}
                            // @ts-expect-error TS(2322) FIXME: Type '(event: any, { value: minutesValue }: { valu... Remove this comment to see the full error message
                            onChange={handleMinutesChange}
                        />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

TimeInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * variable for input value control (acceptable format: 'HH:mm')
     */
    value: PropTypes.string.isRequired,

    /**
     * function called on hours/minutes input change
     */
    onChange: PropTypes.func.isRequired
};
