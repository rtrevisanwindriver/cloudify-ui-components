import React, { useState } from 'react';
import { Popup, Button, Header } from 'semantic-ui-react';
import type { PopupProps, ButtonProps } from 'semantic-ui-react';
import { noop } from 'lodash';

export interface PopupConfirmProps extends PopupProps {
    /**
     * popup content
     */
    content?: string;
    /**
     * function called on Cancel button click
     */
    onCancel?: () => void;
    /**
     * function called on OK button click
     */
    onConfirm?: () => void;
    /**
     * function called to determine if Cancel button should be displayed
     */
    onCanConfirm?: () => string;
    /**
     * if set then the component renders initially open
     */
    defaultOpen?: boolean;
}

/**
 * PopupConfirm is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to display
 * popup with content enhanced by two buttons - OK and Cancel.
 *
 * All props supported by the underlaying `Popup` component are passed down to it.
 */
export default function PopupConfirm({
    content = '',
    onCancel = noop,
    onConfirm = noop,
    onCanConfirm = () => '',
    defaultOpen = false,
    ...popupProps
}: PopupConfirmProps) {
    const [showPopup, setShowPopup] = useState(defaultOpen);
    const [canConfirm, setCanConfirm] = useState('');
    const openPopup = () => {
        setCanConfirm(onCanConfirm());
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleCancel: ButtonProps['onClick'] = e => {
        e.stopPropagation();
        closePopup();
        onCancel();
    };

    const handleConfirm: ButtonProps['onClick'] = e => {
        e.stopPropagation();
        closePopup();
        onConfirm();
    };

    return (
        <Popup
            on="click"
            wide="very"
            hideOnScroll
            open={showPopup}
            onOpen={openPopup}
            onClose={closePopup}
            {...popupProps}
        >
            <Header>{canConfirm || content}</Header>

            <div style={{ textAlign: 'right' }}>
                {canConfirm ? (
                    <Button icon="checkmark" content="Ok" color="green" onClick={handleCancel} />
                ) : (
                    <>
                        <Button icon="remove" content="Cancel" basic onClick={handleCancel} />
                        <Button icon="checkmark" content="Ok" color="green" onClick={handleConfirm} />
                    </>
                )}
            </div>
        </Popup>
    );
}
