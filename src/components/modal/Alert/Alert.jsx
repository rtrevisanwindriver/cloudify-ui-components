import React from 'react';
import PropTypes from 'prop-types';

import ApproveButton from 'components/buttons/ApproveButton';
import Modal from '../Modal';

/**
 * Alert is component to present simple message in modal window with OK button.
 * All props supported by the `Modal` component are passed down to it.
 */
export default function Alert(props) {
    const { content, onDismiss, ...modalProps } = props;
    return (
        <Modal size="small" {...modalProps}>
            <Modal.Header>{content}</Modal.Header>
            <Modal.Actions>
                <ApproveButton onClick={onDismiss} content="OK" />
            </Modal.Actions>
        </Modal>
    );
}

Alert.propTypes = {
    /**
     * display alert modal window
     */
    open: PropTypes.bool.isRequired,
    /**
     * alert header content
     */
    content: PropTypes.node.isRequired,
    /**
     * action executed on OK button click
     */
    onDismiss: PropTypes.func
};

Alert.defaultProps = {
    onDismiss: () => {}
};
