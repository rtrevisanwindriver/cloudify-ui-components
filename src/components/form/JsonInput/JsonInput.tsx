import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { types } from 'cloudify-ui-common';

import ReactJsonView from 'react-json-view';
import { Icon, Label, TextArea, List } from 'semantic-ui-react';
import Popup from 'components/popups/Popup';
import './JsonInput.css';

// @ts-expect-error TS(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
function ReactJsonViewWrapper({ value, divStyle, onChange }) {
    return (
        <div style={divStyle}>
            <ReactJsonView
                src={value}
                name={null}
                enableClipboard={false}
                defaultValue=""
                onAdd={onChange}
                onEdit={onChange}
                onDelete={onChange}
            />
        </div>
    );
}

ReactJsonViewWrapper.propTypes = {
    /**
     * JSON value
     */
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.object,

    /**
     * React style object passed to ReactJsonView component
     */
    // eslint-disable-next-line react/forbid-prop-types
    divStyle: PropTypes.object,

    /**
     * Function called on value change
     */
    onChange: PropTypes.func
};

ReactJsonViewWrapper.defaultProps = {
    value: {},
    divStyle: {},
    onChange: _.noop
};

/**
 * `JsonInput` is a component providing text or rich editor for JSON-like data
 *
 * Accessible as `Form.Json`.
 */
export default class JsonInput extends React.PureComponent {
    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props, context) {
        super(props, context);

        this.state = {
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        };

        this.onChangeJson = this.onChangeJson.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.switchView = this.switchView.bind(this);
    }

    componentDidMount() {
        const isParsableToJson = this.isParsableToJson();
        this.setState({ isParsableToJson, isRawView: !isParsableToJson });
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { value } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'isRawView' does not exist on type 'Reado... Remove this comment to see the full error message
        const { isRawView } = this.state;

        if (!_.isEqual(value, prevProps.value)) {
            const isParsableToJson = this.isParsableToJson();
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                isParsableToJson,
                isRawView: !isRawView ? !isParsableToJson : isRawView
            });
        }
    }

    // @ts-expect-error TS(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
    onChangeJson({ updated_src: value }) {
        // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { name, onChange } = this.props;

        onChange(null, {
            name,
            value: types.getStringValue(value)
        });
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    onChangeString(event, { name, value }) {
        // @ts-expect-error TS(2339) FIXME: Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
        const { onChange } = this.props;
        onChange(event, { name, value });
    }

    switchView() {
        // @ts-expect-error TS(2339) FIXME: Property 'isRawView' does not exist on type 'Reado... Remove this comment to see the full error message
        const { isRawView } = this.state;
        this.setState({ isRawView: !isRawView });
    }

    // See: https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
    isParsableToJson() {
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { value } = this.props;
        let isParsableToJson = true;

        if (!_.isString(value)) {
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
    }

    render() {
        // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { name, value, error, className, style: wrapperStyle } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'isRawView' does not exist on type 'Reado... Remove this comment to see the full error message
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
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
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
                                onClick={isParsableToJson ? this.switchView : _.noop}
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

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
JsonInput.propTypes = {
    /**
     * name of the field
     */
    name: PropTypes.string.isRequired,

    /**
     * value of the field
     */
    value: PropTypes.string,

    /**
     * is field invalid
     */
    error: PropTypes.bool,

    /**
     * function to be called on value change
     */
    onChange: PropTypes.func,

    /**
     * CSS class
     */
    className: PropTypes.string,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
JsonInput.defaultProps = {
    value: '{}',
    error: false,
    onChange: _.noop,
    className: undefined,
    style: {}
};
