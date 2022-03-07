import React from 'react';
import type { ReactNode, FunctionComponent } from 'react';
import { Checkbox as SemanticUiReactCheckbox } from 'semantic-ui-react';
import type { FormCheckboxProps } from 'semantic-ui-react';
import FieldLabel from '../FieldLabel';

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
const Checkbox: FunctionComponent<CheckboxProps> = ({ label, help = '', ...checkboxProps }) => (
    <SemanticUiReactCheckbox {...checkboxProps} label={<FieldLabel label={label} help={help} />} />
);

export default Checkbox;
