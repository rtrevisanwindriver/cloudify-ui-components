import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

/**
 * Defines expandable row in data table. Two <tr> elements are rendered by DataTable component from one DataTable.ExpandableRow component.
 *
 * ```
 * <DataTable.RowExpandable key="prestashop" expanded={true}>
 *      <DataTable.Row key="prestashop" selected={true} onClick={()=>this.onRowClick(item)}>
 *          <DataTable.Data><a href="javascript:void(0)">Prestashop store</a></DataTable.Data>
 *          <DataTable.Data>2017-01-05</DataTable.Data>
 *          <DataTable.Data>description for e-commerce solution</DataTable.Data>
 *      </DataTable.Row>
 *      <DataTable.DataExpandable>
 *          additional info when row becomes expanded
 *      </DataTable.DataExpandable>
 * </DataTable.RowExpandable>
 * ```
 */
export interface TableRowExpandableProps {
    /**
     * expanded row content
     */
    children: ReactNode[];

    /**
     * if true, then expandable part of the row will be shown
     */
    expanded: boolean;
}
const TableRowExpandable: FunctionComponent<TableRowExpandableProps> = () => {
    return <></>;
};

export default TableRowExpandable;

TableRowExpandable.defaultProps = {
    expanded: false
};
