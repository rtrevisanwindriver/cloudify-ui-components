import React from 'react';
import type { ReactNode, SyntheticEvent, JSXElementConstructor, CSSProperties } from 'react';
import _ from 'lodash';

import { Input } from 'semantic-ui-react';
import Dropdown from 'components/elements/Dropdown';
import ErrorMessage from 'components/elements/ErrorMessage';
import Checkbox from 'components/form/Checkbox';
import FormField from '../Form/FormField';

import GenericFieldEnum from './GenericFieldEnum';

type GenericFieldItemType = {
    value: boolean | number | string;
    text?: string | number;
    name?: string | number;
};

export type onChange = (proxy: SyntheticEvent<HTMLElement, Event>, field: Record<string, any>) => void;

export interface ComponentProps {
    name: string;
    value: any;
    onChange: onChange;
}

interface GenericFieldProps {
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
    default?: any;

    /**
     * fields description showed in popup when user hovers field
     */
    description?: string | ReactNode;

    /**
     * specifies if a field should be marked as field with error
     */
    error?: boolean;

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
    type: GenericFieldEnum;

    /**
     * specifies the value of the field
     */
    value?: any;

    /**
     * CSS class
     */
    className?: string;

    /**
     * CSS style
     */
    style?: CSSProperties;
    [x: string]: any;
}

interface GenericFieldState {
    options?: GenericFieldItemType[];
}

/**
 * `GenericField` is a generic component which can be used as different input fields in Form component
 */
