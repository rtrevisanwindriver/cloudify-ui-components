import React from 'react';
import type { ReactNode } from 'react';
import type { ModalProps } from 'semantic-ui-react';

import ApproveButton from 'components/buttons/ApproveButton';
import type { ApproveButtonProps } from 'components/buttons/ApproveButton/ApproveButton';
import Modal from '../Modal';

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
export default function Alert({ content, onDismiss, ...modalProps }: AlertProps) {
    return (
        <Modal size="small" {...modalProps}>
            <Modal.Header>{content}</Modal.Header>
            <Modal.Actions>
                <ApproveButton onClick={onDismiss} content="OK" />
            </Modal.Actions>
        </Modal>
    );
}
