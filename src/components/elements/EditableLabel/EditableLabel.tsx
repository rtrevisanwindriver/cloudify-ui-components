import type { SemanticSIZES, StrictInputProps } from 'semantic-ui-react';
import { Input, Label } from 'semantic-ui-react';
import React, { useCallback, useEffect, useState } from 'react';
import { isEmpty, noop } from 'lodash';

export interface EditableLabelProps {
    /**
     * List of values that are invalid for input.
     * `onError` callback is called when of of these values is entered.
     */
    invalidValues?: string[];
    /**
     * Label's initial value
     */
    value?: string;
    /**
     * Label's displayed text when value is not set or empty
     */
    placeholder?: string;
    /**
     * If 'true' make the label editable
     */
    enabled?: boolean;
    /**
     * Allows the editing state to be externally controlled, disables entering editing state on label click
     */
    editing?: null | boolean;
    /**
     * Function to call when value has changed (receives input's value as argument)
     */
    onChange?: (value: string) => void;
    /**
     * Function to be called on edit cancel (or edit submission with no change)
     */
    onCancel?: () => void;
    /**
     * Function to call when invalid value is entered (i.e. one of values specified by invalidValues prop)
     */
    onError?: () => void;
    /**
     *  Input size
     */
    inputSize?: StrictInputProps['size'];
    /**
     * Label size
     */
    labelSize?: SemanticSIZES;
    /**
     * Name of the style class to be added
     */
    className?: string;
    /**
     * CSS style
     */
    style?: React.CSSProperties;
}

/**
 * EditableLabel component shows an editable label.
 * Label can have an optional placeholder and/or initial value.
 */
export function EditableLabel({
    value = '',
    className = '',
    enabled = true,
    editing: editingProp = null,
    onChange = noop,
    onCancel = noop,
    onError = noop,
    invalidValues = [],
    inputSize,
    labelSize,
    placeholder = '',
    style = {}
}: EditableLabelProps) {
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [currentValue, setCurrentValue] = useState('');
    const [isError, setError] = useState(false);

    const submitChange = useCallback(() => {
        if (currentValue === value) {
            setEditingEnabled(false);
            onCancel();
            return;
        }

        if (invalidValues.indexOf(currentValue) >= 0 && currentValue !== value) {
            setError(true);
            onError();
            return;
        }

        setEditingEnabled(false);
        onChange(currentValue);
    }, [currentValue, value, onCancel, invalidValues, onError, onChange]);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const calculatedClassName = `${className} ${isEmpty(value) ? 'editPlaceholder' : ''}`;

    return editingEnabled || editingProp ? (
        <Input
            value={currentValue}
            error={isError}
            onChange={(_e, data) => {
                setCurrentValue(data.value);
                setError(false);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    setError(false);
                    setEditingEnabled(false);
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
            // eslint-disable-next-line jsx-a11y/no-autofocus
            input={<input autoFocus />}
            className={calculatedClassName}
        />
    ) : (
        <Label
            size={labelSize}
            style={{ background: 'none', cursor: enabled ? 'pointer' : 'inherit', ...style }}
            onClick={() => {
                if (enabled && editingProp === null) setEditingEnabled(true);
            }}
            className={calculatedClassName}
        >
            {enabled ? currentValue || placeholder : currentValue}
        </Label>
    );
}

export default EditableLabel;
