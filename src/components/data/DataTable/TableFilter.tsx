import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

/**
 * Defines filter bar including filter fields which are displayed above the table.
 *
 * All props are passed to the underlaying `Form.Field` component.
 *
 * ```
 *  <DataTable>
 *
 *      ...
 *
 *      <DataTable.Filter>
 *          <Input placeholder="Package name"/>
 *          <Input placeholder="Distribution"/>
 *      </DataTable.Filter>
 *
 *      <DataTable.Action>
 *          <Button content='Upload' icon='add' labelPosition='left' />
 *      </DataTable.Action>
 *
 *  </DataTable>
 * ```
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
export default function TableFilter({ children, ...formFieldProps }) {
    return <Form.Field {...formFieldProps}>{children}</Form.Field>;
}

TableFilter.propTypes = {
    /**
     * filter fields
     */
    children: PropTypes.node.isRequired,

    /**
     * name of the style class to be added
     */
    className: PropTypes.string
};

TableFilter.defaultProps = {
    className: ''
};
