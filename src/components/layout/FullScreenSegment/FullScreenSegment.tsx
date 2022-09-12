import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Segment } from 'semantic-ui-react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common/styles/_colors.scss';

/**
 * FullScreenSegment is a block component which can be used as a single color background.
 *
 * It supports theming:
 *
 * * `mainColor` parameter is used as a background color, if not specified then `blueNormal` from default colors is chosen
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
export default function FullScreenSegment({ children, className, style }) {
    const theme = useContext(ThemeContext) || {};
    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
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
}

FullScreenSegment.propTypes = {
    /**
     * elements displayed inside the Segment
     */
    children: PropTypes.node.isRequired,
    /**
     * class name to be assigned to Segment component
     */
    className: PropTypes.string,
    /**
     * style to be assigned to Segment component
     */
    style: PropTypes.shape({})
};

FullScreenSegment.defaultProps = {
    className: '',
    style: {}
};
