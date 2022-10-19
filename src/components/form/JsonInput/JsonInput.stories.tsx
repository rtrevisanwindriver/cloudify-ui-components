import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import Form from '../Form/Form';
import JsonInput from './JsonInput';
import type { JsonInputProps } from './JsonInput';

export default {
    title: 'Form/Json',
    component: JsonInput,
    decorators: [LiveEditDecorator({ Form })]
};

type JsonInputStory = Story<Required<JsonInputProps>>;

export const JSONValue: JsonInputStory = () => {
    const [value, setValue] = React.useState('{"webserver_port2":6,"webserver_port1":5}');

    return (
        <Form>
            <Form.Json name="port_conf" value={value} onChange={(_event, { value: v }) => setValue(v)} />
        </Form>
    );
};

export const textValue: JsonInputStory = () => {
    const [value, setValue] = React.useState('Text\nScript\nSomething');

    return (
        <Form>
            <Form.Json name="port_conf" value={value} onChange={(_event, { value: v }) => setValue(v)} />
        </Form>
    );
};

export const markedAsError: JsonInputStory = () => {
    const [value, setValue] = React.useState('{"webserver_port2":6,"webserver_port1":5}');

    return (
        <Form>
            <Form.Json name="port_conf" error value={value} onChange={(_event, { value: v }) => setValue(v)} />
        </Form>
    );
};
