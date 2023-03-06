import type { CSSProperties, JSXElementConstructor, ReactNode, SyntheticEvent } from 'react';
import React from 'react';
import _ from 'lodash';

import type { FormFieldProps } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Checkbox, Dropdown, ErrorMessage } from 'components';
import FormField from '../Form/FormField';

import GenericFieldType from './GenericFieldType';

type GenericFieldItemType = {
    value: boolean | number | string;
    text?: string | number;
    name?: string | number;
};

export type onChange = (
    proxy: SyntheticEvent<HTMLElement, Event> | undefined,
    field: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
        name?: string;
        checked?: boolean;
    }
) => void;

export interface ComponentProps {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    onChange: onChange;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    widgetlessToolbox: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}

export interface GenericFieldProps {
    /**
     * field's label to show above the field
     */
    label: string;

    /**
     * name of the input field
     */
    name: string;

    /**
     * React element type (ie. MyComponent) to be used as input field,
     * it must provide at least the following props: 'name', 'value', 'onChange',
     * custom props, will be passed through
     * (valid only for CUSTOM_TYPE)
     */
    component?: JSXElementConstructor<ComponentProps>;

    /**
     * default value of the field
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default?: any;

    /**
     * fields description showed in popup when user hovers field
     */
    description?: string | ReactNode;

    /**
     * sets the `error` property of the underlying `FormField` element
     */
    error?: FormFieldProps['error'];

    /**
     * additional icon in right side of the input field
     * (only valid for STRING\_TYPE, NUMBER\_TYPE, PASSWORD\_TYPE)
     */
    icon?: string;

    /**
     * list of items (valid only for list types:
     * GenericField.LIST\_TYPE,
     * NUMBER\_LIST\_TYPE,
     * MULTI\_SELECT\_LIST\_TYPE,
     * BOOLEAN\_LIST\_TYPE,
     * EDITABLE\_LIST\_TYPE,
     * NUMBER\_EDITABLE\_LIST\_TYPE)
     */
    items?: (GenericFieldItemType | number | string)[];

    /**
     * maximal value (valid only for NUMBER_TYPE)
     */
    max?: number;

    /**
     * minimal value (valid only for NUMBER_TYPE)
     */
    min?: number;

    /**
     * function called on input value change
     */
    onChange?: onChange;

    /**
     * specifies a short hint that describes the expected value of an input field
     * (not valid for BOOLEAN\_TYPE and CUSTOM\_TYPE)
     */
    placeholder?: string;

    /**
     * define if a field is required (if yes, then displaying a red star icon near label)
     */
    required?: boolean;

    /**
     * specifies type of the field
     */
    type: GenericFieldType;

    /**
     * specifies the value of the field
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;

    /**
     * CSS class
     */
    className?: string;

    /**
     * CSS style
     */
    style?: CSSProperties;

    // The following statement is neccesery because we use spread operator to pass the rest of props.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}

/**
 * `GenericField` is a generic component which can be used as different input fields in Form component
 */
export class GenericField extends React.PureComponent<GenericFieldProps> {
    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        className: '',
        component: null,
        error: false,
        icon: null,
        items: [],
        max: null,
        min: null,
        onChange: _.noop,
        placeholder: '',
        required: false,
        type: GenericFieldType.STRING,
        value: ''
    };

    /** deprecated. The GenericFieldType should be used directly instead */
    public static STRING_TYPE: GenericFieldType.STRING = GenericFieldType.STRING;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static PASSWORD_TYPE: GenericFieldType.PASSWORD = GenericFieldType.PASSWORD;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static NUMBER_TYPE: GenericFieldType.NUMBER = GenericFieldType.NUMBER;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static BOOLEAN_TYPE: GenericFieldType.BOOLEAN = GenericFieldType.BOOLEAN;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static BOOLEAN_LIST_TYPE: GenericFieldType.BOOLEAN_LIST = GenericFieldType.BOOLEAN_LIST;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static LIST_TYPE: GenericFieldType.LIST = GenericFieldType.LIST;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static NUMBER_LIST_TYPE: GenericFieldType.NUMBER_LIST = GenericFieldType.NUMBER_LIST;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static MULTI_SELECT_LIST_TYPE: GenericFieldType.MULTI_SELECT_LIST = GenericFieldType.MULTI_SELECT_LIST;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static EDITABLE_LIST_TYPE: GenericFieldType.EDITABLE_LIST = GenericFieldType.EDITABLE_LIST;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static NUMBER_EDITABLE_LIST_TYPE: GenericFieldType.NUMBER_EDITABLE_LIST =
        GenericFieldType.NUMBER_EDITABLE_LIST;

