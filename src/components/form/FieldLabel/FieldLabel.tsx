import type { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { isEmpty } from 'lodash';
import type { SemanticShorthandItem } from 'semantic-ui-react';

import { PopupHelp } from 'components';

type HTMLLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

export interface FieldLabelProps extends HTMLLabelProps {
    /**
     * field label
     */
    label?: string | SemanticShorthandItem<HTMLLabelProps> | null;
    /**
     * help description
     */
    help?: ReactNode;
}

/**
 * FieldLabel creates input field description with help popup (PopupHelp component).
 * All props supported by the `label` element are passed down to it.
 *
 * @return {null}
 */
export function FieldLabel({ label, help, ...labelProps }: FieldLabelProps) {
    return !isEmpty(label) ? (
        <>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label {...labelProps} style={{ display: 'inline-block' }}>
                {label}
            </label>
            {!isEmpty(help) && (
                <span>
                    {' '}
                    <PopupHelp content={help} />
                </span>
            )}
            <div />
        </>
    ) : null;
}
