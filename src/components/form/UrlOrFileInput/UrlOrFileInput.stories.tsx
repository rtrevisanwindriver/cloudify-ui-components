import React from 'react';
import { Label } from 'semantic-ui-react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { ComponentStory } from '@storybook/react';
import { Form } from 'components';

export default {
    title: 'Form/UrlOrFile',
    component: Form.UrlOrFile,
    decorators: [LiveEditDecorator({ Label, Form })]
};

type UrlOrFileStory = ComponentStory<typeof Form.UrlOrFile>;

export const basic: UrlOrFileStory = () => (
    <Form>
        <Form.Field label="File or URL">
            <Form.UrlOrFile
                name="blueprint"
                placeholder="Provide the blueprint's URL or click browse to select a file"
                onChangeUrl={() => {}}
                onBlurUrl={() => {}}
                onChangeFile={() => {}}
            />
        </Form.Field>
    </Form>
);
