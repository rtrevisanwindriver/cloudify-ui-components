import React, { createRef, useState } from 'react';
import type { FunctionComponent } from 'react';
import { isEmpty, noop } from 'lodash';

import { Button, Input } from 'semantic-ui-react';
import type { ButtonProps, StrictButtonProps } from 'semantic-ui-react';
import Popup from 'components/popups/Popup';

export interface FileInputProps {
    /**
     * string value to be displayed, creates controlled component if specified
     */
    value?: string | null;

    /**
     * name of the field appended to 'fileName' string
     */
    name?: string;

    /**
     * specifies a short hint that describes the expected input
     */
    placeholder?: string;

    /**
     * function called on file change
     */
    onChange?: (fileOrFiles: File | File[] | null, filename?: string) => void;

    /**
     * function called on file reset
     */
    onReset?: () => void;

    /**
     * if set to true opening file selector will be disabled
     */
    loading?: boolean;

    /**
     * if set to true component will be disabled
     */
    disabled?: boolean;

    /**
     * if set to false input string field will not be presented
     */
    showInput?: boolean;

    /**
     * if set to false reset button will not be presented
     */
    showReset?: boolean;

    /**
     * additional parameters for open file button, props for Button component
     */
    openButtonParams?: StrictButtonProps;

    /**
     * additional help information shown in Popup
     */
    help?: string;

    /**
     * if set to true multiple files can be selected
     */
    multiple?: boolean;
}

/**
 * FileInput is a component showing file input field. Can be displayed as normal input field containing name of the chosen file
 * or as a simple button triggering opening file browser. You can add reset button to unset chosen file.
 *
 * Accessible as `FileInput` or `Form.File`.
 */
const FileInput: FunctionComponent<FileInputProps> = ({
    value = null,
    name = '',
    placeholder = '',
    onChange = noop,
    onReset = noop,
    loading = false,
    disabled = false,
    showInput = true,
    showReset = true,
    openButtonParams = {},
    help = '',
    multiple = false
}) => {
    const inputRef = createRef<HTMLInputElement>();
    const [internalValue, setInternalValue] = useState('');

    const openFileSelection: ButtonProps['onClick'] = event => {
        event.preventDefault();
        inputRef?.current?.click();
    };

    const resetInput = () => {
        setInternalValue('');
        onChange(null, '');
    };

    const resetFileSelection: ButtonProps['onClick'] = event => {
        event.preventDefault();
        resetInput();
        onReset();
        return false;
    };

    const fileChanged = () => {
        const files = inputRef?.current?.files;
        const file = files?.[0];
        if (!file) {
            resetInput();
            return;
        }
        setInternalValue(file.name);
        if (multiple) onChange(files);
        else onChange(file, file.name);

        /**
         * Setting current value to '' to allow uploading the same file again without the need to use reset button
         * Ref.: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
         */
        inputRef.current!.value = '';
    };

    const folderButton = (
        <Button
            icon="folder open"
            onClick={openFileSelection}
            loading={loading}
            disabled={disabled}
            {...openButtonParams}
        />
    );

    const openFolderButton = !isEmpty(help) ? <Popup trigger={folderButton} content={help} /> : folderButton;

    function getValue() {
        if (value === null) {
            return internalValue;
        }

        return value;
    }

    const resetFileButton = showReset ? (
        <Button icon="remove" onClick={resetFileSelection} disabled={!getValue() || disabled} />
    ) : null;

    return (
        <>
            {showInput ? (
                <Input
                    readOnly
                    value={getValue()}
                    name={`fileName${name}`}
                    placeholder={placeholder}
                    onClick={openFileSelection}
                    disabled={disabled}
                    action
                >
                    <input />
                    {openFolderButton}
                    {resetFileButton}
                </Input>
            ) : (
                <>
                    {openFolderButton}
                    {resetFileButton}
                </>
            )}
            <input
                type="file"
                multiple={multiple}
                name={name}
                style={{ display: 'none' }}
                onChange={fileChanged}
                ref={inputRef}
            />
        </>
    );
};
export default FileInput;
