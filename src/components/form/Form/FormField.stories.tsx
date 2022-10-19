import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from './Form';
import { FormFieldWithoutMemo } from './FormField';
import type { FormFieldProps } from './FormField';

export default {
    title: 'Form/FormField',
    component: FormFieldWithoutMemo,
    decorators: [LiveEditDecorator({ Form })]
};

type FormFieldStory = Story<Required<FormFieldProps>>;

export const required: FormFieldStory = () => (
    <Form>
        <Form.Field label="Username" required>
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const error: FormFieldStory = () => (
    <Form>
        <Form.Field error>
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const errorWithContent: FormFieldStory = () => (
    <Form>
        <Form.Field label="Label" required error={{ content: 'Error message', pointing: 'above' }}>
            <Form.UrlOrFile
                name="name"
                placeholder="placeholder"
                onChangeUrl={() => {}}
                onChangeFile={() => {}}
                onBlurUrl={() => {}}
            />
        </Form.Field>
    </Form>
);

export const label: FormFieldStory = () => (
    <Form>
        <Form.Field label="Username">
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const help: FormFieldStory = () => (
    <Form>
        <Form.Field label="Username" help="Use only alphanumeric characters">
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);

export const requiredWithHelp: FormFieldStory = () => (
    <Form>
        <Form.Field label="Username" help="Use only alphanumeric characters" required>
            <Form.Input placeholder="Provide username" />
        </Form.Field>
    </Form>
);
