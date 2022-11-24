import type { FunctionComponent } from 'react';
import React from 'react';

import { Form } from 'semantic-ui-react';

export interface DataActionProps {
    className?: string;
    style?: React.CSSProperties;
}

/**
 * DataAction is a component showing action bar including buttons displayed above the segments (when in DataSegment) or table (when in DataTable)
 */
const DataAction: FunctionComponent<DataActionProps> = ({ children, className = '', style }) => {
    return (
        <Form.Field className={`${className} actionField`.trim()} style={style}>
            {children}
        </Form.Field>
    );
};

export default DataAction;
