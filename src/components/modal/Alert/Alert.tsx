import type { ReactNode } from 'react';
import React from 'react';
import type { ModalProps } from 'semantic-ui-react';

import type { ApproveButtonProps } from 'components';
import { ApproveButton, Modal } from 'components';

export interface AlertProps extends ModalProps {
    /**
     * alert header content
     */
    content: ReactNode | string;
    /**
     * action executed on OK button click
     */
    onDismiss?: ApproveButtonProps['onClick'];
}

/**
 * Alert is component to present simple message in modal window with OK button.
 * All props supported by the `Modal` component are passed down to it.
 */
export function Alert({ content, onDismiss, ...modalProps }: AlertProps) {
    return (
        <Modal size="small" {...modalProps}>
            <Modal.Header>{content}</Modal.Header>
            <Modal.Actions>
                <ApproveButton onClick={onDismiss} content="OK" />
            </Modal.Actions>
        </Modal>
    );
}

export default Alert;
