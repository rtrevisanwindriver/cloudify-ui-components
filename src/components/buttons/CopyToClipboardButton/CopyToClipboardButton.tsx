import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import type { ButtonProps } from 'semantic-ui-react';

export interface CopyToClipboardButtonProps extends ButtonProps {
    /**
     * Text to be copied to clipboard
     */
    text?: CopyToClipboard.Props['text'];
}

/**
 * CopyToClipboardButton component shows a simple copy icon and on click action it copies prop - text to clipboard.
 * All other props are passed to the underlaying Button component.
 */
export default function CopyToClipboardButton({ text = '', content, ...buttonProps }: CopyToClipboardButtonProps) {
    const stopPropagation: ButtonProps['onClick'] = event => event.stopPropagation();

    return (
        <CopyToClipboard text={text}>
            {content ? (
                <Button animated="vertical" basic onClick={stopPropagation} {...buttonProps}>
                    <Button.Content visible>{content}</Button.Content>
                    <Button.Content hidden>
                        <Icon name="copy" />
                    </Button.Content>
                </Button>
            ) : (
                <Button basic compact icon="copy" onClick={stopPropagation} {...buttonProps} />
            )}
        </CopyToClipboard>
    );
}
