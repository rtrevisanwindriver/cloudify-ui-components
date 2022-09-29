import React from 'react';
import type { ModalProps } from 'semantic-ui-react';

import './ReadmeModal.css';
import Modal from '../Modal';

export interface ReadmeModalProps extends Pick<ModalProps, 'open' | 'className' | 'style'> {
    /**
     * HTML content of the modal
     */
    content: string;
    /**
     * A function called when the modal is closed
     */
    onHide: () => void;
}

/**
 * ReadmeModal is a component to present HTML content in Modal component.
 */
export default function ReadmeModal({ className = '', content, onHide, ...modalProps }: ReadmeModalProps) {
    const onCancel = () => {
        onHide();
        return true;
    };

    const getContent = () => {
        return { __html: content };
    };

    return (
        <Modal
            onClose={onCancel}
            closeIcon="close"
            className={`readmeModal unlimited ${className}`}
            size="fullscreen"
            {...modalProps}
        >
            <Modal.Content style={{ padding: '50px' }}>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={getContent()} />
            </Modal.Content>
        </Modal>
    );
}
