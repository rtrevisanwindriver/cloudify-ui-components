import React from 'react';
import type { ButtonProps } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export interface ApproveButtonProps extends ButtonProps {
    /**
     * button content
     */
    content?: string;
    /**
     * button icon
     */
    icon?: string;
    /**
     * button classname
     */
    className?: string;
    /**
     * button variant
     */
    positive?: boolean;
}
/**
 * ApproveButton is a component to present confirmation button in Modal component.
 *
 * ApproveButton is customized version of [Semantic UI-React's Button component](https://react.semantic-ui.com/elements/button),
 * so all properties of that component (eg. onClick, disabled, ...) can be used here.
 */
export const ApproveButton = ({
    content = 'Save',
    icon = 'checkmark',
    className = 'ok',
    ...buttonProps
}: ApproveButtonProps) => <Button content={content} icon={icon} className={className} color="blue" {...buttonProps} />;

export default ApproveButton;
