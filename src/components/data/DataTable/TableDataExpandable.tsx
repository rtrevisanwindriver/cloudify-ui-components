import React from 'react';
import PropTypes from 'prop-types';

// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { CSSTransition } from 'react-transition-group';

import './TableDataExpandable.css';

/**
 * Defines content of expandable row in data table. See `TableRowExpandable`.
 *
 * All props are passed to the underlaying `td` element.
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
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
