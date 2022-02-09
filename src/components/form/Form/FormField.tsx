import React, { memo } from 'react';
import type { FunctionComponent } from 'react';
import _ from 'lodash';

import { Form } from 'semantic-ui-react';
import type { StrictFormFieldProps } from 'semantic-ui-react';
import PopupHelp from '../../popups/PopupHelp';
import FieldLabel from '../FieldLabel/FieldLabel';

export interface FormFieldProps extends StrictFormFieldProps {
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
}) => (
    <Form.Field {...fieldProps} required={required} error={!!error}>
        <FieldLabel help={help} label={label} />
        {children}
    </Form.Field>
);

/**
 * `Form.Field` is a component to present field and is used in Form component.
 *
 * `Form.Field` is a wrapper for [Semantic UI-React's Form.Field component](https://react.semantic-ui.com/collections/form),
 * so all properties of that component can be used here.
 */
export const FormFieldWithoutMemo: FunctionComponent<FormFieldProps> = ({ help = '', label = '', ...fieldProps }) =>
    _.isEmpty(label) && !_.isEmpty(help) ? (
        <PopupHelp trigger={<FieldWrapper {...fieldProps} help={help} label={label} />} content={help} />
    ) : (
        <FieldWrapper {...fieldProps} help={help} label={label} />
    );

const FormField = memo((props: FormFieldProps) => <FormFieldWithoutMemo {...props} />);
export default FormField;
