import type { ChangeEvent, CSSProperties } from 'react';
import React from 'react';
import { isEqual, isString, noop } from 'lodash';
import { types } from 'cloudify-ui-common-frontend';

import type { TextAreaProps } from 'semantic-ui-react';
import { Icon, Label, List, TextArea } from 'semantic-ui-react';
import { Popup } from 'components';
import type { ReactJsonViewWrapperProps } from './ReactJsonViewWrapper';
import ReactJsonViewWrapper from './ReactJsonViewWrapper';
import type { OnChangeInputData } from '../types';
import './JsonInput.css';

export interface JsonInputProps {
    /**
     * name of the field
     */
    name: string;

    /**
     * value of the field
     */
    value?: string;

    /**
     * is field invalid
     */
    error?: boolean;

    /**
     * function to be called on value change
     */
    onChange: (event: ChangeEvent<HTMLTextAreaElement> | null, data: OnChangeInputData) => void;

    /**
     * CSS class
     */
    className?: string;

    /**
     * CSS style
     */
    style: CSSProperties;
}

type JsonInputPropsWithDefaults = Required<JsonInputProps>;

interface JsonInputState {
    isRawView: boolean;
    isParsableToJson: boolean;
    isMouseOver: boolean;
}

/**
 * `JsonInput` is a component providing text or rich editor for JSON-like data
 *
 * Accessible as `Form.Json`.
 */
export class JsonInput extends React.PureComponent<JsonInputPropsWithDefaults, JsonInputState> {
    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        value: '{}',
        error: false,
        onChange: noop,
        className: undefined,
        style: {}
    };

    constructor(props: JsonInputPropsWithDefaults, context: unknown) {
        super(props, context);

        this.state = {
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        };
    }

    componentDidMount() {
        const isParsableToJson = this.isParsableToJson();
        this.setState({ isParsableToJson, isRawView: !isParsableToJson });
    }

    componentDidUpdate(prevProps: JsonInputProps) {
        const { value } = this.props;
        const { isRawView } = this.state;

        if (!isEqual(value, prevProps.value)) {
            const isParsableToJson = this.isParsableToJson();
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                isParsableToJson,
                isRawView: !isRawView ? !isParsableToJson : isRawView
            });
        }
    }

    onChangeJson: ReactJsonViewWrapperProps['onChange'] = ({ updated_src: value }) => {
        const { name, onChange } = this.props;

        onChange(null, {
            name,
            value: types.getStringValue(value)
        });
    };

    onChangeString: TextAreaProps['onChange'] = (event, data) => {
        const { onChange } = this.props;
        const { name, value = '' } = data as OnChangeInputData;

        onChange(event, { name, value });
    };

    switchView = () => {
        const { isRawView } = this.state;
        this.setState({ isRawView: !isRawView });
    };

    // See: https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
    isParsableToJson = () => {
        const { value } = this.props;
        let isParsableToJson = true;

        if (!isString(value)) {
            isParsableToJson = false;
        } else {
            try {
                const result = JSON.parse(value);
                isParsableToJson =
                    Object.prototype.toString.call(result) === '[object Object]' || Array.isArray(result);
            } catch (err) {
                isParsableToJson = false;
            }
        }

        return isParsableToJson;
    };

    render() {
        const { name, value, error, className, style: wrapperStyle } = this.props;
        const { isRawView, isParsableToJson, isMouseOver } = this.state;

        const stringValue = types.getStringValue(value);
        const jsonValue = types.getTypedValue(value);

        const style = {
            backgroundColor: error ? '#fff6f6' : '',
            border: `1px solid ${error ? 'rgb(224, 180, 180)' : 'rgba(34,36,38,.15)'}`,
            borderRadius: 4,
            padding: 10
        };

        return (
            <div
                style={{ position: 'relative', ...wrapperStyle }}
                className={className}
                onMouseEnter={() => this.setState({ isMouseOver: true })}
                onMouseLeave={() => this.setState({ isMouseOver: false })}
            >
                {isRawView ? (
                    <TextArea name={name} value={stringValue} onChange={this.onChangeString} style={style} />
                ) : (
                    <ReactJsonViewWrapper value={jsonValue} divStyle={style} onChange={this.onChangeJson} />
                )}
                {isMouseOver && (
                    <Popup>
                        <Popup.Trigger>
                            <Icon
                                name="edit"
                                link={isParsableToJson}
                                disabled={!isParsableToJson}
                                style={{ position: 'absolute', top: 10, right: 30 }}
                                onClick={isParsableToJson ? this.switchView : noop}
                            />
                        </Popup.Trigger>
                        <Popup.Content>
                            {isParsableToJson
                                ? `Switch to ${isRawView ? 'Rich View' : 'Text View'}`
                                : 'Cannot switch to Rich View. Text cannot be parsed to JSON.'}
                        </Popup.Content>
                    </Popup>
                )}
                {isMouseOver && !isRawView && (
                    <Popup wide="very">
                        <Popup.Trigger>
                            <Icon name="info" style={{ position: 'absolute', top: 10, right: 50, cursor: 'pointer' }} />
                        </Popup.Trigger>
                        <Popup.Content>
                            <List>
                                <List.Item>
                                    <Label>Ctrl + Click</Label> to enter edit mode
                                </List.Item>
                                <List.Item>
                                    In edit mode <Label>Ctrl + Enter</Label> to submit changes
                                </List.Item>
                                <List.Item>
                                    In edit mode <Label>Escape</Label> to cancel changes
                                </List.Item>
                            </List>
                        </Popup.Content>
                    </Popup>
                )}
            </div>
        );
    }
}

export default JsonInput;
