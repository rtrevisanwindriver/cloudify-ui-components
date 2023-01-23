import type { CSSProperties, FunctionComponent, ReactElement, ReactNode } from 'react';
import React from 'react';

import { Popup } from 'components';

import DataTableContext from './DataTableContext';

export interface TableColumnProps {
    /**
     * column label
     */
    label?: ReactNode;

    /**
     * data property, enables column sorting
     */
    name?: string;

    /**
     * width style
     */
    width?: string;

    /**
     * if false then column is hidden
     */
    show?: boolean;

    /**
     * Tooltip to show when hovering over the header
     */
    tooltip?: ReactNode;

    /**
     * if true then column label is center aligned
     */
    centerAligned?: boolean;

    /**
     * CSS class
     */
    className?: string;

    /**
     * CSS style
     */
    style?: CSSProperties;
}

/**
 * Defines table columns, renders <th> elements.
 *
 * ```
 * <DataTable.Column label="Name" name="id" width="40%"/>
 * ```
 */
const TableColumn: FunctionComponent<TableColumnProps> = ({
    label = '',
    name,
    width,
    show = true,
    tooltip,
    centerAligned,
    className = '',
    style
}) => {
    if (!show) {
        return null;
    }

    const getClassName = (sortColumn: string, sortAscending: boolean) => {
        let cssClass = name ? '' : 'disabled';

        if (sortColumn === name) {
            cssClass += ' sorted';
            cssClass += sortAscending ? ' ascending' : ' descending ';
        }

        if (centerAligned) {
            cssClass += ' center aligned';
        }

        if (className) {
            cssClass += ' ';
            cssClass += className;
        }

        return cssClass;
    };

    const computedStyle = { ...style };
    if (width) {
        computedStyle.width = width;
    }

    return (
        <DataTableContext.Consumer>
            {({ sortColumn, sortAscending, setSortColumn }) => (
                <OptionalPopup tooltip={tooltip}>
                    <th
                        className={getClassName(sortColumn, sortAscending)}
                        style={computedStyle}
                        onClick={() => name && setSortColumn(name)}
                    >
                        {label}
                    </th>
                </OptionalPopup>
            )}
        </DataTableContext.Consumer>
    );
};
export default TableColumn;

const OptionalPopup: FunctionComponent<{ tooltip?: ReactNode; children: ReactElement }> = ({ children, tooltip }) => {
    if (!tooltip) {
        return children;
    }

    return <Popup trigger={children}>{tooltip}</Popup>;
};
