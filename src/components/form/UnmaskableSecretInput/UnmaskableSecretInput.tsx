import React from 'react';
import type { FormInputProps } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import InputMaskIcon from './InputMaskIcon';
import { useToggle } from '../../../hooks';

export type UnmaskableSecretInputProps = Partial<
    Pick<
        FormInputProps,
        'onChange' | 'name' | 'value' | 'fluid' | 'style' | 'maxLength' | 'disabled' | 'placeholder' | 'width'
    >
>;

/**
 * Masked input field for entering secret value, with an action icon to unmask the value.
 * Uses regular `Input` field internally and accepts a subset of its props - see `FormInputProps` interface for individual props description.
 */
export const UnmaskableSecretInput = ({
    name,
    value,
    onChange,
    disabled,
    fluid,
    style,
    maxLength,
    placeholder,
    width
}: UnmaskableSecretInputProps) => {
    const [isInputMasked, toggleInputMask] = useToggle(true);

    return (
        <Form.Input
            type={isInputMasked ? 'password' : 'text'}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            fluid={fluid}
            style={style}
            maxLength={maxLength}
            icon={<InputMaskIcon isInputMasked={isInputMasked} onClick={toggleInputMask} />}
            placeholder={placeholder}
            width={width}
        />
    );
};

export default UnmaskableSecretInput;
