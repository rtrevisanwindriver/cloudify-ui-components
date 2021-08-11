import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

/**
 * DataAction is a component showing action bar including buttons displayed above the segments (when in DataSegment) or table (when in DataTable)
 */
export default function DataAction({ children, className, style }) {
    return (
        <Form.Field className={`${className} actionField`.trim()} style={style}>
            {children}
        </Form.Field>
    );
}

DataAction.propTypes = {
    /**
     * action buttons
     */
    children: PropTypes.node.isRequired,

    /**
     * CSS class
     */
    className: PropTypes.string,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

DataAction.defaultProps = {
    className: '',
    style: undefined
};
