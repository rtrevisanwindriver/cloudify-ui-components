import type { CSSProperties, ReactElement } from 'react';
import React, { useEffect, useRef } from 'react';
import _ from 'lodash';

import type { StrictFormProps } from 'semantic-ui-react';
import { Form as FormSemanticUiReact, Radio, Ref } from 'semantic-ui-react';

import ErrorMessage from '../../elements/ErrorMessage';
import FormDropdown from '../../elements/Dropdown';
import Checkbox from '../Checkbox';
import ColorPicker from '../ColorPicker';
import DateInput from '../DateInput';
import DatePicker from '../DatePicker';
import DateRangeInput from '../DateRangeInput';
import FormDivider from './FormDivider';
import FormField from './FormField';
import FileInput from '../FileInput';

import './Form.css';
import UrlOrFileInput from '../UrlOrFileInput';
import JsonInput from '../JsonInput';
import TimeInput from '../TimeInput';

export interface FormProps extends Omit<StrictFormProps, 'error'> {
    /**
     * string with error message or array of strings or React component
     *     or object with the following syntax:
     * ```
     * {
     *      field1: 'errorMessage1',
     *      field2: 'errorMessage2',
     *      ...
     * }
     * ```
     */
    errors?: string | string[] | Record<string, string> | JSX.Element;

    /**
     * string with error message header
     */
    errorMessageHeader?: string;

    /**
     * function called when errors are dismissed (see ErrorMessage)
     */
    onErrorsDismiss?: () => void;

    /**
     * if set to true
     *     then view will be scrolled to either
     *         the ErrorMessage at the top of the Form OR
     *         to the first erroneous Form.Field
     *     on every passed errors prop change
     * if there is existing error inside of Form.Field child component
     *     then the view will be scrolled to the first one with the highest priority
     * if set to true
     *     and there is an error present inside of folded accordion
     *     then the accordion will be unfolded before scrolling
     */
    scrollToError?: boolean;

    /**
     * CSS style
     */
    style?: CSSProperties;
}

/**
 * `Form` is a component to present HTML forms
 *
 * `Form` is customized version of [Semantic UI-React's Form component](https://react.semantic-ui.com/collections/form),
 * so all props of that component can be used here.
 *
 * ## General structure
 *
 * Form component should be used to group form input fields. Each input field to have similar look should be wrapped with
 * `Form.Field` component.
 *
 * ```
 * <Form>
 *   <Form.Field label="Username" required>
 *     <Form.Input placeholder="Provide username" />
 *   </Form.Field>
 *   <Form.Field label="First name">
 *     {...}
 *   </Form.Field>
 *   {...}
 * </Form>
 * ```
 *
 * ## Sub-components
 *
 * - `Form.Button` = Form button, see [Button](https://react.semantic-ui.com/elements/button)
 * - `Form.Checkbox` = Form checkbox input, see `Checkbox`
 * - `Form.ColorPicker` = Color picker input, see `ColorPicker`
 * - `Form.DatePicker` = Calendar picker, see `DatePicker`
 * - `Form.Date` = Calendar picker with input, see `DateInput`
 * - `Form.DateRange` = Date range input, see `DateRangeInput`
 * - `Form.Divider` = Form divider, see `FormDivider`
 * - `Form.Dropdown` = Dropdown field, see `Dropdown`
 * - `Form.Field` = Form field, see `FormField`
 * - `Form.File` = Form file input, see `FileInput`
 * - `Form.Group` = Form group, see `FormGroup`
 * - `Form.Input` = Form input, see [Form.Input](https://react.semantic-ui.com/collections/form/)
 * - `Form.Json` = Form JSON input, see `JsonInput`
 * - `Form.Radio` = Form radio button, see [Radio](https://react.semantic-ui.com/addons/radio)
 * - `Form.TextArea` = Form text area input, see [TextArea](https://react.semantic-ui.com/addons/text-area)
 * - `Form.Time` = Time picker input, see `TimeInput`
 * - `Form.UrlOrFile` = Form URL or file input, see `UrlOrFileInput`
 *
 */

export function Form({
    children,
    errors,
    errorMessageHeader = 'Errors in the form',
    onErrorsDismiss = () => {},
    scrollToError = false,
    ...formProps
}: FormProps): ReactElement | null {
    const formRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (scrollToError && formRef.current instanceof Element) {
            const errorElement = formRef.current.querySelector('.error.field');

            if (errorElement) {
                const insideFoldedAccordionSegment = errorElement?.closest('.segment .content:not(.active)');
                if (insideFoldedAccordionSegment) {
                    const accordionSegmentTitle = errorElement
                        ?.closest('.segment')
                        ?.querySelector('.title:not(.active)');
                    (accordionSegmentTitle as HTMLElement)?.click();
                }
                // setTimeout is used to postpone scrollIntoView event to take place after accordion unfolding
                setTimeout(() => {
                    errorElement.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
                }, 0);
            } else if (!_.isEmpty(errors)) {
                formRef.current.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [errors]);

    let formattedErrors: undefined | Array<string> | JSX.Element;
    if (_.isString(errors)) {
        formattedErrors = [errors];
    } else if (_.isObject(errors) && !React.isValidElement(errors)) {
        formattedErrors = _.valuesIn(errors);
    } else {
        formattedErrors = errors;
    }

    return (
        <Ref innerRef={formRef}>
            <FormSemanticUiReact {...formProps} error={!_.isEmpty(errors)}>
                <ErrorMessage header={errorMessageHeader} error={formattedErrors} onDismiss={onErrorsDismiss} />
                {children}
            </FormSemanticUiReact>
        </Ref>
    );
}

Form.fieldNameValue = (field: { name: string; value: unknown; type: string; checked?: boolean }) => {
    const { name } = field;
    let { value } = field;

    if (field.type === 'checkbox') {
        value = field.checked;
    }

    if (field.type === 'number') {
        const isFloat = (n: unknown) => Number(n) % 1 !== 0;
        value = isFloat(field.value) ? parseFloat(field.value as string) : parseInt(field.value as string, 10);
    }

    if (_.isEmpty(name)) {
        throw new Error('Required name attribute is not provided!');
    }

    return { [name]: value };
};

Form.Button = FormSemanticUiReact.Button;
Form.Checkbox = Checkbox;
Form.ColorPicker = ColorPicker;
Form.DatePicker = DatePicker;
Form.Date = DateInput;
Form.DateRange = DateRangeInput;
Form.Divider = FormDivider;
Form.Dropdown = FormDropdown;
Form.Field = FormField;
Form.File = FileInput;
Form.Group = FormSemanticUiReact.Group;
Form.Input = FormSemanticUiReact.Input;
Form.Json = JsonInput;
Form.Radio = Radio;
Form.TextArea = FormSemanticUiReact.TextArea;
Form.UrlOrFile = UrlOrFileInput;
Form.Time = TimeInput;

export default Form;
