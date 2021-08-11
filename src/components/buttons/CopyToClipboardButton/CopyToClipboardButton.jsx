import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

/**
 * CopyToClipboardButton component shows a simple copy icon and on click action it copies prop - text to clipboard.
 * All other props are passed to the underlaying Button component.
 */
export default function CopyToClipboardButton(props) {
    const { content, text, ...otherButtonProps } = props;
    const stopPropagation = event => event.stopPropagation();

    return (
        <CopyToClipboard text={text}>
            {content ? (
                <Button animated="vertical" basic onClick={stopPropagation} {...otherButtonProps}>
                    <Button.Content visible>{content}</Button.Content>
                    <Button.Content hidden>
                        <Icon name="copy" />
                    </Button.Content>
                </Button>
            ) : (
                <Button basic compact icon="copy" onClick={stopPropagation} {...otherButtonProps} />
            )}
        </CopyToClipboard>
    );
}

CopyToClipboardButton.propTypes = {
    /**
     * Text to be copied to clipboard
     */
    text: PropTypes.string,
    /**
     * Button label
     */
    content: PropTypes.string,
    /**
     * Class name to be added to button component
     */
    className: PropTypes.string
};

CopyToClipboardButton.defaultProps = {
    text: '',
    content: '',
    className: ''
};
