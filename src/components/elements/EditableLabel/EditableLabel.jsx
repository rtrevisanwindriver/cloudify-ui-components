import { Input, Label } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';

/**
 * EditableLabel component shows an editable label.
 * Label can have an optional placeholder and/or initial value.
 */
export default function EditableLabel({
    invalidValues,
    value,
    placeholder,
    enabled,
    editing: editingProp,
    onChange,
    onCancel,
    onError,
    labelSize,
    inputSize,
    className,
    style
}) {
    const [editing, setEditing] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [isError, setError] = useState();

    function submitChange() {
        if (currentValue === value) {
            setEditing(false);
            onCancel();
            return;
        }

        if (invalidValues.indexOf(currentValue) >= 0 && currentValue !== value) {
            setError(true);
            onError();
            return;
        }

        setEditing(false);
        onChange(currentValue);
    }

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const calculatedClassName = `${className} ${_.isEmpty(value) ? 'editPlaceholder' : ''}`;

    return editing || editingProp ? (
        <Input
            value={currentValue}
            error={isError}
            onChange={(e, data) => {
                setCurrentValue(data.value);
                setError(false);
            }}
            onKeyDown={e => {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    setError(false);
                    setEditing(false);
                    setCurrentValue(value);
                    onCancel();
                }
                if (e.key === 'Enter' && currentValue) {
                    submitChange();
                }
            }}
            onBlur={submitChange}
            size={inputSize}
            style={{ verticalAlign: 'top', ...style }}
            input={
                <input
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                />
            }
            className={calculatedClassName}
        />
    ) : (
        <Label
            size={labelSize}
            style={{ background: 'none', cursor: enabled ? 'pointer' : 'inherit', ...style }}
            onClick={() => {
                if (enabled && editingProp === null) setEditing(true);
            }}
            className={calculatedClassName}
        >
            {enabled ? currentValue || placeholder : currentValue}
        </Label>
    );
}

EditableLabel.propTypes = {
    /**
     * Label's initial value
     */
    value: PropTypes.string,

    /**
     * Label's displayed text when value is not set or empty
     */
    placeholder: PropTypes.string,

    /**
     * If 'true' make the label editable
     */
    enabled: PropTypes.bool,

    /**
     * Allows the editing state to be externally controlled, disables entering editing state on label click
     */
    editing: PropTypes.bool,

    /**
     * Function to call when value has changed (receives input's value as argument)
     */
    onChange: PropTypes.func,

    /**
     * Function to be called on edit cancel (or edit submission with no change)
     */
    onCancel: PropTypes.func,

    /**
     * Function to call when invalid value is entered (i.e. one of values specified by invalidValues prop)
     */
    onError: PropTypes.func,

    /**
     * List of values that are invalid for input.
     * `onError` callback is called when of of these values is entered.
     */
    invalidValues: PropTypes.arrayOf(PropTypes.string),

    /**
     * Label size
     */
    labelSize: PropTypes.string,

    /**
     * Input size
     */
    inputSize: PropTypes.string,

    /**
     * Name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

EditableLabel.defaultProps = {
    value: '',
    className: null,
    enabled: true,
    editing: null,
    onChange: noop,
    onCancel: noop,
    onError: noop,
    invalidValues: [],
    labelSize: null,
    inputSize: null,
    placeholder: '',
    style: null
};
