import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import './TableDataExpandable.css';

/**
 * Defines content of expandable row in data table. See `TableRowExpandable`.
 *
 * All props are passed to the underlaying `td` element.
 */
export default function TableDataExpandable({ children, numberOfColumns, ...tdProps }) {
    return (
        <tr className="active">
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
}

TableDataExpandable.propTypes = {
    /**
     * expandable row content
     */
    children: PropTypes.node.isRequired,

    /**
     * name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * number of columns to be spanned
     */
    numberOfColumns: PropTypes.number
};

TableDataExpandable.defaultProps = {
    className: '',
    numberOfColumns: 0
};
