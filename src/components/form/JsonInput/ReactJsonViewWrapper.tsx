import React from 'react';
import type { CSSProperties } from 'react';
import { noop } from 'lodash';

import ReactJsonView from 'react-json-view';
import type { ReactJsonViewProps, InteractionProps } from 'react-json-view';
import './JsonInput.css';

export interface ReactJsonViewWrapperProps {
    /**
     * JSON value
     */
    value?: ReactJsonViewProps['src'];

    /**
     * React style object passed to ReactJsonView component
     */
    divStyle?: CSSProperties;

    /**
     * Function called on value change
     */
    onChange?: (add: Partial<InteractionProps>) => false | void;
}

const ReactJsonViewWrapper = ({ value = {}, divStyle, onChange = noop }: ReactJsonViewWrapperProps) => {
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
};

export default ReactJsonViewWrapper;
