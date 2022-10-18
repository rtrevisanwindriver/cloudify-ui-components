import React, { useEffect, useState } from 'react';
import { isObject, isEmpty, isArray } from 'lodash';
import type { MessageProps } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

type MessageVisibilityTimeout = ReturnType<typeof setTimeout>;

export type ErrorMessageWithHeader = {
    message?: string;
    header?: string;
};

export interface ErrorMessageProps extends Omit<MessageProps, 'error'> {
    /**
     * if set, then message will be hidden after visibility timeout
     */
    autoHide?: boolean;

    /**
     * additional CSS classes to Message component
     */
    className?: string;
    /**
     * string, array or object containing error text message/messages
     */
    error?: string | string[] | ErrorMessageWithHeader | JSX.Element | null;

    /**
     * header of error text message
     */
    header?: string;
    /**
     * function called when either error message visibility timeout (default: 10s) expires or user dismiss manually error message
     */
    onDismiss?: () => void;
}

/**
 * ErrorMessage is a component which uses [Message](https://react.semantic-ui.com/collections/message/) component from Semantic-UI-React
 * to display error message. All props supported by the `Message` component are passed down to it.
 */

function ErrorMessage({
    autoHide = false,
    error,
    header = 'Error Occurred',
    onDismiss = () => {},
    ...messageProps
}: ErrorMessageProps) {
    const messageVisibilityTimeoutMs = 10000;
    let messageVisibilityTimeout: MessageVisibilityTimeout;

    const [hidden, setHidden] = useState(false);

    const handleDismiss = () => {
        setHidden(true);
        onDismiss();
    };

    const setVisibilityTimeout = (timeout: number) => {
        if (autoHide) {
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
            clearTimeout(messageVisibilityTimeout);
        };
    }, [error]);

    let errorMessage = error;
    let errorHeader: string | undefined = header;

    if (isObject(error) && !React.isValidElement(error)) {
        errorMessage = (error as ErrorMessageWithHeader).message;

        if (header && (error as ErrorMessageWithHeader).header) {
            errorHeader = (error as ErrorMessageWithHeader).header;
        }
    }

    return !isEmpty(error) ? (
        <Message error hidden={hidden} onDismiss={handleDismiss} {...messageProps}>
            <Message.Header>{errorHeader}</Message.Header>
            {isArray(error) ? <Message.List items={error} /> : <Message.Content>{errorMessage}</Message.Content>}
        </Message>
    ) : null;
}

export default ErrorMessage;