    /** deprecated. The GenericFieldType should be used directly instead */
    public static CUSTOM_TYPE: GenericFieldType.CUSTOM = GenericFieldType.CUSTOM;

    static formatValue = (type: GenericFieldType, value: boolean | string): boolean | string | string[] | number => {
        if (type === GenericFieldType.MULTI_SELECT_LIST) {
            return _.split(String(value), ',');
        }
        if (type === GenericFieldType.BOOLEAN) {
            return (_.isBoolean(value) && value) || (typeof value === 'string' && value === 'true');
        }
        if (
            type === GenericFieldType.NUMBER ||
            type === GenericFieldType.NUMBER_LIST ||
            type === GenericFieldType.NUMBER_EDITABLE_LIST
        ) {
            return parseInt(String(value), 10) || 0;
        }

        return value;
    };

    static isListType = (type: GenericFieldType): boolean => {
        return (
            type === GenericFieldType.LIST ||
            type === GenericFieldType.NUMBER_LIST ||
            type === GenericFieldType.MULTI_SELECT_LIST ||
            type === GenericFieldType.BOOLEAN_LIST ||
            type === GenericFieldType.EDITABLE_LIST ||
            type === GenericFieldType.NUMBER_EDITABLE_LIST
        );
    };

    getOptionsForListType(): GenericFieldItemType[] {
        const { type, items } = this.props;

        if (type === GenericFieldType.BOOLEAN_LIST) {
            return [
                { text: 'false', value: false },
                { text: 'true', value: true }
            ];
        }

        if (items && _.isObject(items)) {
            return _.uniqBy(
                _.map(items, item =>
                    !_.isObject(item) ? { text: item, value: item } : { text: item.name, value: item.value }
                ),
                'value'
            );
        }

        return [];
    }

    renderGenericField(): ReactNode {
        const {
            component: Component,
            max,
            min,
            name,
            placeholder,
            type,
            value,
            onChange = GenericField.defaultProps.onChange,
            maxLength
        } = this.props;

        if (
            type === GenericFieldType.STRING ||
            type === GenericFieldType.NUMBER ||
            type === GenericFieldType.PASSWORD
        ) {
            const { icon = null } = this.props;

            return (
                <Input
                    icon={icon}
                    name={name}
                    type={type === GenericFieldType.STRING ? 'text' : type}
                    placeholder={placeholder}
                    value={value === null ? '' : value}
                    onChange={onChange}
                    max={type === GenericFieldType.NUMBER ? max : null}
                    min={type === GenericFieldType.NUMBER ? min : null}
                >
                    {maxLength && <input maxLength={maxLength} />}
                </Input>
            );
        }
        if (type === GenericFieldType.BOOLEAN) {
            return (
                <Checkbox
                    label=" "
                    name={name}
                    toggle
                    checked={(_.isBoolean(value) && value) || (_.isString(value) && value === 'true')}
                    onChange={onChange}
                />
            );
        }
        if (GenericField.isListType(type)) {
            const options = this.getOptionsForListType();

            return (
                <Dropdown
                    fluid
                    selection
                    value={value}
                    name={name}
                    multiple={type === GenericFieldType.MULTI_SELECT_LIST}
                    allowAdditions={
                        type === GenericFieldType.EDITABLE_LIST || type === GenericFieldType.NUMBER_EDITABLE_LIST
                    }
                    search={type === GenericFieldType.EDITABLE_LIST || type === GenericFieldType.NUMBER_EDITABLE_LIST}
                    placeholder={placeholder || 'Please select'}
                    options={options}
                    onChange={onChange}
                    clearable={false}
                />
            );
        }
        if (type === GenericFieldType.CUSTOM) {
            const { default: defaultValue, widgetlessToolbox } = this.props;
            const optionalProps = _.keys(GenericField.defaultProps);
            const requiredProps = ['name', 'label', 'component'];
            const componentProps = _.omit(this.props, ['widgetlessToolbox', ...optionalProps, ...requiredProps]);

            if (Component === null || Component === undefined) {
                return <ErrorMessage error={`\`component\` prop have to be provided when \`${type}\` type is set.`} />;
            }
            return (
                <Component
                    name={name}
                    value={_.isUndefined(value) ? defaultValue : value}
                    onChange={onChange}
                    widgetlessToolbox={widgetlessToolbox}
                    {...componentProps}
                />
            );
        }

        return null;
    }

    render(): ReactNode {
        const { description, error, label, name, required, className, style } = this.props;

        return (
            <FormField
                className={`${name} ${className}`.trim()}
                style={style}
                help={description}
                label={label}
                required={required}
                error={error}
            >
                {this.renderGenericField()}
            </FormField>
        );
    }
}

export default GenericField;
