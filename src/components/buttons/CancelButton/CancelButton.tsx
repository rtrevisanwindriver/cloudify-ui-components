import React from 'react';
import type { ButtonProps } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export type CancelButtonProps = ButtonProps;

/**
 * CancelButton is a component to present cancellation button in Modal component.
 *
 * CancelButton is customized version of [Semantic UI-React's Button component](https://react.semantic-ui.com/elements/button),
 * so all properties of that component (eg. onClick, disabled, ...) can be used here.
 */
export function CancelButton({
    content = 'Cancel',
    icon = 'remove',
    className = 'cancel',
    ...buttonProps
}: CancelButtonProps) {
    return <Button content={content} icon={icon} className={className} {...buttonProps} />;
}

export default CancelButton;
