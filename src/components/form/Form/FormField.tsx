import React, { memo } from 'react';
import type { FunctionComponent } from 'react';
import { get, isEmpty } from 'lodash';

import { Form, Label } from 'semantic-ui-react';
import type { FormFieldProps as FormFieldPropsSemanticReact } from 'semantic-ui-react';
import PopupHelp from '../../popups/PopupHelp';
import FieldLabel from '../FieldLabel/FieldLabel';

export interface FormFieldProps extends FormFieldPropsSemanticReact {
    /**
     * if not empty, then help description is shown in popup on field's hover and focus
     */
    help?: React.ReactNode;
}

const FieldWrapper: FunctionComponent<FormFieldProps> = ({
    children,
    error = false,
    help,
    label,
    required = false,
    ...fieldProps
}) => {
    const errorPointing = get(error, 'pointing', '');
    const errorContent = get(error, 'content', '');
    const errorLabel = (
        <Label
            content={errorContent}
            pointing={errorPointing}
            prompt
            ariaAtomic
            id={fieldProps.id ? `${fieldProps.id}-error-message` : undefined}
            role="alert"
        />
    );

    const errorLabelBefore = (errorPointing === 'below' || errorPointing === 'right') && errorLabel;
    const errorLabelAfter = (errorPointing === 'above' || errorPointing === 'left') && errorLabel;

    return (
        <Form.Field {...fieldProps} required={required} error={!!error}>
            {errorLabelBefore}
            <FieldLabel help={help} label={label} />
            {children}
            {errorLabelAfter}
        </Form.Field>
    );
};

/**
 * `Form.Field` is a component to present field and is used in Form component.
 *
 * `Form.Field` is a wrapper for [Semantic UI-React's Form.Field component](https://react.semantic-ui.com/collections/form),
 * so all properties of that component can be used here.
 */
export const FormFieldWithoutMemo: FunctionComponent<FormFieldProps> = ({ help = '', label = '', ...fieldProps }) =>
    isEmpty(label) && !isEmpty(help) ? (
        <PopupHelp trigger={<FieldWrapper {...fieldProps} help={help} label={label} />} content={help} />
    ) : (
        <FieldWrapper {...fieldProps} help={help} label={label} />
    );

const FormField = memo(function FormField(props: FormFieldProps) {
    return <FormFieldWithoutMemo {...props} />;
});
export default FormField;
