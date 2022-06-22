import React, { useState, useCallback } from 'react';
import type { FocusEvent } from 'react';
import _ from 'lodash';

import { Input, Label } from 'semantic-ui-react';
import FileInput from '../FileInput';

import './UrlOrFileInput.css';

export interface UrlOrFileInputProps {
    /**
     * basename of the field => URL field will be named `<name>Url` and file field will be named `<name>File`
     */
    name: string;

    /**
     * input field placeholder
     */
    placeholder: string;

    /**
     * function to be called on URL change
     */
    onChangeUrl: (url: string) => void;

    /**
     * function to be called on URL input blur
     */
    onBlurUrl: (e: FocusEvent<HTMLInputElement>) => void;

    /**
     * function to be called on file change
     */
    onChangeFile: (file: File) => void;

    /**
     * CSS class
     */
    className?: string;

    /**
     * CSS style
     */
    style?: React.CSSProperties;
}

/**
 * UrlOrFileInput is a component showing URL and file input field
 *
 * Accessible as `UrlOrFileInput` or `Form.UrlOrFile`.
 */
export default function UrlOrFileInput({
    name,
    placeholder,
    onChangeUrl,
    onBlurUrl = _.noop,
    onChangeFile,
    className = '',
    style
}: UrlOrFileInputProps) {
    const [fileValue, setFileValue] = useState();
    const [value, setValue] = useState('');

    const handleUrlChange = useCallback(
        url => {
            setValue(url);
            onChangeUrl(url);
        },
        [onChangeUrl, setValue]
    );

    const handleFileChange = useCallback(
        file => {
            setFileValue(file);
            onChangeFile(file);
        },
        [onChangeFile]
    );

    const reset = useCallback(() => {
        handleFileChange(null);
        handleUrlChange('');
    }, [handleUrlChange, handleFileChange]);

    const onFocus = useCallback(() => fileValue && reset(), [fileValue, reset]);

    return (
        <Input
            value={_.get(fileValue, 'name', value)}
            name={`${name}Url`}
            placeholder={placeholder}
            onChange={(_e, data) => handleUrlChange(data.value)}
            onFocus={onFocus}
            onBlur={onBlurUrl}
            action
            labelPosition="left"
            className={`fileOrUrl ${className}`.trim()}
            style={style}
        >
            <Label>{fileValue ? 'File' : 'URL'}</Label>
            <input />
            <FileInput
                value={_.get(fileValue, 'name', '')}
                name={`${name}File`}
                onChange={handleFileChange}
                onReset={reset}
                showInput={false}
            />
        </Input>
    );
}
