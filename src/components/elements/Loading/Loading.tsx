import React from 'react';
import { Segment } from 'semantic-ui-react';
import { LoadingOverlay } from 'components';

export interface LoadingProps {
    /**
     * text message to display under loading icon
     */
    message?: string;
    /**
     * CSS class
     */
    className?: string;
    /**
     * CSS style
     */
    style?: React.CSSProperties;
}

/**
 * Loading is a block component which uses LoadingOverlay component
 * to display loader in center of parent component.
 */
export function Loading({ message = 'Loading', style, className }: LoadingProps) {
    return (
        <Segment basic style={{ height: '100%', zIndex: 5, ...style }} className={className}>
            <LoadingOverlay message={message} />
        </Segment>
    );
}

export default Loading;
