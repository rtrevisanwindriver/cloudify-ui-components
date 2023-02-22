import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import { CSSTransition } from 'react-transition-group';

import './TableDataExpandable.css';

export interface TableDataExpandableProps extends React.HTMLAttributes<HTMLTableDataCellElement> {
    /**
     * expandable row contents
     */
    children: ReactNode;
    /**
     * number of columns to be spanned
     */
    numberOfColumns?: number;
}

/**
 * Defines content of expandable row in data table. See `TableRowExpandable`.
 *
 * All props are passed to the underlying `td` element.
 */
const TableDataExpandable: FunctionComponent<TableDataExpandableProps> = ({
    children,
    numberOfColumns = 0,
    ...tdProps
}) => {
    return (
        <tr className="active expanded">
            <td {...tdProps} colSpan={numberOfColumns}>
                <CSSTransition
                    classNames="dataExpandable"
                    appear
                    enter
                    timeout={{ enter: 500, exit: 500 }}
                    exit={false}
                >
                    {children}
                </CSSTransition>
            </td>
        </tr>
    );
};

export default TableDataExpandable;
