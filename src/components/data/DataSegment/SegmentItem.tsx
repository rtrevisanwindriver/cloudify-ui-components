import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import { isFunction } from 'lodash';

import { Segment } from 'semantic-ui-react';

export interface SegmentItemProps {
    /*
     * primary content
     */
    children: ReactNode;

    /*
     * specifies if data segment item shall be selected
     */
    selected?: boolean;

    /*
     * specifies function to be called on action click
     */
    onClick?: (event: React.MouseEvent) => void;

    /*
     * CSS classname
     */
    className?: string;
}

/**
 * SegmentItem is a component showing content item for `DataSegment` component
 */
const SegmentItem: FunctionComponent<SegmentItemProps> = ({ children, selected = false, onClick, className = '' }) => {
    return (
        <Segment
            secondary={selected}
            className={className}
            style={isFunction(onClick) ? { cursor: 'pointer' } : {}}
            onClick={onClick}
        >
            {children}
        </Segment>
    );
};

export default SegmentItem;
