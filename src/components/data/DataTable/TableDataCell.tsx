import React from 'react';
import styled from 'styled-components';
import type { FunctionComponent } from 'react';
import type { TableCellProps } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const VerticallyAlignedCell = styled.div`
    td & {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export type TableDataCellProps = { verticalAlign?: 'flexMiddle' | TableCellProps['verticalAlign'] } & Omit<
    TableCellProps,
    'verticalAlign'
>;

const TableDataCell: FunctionComponent<TableDataCellProps> = props => {
    const { verticalAlign, children, ...restOfProps } = props;
    if (verticalAlign !== 'flexMiddle') {
        return <Table.Cell {...props} verticalAlign={verticalAlign} />;
    }

    return (
        <Table.Cell {...restOfProps} verticalAlign="middle">
            <VerticallyAlignedCell>{children}</VerticallyAlignedCell>
        </Table.Cell>
    );
};

export default TableDataCell;