class GenericField extends React.PureComponent<GenericFieldProps, GenericFieldState> {
    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        className: '',
        style: undefined,
        component: null,
        default: '',
        description: '',
        error: false,
        icon: null,
        items: [],
        max: null,
        min: null,
        onChange: _.noop,
        placeholder: '',
        required: false,
        type: GenericFieldEnum.STRING_TYPE,
        value: ''
    };

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static STRING_TYPE: GenericFieldEnum.STRING_TYPE = GenericFieldEnum.STRING_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static PASSWORD_TYPE: GenericFieldEnum.PASSWORD_TYPE = GenericFieldEnum.PASSWORD_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static NUMBER_TYPE: GenericFieldEnum.NUMBER_TYPE = GenericFieldEnum.NUMBER_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static BOOLEAN_TYPE: GenericFieldEnum.BOOLEAN_TYPE = GenericFieldEnum.BOOLEAN_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static BOOLEAN_LIST_TYPE: GenericFieldEnum.BOOLEAN_LIST_TYPE = GenericFieldEnum.BOOLEAN_LIST_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static LIST_TYPE: GenericFieldEnum.LIST_TYPE = GenericFieldEnum.LIST_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static NUMBER_LIST_TYPE: GenericFieldEnum.NUMBER_LIST_TYPE = GenericFieldEnum.NUMBER_LIST_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static MULTI_SELECT_LIST_TYPE: GenericFieldEnum.MULTI_SELECT_LIST_TYPE =
        GenericFieldEnum.MULTI_SELECT_LIST_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static EDITABLE_LIST_TYPE: GenericFieldEnum.EDITABLE_LIST_TYPE = GenericFieldEnum.EDITABLE_LIST_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static NUMBER_EDITABLE_LIST_TYPE: GenericFieldEnum.NUMBER_EDITABLE_LIST_TYPE =
        GenericFieldEnum.NUMBER_EDITABLE_LIST_TYPE;

    /** deprecated. The GenericFieldEnum should be used directly instead */
    public static CUSTOM_TYPE: GenericFieldEnum.CUSTOM_TYPE = GenericFieldEnum.CUSTOM_TYPE;

    static formatValue = (type: GenericFieldEnum, value: any): boolean | string[] | number => {
        if (type === GenericFieldEnum.MULTI_SELECT_LIST_TYPE) {
            return _.split(value, ',');
        }
        if (type === GenericFieldEnum.BOOLEAN_TYPE) {
            return (_.isBoolean(value) && value) || (_.isString(value) && value === 'true');
        }
        if (
            type === GenericFieldEnum.NUMBER_TYPE ||
            type === GenericFieldEnum.NUMBER_LIST_TYPE ||
            type === GenericFieldEnum.NUMBER_EDITABLE_LIST_TYPE
        ) {
            return parseInt(value, 10) || 0;
        }

        return value;
    };

    static isListType = (type: GenericFieldEnum): boolean => {
        return (
            type === GenericFieldEnum.LIST_TYPE ||
            type === GenericFieldEnum.NUMBER_LIST_TYPE ||
            type === GenericFieldEnum.MULTI_SELECT_LIST_TYPE ||
            type === GenericFieldEnum.BOOLEAN_LIST_TYPE ||
            type === GenericFieldEnum.EDITABLE_LIST_TYPE ||
            type === GenericFieldEnum.NUMBER_EDITABLE_LIST_TYPE
        );
    };

    constructor(props: GenericFieldProps) {
        super(props);

        this.state = GenericField.isListType(props.type) ? { options: [] } : {};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(): void {
        this.initOptions(this.props);
    }

    componentDidUpdate(prevProps: GenericFieldProps): void {
        const { items } = this.props;
        if (items !== prevProps.items) {
            this.initOptions(this.props);
        }
    }

    handleInputChange: onChange = (proxy, field) => {
        const { onChange = GenericField.defaultProps.onChange, type } = this.props;
        onChange(proxy, { ...field, genericType: type });
    };

    initOptions(props: GenericFieldProps): void {
        if (props.type === GenericFieldEnum.BOOLEAN_LIST_TYPE) {
            this.setState({
                options: [
                    { text: 'false', value: false },
                    { text: 'true', value: true }
                ]
            });
        } else if (GenericField.isListType(props.type) && props.items && _.isObject(props.items)) {
            const options = _.map(props.items, item =>
                !_.isObject(item) ? { text: item, value: item } : { text: item.name, value: item.value }
            );

            this.setState({ options: _.uniqBy(options, 'value') });
        }
    }

    render(): ReactNode {
        const {
            component: Component,
            default: defaultValue,
            description,
            error,
            icon,
            label,
            max,
            min,
            name,
            placeholder,
            required,
            type,
            value,
            className,
            style
        } = this.props;
        const { options } = this.state;
        let field = null;

        if (
            type === GenericFieldEnum.STRING_TYPE ||
            type === GenericFieldEnum.NUMBER_TYPE ||
            type === GenericFieldEnum.PASSWORD_TYPE
        ) {
            field = (
                <Input
                    icon={icon}
                    name={name}
                    type={type === GenericFieldEnum.STRING_TYPE ? 'text' : type}
                    placeholder={placeholder}
                    value={value === null ? '' : value}
                    onChange={this.handleInputChange}
                    max={type === GenericFieldEnum.NUMBER_TYPE ? max : null}
                    min={type === GenericFieldEnum.NUMBER_TYPE ? min : null}
                />
            );
        } else if (type === GenericFieldEnum.BOOLEAN_TYPE) {
            field = (
                <Checkbox
                    label=" "
                    name={name}
                    toggle
                    checked={(_.isBoolean(value) && value) || (_.isString(value) && value === 'true')}
                    onChange={this.handleInputChange}
                />
            );
        } else if (GenericField.isListType(type)) {
            field = (
                <Dropdown
                    fluid
                    selection
                    value={value}
                    name={name}
                    multiple={type === GenericFieldEnum.MULTI_SELECT_LIST_TYPE}
                    allowAdditions={
                        type === GenericFieldEnum.EDITABLE_LIST_TYPE ||
                        type === GenericFieldEnum.NUMBER_EDITABLE_LIST_TYPE
                    }
                    search={
                        type === GenericFieldEnum.EDITABLE_LIST_TYPE ||
                        type === GenericFieldEnum.NUMBER_EDITABLE_LIST_TYPE
                    }
                    placeholder={placeholder || 'Please select'}
                    options={options}
                    onChange={this.handleInputChange}
                    clearable={false}
                />
            );
        } else if (type === GenericFieldEnum.CUSTOM_TYPE) {
            const optionalProps = _.keys(GenericField.defaultProps);
            const requiredProps = ['name', 'label', 'component'];
            const componentProps = _.omit(this.props, [...optionalProps, ...requiredProps]);

            if (Component === null || Component === undefined) {
                return <ErrorMessage error={`\`component\` prop have to be provided when \`${type}\` type is set.`} />;
            }
            field = (
                <Component
                    name={name}
                    value={_.isUndefined(value) ? defaultValue : value}
                    onChange={this.handleInputChange}
                    {...componentProps}
                />
            );
        }

        return (
            <FormField
                className={`${name} ${className}`.trim()}
                style={style}
                help={description}
                label={label}
                required={required}
                error={error}
            >
                {field}
            </FormField>
        );
    }
}

export default GenericField;
