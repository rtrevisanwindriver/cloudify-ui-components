import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TableDataCell from './TableDataCell';

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

export default function TableRow({
    // @ts-expect-error TS(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
    id,
    // @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
    children,
    // @ts-expect-error TS(7031) FIXME: Binding element 'selected' implicitly has an 'any'... Remove this comment to see the full error message
    selected,
    // @ts-expect-error TS(7031) FIXME: Binding element 'onClick' implicitly has an 'any' ... Remove this comment to see the full error message
    onClick,
    // @ts-expect-error TS(7031) FIXME: Binding element 'onMouseOver' implicitly has an 'a... Remove this comment to see the full error message
    onMouseOver,
    // @ts-expect-error TS(7031) FIXME: Binding element 'onMouseOut' implicitly has an 'an... Remove this comment to see the full error message
    onMouseOut,
    // @ts-expect-error TS(7031) FIXME: Binding element 'showCols' implicitly has an 'any'... Remove this comment to see the full error message
    showCols,
    // @ts-expect-error TS(7031) FIXME: Binding element 'className' implicitly has an 'any... Remove this comment to see the full error message
    className,
    // @ts-expect-error TS(7031) FIXME: Binding element 'style' implicitly has an 'any' ty... Remove this comment to see the full error message
    style
}) {
    // @ts-expect-error TS(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
    const showData = index => (index < showCols.length ? showCols[index] : true);
    const computedClassName = className + (selected ? ' active' : '');
    // @ts-expect-error TS(7034) FIXME: Variable 'computedChildren' implicitly has type 'a... Remove this comment to see the full error message
    const computedChildren = [];

    const computedStyle = { ...style };
    if (_.isFunction(onClick)) {
        computedStyle.cursor = 'pointer';
    }

    React.Children.forEach(children, (child, index) => {
        if (child && child.type === TableDataCell && showData(index)) {
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
            {/* @ts-expect-error TS(7005) FIXME: Variable 'computedChildren' implicitly has an 'any... Remove this comment to see the full error message */}
            {computedChildren}
        </tr>
    );
}

TableRow.propTypes = {
    /**
     * row content
     */
    children: PropTypes.node.isRequired,

    /**
     * row id
     */
    id: PropTypes.string,

    /**
     * if true, then row will be marked as selected
     */
    selected: PropTypes.bool,

    /**
     * action to be executed on click event
     */
    onClick: PropTypes.func,

    /**
     * action to be executed on mouse over event
     */
    onMouseOver: PropTypes.func,

    /**
     * action to be executed on mouse out event
     */
    onMouseOut: PropTypes.func,

    /**
     * array of column's names to be shown
     */
    showCols: PropTypes.arrayOf(PropTypes.bool),

    /**
     * name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

TableRow.defaultProps = {
    id: undefined,
    selected: false,
    onClick: undefined,
    onMouseOver: undefined,
    onMouseOut: undefined,
    showCols: [],
    className: '',
    style: {}
};
