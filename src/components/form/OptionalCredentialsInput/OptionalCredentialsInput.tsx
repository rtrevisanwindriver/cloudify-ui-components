import type { CheckboxProps, InputProps, StrictFormInputProps } from 'semantic-ui-react';
import { Ref } from 'semantic-ui-react';
import React, { useEffect, useRef } from 'react';
import { Form } from '../Form';
import { useInput } from '../../../hooks';

export class Credentials {
    // eslint-disable-next-line no-useless-constructor
    constructor(public username = '', public password = '') {}

    areIncomplete() {
        return !this.username || !this.password;
    }

    getAuthorizationHeader() {
        return this.username ? { Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}` } : undefined;
    }
}

export interface OptionalCredentialsInputProps {
    /**
     * `blur` event handler
     */
    onBlur: () => void;
    /**
     * Whether credential input fields are enabled
     */
    enabled: boolean;
    /**
     * `enabled` flag change handler
     */
    onEnabledChange: (value: boolean) => void;
    /**
     * Credentials change handler
     */
    onCredentialsChange: (value: Credentials) => void;
    /**
     * Errors provider for credentials input fields
     */
    errorsProvider: (field: 'username' | 'password') => StrictFormInputProps['error'];
}

/**
 * Input component for specifying optional username/password credentials.
 */
export function OptionalCredentialsInput({
    onBlur,
    enabled,
    onEnabledChange,
    onCredentialsChange,
    errorsProvider
}: OptionalCredentialsInputProps) {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [username, setUsername, clearUsername] = useInput('');
    const [password, setPassword, clearPassword] = useInput('');

    useEffect(
        function setFocusOnUsernameInput() {
            if (enabled && !username) {
                usernameInputRef.current?.getElementsByTagName('input')[0].focus();
            }
        },
        [enabled, username]
    );

    const handleUrlAuthenticationChange: CheckboxProps['onChange'] = (_event, { checked }) => {
        onEnabledChange(!!checked);
        if (!checked) {
            clearUsername();
            clearPassword();
        }
    };

    const handleUsernameChange: InputProps['onChange'] = (_event, { value }) => {
        setUsername(value);
        onCredentialsChange(new Credentials(value, password));
    };

    const handlePasswordChange: InputProps['onChange'] = (_event, { value }) => {
        setPassword(value);
        onCredentialsChange(new Credentials(username, value));
    };

    return (
        <Form.Group widths="equal">
            <Form.Field>
                <Form.Checkbox
                    toggle
                    label="URL authentication"
                    help={undefined}
                    checked={enabled}
                    onChange={handleUrlAuthenticationChange}
                />
            </Form.Field>
            <Ref innerRef={usernameInputRef}>
                <Form.Input
                    error={errorsProvider('username')}
                    disabled={!enabled}
                    value={username}
                    onChange={handleUsernameChange}
                    label="Username"
                    onBlur={onBlur}
                    required={enabled}
                />
            </Ref>
            <Form.Input
                error={errorsProvider('password')}
                disabled={!enabled}
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                onBlur={onBlur}
                required={enabled}
                type="password"
            />
        </Form.Group>
    );
}

export default OptionalCredentialsInput;
