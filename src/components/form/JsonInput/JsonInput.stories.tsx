import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import JsonInput from './JsonInput';

export default {
    title: 'Form/Json',
    component: JsonInput,
    decorators: [LiveEditDecorator({ Form })]
};

export const JSONValue = () => {
    const [value, setValue] = React.useState('{"webserver_port2":6,"webserver_port1":5}');

    return (
        <Form>
            {/* @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; onChange: (ev... Remove this comment to see the full error message */}
            <Form.Json name="port_conf" value={value} onChange={(event, { value: v }) => setValue(v)} />
        </Form>
    );
};

export const textValue = () => {
    const [value, setValue] = React.useState('Text\nScript\nSomething');

    return (
        <Form>
            {/* @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; onChange: (ev... Remove this comment to see the full error message */}
            <Form.Json name="port_conf" value={value} onChange={(event, { value: v }) => setValue(v)} />
        </Form>
    );
};

export const markedAsError = () => {
    const [value, setValue] = React.useState('{"webserver_port2":6,"webserver_port1":5}');

    return (
        <Form>
            {/* @ts-expect-error TS(2322) FIXME: Type '{ name: string; error: true; value: string; ... Remove this comment to see the full error message */}
            <Form.Json name="port_conf" error value={value} onChange={(event, { value: v }) => setValue(v)} />
        </Form>
    );
};
