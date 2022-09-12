import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isObject, isEqual, isEmpty, isArray } from 'lodash';
import { Message } from 'semantic-ui-react';

/**
 * ErrorMessage is a component which uses [Message](https://react.semantic-ui.com/elements/message) component from Semantic-UI-React
 * to display error message. All props supported by the `Message` component are passed down to it.
 */
// @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
export default function ErrorMessage(props) {
    const { autoHide, error, header, onDismiss, ...messageProps } = props;
    const messageVisibilityTimeoutMs = 10000;
    // @ts-expect-error TS(7034) FIXME: Variable 'messageVisibilityTimeout' implicitly has... Remove this comment to see the full error message
    let messageVisibilityTimeout = null;

    const [hidden, setHidden] = useState(false);

    const handleDismiss = () => {
        setHidden(true);
        onDismiss();
    };

    // @ts-expect-error TS(7006) FIXME: Parameter 'timeout' implicitly has an 'any' type.
    const setVisibilityTimeout = timeout => {
        if (autoHide) {
            // @ts-expect-error TS(7005) FIXME: Variable 'messageVisibilityTimeout' implicitly has... Remove this comment to see the full error message
            clearTimeout(messageVisibilityTimeout);
            messageVisibilityTimeout = setTimeout(() => {
                handleDismiss();
            }, timeout);
        }
    };

    useEffect(() => {
        if (error) {
            setHidden(false);
            setVisibilityTimeout(messageVisibilityTimeoutMs);
        }

        // returned function will be called on component unmount
        return () => {
            // @ts-expect-error TS(7005) FIXME: Variable 'messageVisibilityTimeout' implicitly has... Remove this comment to see the full error message
            clearTimeout(messageVisibilityTimeout);
        };
    }, [error]);

    let errorMessage = error;
    let errorHeader = header;
    if (isObject(error) && !React.isValidElement(error)) {
        // @ts-expect-error TS(2339) FIXME: Property 'message' does not exist on type 'object'... Remove this comment to see the full error message
        errorMessage = error.message;
        // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'object'.
        if (isEqual(header, ErrorMessage.defaultProps.header) && error.header) {
            // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'object'.
            errorHeader = error.header;
        }
    }

    return !isEmpty(error) ? (
        <Message error {...messageProps} hidden={hidden} onDismiss={handleDismiss}>
            <Message.Header>{errorHeader}</Message.Header>
            {isArray(error) ? <Message.List items={error} /> : <Message.Content>{errorMessage}</Message.Content>}
        </Message>
    ) : null;
}

ErrorMessage.propTypes = {
    /**
     * if set, then message will be hidden after visibility timeout
     */
    autoHide: PropTypes.bool,

    /**
     * additional CSS classes to Message component
     */
    className: PropTypes.string,

    /**
     * string, array or object containing error text message/messages
     */
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element,
        PropTypes.shape({ header: PropTypes.string, message: PropTypes.string })
    ]),

    /**
     * header of error text message
     */
    header: PropTypes.string,
    /**
     * function called when either error message visibility timeout (default: 10s) expires or user dismiss manually error message
     */
    onDismiss: PropTypes.func
};

ErrorMessage.defaultProps = {
    autoHide: false,
    className: '',
    error: null,
    header: 'Error Occurred',
    onDismiss: () => {}
};
