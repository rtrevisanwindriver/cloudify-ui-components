import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import type { FormCheckboxProps } from 'semantic-ui-react';
import { Checkbox as SemanticUiReactCheckbox } from 'semantic-ui-react';
import { FieldLabel } from 'components';

export interface CheckboxProps extends FormCheckboxProps {
    /**
     * checkbox label
     */
    label: ReactNode;
    /**
     * help description
     */
    help?: ReactNode;
}

/**
 * Checkbox is just a wrapper of Semantic-UI-React's Checkbox component to add help description near Checkbox label.
 * All props supported by the `Checkbox` component are passed down to it.
 *
 * See [Checkbox](https://react.semantic-ui.com/modules/checkbox)
 *
 * Accessible as `Checkbox` or `Form.Checkbox`.
 *
 */
export const Checkbox: FunctionComponent<CheckboxProps> = ({ label, help = '', ...checkboxProps }) => (
    <SemanticUiReactCheckbox {...checkboxProps} label={<FieldLabel label={label} help={help} />} />
);

export default Checkbox;
