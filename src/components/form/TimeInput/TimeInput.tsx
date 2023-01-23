import React from 'react';
import { padStart, range, split } from 'lodash';
import type { DropdownProps, TableProps } from 'semantic-ui-react';
import { Dropdown, Table } from 'semantic-ui-react';
import type { OnChangeInputData } from '../types';

const generateOptions = (start: number, end: number, step: number, padding: number) => {
    return range(start, end, step).map(num => {
        const value = padStart(num.toString(), padding, '0');
        return { key: value, text: value, value };
    });
};
const hoursOptions = generateOptions(0, 24, 1, 2);
const minutesOptions = generateOptions(0, 60, 1, 2);

export interface TimeInputProps extends TableProps {
    /**
     * name of the field
     */
    name: string;

    /**
     * variable for input value control (acceptable format: 'HH:mm')
     */
    value: string;

    /**
     * function called on hours/minutes input change
     */
    onChange: (event: Parameters<Required<DropdownProps>['onChange']>[0], field: OnChangeInputData) => void;
}

/**
 * InputTime is a component showing time picker in form of hours/minutes input field. It uses `Table` component for
 * layout - all props supported by the `Table` component are passed down to it.
 *
 * Accessible as `Form.Time`.
 */
export const TimeInput = ({ name, value, onChange, ...tableProps }: TimeInputProps) => {
    const [hours, minutes] = split(value, ':');

    const handleMinutesChange: DropdownProps['onChange'] = (event, { value: minutesValue }) => {
        onChange(event, {
            name,
            value: `${hours}:${minutesValue}`
        });
    };

    const handleHoursChange: DropdownProps['onChange'] = (event, { value: hoursValue }) => {
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
                            onChange={handleMinutesChange}
                        />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default TimeInput;
