import React from 'react';
import { Confirm as ConfirmSemanticUiReact } from 'semantic-ui-react';
import type { ConfirmProps } from 'semantic-ui-react';

/**
 * Confirm is a wrapper component to present simple Yes/No confirmation modal window.
 *
 * It wraps [Semantic UI-React's Confirm component](https://react.semantic-ui.com/addons/confirm),
 * so all properties of that component (eg. content, header, ...) can be used here.
 */
export default function Confirm({ confirmButton = 'Yes', cancelButton = 'No', ...confirmProps }: ConfirmProps) {
    return (
        <ConfirmSemanticUiReact
            confirmButton={confirmButton}
            cancelButton={cancelButton}
            style={{
                fontSize: '1.3em',
                lineHeight: '1.28571429em',
                fontWeight: 700
            }}
            {...confirmProps}
        />
    );
}
