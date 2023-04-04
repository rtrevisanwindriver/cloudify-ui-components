import type { ComponentProps, FunctionComponent } from 'react';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import type { GenericFieldProps } from '../GenericField';
import { GenericField } from '../GenericField';

export type DynamicTableValue = Record<string, any>[];

export interface DynamicTableProps extends GenericFieldProps<DynamicTableValue> {
    /**
     * Columns definitions
     */
    columns?: ({ id: string } & Omit<GenericFieldProps, 'name'>)[];
    /**
     * Errors object keyed by table row index
     */
    errors?: Record<number, Record<string, any>>;
}

/**
 * Editable table component that adhers to SemanticUI's form field interface
 */
export const DynamicTable: FunctionComponent<DynamicTableProps> = ({
    name,
    value = [],
    onChange,
    columns = [],
    errors,
    ...rest
}) => {
    const handleEditRow =
        (key: string, index: number): ComponentProps<typeof GenericField>['onChange'] =>
        (event, data) => {
            onChange?.(event, {
                name,
                value: [...value.slice(0, index), { ...value[index], [key]: data.value }, ...value.slice(index + 1)]
            });
        };
    const handleRemoveRow =
        (index: number): ComponentProps<typeof Button>['onClick'] =>
        event => {
            onChange?.(event, {
                name,
                value: [...value.slice(0, index), ...value.slice(index + 1)]
            });
        };
    const handleAddRow: ComponentProps<typeof Button>['onClick'] = event => {
        onChange?.(event, {
            name,
            value: [...value, Object.fromEntries(columns.map(column => [column.id, '']))]
        });
    };

    return (
        <Table compact basic>
            <Table.Header>
                <Table.Row>
                    {columns
                        .filter(column => !column.hidden)
                        .map(column => (
                            <Table.HeaderCell key={column.id}>{column.label}</Table.HeaderCell>
                        ))}
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {value.map((val, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Table.Row key={index}>
                        {columns
                            .filter(column => !column.hidden)
                            .map(({ id, label, width, placeHolder, ...columnRest }) => {
                                const error = errors?.[index]?.[id];
                                return (
                                    <Table.Cell key={id} width={width} verticalAlign="top">
                                        <GenericField
                                            label=""
                                            key={id}
                                            index={index}
                                            name={id}
                                            value={val[id]}
                                            rowValues={val}
                                            onChange={handleEditRow(id, index)}
                                            placeholder={placeHolder}
                                            error={error && { content: error, pointing: 'above' }}
                                            {...rest}
                                            {...columnRest}
                                        />
                                    </Table.Cell>
                                );
                            })}
                        <Table.Cell textAlign="right" width={1} verticalAlign="top">
                            <Button
                                basic
                                icon="trash"
                                aria-label="Remove"
                                title="Remove"
                                onClick={handleRemoveRow(index)}
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={columns.length + 1}>
                        <Button icon="add" content="Add" onClick={handleAddRow} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};

export default DynamicTable;
