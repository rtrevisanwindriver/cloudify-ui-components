import React, { useContext } from 'react';
import type { FunctionComponent, CSSProperties } from 'react';
import { Segment } from 'semantic-ui-react';
import type { SegmentProps } from 'semantic-ui-react';
import { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common/styles/_colors.scss';

export interface FullScreenSegmentProps extends Pick<SegmentProps, 'className'> {
    /**
     * style to be assigned to Segment component
     */
    style?: CSSProperties;
}

/**
 * FullScreenSegment is a block component which can be used as a single color background.
 *
 * It supports theming:
 *
 * * `mainColor` parameter is used as a background color, if not specified then `blueNormal` from default colors is chosen
 */
const FullScreenSegment: FunctionComponent<FullScreenSegmentProps> = ({ children, className = '', style }) => {
    const theme = useContext(ThemeContext) || {};
    const backgroundColor = theme.mainColor || colors.blueNormal;

    return (
        <Segment
            className={`fullScreenSegment ${className}`}
            style={{
                margin: 0,
                padding: 0,
                overflow: 'auto',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                border: 'none',
                borderRadius: 0,
                backgroundColor,
                ...style
            }}
        >
            {children}
        </Segment>
    );
};

export default FullScreenSegment;
