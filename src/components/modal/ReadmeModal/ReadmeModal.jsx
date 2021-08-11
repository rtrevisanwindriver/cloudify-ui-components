import React from 'react';
import PropTypes from 'prop-types';

import './ReadmeModal.css';
import Modal from '../Modal';

/**
 * ReadmeModal is a component to present HTML content in Modal component.
 */
export default function ReadmeModal(props) {
    const { className, content, open, onHide, style } = props;
    const onCancel = () => {
        onHide();
        return true;
    };

    const getContent = () => {
        return { __html: content };
    };

    return (
        <Modal
            open={open}
            onClose={onCancel}
            closeIcon="close"
            className={`readmeModal unlimited ${className}`}
            size="fullscreen"
            style={style}
        >
            <Modal.Content style={{ padding: '50px' }}>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={getContent()} />
            </Modal.Content>
        </Modal>
    );
}

ReadmeModal.propTypes = {
    /**
     * HTML content of the modal
     */
    content: PropTypes.string.isRequired,
    /**
     * Modal's open state
     */
    open: PropTypes.bool.isRequired,
    /**
     * A function called when the modal is closed
     */
    onHide: PropTypes.func.isRequired,
    /**
     * Modal's classname
     */
    className: PropTypes.string,
    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

ReadmeModal.defaultProps = {
    className: '',
    style: undefined
};
