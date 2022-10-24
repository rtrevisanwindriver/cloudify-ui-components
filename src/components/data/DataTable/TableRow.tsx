import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import React from 'react';
import { isFunction } from 'lodash';

import TableDataCell from './TableDataCell';

type TRProps = React.HTMLAttributes<HTMLTableRowElement>;

export interface TableRowProps {
    /**
     * row content
     */
    children: ReactNode;

    /**
     * row id
     */
    id?: string;

    /**
     * if true, then row will be marked as selected
     */
    selected?: boolean;

    /**
     * array of column's names to be shown
     */
    showCols?: boolean[];

    /**
     * name of the style class to be added
     */
    className?: string;

    /**
     * action to be executed on mouse over event and focus
     */
    onMouseOver?: TRProps['onMouseOver'] & TRProps['onFocus'];

    /**
     * action to be executed on mouse out event and blur
     */
    onMouseOut?: TRProps['onMouseOut'] & TRProps['onBlur'];

    /**
     * CSS style
     */
    style?: Partial<CSSStyleDeclaration> & TRProps['style'];

    /**
     * On click handler
     */
    onClick?: TRProps['onClick'];
}

/**
 * Defines table rows, renders <tr> elements.
 *
 * ```
 * <DataTable.Row key="joomla" selected={false} onClick={()=>this.onRowClick(item)}>
 *      <DataTable.Data><a href="javascript:void(0)">Joomla website</a></DataTable.Data>
 *      <DataTable.Data>2015-08-14</DataTable.Data>
 *      <DataTable.Data>description for website</DataTable.Data>
 * </DataTable.Row>
 * ```
 */
const TableRow: FunctionComponent<TableRowProps> = ({
    id,
    children,
    selected = false,
    // eslint-disable-next-line react/prop-types
    onClick, // This is defined in TRProps
    onMouseOver,
    onMouseOut,
    showCols = [],
    className = '',
    style = {}
}) => {
    const showData = (index: number) => (index < showCols.length ? showCols[index] : true);
    const computedClassName = className + (selected ? ' active' : '');
    const computedChildren: ReactNode[] = [];

    const computedStyle = { ...style };
    if (isFunction(onClick)) {
        computedStyle.cursor = 'pointer';
    }

    React.Children.forEach(children, (child, index) => {
        if (child && (child as ReactElement)?.type === TableDataCell && showData(index)) {
            computedChildren.push(child);
        }
    });

    return (
        <tr
            id={id}
            className={computedClassName}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onFocus={onMouseOver}
            onBlur={onMouseOut}
            style={computedStyle}
        >
            {computedChildren}
        </tr>
    );
};

export default TableRow;
