import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import LoadingOverlay from '../LoadingOverlay';

/**
 * Loading is a block component which uses LoadingOverlay component
 * to display loader in center of parent component.
 */
function Loading({ message, style, className }) {
    return (
        <Segment basic style={{ height: '100%', zIndex: 5, ...style }} className={className}>
            <LoadingOverlay message={message} />
        </Segment>
    );
}

Loading.propTypes = {
    /**
     * text message to display under loading icon
     */
    message: PropTypes.string,
    /**
     * CSS class
     */
    className: PropTypes.string,
    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

Loading.defaultProps = {
    message: 'Loading',
    className: undefined,
    style: {}
};

export default Loading;
