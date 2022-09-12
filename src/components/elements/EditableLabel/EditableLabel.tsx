import { Input, Label } from 'semantic-ui-react';
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import _, { noop } from 'lodash';

/**
 * EditableLabel component shows an editable label.
 * Label can have an optional placeholder and/or initial value.
 */
export default function EditableLabel({
    // @ts-expect-error TS(7031) FIXME: Binding element 'invalidValues' implicitly has an ... Remove this comment to see the full error message
    invalidValues,
    // @ts-expect-error TS(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
    value,
    // @ts-expect-error TS(7031) FIXME: Binding element 'placeholder' implicitly has an 'a... Remove this comment to see the full error message
    placeholder,
    // @ts-expect-error TS(7031) FIXME: Binding element 'enabled' implicitly has an 'any' ... Remove this comment to see the full error message
    enabled,
    // @ts-expect-error TS(7031) FIXME: Binding element 'editingProp' implicitly has an 'a... Remove this comment to see the full error message
    editing: editingProp,
    // @ts-expect-error TS(7031) FIXME: Binding element 'onChange' implicitly has an 'any'... Remove this comment to see the full error message
    onChange,
    // @ts-expect-error TS(7031) FIXME: Binding element 'onCancel' implicitly has an 'any'... Remove this comment to see the full error message
    onCancel,
    // @ts-expect-error TS(7031) FIXME: Binding element 'onError' implicitly has an 'any' ... Remove this comment to see the full error message
    onError,
    // @ts-expect-error TS(7031) FIXME: Binding element 'labelSize' implicitly has an 'any... Remove this comment to see the full error message
    labelSize,
    // @ts-expect-error TS(7031) FIXME: Binding element 'inputSize' implicitly has an 'any... Remove this comment to see the full error message
    inputSize,
    // @ts-expect-error TS(7031) FIXME: Binding element 'className' implicitly has an 'any... Remove this comment to see the full error message
    className,
    // @ts-expect-error TS(7031) FIXME: Binding element 'style' implicitly has an 'any' ty... Remove this comment to see the full error message
    style
}) {
    const [editing, setEditing] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [isError, setError] = useState();

    const submitChange = useCallback(() => {
        if (currentValue === value) {
            // @ts-expect-error TS(2345) FIXME: Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
            setEditing(false);
            onCancel();
            return;
        }

        if (invalidValues.indexOf(currentValue) >= 0 && currentValue !== value) {
            // @ts-expect-error TS(2345) FIXME: Argument of type 'true' is not assignable to param... Remove this comment to see the full error message
            setError(true);
            onError();
            return;
        }

        // @ts-expect-error TS(2345) FIXME: Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
        setEditing(false);
        onChange(currentValue);
    }, [currentValue, value, onCancel, invalidValues, onError, onChange]);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const calculatedClassName = `${className} ${_.isEmpty(value) ? 'editPlaceholder' : ''}`;

    return editing || editingProp ? (
        <Input
            value={currentValue}
            error={isError}
            // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
            onChange={(e, data) => {
                // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                setCurrentValue(data.value);
                // @ts-expect-error TS(2345) FIXME: Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
                setError(false);
            }}
            // @ts-expect-error TS(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            onKeyDown={e => {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    // @ts-expect-error TS(2345) FIXME: Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
                    setError(false);
                    // @ts-expect-error TS(2345) FIXME: Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2345) FIXME: Argument of type 'true' is not assignable to param... Remove this comment to see the full error message
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
